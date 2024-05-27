import express from 'express'
import leagueRoutes from './routes/leagueRoutes';
import { defaultErrorHandler } from './handlers/errors';

const app = express()

app.use(express.json())

app.use('/leagues', leagueRoutes)

app.use(defaultErrorHandler);

const { PORT } = process.env;

app.listen(PORT || 3000, () => {
    console.log(`Server running on port ${PORT}`);
})