
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()
const connectString = process.env.MONGO_URI;
class Database {
    constructor() {
        this.connect();
    }

    connect() {
        console.log('Connecting to database...: ', connectString);
        mongoose.connect(connectString, { maxPoolSize: 5 })
            .then(() => {
                console.log('Database connection successful');
            })
            .catch(err => {
                console.error('Database connection error:', err.message);
            });
    }    

    static getInstance() {
        if (!this.instance) {
            this.instance = new Database();
        }
        return this.instance;
    }
}

const dbInstance = Database.getInstance();
export default dbInstance;