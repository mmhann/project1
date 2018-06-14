import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();

const router = express.Router();

app.use(express.static(path.resolve('src')));


const hostname = '127.0.0.1';
const port = 3002;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// const serve = require('serve');
//
// const server = serve('src/', {
//   port: 3002
// })
