const __dirname = new URL('.', import.meta.url).pathname;

import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

const server = http.createServer((_, res) => {
    const filePath = path.join(__dirname, 'index.html');

    // Read the file and send it as the response
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.end('Internal Server Error');
        } else {
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        }
    });
});

const port: number = 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});