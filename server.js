import app from './src/app.js';
import swaggerDocs from './swagger.js'

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
    swaggerDocs(app, PORT)
})


process.on('SIGINT', () => {
    console.log('Server shutting down');
    
    server.close(() => {
        console.log('Server shut down');
    });
});
