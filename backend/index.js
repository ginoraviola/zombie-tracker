import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import zombieRoutes from './routes/index.js';
import {hydrateDatabase} from "./database.js";


const app = express();
app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}));

hydrateDatabase();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.get('/', (req, res) => {
    res.status(200).send('API is working properly');
});

app.use('/', zombieRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
