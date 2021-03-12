import mongoose from 'mongoose';

const { MONGODB_URI } = process.env

const connect = () => {
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }, () => {
    console.log('connected to database')
  })
}

export default connect