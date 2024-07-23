import mongoose from 'mongoose'



const connectDB = async () => {
    mongoose.set('strictQuery', true);

  
    try {

        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, 
          });
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully...')
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error.Please make sure MongoDB is running. ' + err);
            process.exit()
        })
    } catch (error) {
        console.log(error);

    }
};

export default connectDB;