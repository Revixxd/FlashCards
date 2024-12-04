import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import registerRoute from './routes/registerRoute.js';
import loginRoute from './routes/loginRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/register', registerRoute);
app.use('/login', loginRoute);

app.use(express.static(path.join(__dirname, '/public')));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});