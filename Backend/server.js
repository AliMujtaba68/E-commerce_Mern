import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';


// App config
const app = express();
const port = process.env.PORT || 4000;


// middleware
app.use(express.json());
app.use(cors());


// api endpoints

app.get('/', (req, res) => {
    res.status(200).send('Hallllloooooo');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
