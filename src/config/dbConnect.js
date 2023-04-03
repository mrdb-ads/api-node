import mongoose from "mongoose";
import data from "./data";

mongoose.connect(data);

let db = mongoose.connection;

export default db;