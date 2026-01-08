document.querySelector('.lostpass__button').addEventListener('click', event => {
    setTimeout( () => {
        document.querySelector(".lostpass__warning").style.display = "block";
    }, 750)
})