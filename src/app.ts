/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// parsers

app.use(express.json());
// app.use(cors());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
// application routes

app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', test);

app.use(globalErrorHandler);
app.use(notFound);
export default app;
