var mymodal = $('#myModal')
var counter = 0;
var hello = document.getElementById('hello');
var div1 = document.getElementById('first');
var vid = document.getElementsByTagName('video')[0]
var playbtn = document.getElementById('play')
var stopbtn = document.getElementById('stop')


hello.addEventListener('click', (e) => {
    counter++
    if (counter == 5) {
        mymodal.modal('show')
        counter = 0
        return true
    }
    return false
}, false)


div1.addEventListener('selectstart', (e) => e.preventDefault())

playbtn.addEventListener('click', () => {
    if (vid.paused) {
        vid.play()
        playbtn.innerHTML = "Pause"

    } else {
        if (vid.requestFullscreen) {
            vid.requestFullscreen();
        } else if (vid.webkitReqeustFullscreen) {
            vid.webkitReqeustFullscreen();
        }
        vid.loop = true;
    }

})

stopbtn.addEventListener('click', () => {
    if (vid.currentTime == 0) {
        stopbtn.setAttribute("disabled")
    }
    vid.pause()
    vid.currentTime = 0
    alert("Rickrolled LMAO")
    mymodal.modal('hide')
})

function navigate(id) {
    this.event.preventDefault()
    document.getElementById(id).scrollIntoView(true);
}
