let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function renderList(){
    let list = document.getElementById("list");
    list.innerHTML = "";

    let total = 0;

    expenses.forEach((item,index)=>{
        total += item.amount;

        let li = document.createElement("li");
        li.innerHTML = `
            ${item.title} - ₹${item.amount}
            <button class="delete" onclick="deleteExpense(${index})">X</button>
        `;

        list.appendChild(li);
    });

    document.getElementById("total").innerText = total;
}

function addExpense(){
    let title = document.getElementById("title").value;
    let amount = Number(document.getElementById("amount").value);

    if(title === "" || amount <= 0){
        alert("Enter valid data");
        return;
    }

    expenses.push({title, amount});
    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("title").value="";
    document.getElementById("amount").value="";

    renderList();
}

function deleteExpense(index){
    expenses.splice(index,1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderList();
}

/* Load saved data on page load */
renderList();
