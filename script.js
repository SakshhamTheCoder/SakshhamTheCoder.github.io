hljs.highlightAll();

// gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(TextPlugin);

// // const races = document.querySelector(".about .text");
// const section = gsap.utils.toArray(".about .text > div")
// // console.log(races.offsetWidth)

// // function getScrollAmount() {
// // 	let racesWidth = races.scrollWidth;
// // 	return (racesWidth - window.innerWidth);
// // }

// const tween = gsap.to(section, {
// 	// x: getScrollAmount,
// 	x: 1000,
// 	duration: 3,
// 	ease: "none",
// });


// ScrollTrigger.create({
// 	trigger:".about",
// 	// start:"top 20%",
// 	// end: () => `+=${getScrollAmount() * -1}`,
// 	pin:true,
// 	animation:tween,
// 	scrub:1,
// 	invalidateOnRefresh:true,
// 	markers:true
// })

// $.fn.isInViewport = function () {
//     let elementTop = $(this).offset().top;
//     let elementBottom = elementTop + $(this).outerHeight();

//     let viewportTop = $(window).scrollTop();
//     let viewportBottom = viewportTop + $(window).height();

//     return elementBottom > viewportTop && elementTop < viewportBottom;
// };

// let wasInViewport = false;

// $(window).scroll(function () {
//     const isInViewport = $('.about .text ').isInViewport();
//     console.log(`is: ${isInViewport}, was: ${wasInViewport}`)
//     var typed = new TypeIt("#typed-text", {
//         speed:100
//       })
//     if (isInViewport !== wasInViewport){
//         // var typewriter = new Typewriter(document.getElementById('typed-text'), {
//         //     loop: true,
//         //     delay: 75,
//         //   });
//         //   typewriter.typeString('I am a <span style="color: #F7E29E;">Male</span><br>having <span style="color: #FFA274;">Home Town</span> in <a class="link" href="http://wikipedia.org/Wiki/Jammu" target="_blank" style="color: #F7E29E; text-decoration:none;">Jammu, Jammu and Kashmir, India.</a><br>I have <span style="color: #FFA274;">Proficieny</span> in many <span style="color: #F7E29E;">Modern Technologies</span><br>and have a lot of <span style="color: #F7E29E;">Hobbies</span>').start();
//           typed.type('I am a <span style="color: #F7E29E;">Male</span><br>having <span style="color: #FFA274;">Home Town</span> in <a class="link" href="http://wikipedia.org/Wiki/Jammu" target="_blank" style="color: #F7E29E; text-decoration:none;">Jammu, Jammu and Kashmir, India.</a><br>I have <span style="color: #FFA274;">Proficieny</span> in many <span style="color: #F7E29E;">Modern Technologies</span><br>and have a lot of <span style="color: #F7E29E;">Hobbies</span>')
//           .go();

//     } 
//     else if(isInViewport){
//         typed.delete();
//     }
//     wasInViewport = isInViewport;
// });