import express from "express";
import dotenv from "dotenv";
import colors from "colors"; 
import cors from 'cors'
import authRoutes from "./routes/authRoute.js";
import morgan from "morgan";
import connect_db from "./config/db.js";
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js';


const server = express();

//dotenv config
dotenv.config();

//database connection
connect_db();

//middleware
//cors 
server.use(cors())
server.use(morgan("dev")); //morgan is used to see the port number where the api is hit and which route we are using

//r auth route paths
server.use(express.json());
server.use("/api/v1", authRoutes);
server.use('/api/v1',categoryRoutes);
server.use('/api/v1',productRoutes);




const PORT = process.env.PORT || 5500;
const MSG = `server is running at port https://localhost:${PORT}`;

server.listen(PORT, () => console.log(MSG.bgRed));
