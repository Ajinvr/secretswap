import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import file from './routes/FileHandleRoute.js';
import connectDB from './Db/config/dbConnection.js';

dotenv.config();
const app = express();

connectDB()

const corsOptions = {
    origin: [process.env.FRONTEND_URL, 'http://localhost:5173'],
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'server is up and running' });
});

app.use('/file', file);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
