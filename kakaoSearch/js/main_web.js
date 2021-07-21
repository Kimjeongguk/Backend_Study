//request

$("#btnSearch").on("click",function(){
    search();
});
$("#txtSearch").on("keyup",function(e){
    if(e.keyCode===13) {
        search();
    }
})
function search(){
    const searchWord = $("#txtSearch").val();
    $("#main").html("");
    $.ajax({
        url:`https://dapi.kakao.com/v2/search/web?query=${searchWord}`,
        headers:{
            "Authorization":"KakaoAK f7ba9e000c17efe34812621184449783"
        }
    })
    .done(function(response){
        console.log("🚀 ~ file: main_web.js ~ line 9 ~ .done ~ response", response)
        //데이터가 잘 도착했을때 코드 작성
        const documents  = response.documents;
        $("#main").append(`<ul id="webList"></ul>`);
        $.each(documents,function(i,item){
            const contents = item.contents;
            const datetime = item.datetime;
            const title = item.title;
            const url =  item.url;
            $("#webList").append(`
                                <li>
                                    <a href="${url}" target="_blank">
                                        <h2>${title}</h2>
                                        <p class="contents">
                                            ${contents}
                                        </p>
                                        <p class="date">
                                            ${datetime}
                                        </p>
                                    </a>
                                </li>
            `);
        });
    });
}
    
