
const mongoose = require('mongoose');
const os = require('os');
const process = require('process');

const SECOND = 20000;
function countConnection() {
    return mongoose.connections.length;
}

function checkOverload() {
    setInterval(() => {
        const numConnections = countConnection();
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;

        const maxConnections = numCores * 5;
        console.log(`Overload detected. Number of connections: ${numConnections}. Number of cores: ${numCores}. Memory usage: ${memoryUsage} MB`);

        if (numConnections > maxConnections) {
            console.log(`Overload detected. Number of connections: ${numConnections}. Number of cores: ${numCores}. Memory usage: ${memoryUsage} MB`);
        }
    }, SECOND);
}

module.exports = { checkOverload };