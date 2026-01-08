let activeCards = [];
document.querySelectorAll('.faq__item').forEach( item => {
    activeCards.push(false);
})

document.querySelectorAll('.faq__top').forEach( (item, i) => {
    item.addEventListener('click', event => {

        

        if ( !item.classList.contains('faq__top-active') ) {

            document.querySelectorAll('.faq__top').forEach( (item, i) => {                

                document.querySelectorAll('.faq__top')[i].style.borderBottomLeftRadius = "5px";
                document.querySelectorAll('.faq__top')[i].style.borderBottomRightRadius = "5px";
                document.querySelectorAll('.faq__top')[i].classList.remove('faq__top-active');

                document.querySelectorAll('.faq__card')[i].style.paddingTop = "0px";
                document.querySelectorAll('.faq__card')[i].style.paddingBottom = "0px";
                document.querySelectorAll('.faq__card')[i].style.border = "0px";
                document.querySelectorAll('.faq__card')[i].style.maxHeight = "0px";

            })

            document.querySelectorAll('.faq__top')[i].style.borderBottomLeftRadius = "0px";
            document.querySelectorAll('.faq__top')[i].style.borderBottomRightRadius = "0px";
            document.querySelectorAll('.faq__top')[i].classList.add('faq__top-active');

            document.querySelectorAll('.faq__card')[i].style.padding = "14px 31px";
            document.querySelectorAll('.faq__card')[i].style.border = "1px solid #a6c9e2";
            document.querySelectorAll('.faq__card')[i].style.borderTop = "0px";
            document.querySelectorAll('.faq__card')[i].style.maxHeight = "2000px";
            
        } else {

            document.querySelectorAll('.faq__top')[i].style.borderBottomLeftRadius = "5px";
            document.querySelectorAll('.faq__top')[i].style.borderBottomRightRadius = "5px";
            document.querySelectorAll('.faq__top')[i].classList.remove('faq__top-active');

            document.querySelectorAll('.faq__card')[i].style.paddingTop = "0px";
            document.querySelectorAll('.faq__card')[i].style.paddingBottom = "0px";
            document.querySelectorAll('.faq__card')[i].style.border = "0px";
            document.querySelectorAll('.faq__card')[i].style.maxHeight = "0px";
            
        }

    })
})