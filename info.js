let info = JSON.parse(localStorage.getItem('company-info'));
let average = (info.summaryIncome/info.incomes.length).toFixed(2);
let ctx = document.getElementById('myChart').getContext('2d');

// sorting date of company incomes that passed from previous script by localStorage
info.incomes.sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
});

document.getElementById('title').innerHTML+= info.name;
document.getElementById('city').innerHTML+= info.city;
document.getElementById('income').innerHTML+= info.summaryIncome; 
document.getElementById('average').innerHTML+= average;


// manipulating date with moment.js and lodash.js
const filteredDate = item => moment(item.date, 'YYYY-MM-DD').format('YYYY-MMM');
let result = _.groupBy(info.incomes, filteredDate);

// with grouped values by month I reducing them into one cumulative value
for (let [key, value] of Object.entries(result)) {   
    result[key] = result[key].reduce((a, b) => ({
        value: +a.value + +b.value
    }));  
}
// converting string values to a number
Object.keys(result).forEach(function(key) {
    if (typeof result[key].value !== 'number'){
        result[key].value = +result[key].value;
    }  
});

// dynamically pushing data to the chart
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

// visual changes in the bar chart
for (let i in result){ 
    console.log(typeof result[i].value);
    addData(myLineChart, i, result[i].value.toFixed(2)) 
}
var comparison =[];
for (let i in info.incomes){    
comparison.push(info.incomes[i].date.substr(0, 7));
}
var lastmonth = 0;
for (let i in comparison){
    if (comparison[0] === comparison[i]){        
        lastmonth+=+(info.incomes[i].value);
    }      
}
document.getElementById('lastmonth').innerHTML+= lastmonth.toFixed(2);