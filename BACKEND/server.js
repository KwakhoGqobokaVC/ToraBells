const http = require('https');
const app = require('./app');
const fs = require('fs');

const port = 3000

const options = {
        key: fs.readFileSync('keys/privatekey.pem'),
        cert: fs.readFileSync('keys/certificate.pem')
    }

    const httpserver = http.createServer((req, res) =>{
        const httpUrl = 'https://${req.headers.host}${req.url}'
        res.writeHead(301, {Location: httpUrl})
        res.end()
    })

    const server = http.createServer(options, app)
    httpserver.listen(30, () => {
        console.log('Http started on server 30... Redirecting')
    })

    server.listen(port, () => {
        console.log('Server started on port #' + port)
    })

