# Rest Server

Este proyecto se basa en la elaboracion de un servidor web del tipo "Rest". Este está pensado como un sistema en el que se puede realizar: registro de usuarios, autenticación de usuarios usando Google Sign In, "CRUD" de productos, categorias y usuarios, todo usando una base de datos no relacional de Mongo. 

## Tabla de Contenido
1. [Resumen](#rest-server)
2. [Configuraciones previas](#configuraciones-previas)
3. [Instalación y pruebas](#instalación-y-pruebas)


## Configuraciones previas
Para probar este proyecto, usted debe tener las siguientes consideraciones:

-   [Configurar las variables de ambiente](#configurar-variables-de-ambiente)
-   [Link Access Credential - Mongo DB](#mongo-link-credential)

### Configurar Variables de Ambiente    
En el repositorio, usted cuenta con el archivo **.env-example**. Este fichero contiene el nombre de las variables de ambiente que son usadas en los diferentes módulos.

Usted deberá renombrar este fichero **.env-example** con el nombre **.env** y luego llenar las variables de entorno con sus respectivos valores.

```
PORT=<-Port-Yor-Preference->

MONGODB_CNN=<your-direction-cluster-MongoDB>
SECRETORPRIVATEKEY=<whatever-string-key-that-you-want->

GOOGLE_CLIENT_ID=<your-clientID-google-app->
GOOGLE_SECRET_ID=<your-secretID-google-app->

```

Nota: La variable `SECRETORPRIVATEKEY` contiene el password con el que se realizan las firmas del payload en el uso del JWT (Json Web Token).

### Mongo Link Credential
Para este proyecto, se realizó usando el cluster de Mongo Atlas. En él, usted debe obtener el link secreto que le permite conectarse a su cluster para establecer conexiones a su base de datos. 

Debe registrarse en [Mongo Altas](https://www.mongodb.com/es/atlas/database), obtener una cuenta gratuita y proceder a obtener las credenciales necesarias.

## Instalación y pruebas
Una vez configurado el ahora archivo `.env` con los valores correspondientes, se procede a la instalación de las dependencias mostradas en el **package.json**.

```
npm install
```

Corra la pruebas ejecutando:

```
node app.js
```
