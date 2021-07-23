let easyRank = [];
let normalRank = [];
let hardRank = [];
let userName = "";
let cards = 6;


function loadGame(){


    $.ajax({
        url:"../data/animal.json"
    })
    .done(function(response){
        // const random = Math.floor(Math.random()*100000);
        $("#main").append(`<ul class="cardList"></ul>`);
        let level = $("#selectGame").find("option:selected").val();
        if (level == 1){
            cards = 3;
            $(".cardList").css("width","450px");
        }
        else if (level == 2){
            cards = 6;
            $(".cardList").css("width","600px");
        }
        else if (level == 3){
            cards = 12;
            $(".cardList").css("width","1200px");
        }
        const cardList = response.card;
        const path = response.path;
        let time = 0;
        // const timeId = setInterval(function(){
        //     time++;
        // },1000);
        let startDate = new Date();

        $.each(cardList,function(i,item){
            if(i+1 > cards){
                return;
            }
            $(".cardList").append(`
            <li data-id="${i}">
                <div class="front">
                    <div class="img">
                        <img src="../images/${item.img}" alt="">
                    </div>
                    <div class="title">
                        ${item.title}
                    </div>
                </div>
                <div class="back">

                </div>
            </li>
            `);
            $(".cardList").append(`
            <li data-id="${i}">
                <div class="front">
                    <div class="img">
                        <img src="../images/${item.img}" alt="">
                    </div>
                    <div class="title">
                        ${item.title}
                    </div>
                </div>
                <div class="back">

                </div>
            </li>
            `);
        });
        gsap.from("#main li", {scale:0, ease: "circ.out", stagger:0.01, duration:1.5});
        const total = $("#main .cardList li").length;
        // console.log("🚀 ~ file: main.js ~ line 41 ~ .done ~ total", total);
        for(let i=0; i<100; i++){
            $("#main .cardList").append($("#main .cardList li").eq(Math.floor(Math.random()*total)));
        }
        let selectedId = [];
        let count = 0;
        let score = 0;
        $("#main .cardList li").on("click", function(){
            if(count < 2){
                if(count == 1 && selectedId[0].index() == $(this).index()){
                    return;
                }
                $(this).find(".back").hide();
                const idx = $(this).data("id");
                selectedId.push($(this));
                count++;
                if(count == 2){
                    if(selectedId[0].data("id")===selectedId[1].data("id")){
                        selectedId[0].find(".back").remove();
                        selectedId[1].find(".back").remove();
                        selectedId[0].off();
                        selectedId[1].off();
                        count = 0;
                        selectedId = [];
                        score++;
                        if(score >= total/2){
                            $("#gameover").show();
                            // clearInterval(timeId);
                            let endDate = new Date();
                            let elasedTime = endDate.getTime() - startDate.getTime();
                            let sec = Math.floor(elasedTime/1000)%60;
                            let min = Math.floor(elasedTime/1000/60)%60;
                            let hour = Math.floor(elasedTime/1000/60/60)%24;

                            $(".lastScore").text(addZero(hour)+":"+addZero(min)+":"+addZero(sec));
                            let timeText = addZero(hour)+":"+addZero(min)+":"+addZero(sec);
                            //savedata
                            if (level == 1){
                                easyRank = saveData("easyRank",easyRank, elasedTime, timeText);
                                viewRank(easyRank);
                                console.log(easyRank);
                            }else if (level == 2){
                                normalRank = saveData("normalRank",normalRank, elasedTime, timeText);
                                viewRank(normalRank);
                            }else if (level == 3){
                                hardRank = saveData("hardRank",hardRank, elasedTime, timeText);
                                viewRank(hardRank);
                            }
                            
                        }
                    }else {
                        setTimeout(function(){
                            $("#main .cardList li .back").show();
                            count = 0;
                            selectedId=[];
                        },1000);
                    }
                }
            }
        });
    });
}
function addZero(num){
    let temp;
    if(num < 10){
        temp = "0"+num;
    }else{
        temp = num;
    }
    return temp;
}

function isName(value) {
    for (let i = 0; i<value.length; i++){
        if(value[i] != " "){
            return false
        }
    }
    return true
} 

function saveData(stringRank, rank, elasedTime, timeText){
    if(localStorage.getItem(stringRank)==null){
        localStorage.setItem(stringRank,JSON.stringify(rank));
    }else {
        rank = JSON.parse(localStorage.getItem(stringRank));
    }
    rank.push({
        user: userName,
        time: elasedTime,
        timeText: timeText
    });

    localStorage.setItem(stringRank,JSON.stringify(rank));
    return rank;
    
}

function viewRank(rank){
    console.log(rank);
    $(".rankList").html("");
    rank = rank.sort(function(a,b){
        return a.time-b.time;
    });
    for(let i=0; i<rank.length; i++){
        $(".rankList").append(`<li>${rank[i].user} : ${rank[i].timeText}</li>`);
    }
}

$(".btnStart").on("click",function(){
    userName = $("#userName").val();
    if(isName(userName)) {
        alert("이름을 입력하세요.");
        return;
    }
    
    $("#startGame").hide();
    // console.log(level);
    loadGame();
});

$(".btnRestart").on("click",function(){
    $("#gameover").hide();
    $("#main").html("");
    loadGame();
});

// loadGame();

// let arr = [5,2,3,5,9,4,7,0];
// let arr02 = arr.sort(function(a,b){
//     return a-b;
// });
// console.log(arr02);