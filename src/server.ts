import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import indexRouter from './routes/indexRouter';
import PostsRoutes from './routes/PostsRoutes';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';

class Server {
    public app: express.Application;
    // router: Router();
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config(): void {
        const MONGO_URI = 'mongodb://localhost/mongo-db';
        mongoose.set('useFindAndModify', true);
        mongoose.connect(MONGO_URI || process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true
        }).then(db => console.log('DB is connected'));
        // Settings
        this.app.set('port', process.env.PORT || 3000);
        // Middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json()); // para entender el formato json antes este modulo era bodyParse
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(helmet());
        this.app.use(compression()); // para reducir el peso de las respuestas
        this.app.use(cors()); // para validar nuestro servidor que pueda conectarse a otros servidores
    }
    routes(): void {
        this.app.get('/helloworld', (req, res) => res.send('Hello world'));
        this.app.use(indexRouter);
    }
    start(): void {
        this.app.listen(this.app.get('port'), ()=> {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();