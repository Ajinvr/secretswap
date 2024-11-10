import express from 'express';
import dotenv from 'dotenv';
import file from './routes/FileHandleRoute.js'
dotenv.config();
const app = express();

app.use(express.json());


app.get('/', (req, res) => {
    res.json({ message: 'server is up' });
  });


  app.use('/file', file)



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
