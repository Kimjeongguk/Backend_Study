// const splitting_min = require("./splitting.min");
Splitting();
function aa(){
    console.log("hello");
}

$(".box").on("click", function(){
    // gsap.to(".box", {x:600, rotation: 30, duration:1, backgroundColor: "#163956", ease: "power4", stagger:.3});
});

// gsap.to(".box", {x:600, rotation: 30, duration:1, backgroundColor: "#163956", ease: "power4", stagger: 0.3,delay: 1});

gsap.from("#slogan .char", {duration:1, x:300, opacity:0,stagger:0.1,ease:"powe4"})