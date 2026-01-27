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
