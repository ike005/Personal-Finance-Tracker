

const Home = () =>{
    return(
        <div className="h-[100vh] w-full px-10 pt-20 bg-[#fcfcfd]">

            <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-0">

                <div className="h-fit border-[1px] rounded-md border-gray-300 shadow-sm p-4 bg-[#FFFFFF] w-full lg:w-[48%]">
                    <h1 className="text-2xl font-semibold mb-6">Add / Update Expense</h1>

                    <form className="flex flex-col gap-4">
                        <label htmlFor="expenseName" className="flex flex-col">Name
                            <input id="expenseName" type="text" placeholder="Enter name" className="border-[1.2px] border-gray-300 rounded-sm p-2 text-sm" />
                        </label>

                        <label htmlFor="expenseAmount" className="flex flex-col">Amount
                            <input id="expenseAmount" type="number" placeholder="Enter amount" className="border-[1.2px] border-gray-300 rounded-sm p-2 text-sm" />
                        </label>

                        <label htmlFor="category" className="flex flex-col">Category
                            <select id="category" className="border-[1.2px] border-gray-300 rounded-sm p-2 text-sm">
                                <option value="">Select an option</option>
                                <option value="food">Food</option>
                                <option value="transport">Transport</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="housing">Housing</option>
                            </select>
                        </label>


                        <label htmlFor="date" className="flex flex-col">Date
                            <input id="date" type="date" className="border-[1.2px] border-gray-300 rounded-sm p-2 text-sm"/>
                        </label>


                        <div className="flex flex-row justify-between mt-4 gap-4">
                            <button className="text-lg bg-[#31a173] text-[#FFFFFF] rounded-sm py-2 px-4 w-full">Add Expense</button>
                            <button className="text-lg bg-[#3f87e7] text-[#FFFFFF] rounded-sm py-2 px-4 w-full">Update Expense</button>
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
                            <tr className="border border-black p-2 hover:bg-[#f7f8f9]">
                                <td className="text-start p-3">Food</td>
                                <td className="text-start p-3">100</td>
                                <td className="text-start p-3">Food</td>
                                <td className="text-start p-3">2021-09-01</td>
                                <td className="p-3">
                                    <button className="text-sm bg-red-600 text-[#FFFFFF] rounded-sm py-1 px-2 hover:cursor-pointer">Delete</button>
                                </td>
                            </tr>

                            <tr className="border border-black p-2 hover:bg-[#f7f8f9]">
                                <td className="text-start p-3">Transport</td>
                                <td className="text-start p-3">200</td>
                                <td className="text-start p-3">Transport</td>
                                <td className="text-start p-3">2021-09-02</td>
                                <td className="p-3">
                                    <button className="text-sm bg-red-600 text-[#FFFFFF] rounded-sm py-1 px-2 hover:cursor-pointer">Delete</button>
                                </td>
                            </tr>

                            <tr className="border border-black p-2 hover:bg-[#f7f8f9]">
                                <td className="text-start p-3">Entertainment</td>
                                <td className="text-start p-3">200</td>
                                <td className="text-start p-3">Transport</td>
                                <td className="text-start p-3">2021-09-02</td>
                                <td className="p-3">
                                    <button className="text-sm bg-red-600 text-[#FFFFFF] rounded-sm py-1 px-2 hover:cursor-pointer">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>


            </div>

        </div>
    )
}

export default Home