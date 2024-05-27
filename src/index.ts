import express from 'express'
import leagueRoutes from './routes/leagueRoutes';

const app = express()

app.use(express.json())

app.use('/leagues', leagueRoutes)

const { PORT } = process.env;

app.listen(PORT || 3000, () => {
    console.log(`Server running on port ${PORT}`);
})