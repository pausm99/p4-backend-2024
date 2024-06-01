import cors from 'cors';
import express from 'express';

import { defaultErrorHandler } from './handlers/errors';
import routes from './routes/index';

const app = express()

const corsOptions = {
    allowedHeaders: ['Authorization', 'Content-Type'],
  };

app.use(cors(corsOptions))
app.use(express.json())

app.use('/', routes)

app.use(defaultErrorHandler);

const { PORT } = process.env;
app.listen(PORT || 3000, () => {
    console.log(`Server running on port ${PORT}`);
})