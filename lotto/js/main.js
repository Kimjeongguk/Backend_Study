// const fruits = ["apple", "banana","peach","tomato"];
// console.log( fruits.splice(Math.floor(Math.random()*fruits.length),1));
// console.log( fruits.splice(Math.floor(Math.random()*fruits.length),1));

// for (let i=0; i<6; i++){
//     const selectedNum = (lotto.splice(Math.floor(Math.random()*lotto.length),1))[0];
//     console.log(lotto.length, selectedNum)
//     selectedLotto.push(selectedNum);
// }
lotoList();
function lotoList(){
    const lotto = [];
    const selectedLotto = [];
    for (let i=1; i<46; i++){
        lotto.push(i);
    }

    for(let i = 0; i<100; i++){
        let temp01 = Math.floor(Math.random()*45);
        let temp02 = lotto[0];
    
        lotto[0] = lotto[temp01];
        lotto[temp01] = temp02;
    }
    
    for(let i = 0; i<6; i++){
        const selectedNum = lotto[i];
        selectedLotto.push(selectedNum);
    }
    for(let i = 0; i<6; i++){
        for(let j = 0; j<5; j++){
            let temp = 0;
            if(selectedLotto[i] < selectedLotto[j]){
                temp = selectedLotto[i];
                selectedLotto[i] = selectedLotto[j];
                selectedLotto[j] = temp;
            }
        }
    }
    $("#main div").append(`<ul></ul>`);
    $.each(selectedLotto,function(i, item){
        let color = "";
        if( item >= 41){
            color = "black";
        }else if(item >= 31){
            color = "green";
        }else if (item >= 21){
            color = "red";
        }else if (item >= 11){
            color = "blue";
        }else {
            color = "yellow";
        }
        
        $("#main div ul:last").append(`<li class="${color}">${item}</li>`);
    });

}


$("#selectGame").on("change",function(){
    $("#main div").html("");
    let count = $(this).find("option:selected").val();
    console.log(count);
    for (let i=0; i<count; i++){
        lotoList();
    }
    gsap.from("#main li", {scale:0, ease: "back", stagger:0.05});
    // console.log($(this).find("option:selected").val());
});