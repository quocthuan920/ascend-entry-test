
import mongoose from 'mongoose';

const connectString = 'mongodb+srv://cogino920:Lipt64WF88OYWNde@coginofree.29jxwow.mongodb.net/kimochi?retryWrites=true&w=majority&appName=CoginoFree';

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect(connectString, { maxPoolSize: 5 })
            .then(() => {
                console.log('Database connection successful');
            })
            .catch(err => {
                console.error('Database connection error');
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