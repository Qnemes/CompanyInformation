$(document).ready(function() {  
const responses = [];

for (let i = 1; i <= 300; i++) {
  //I should use company id instead of i, but it was too late when I just realised it
  responses.push(fetch(`https://recruitment.hal.skygate.io/incomes/${i}`).then(response => {    
    if (response.ok) return response.json();
    throw new Error(response.statusText);
}));
}
Promise.all(responses)
    .then(data => {   
      //array for easy future data manipulating
        mergedArr = [];
        summaryArr = [];        
        // accumulating and creating new object property that contains sum of company incomes 
        summaryArr = data.map(item => ({   
          ...item,  
          summaryIncome: item.incomes.reduce((acc,income) => 
            acc+= +(income.value), 0).toFixed(2)      
        }));          
        return fetch("https://recruitment.hal.skygate.io/companies") 
    .then(response => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
    });
  })
    .then(data => {       
      // merging main data with summaryIncome property
        for (let i in data){
        mergedArr.push({...data[i],...summaryArr[i]})  
        }
        // creating table with descending order by 3 cell (total income)
        let table = $('#example').DataTable({
            select: true,
            order: [3,'desc'],
            data: mergedArr,
            columns: [
                { data: 'id' },
                { data: 'name' },
                { data: 'city' },
                { data: 'summaryIncome'}
          ]
        });  
        //redirecting to another html page by selecting row and passing all data from the row
        table.on('select', function (e, dt, type, indexes) {
            let data = table.rows( indexes ).data().pluck( 'id','name');
            let objectString = JSON.stringify(mergedArr[data[0]-1]);  
            localStorage.setItem('company-info', objectString);  
            window.open('/info.html');             
        });
        //showing table headers only when data fully get
        $("div#extraControls").removeClass("hidden");      
})
    //standard error handler
    .catch(error => {
        console.log("Error" + error);       
});
});