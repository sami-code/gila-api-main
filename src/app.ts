import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';

const app = express();
const port = 3001;

app.use(morgan('tiny'));
app.use(cors('*'));
app.use(express.json());
app.use(routes);
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

export default app;
