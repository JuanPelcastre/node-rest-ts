npm init --yes
npm i -g typescript
para comprobar escribimos tsc
tsc --init
y esto crea tsconfig.json
cambiamos el target de tsconfig.json
target: es5 x es6 debido a que vamos a usar asyc y await

npi express mongoose morgan hemet cors
helmet seguridad automatizada(modulo de seguriad)
cors 
compression

creamos src/ y dentro server.ts

npm i @types/node @types/mongoose @types/express nodemon typescript -D

en src/server.ts
import express from 'express';
class Server {
    constructor() {}
    config() {}
    start() {}
}
import express from 'express';
class Server {
    public app express.Aplication;
    constructor() {
        this.app = express();
        this.config();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
    }
    start() {
        this.app.listen(this.app.get('port'), ()=> {
            console.log('Server on port', this.app.get('port'));
        }))
    }
}
const server = new Server();
server.start();

desde terminal
>> tsc + ENTER

y vemos que no hace nada porque necesitamos descomentar outDir del tsconfig.json 
"outDir": "./build"
>> tsc + ENTER

para ejecutar ahora 
node build/server.js

import express from 'express';
+import morgan from 'morgan'; 
class Server {
    public app: express.Aplication;
    constructor() {
        this.app = express();
        this.config();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        +this.app.use(morgan('dev'));
    }
    routes() {

    }
    start() {
        this.app.listen(this.app.get('port'), ()=> {
            console.log('Server on port', this.app.get('port'));
        }))
    }
}
npm i @types/morgan

ahora en el package.json
"scripts": {
    "ts": "tsc -w"
}
Lo probamos con
>> npm run ts

checamos importando helmet en server.ts
import helmet from 'helmet'
>> npm i @types/helmet -D

y ahora en 
config() {
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(morgan('dev'));
    +this.app.use(helmet());
}
ahora vemos que si hay un cambio se autocompila debido a la -w de "ts": "tsc -w"

entonces agregamos otro comando en scripts
"scripts": {
    "ts": "tsc -w",
    "dev": "nodemon ./build/server.js"
}
nodemon vigila la carpeta build y "tsc -w" la carpeta src

con esto vamos a ejecutarlo en otra terminal
```terminal
npm run dev
```

"scripts": {
    "ts": "tsc -w",
    "dev": "nodemon ./build/server.js",
    "start": "tsc && node ./build/server.js"
}
el comando start solo se ejecuta en produccion y este solo compila y ejecuta ya no vigila por cambios
+++++++++++++++
constructor() {
    this.app = express();
    this.config();
    this.routes();
}
y tambien en 
routes() {
    this.app.get('/', (req, res) => res.send('Hello'));        
}
probamos y ya funciona

ok ahora separamos las routes
creamos en src la carpeta routes/
y dentro el archivo indexRoutes.ts

y dentro de indexRouter.ts
import {Request, Response, Router} from 'express';
class IndexRoutes {
    router: Router();
    constructor() {
        this.router = Router();
    }
    routes() {
        this.router.get('/', (req, res) => res.send('Hello'));
    }
}
const indexRoutes = new IndexRoutes();
indexRoutes.routes();

constructor() {
    this.router = Router();
    this.routes();
}

y al final de la clase
export default indexRouter.router;

y en el server.ts
import indexRoutes from './routes/indexRoutes';
routes() {
    this.app.use(indexRoutes)
}

y tambien importamos mongoose
import mongoose from 'mongoose';

config() {
    const MONGO_URI = 'mongodb://localhost/rest-db';
    mongoose.set('useFindAndModify', true);
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
    // Settings
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(morgan('dev'));
    +this.app.use(helmet());
}

config() {
    const MONGO_URI = 'mongodb://localhost/rest-db';
    mongoose.set('useFindAndModify', true);
    +mongoose.connect(MONGO_URI || process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
        .then(db => console.log('DB is connected'));
    // Settings
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(morgan('dev'));
    +this.app.use(helmet());
}
y lo vemos en consola

y ahora importamos en el server 
import compression from 'compression';
import cors from 'cors';

config() {
    const MONGO_URI = 'mongodb://localhost/rest-db';
    mongoose.set('useFindAndModify', true);
    +mongoose.connect(MONGO_URI, || process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
        .then(db => console.log('DB is connected'));
    // Settings
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(morgan('dev'));
    +this.app.use(express.json()); // para entender el formato json
    antes este modulo era bodyParse
    +this.app.use(express.urlencoded({extended: false}));
    this.app.use(helmet());
    +this.app.use(compression()); // para reducir el peso de las respuestas
    +this.app.use(cors()); // para validar nuestro servidor que pueda conectarse a otros servidores
}
y vemos que tambien necesitamos los types de compression y cors
asi que los instalamos

minuto 44
https://www.youtube.com/watch?v=Ot2LiEzR9Vo
Typescript REST API con Nodejs, Mongodb y Async / await


creamos un archivo dentro de routes PostsRoutes.ts


