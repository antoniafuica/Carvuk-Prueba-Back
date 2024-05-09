import express from 'express';
import router from './routes';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:3001'  
}));

app.use(express.json());
app.use(morgan('dev'));

app.use(router);

export default app;