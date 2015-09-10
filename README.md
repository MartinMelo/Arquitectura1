#Para correr la aplicacion desde cero hay que:

Instalar NodeJs.
Instalar MondogoDb.
Instalar Git.
Descargar/Clonar el proyecto.


## Una vez descargado habra que instalar las dependencias de la siguiente manera:

```
npm install bower -g
npm install grunt -g
npm install grunt-cli -g
npm install pm2 -g
npm install
bower install --allow-root
```


## Correr la app:

Si se desea correr en development mode sera necesario correr el siguiente comando:

```
node server.js
```
o si se desea correrlo en production mode sera necesario correr los siguientes comandos:
```
grunt build
node server.js --production
```

# FAQs:

### MongoDb:

Debe estar corriendo en el puerto 27017

