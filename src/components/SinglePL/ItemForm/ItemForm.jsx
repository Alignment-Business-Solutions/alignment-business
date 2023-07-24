


function ItemForm({categories}) {

    return (
        <form>
            <fieldset>
                <legend>Add Transaction</legend>

                <label htmlFor="inputOne">Date</label>
                <input 
                    name="inputOne"
                    type="date"
                />

                <lable htmlFor="inputTwo">Payee</lable>
                <input
                    name="inputTwo"
                    type="text"
                />

                <lable htmlFor="inputThree-select">Category</lable>
                <select htmlFor="inputThree">
                    <option></option>
                    {categories.map(cat => (
                        <option value={cat.id+1}>{cat.category}</option>
                    ))}
                </select>

                <lable htmlFor="inputFour">Amount</lable>
                <input
                    name="inputFour"
                    type="text"
                />
        
                <lable htmlFor="inputFive">Paid?</lable>
                <input
                    name="inputFive"
                    type="checkbox"
                />

                <button type="submit">Add</button>

            </fieldset>
        </form>
    );




}

export default ItemForm;




