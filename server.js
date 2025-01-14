import app from './src/app.js';

const PORT = 3000;

const server = app.listen(process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT);
})


process.on('SIGINT', () => {
    console.log('Server shutting down');
    
    server.close(() => {
        console.log('Server shut down');
    });
});
