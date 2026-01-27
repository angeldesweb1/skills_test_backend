import 'reflect-metadata';
import moduleAlias from 'module-alias';
import path from 'path';

// Verificamos si estamos en producción (ejecutando desde dist) o desarrollo (src)
const isProduction =
  process.env.NODE_ENV === 'production' || __dirname.includes('dist');

const rootPath = isProduction
  ? path.resolve(__dirname, '..') // Si estamos en dist, subimos un nivel
  : path.resolve(__dirname, '..'); // Ajusta según tu estructura

console.log(path.join(rootPath, 'src/lib'), path.join(rootPath, 'src/app'));

moduleAlias.addAliases({
  '@lib': isProduction
    ? path.join(rootPath, 'dist/lib')
    : path.join(rootPath, 'src/lib'),
  '@app': isProduction
    ? path.join(rootPath, 'dist/app')
    : path.join(rootPath, 'src/app'),
});
