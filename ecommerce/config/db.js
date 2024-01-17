import mongoose, { connect } from "mongoose";
import colors from 'colors'
const URL = `mongodb://127.0.0.1:27017/pro-ecom`;

const connect_db = async () => {
  await mongoose.connect(URL);
  console.log(`connected to database`.america);
};

export default connect_db;
