import express from 'express'
import process from 'process';

const app = express()

const { PORT } = process.env;

app.listen(PORT || 3000, () => {
    console.log(`Server running on port ${PORT}`);
})