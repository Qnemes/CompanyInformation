let info = JSON.parse(localStorage.getItem('company-info'));
let average = (info.summaryIncome/info.incomes.length).toFixed(2);
let ctx = document.getElementById('myChart').getContext('2d');

// sorting date of company incomes that passed from previous script by localStorage
info.incomes.sort(function(a, b) {
    return new Date(b.date)-new Date(a.date);
});
document.getElementById('title').innerHTML+= info.name;
document.getElementById('city').innerHTML+= info.city;
document.getElementById('income').innerHTML+= info.summaryIncome; 
document.getElementById('average').innerHTML+= average;

// console.log(info.incomes[0].value);
// dynamically pushing data to chart
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}
// creating chart.js bar chart
let myLineChart = new Chart(ctx, {
    type: 'bar',
    data: {
        datasets: [{
            label: 'Monthly incomes',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
        }]
    }
});
// getting rid of useless time and characters while showing graph
for (let i in info.incomes){
    info.incomes[i].date = info.incomes[i].date.slice(0,10)
    addData(myLineChart,info.incomes[i].date,info.incomes[i].value) 
}
var comparison =[];
for (let i in info.incomes){    
comparison.push(info.incomes[i].date.substr(0, 7));
}
var lastmonth = 0;
for (let i in comparison){
    if (comparison[0] === comparison[i]){        
        lastmonth+=parseFloat(info.incomes[i].value);
    }      
}
document.getElementById('lastmonth').innerHTML+= lastmonth.toFixed(2);