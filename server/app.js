import dotenv from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import cors from "cors"

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;
const MONGOURL = process.env.MONGO_URL;

app.use(express.json());
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
});

app.post('/expense', async(req, res) => {
    try{
        const expenseData = await model.create(req.body);
        res.json(expenseData);
    } catch(error){
        res.json(error);
    }
});

app.delete('/expense/:id', async (req, res) => {
    try {
        const deletedExpense = await model.findByIdAndDelete(req.params.id);
        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.json({ message: 'Expense deleted successfully', deletedExpense });
    } catch (error) {
        res.status(500).json(error);
    }
});

app.put('/expense/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedExpense = await model.findByIdAndUpdate(id, updatedData, { new: true }); // returns the updated document);
        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.json(updatedExpense);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



