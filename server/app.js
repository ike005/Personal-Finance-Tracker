import dotenv from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import cors from "cors"

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;
const MONGOURL = process.env.MONGO_URL;

app.use(cors());

mongoose.connect(MONGOURL).then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => { console.log(error)});

const schema = new mongoose.Schema({
    name: String,
    amount: Number,
    category: String,
    date: String,
});

const model = mongoose.model("expense", schema, "expense");


app.get('/expense', async(req, res) => {
    try{
        const expenseData = await model.find();
        res.json(expenseData);
    } catch(error){
        res.json(error);
    }
})

app.post('/expense', async(req, res) => {
    try{
        const expenseData = await model.create(req.body);
        res.json(expenseData);
    } catch(error){
        res.json(error);
    }
})

// app.get('/expense', async(req, res) => {
//     try {
//         const expenseData = await model.find();
//         console.log("DATA RETURNED FROM MONGO:", JSON.stringify(expenseData, null, 2));
//         res.json(expenseData);
//     } catch(error){
//         console.log(error);
//         res.json(error);
//     }
// });


