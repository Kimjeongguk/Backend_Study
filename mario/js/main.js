// const swiper_min = require("./swiper_min");
$.ajax({
    url: "../data/mario.json"
})
.done(function(response){
    const list = response.list;
    const main = $("#main");
    main.append(`<ul class="swiper-wrapper" id="marioList"></ul>`);
    const itemlist = main.find("#marioList");
    $.each(list,function(i, item){
        itemlist.append(`<li class="swiper-slide">
                        <div class="item">
                            <div class="img">
                                <img src="../images/${item.img}" alt="">
                            </div>
                            <div class="infoBox" style="${item.bg}">
                                <h2>${item.title}</h2>
                                <p>
                                    ${item.desc}
                                </p>
                                <a href="${item.link}" target="${item.target}">more</a>
                            </div>
                        </div>
                    </li>`
        )
    });
    const marioSlider = new Swiper("#main", {
        slidesPerView: "auto",
        centeredSlides: true,
        loop: true,
        spaceBetween: 30,
        effect: "coverflow",
        mousewheel: true,
        coverflowEffect: {
            rotate: 0,
            slideShadows: false,
            depth: 800
        }
    });
});