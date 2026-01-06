document.querySelector('.login__button').addEventListener('click', event => {

    setTimeout( () => {

        if ( document.querySelector('.login__input-login').value.length < 4 ) {
            document.querySelector('.login__warning p').textContent = "Ошибка! Неверный логин или e-mail";
            document.querySelector('.login__warning').style.display = "block";
        } else if ( document.querySelector('.login__input-password').value == "" ) {
            document.querySelector('.login__warning p').textContent = "Ошибка! Неккоректный пароль";
            document.querySelector('.login__warning').style.display = "block";
        } else {
            document.querySelector('.login__warning p').textContent = "Ошибка! Неверная пара логин/пароль";
            document.querySelector('.login__warning').style.display = "block";
        }

    }, 750 )

})