//특정한 값이 두번 이상 쓰이면 변수
//특정 코드블럭이 두번 이상 쓰이면 함수...

//function declation

function search() {
    const searchWord = $("#txtSearch").val();
    $("#main").html("");
    $.ajax({
        url:`https://dapi.kakao.com/v2/search/vclip?query=${searchWord}&size=30`,
        headers:{
            "Authorization": "KakaoAK f7ba9e000c17efe34812621184449783"
        }
    })
    .done(function(response){
        console.log("🚀 ~ file: main.js ~ line 9 ~ .done ~ response", response);
        const documents = response.documents;
        $("#main").append(`<ul class="" id="imageList"></ul>`);
        $.each(documents,function(i,item){
            const thumbnail = item.thumbnail;
            const vclip = item.url;
            const title= item.title;
            $("#imageList").append(`
                <li>
                    <a href="${vclip}" data-fancybox="big" data-caption="${title}">
                        <img src="${thumbnail}" alt="">
                    </a>
                </li>`
            )
        });
        gsap.from("#imageList li",{scale:0,stagger:0.02});
    });
    //이벤트 위임....
}

//call back function
$("#txtSearch").on("keyup",function(e){
    //console.log(e.keyCode);
    // enterkey 의 키코드는 13;
    if(e.keyCode === 13) {//enter key 에만 반응하기 위해 조건문 작성
        search();
    }
})
$("#btnSearch").on("click",function(){
    search();
});

$(window).on("mousemove",function(e){
    //console.log("🚀 ~ file: main.js ~ line 49 ~ $ ~ e", e)
    gsap.to("#cursor",{left:e.clientX-10,top:e.clientY-10});
});


