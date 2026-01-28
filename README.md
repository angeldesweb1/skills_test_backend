# API_BACKEND v0.0.1

## Requerimientos

- Bun

  Es recomendado utilizar bun cómo entorno y package manager ya que fue construido con el mismo, la versión utilizada de Bun fue la 1.2.12

  [Instalar Bun](https://bun.com/docs/installation)

- MongoDB
  El proyecto se ha realizado con la visión de poder cambiar de una Base de Datos a otra. De momento se ha hecho la integración de mongodb utilizando mongoose cómo driver. Versión de mongodb `(8.0.17)` versión de mongoose `(9.1.5)`

  [Descargar mongodb](https://www.mongodb.com/try/download/community)

  [Documentación mongoose](https://mongoosejs.com/docs/index.html)

## Uso

#### Descarga el repositorio

Clona el repositorio en la carpeta de tu elección

```shell

git clone https://github.com/angeldesweb1/skills_test_backend.git

```

#### Entorno

Crea en la raíz del proyecto un archivo .env y copia el contenido del archivo .env.example en el mismo, sustituyendo los valores por los de tus variables de entorno

#### Seeding

Puedes hacer una carga inicial de la base de datos siguiendo los pasos a continuación:

> ⚠️ Los id que se generan con el seed no son uuid's aprobados, solo tienen una máscara similar sin cumplir con las reglas de un uuid. Esto se hizo así con la finalidad del relacionar con mayor practicidad los documentos del seed, sin embargo la api cuenta con algunos endpoints (modificar, eliminar) que validan que el id sea un uuid para atender la petición, por lo que recomiendo generar algunos documentos de prueba con sus credenciales para ver todos los endpoints sin ningún contratiempo.

- Teniendo el archivo .env asegurate de tener una variable de entorno DB_URI con tu string de conección a mongodb

- Instala las dependencias

```shell

bun install

```

- Compila el proyecto.

```shell

bun run build

```

- Ejecuta el seed

```shell

bun seed

```

#### Puesta en marcha

Puedes probar el proyecto en local ya sea instalando bun o con npm teniendo en cuenta no hacer commits con el package-lock.json.

```shell

bun install

bun dev # Ejecuta entorno de desarrollo

bun run build && bun start # Compila y ejecuta producción en local

```

### Docker y Podman

#### Contenedor

Se agregó un Dockerfile y un docker-compose.yml. con la configuración necesaria para ejecutar el proyecto en un contenedor, este contenedor se construirá con las imágenes de bun y mongodb que ya han sido probada.

#### Entorno

Al igual que para el entorno de desarrollo se ha dejado un archivo de entorno llamado .env.container.example, agrega en la raíz del proyecto un archivo .env.container y copia el contenido en el mismo, sustituyendo por tus variables de entorno

# Endpoints disponibles

Debido a algunos contratiempos me fue imposible agregar un swagger con las especificaciones del servicio. A continuación dejaré los endpoints disponibles e intentaré agregar toda la información de cada uno de ellos

### Base URL

- /api/v1

### Autenticación

- POST /auth/login
  - Body
    email: string
    password: string
  - Response
    token: string
    user: User | null
    success: boolean
    error: string | null
- POST /auth/register
  - Body
    email: string
    password: string
  - Response
    token: string
    user: User | null
    success: boolean
    error: string | null

### Vehículos

TYPES

- Brand
  id: string
  name: string

- Model
  id: string
  name: string
  brand: Brand

- Vehicle
  id: string
  model: Model
  year: number
  status: 'disponible' | 'servicio' | 'mantenimiento'
  createdAt: string
  updatedAt: string
  createdBy: User
  updatedBy: User

- Pagination
  total: number
  totalItems: number
  currentPage: number
  perPage: number
  totalPages: number
  hasNextPage: false
  hasPreviousPage: false
  nextPage: null
  previousPage: null

- QueryOptions
  - limit?: number
  - offset?: number
  - sort?: string
  - order?: 'asc' | 'desc'

- GET /vehicles
  - Response
    docs: Vehicle[]
    pagination: Pagination

- POST /vehicles
  - Body
    model: string
    year: number
    createdBy: string

- PATCH /vehicles/:id
  - Params
    id: string
  - Body
    model?: string
    year?: number
    status?: 'disponible' | 'servicio' | 'mantenimiento'
    updatedBy: string
    - Response
      vehicle: Vehicle | null
      success: boolean
      error: string | null

- DELETE /vehicles/:id
  - Params
    id: string
  - Response
    success: boolean
    error: string | null
    vehicle: Vehicle | null

- GET /vehicles/brands
  - Response
    docs: Brand[]
    pagination: Pagination

- GET /vehicles/models
  - Response
    docs: Model[]
    pagination: Pagination

- POST /vehicles/brands
  - Body
    name: string
  - Response
    brand: Brand | null
    success: boolean
    error: string | null

- POST /vehicles/models
  - Body
    name: string
    brand: string
  - Response
    model: Model | null
    success: boolean
    error: string | null

- PATCH /vehicles/brands/:id
  - Params
    id: string
  - Body
    name?: string
  - Response
    brand: Brand | null
    success: boolean
    error: string | null

- PATCH /vehicles/models/:id
  - Params
    id: string
  - Body
    name?: string
    brand?: string
  - Response
    model: Model | null
    success: boolean
    error: string | null

- DELETE /vehicles/brands/:id
  - Params
    id: string
  - Response
    success: boolean
    error: string | null
    brand: Brand | null

- DELETE /vehicles/models/:id
  - Params
    id: string
  - Response
    success: boolean
    error: string | null
    model: Model | null
