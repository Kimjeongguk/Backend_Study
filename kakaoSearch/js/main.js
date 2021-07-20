$("#btnSearch").click(function(){
    const searchWord = $("#txtSearch").val();
    $("#main").html("");
    if ( searchItem(searchWord)){
        alert("입력해라");
        return
    }
    console.log("🚀 ~ file: main.js ~ line 3 ~ $ ~ searchWord", searchWord)
   
    $.ajax({
        url: `https://dapi.kakao.com/v2/search/image?query=${searchWord}&size=40`,
        headers:{
            "Authorization": "KakaoAK 9cf0db38888f7a8cfce45bc6734c76a9"
        }
    })
    .done(function(response){
        const documents = response.documents;
        $("#main").append(`<ul class="" id="imageList"></ul>`);
        $.each(documents,function(index, item){
            const thumbnail = item.thumbnail_url;
            const image = item.image_url;
            $("#imageList").append(
                `<li>
                    <a href="">
                        <img src="${thumbnail}" alt="">
                    </a> 
                </li>`
            )
        });
        gsap.from("#imageList li", {scale:0, stagger: 0.01});
    });
});

function searchItem(value) {
  for (let i = 0; i<value.length; i++){
      if(value[i] != " "){
          return false
      }
  }
    return true
}