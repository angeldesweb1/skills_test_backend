#!/usr/bin/env node
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { v4 } = require('uuid');

const salt = bcrypt.genSaltSync(10);
dotenv.config();

const {
  BrandModel,
} = require('../dist/app/vehicles/modules/brands/infra/models/brand.model');
const {
  ModelModel,
} = require('../dist/app/vehicles/modules/models/infra/models/model.model');
const { UserModel } = require('../dist/app/users/infra/models/user.model');
const {
  VehicleModel,
} = require('../dist/app/vehicles/infra/models/vehicle.model');

// Configuración de conexión
const MONGO_URI = process.env.DB_URI;
if (!MONGO_URI)
  return console.log(
    'Por favor configura una variable de entorno DB_URI para el seed con tu string de conección a mongodb',
  );

const runSeed = async () => {
  try {
    console.log('\x1b[36m%s\x1b[0m', '--- 🚀 Iniciando Seed en Binario ---');
    await mongoose.connect(MONGO_URI);

    // Rutas relativas al archivo bin/seed
    const loadJSON = (file) =>
      JSON.parse(
        fs.readFileSync(path.join(__dirname, '../seed', file), 'utf-8'),
      );

    let brands = loadJSON('brands.json');
    let models = loadJSON('models.json');
    let users = loadJSON('users.json');
    let vehicles = loadJSON('vehicles.json');

    console.log('🔑 Hash de contraseñas...');
    let auth = users.map((u) => {
      u.password = bcrypt.hashSync(u.password, salt);
      u.uuid = v4();
      return u;
    });

    console.log('🛂 Generando uuid...');
    vehicles = vehicles.map((v) => {
      v.id = v4();
      return v;
    });

    brands = brands.map((b) => {
      b.id = v4();
      return b;
    });

    models = models.map((m) => {
      m.id = v4();
      return m;
    });

    console.log('🧹 Limpiando colecciones...');
    await Promise.all([
      BrandModel.deleteMany({}),
      ModelModel.deleteMany({}),
      UserModel.deleteMany({}),
      VehicleModel.deleteMany({}),
    ]);

    console.log('📦 Insertando datos maestros...');
    await BrandModel.insertMany(brands);
    await UserModel.insertMany(auth);

    console.log('📦 Estableciendo relaciones...');
    await ModelModel.insertMany(models);
    await VehicleModel.insertMany(vehicles);

    console.log(
      '\x1b[32m%s\x1b[0m',
      '--- ✅ Base de datos poblada con éxito ---',
    );
  } catch (error) {
    console.error(
      '\x1b[31m%s\x1b[0m',
      '❌ Error fatal en el Seed:',
      error.message,
    );
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

runSeed();
