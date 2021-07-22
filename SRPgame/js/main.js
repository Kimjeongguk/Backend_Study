const computerItems = $("#computer li");
const userItems = $("#user li");
const result = $("#result ul");
const lastScore = $(".lastScore");
const btn = $(".btnRestart");
let comSell = 0;
let userSell = 0;
let item = null;
let check = true;
const intervel = 20;
let count = 0;
let computerScore = 0
let userScore = 0
rolling();
btn.click(function(){
    computerScore = 0;
    userScore = 0;
    count = 0;
    check = true;
    rolling();
    result.html("");
    $("#gameover").hide();
});
userItems.on("click", function(){
    if(count < 3){   
        if (check){
            check = false;
            clearInterval(item);
            setTimeout(function(){
                count++;
                if (count == 3){
                    $("#gameover").show();
                    check = false;
                    clearInterval(item);
                    if (computerScore > userScore){
                        lastScore.text("패배~");
                    }
                    else if (computerScore < userScore){
                        lastScore.text("승리~");
                    }
                    else {
                        lastScore.text("비김");
                    }
                    return;
                }
                console.log("1초뒤 재경기");
                check = true;
                rolling();
            },1000);
            rule();
            const userSell = $(this).index();
            clearInterval(item);
            
        }
    }
});

function rolling(){
    item = setInterval(function(){
        comSell = Math.floor(Math.random()*3);
        computerItems.hide();
        computerItems.eq(comSell).show();
    },intervel);
}

function rule() {
    if (comSell == userSell) {
        // console.log("draw");
        result.append(`<li class="draw">D</li>`)
    }
    else if (userSell == 0 && comSell == 2) {
        // console.log("win");
        result.append(`<li class="win">W</li>`)
        userScore++;
    }
    else if (userSell == 1 && comSell == 0) {
        // console.log("win");
        result.append(`<li class="win">W</li>`)
        userScore++;
    }
    else if (userSell == 2 && comSell == 1) {
        // console.log("win");
        result.append(`<li class="win">W</li>`)
        userScore++;
    }else {
        // console.log("lose");
        result.append(`<li class="lose">L</li>`)
        computerScore++;
    }
}


