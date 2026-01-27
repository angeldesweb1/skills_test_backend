import 'reflect-metadata';
import moduleAlias from 'module-alias';
import path from 'node:path';

const isProduction =
  process.env.NODE_ENV === 'production' || __dirname.includes('dist');

const rootPath = isProduction
  ? path.resolve(__dirname, '..')
  : path.resolve(__dirname, '..');

console.log({ rootPath });

console.log(path.join(rootPath, 'src/lib'), path.join(rootPath, 'src/app'));

moduleAlias.addAliases({
  '@lib': isProduction
    ? path.join(rootPath, 'dist/lib')
    : path.join(rootPath, 'src/lib'),
  '@app': isProduction
    ? path.join(rootPath, 'dist/app')
    : path.join(rootPath, 'src/app'),
});
