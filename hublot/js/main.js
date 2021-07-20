//request   
//response

const linkArray=["bigbang","classic","classic"];
$(".gnbList li").on("click",function(){
    const sel = $(this).index();
    loadJson(linkArray[sel]);
    $(this).addClass("on").siblings("li").removeClass("on");
    console.log("🚀 ~ file: main.js ~ line 12 ~ $ ~ linkArray[sel]", linkArray[sel])
    return false;
});
function loadJson(url){
    $("#main").html("");
    $.ajax({
        url:"../data/"+url+".json"
    })
    .done(function(response){
        
        const clock = response.clock;
        $("#main").append(`<ul class="swiper-wrapper" id="clockList"></ul>`);
        $.each(clock,function(i,item){
            console.log("🚀 ~ file: main.js ~ line 12 ~ $.each ~ i", i)
            $("#clockList").append(
                `<li class="section swiper-slide" id="clock0${i+1}" style="background-image:url(${item.bg})">
                    <div class="info" data-splitting>
                        <p class="category">${item.category}</p>
                        <p class="title">
                            ${item.title}
                        </p>
                        <p class="depth">
                            ${item.depth}MM
                        </p>
                        <p class="price">
                            CHF ${item.price}
                        </p>
                    </div>
                </li>`
            );
        });
        Splitting();
        //gsap.from("#main ul li:nth-child(1) .char",{y:-150,opacity:0,duration:1.5,ease:"bounce",stagger:0.05});
        //   ~때 
        gsap.from("#main ul li:nth-child(1) .char",{
                                                        y:-150,
                                                        opacity:0,
                                                        duration:1.5,
                                                        ease:"bounce",
                                                        stagger:{
                                                            from:"random",
                                                            each:0.01
                                                        }
                                                    });
        const clockSlidder = new Swiper("#main",{
            direction:"vertical",
            slidesPerView:"auto",
            mousewheel:true, 
            speed:1000,//    움직이는 시간
            pagination:{
                el:".pagination"
            },
            on:{
                slideChange:function(){
                    console.log("change");
                    console.log(this.activeIndex);
                    const sel = this.activeIndex+1;
                    gsap.from("#main ul li:nth-child("+sel+") .char",{
                        y:-150,
                        opacity:0,
                        duration:1.5,
                        ease:"bounce",
                        stagger:{
                            from:"random",
                            each:0.01
                        }
                    });
                }
            }
        });
    });
}

loadJson(linkArray[0]);