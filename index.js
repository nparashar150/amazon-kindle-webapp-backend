const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const { API_PORT } = process.env;
const port = process.env.PORT_JWT || API_PORT;
server.listen(port, () => {
    console.log(`Server Running on ${port}`);
});
