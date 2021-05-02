import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

const locations = [
    {
        key: 'school-key',
        label: 'School',
        zombies: ['zs1','zs2','zs3','zs4','zs5','zs6']
    },
    {
        key: 'warehouse-key',
        label: 'Warehouse',
        zombies: ['zw1','zw2','zw3','zw4']
    },
    {
        key: 'hospital-key',
        label: 'Hospital',
        zombies: ['zs1','zs2','zs3','zs4']
    },
]

app.get('/', (req, res, next) => {
    res.status(200).send('Nice man!')
});

app.get('/locations', (req, res, next) => {
    res.status(200).json(locations);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
