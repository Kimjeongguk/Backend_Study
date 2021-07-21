
showCorona(getToday());
$("#datePicker").datepicker({
    dateFormat: "yymmdd",
    onSelect: function(){
        console.log($(this).val());
        showCorona($(this).val());
    }
});

let myChart = null;
let ctx = null;

function showCorona(day){
    
    $.ajax({
        url:"corona.php",
        type: "GET",
        data: {
            selectedDate: day
        }
    })
    .done(function(response){
        //console.log("🚀 ~ file: main.js ~ line 5 ~ .done ~ response", response)
        const result =  JSON.parse(response);
        const itemArray = result.response.body.items.item;
        //console.log("🚀 ~ file: main.js ~ line 7 ~ .done ~ result", result)
        const cityArray = [];
        const dataArray = [];
        $.each(itemArray,function(i,item){
            //console.log(item.gubun+"==="+item.defCnt);//누적
            //console.log(item.gubun+"==="+item.incDec);//일일 발생자
            cityArray.push(item.gubun);
            dataArray.push(item.incDec);
        });
        if (myChart != null){
            myChart.destroy();
        } 
        ctx = $("#coronaChart");
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: cityArray,
                datasets: [{
                    label: "corona",
                    data: dataArray,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                        

                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                // responsive:false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
}

function getToday(){
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}