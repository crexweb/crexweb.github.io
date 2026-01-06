document.querySelector('.reg__button').addEventListener('click', event => {

    document.querySelector('.reg__warning').innerHTML = "";

    let haveProblem = false;

    setTimeout( () => {

        if ( !document.querySelector('.reg__check').checked ) {
            let newMsg = document.createElement('p');
            newMsg.textContent = "Ошибка! Вы не приняли правила сайта";
            document.querySelector('.reg__warning').append(newMsg);
            haveProblem = true;
        }

        if ( document.querySelector('.reg__input-mail').value.length < 10 || !document.querySelector('.reg__input-mail').value.includes('@') && !document.querySelector('.reg__input-mail').value.includes('.') ) {
            let newMsg = document.createElement('p');
            newMsg.textContent = "Ошибка! Вы ввели неверный e-mail";
            document.querySelector('.reg__warning').append(newMsg);
            haveProblem = true;
        }

        if ( document.querySelector('.reg__input-login').value.length < 3 ) {
            let newMsg = document.createElement('p');
            newMsg.textContent = "Ошибка! вы ввели некорректное имя пользователя. Имя пользователя должно состоять из цифр или латинских букв и содержать от трех до 30 символов";
            document.querySelector('.reg__warning').append(newMsg);
            haveProblem = true;
        }

        if ( document.querySelector('.reg__input-password').value.length < 8 || document.querySelector('.reg__input-password').value != document.querySelector('.reg__input-passtoo').value ) {
            let newMsg = document.createElement('p');
            newMsg.textContent = "Ошибка! Пароль неверный или не совпадает с ранее введенным";
            document.querySelector('.reg__warning').append(newMsg);
            haveProblem = true;
        }

        if ( haveProblem == false ) {
            let newMsg = document.createElement('p');
            newMsg.textContent = "Ошибка! Данный логи или e-mail уже зарегистрирован";
            document.querySelector('.reg__warning').append(newMsg);
        }

        document.querySelector('.reg__warning').style.display = "block";

    }, 750)

})