import {useEffect, useState} from "react";


const Home = () =>{
    const [expense, setExpense] = useState<any>([]);
    const [form, setForm] = useState<any>({name: "", amount: "", category: "", date: ""});
    const [updateForm, setUpdateForm] = useState({name: "", amount: "", category: "", date: "",});
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleFetch = async () => {
        const response = await fetch("http://localhost:8000/expense");
        const data = await response.json();
        setExpense(data);
    };

    useEffect(() => {
        handleFetch();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdateChange = (e) => {
        setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
    };


    const handleAdd = async (e: React.FormEvent) =>{
        e.preventDefault();
        await fetch("http://localhost:8000/expense", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
            }
        );
        setForm({ name: "", amount: "", category: "", date: "" });
        handleFetch();
    }

    const handleDelete = async (id: string) => {
        try {
            await fetch(`http://localhost:8000/expense/${id}`, {
                method: 'DELETE',
            });
            handleFetch();
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingId) return;

        try {
            await fetch(`http://localhost:8000/expense/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateForm),
            });
            setEditingId(null);
            setUpdateForm({ name: '', amount: '', category: '', date: '' });
            handleFetch();
        } catch (error) {
            console.error('Error updating expense:', error);
        }
    };



    return(
        <div className="h-[100vh] w-full px-10 pt-20 bg-[#fcfcfd]">

            <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-0">

                <div className="h-fit border-[1px] rounded-md border-gray-300 shadow-sm p-4 bg-[#FFFFFF] w-full lg:w-[48%]">
                    <h1 className="text-2xl font-semibold mb-6">Add Expense</h1>

                    <form className="flex flex-col gap-4" onSubmit={handleAdd}>
                        <label htmlFor="expenseName" className="flex flex-col">Name
                            <input name="name" value={form.name} onChange={handleChange} id="expenseName" type="text" placeholder="Enter name" required className="border-[1.2px] border-gray-300 rounded-sm p-2 text-sm" />
                        </label>

                        <label htmlFor="expenseAmount" className="flex flex-col">Amount
                            <input name="amount" value={form.amount} onChange={handleChange} id="expenseAmount" type="number" placeholder="Enter amount" required className="border-[1.2px] border-gray-300 rounded-sm p-2 text-sm" />
                        </label>

                        <label htmlFor="category" className="flex flex-col">Category
                            <select name="category" value={form.category} onChange={handleChange} id="category" required className="border-[1.2px] border-gray-300 rounded-sm p-2 text-sm">
                                <option value="">Select an option</option>
                                <option value="food">Food</option>
                                <option value="transport">Transport</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="housing">Housing</option>
                            </select>
                        </label>

                        <label htmlFor="date" className="flex flex-col">Date
                            <input name="date" value={form.date} onChange={handleChange} id="date" type="date" required className="border-[1.2px] border-gray-300 rounded-sm p-2 text-sm"/>
                        </label>


                        <div className="flex flex-row justify-between mt-4 gap-4">
                            <button type="submit" className="text-lg bg-[#31a173] text-[#FFFFFF] rounded-sm py-2 px-4 w-full cursor-pointer">Add Expense</button>
                        </div>
                    </form>
                </div>

                <div className="h-fit border-[1px] rounded-md border-gray-300 shadow-sm p-4 bg-[#FFFFFF] w-full lg:w-[48%]">
                    <h1 className="text-2xl font-semibold mb-6">Expenses Table</h1>

                    <table className="border-collapse w-[100%]">
                        <thead className="bg-[#f7f8f9] border-[1px] border-gray-300">
                            <tr className="">
                                <th className="text-start p-3">Name</th>
                                <th className="text-start p-3">Amount</th>
                                <th className="text-start p-3">Category</th>
                                <th className="text-start p-3">Date</th>
                                <th className="text-start p-3">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {expense.map(exp => (
                                <tr key={exp._id} className="border border-black p-2 hover:bg-[#f7f8f9]">
                                    <td className="text-start p-3">{exp.name}</td>
                                    <td className="text-start p-3">{exp.amount}</td>
                                    <td className="text-start p-3">{exp.category}</td>
                                    <td className="text-start p-3">{exp.date}</td>
                                    <td className="p-3 flex flex-row gap-2">
                                        <button onClick={() => handleDelete(exp._id)} className="text-sm bg-red-600 text-[#FFFFFF] rounded-sm py-1 px-2 hover:cursor-pointer">Delete</button>
                                        <button onClick={() => {setEditingId(exp._id);
                                            setUpdateForm({
                                                name: exp.name,
                                                amount: exp.amount,
                                                category: exp.category,
                                                date: exp.date,
                                            });
                                        }} className="text-sm bg-[#3f87e7] text-[#FFFFFF] rounded-sm py-1 px-2 hover:cursor-pointer">Update</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {editingId && (
                <div className="h-fit border-[1px] rounded-md border-gray-300 shadow-sm p-4 bg-[#FFFFFF] w-full lg:w-[48%] mt-6">
                    <h1 className="text-2xl font-semibold mb-6">Update Expense</h1>
                    <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
                        <label htmlFor="expenseName" className="flex flex-col">Name
                            <input name="name" value={updateForm.name} onChange={handleUpdateChange} id="expenseName" type="text" placeholder="Enter name" required className="border-[1.2px] border-gray-300 rounded-sm p-2 text-sm" />
                        </label>

                        <label htmlFor="expenseAmount" className="flex flex-col">Amount
                            <input name="amount" value={updateForm.amount} onChange={handleUpdateChange} id="expenseAmount" type="number" placeholder="Enter amount" required className="border-[1.2px] border-gray-300 rounded-sm p-2 text-sm" />
                        </label>

                        <label htmlFor="category" className="flex flex-col">Category
                            <select name="category" value={updateForm.category} onChange={handleUpdateChange} id="category" required className="border-[1.2px] border-gray-300 rounded-sm p-2 text-sm">
                                <option value="">Select an option</option>
                                <option value="food">Food</option>
                                <option value="transport">Transport</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="housing">Housing</option>
                            </select>
                        </label>

                        <label htmlFor="date" className="flex flex-col">Date
                            <input name="date" value={updateForm.date} onChange={handleUpdateChange} id="date" type="date" required className="border-[1.2px] border-gray-300 rounded-sm p-2 text-sm"/>
                        </label>

                        <button type="submit" className="text-lg bg-[#3f87e7] text-white rounded-sm py-2 px-4 w-full cursor-pointer">
                            Update Expense
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Home;