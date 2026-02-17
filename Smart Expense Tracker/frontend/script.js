let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let chart;


/* RENDER LIST */
function renderList(){
    let list = document.getElementById("list");
    list.innerHTML = "";

    let total = 0;

    expenses.forEach((item,index)=>{
        total += item.amount;

        let li = document.createElement("li");

        li.innerHTML = `
            ${item.title} - ₹${item.amount}
            <span class="tag ${item.category}">${item.category}</span>
            <button class="delete" onclick="deleteExpense(${index})">X</button>
        `;

        list.appendChild(li);
    });

    document.getElementById("total").innerText = total;

    updateChart();
}


/* ADD EXPENSE */
function addExpense(){
    let title = document.getElementById("title").value;
    let amount = Number(document.getElementById("amount").value);
    let category = document.getElementById("category").value;

    if(title === "" || amount <= 0){
        alert("Enter valid data");
        return;
    }

    expenses.push({title, amount, category});
    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("title").value="";
    document.getElementById("amount").value="";

    renderList();
}


/* DELETE */
function deleteExpense(index){
    expenses.splice(index,1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderList();
}


/* CHART */
function updateChart(){

    let categoryTotals = {
        Food:0,
        Travel:0,
        Shopping:0,
        Bills:0,
        Other:0
    };

    expenses.forEach(e=>{
        categoryTotals[e.category]+= e.amount;
    });

    let data = Object.values(categoryTotals);

    if(chart){
        chart.destroy();
    }

    chart = new Chart(document.getElementById("chart"),{
        type:"pie",
        data:{
            labels:Object.keys(categoryTotals),
            datasets:[{
                data:data
            }]
        }
    });
}


renderList();
