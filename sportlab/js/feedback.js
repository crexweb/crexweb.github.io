// Функция отправки заявки обратной связи

function contactSend() {

	let infoFromBase;
	let TOKEN;
	let URI_API = "";
	let CHAT_ID = "";
	const request = new XMLHttpRequest();
	request.open("GET", "js/base.json");
	request.setRequestHeader("Content-type", "application/json; charset=utf-8");
	request.send();
	request.addEventListener("readystatechange", (event) => {
		if (request.readyState === 4 && request.status === 200) {
			infoFromBase = JSON.parse(request.response);
			TOKEN = infoFromBase.token;
			CHAT_ID = infoFromBase.chatId;
			URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
		}
	});

	const phone = document.querySelectorAll('.contact__input')[1];

	phone.addEventListener('input', () => {
		// оставляем только цифры
		let digits = phone.value.replace(/\D/g, '');

		// всегда добавляем +
		phone.value = '+' + digits;
	});

	// не даём стереть +
	phone.addEventListener('keydown', e => {
		if (phone.selectionStart === 1 && e.key === 'Backspace') {
			e.preventDefault();
		}
	});

	// var element = document.querySelectorAll('.contact__input')[1];
	// var maskOptions = {
	// 	mask: '+32 (000) 000-00-00',
	// 	lazy: false
	// } 
	// var mask = new IMask(element, maskOptions);

	document.querySelector('.contact__button').addEventListener('click', event => {

		if ( document.querySelectorAll('.contact__input')[0].value.length < 2 ) {
			document.querySelector('.contact__message').textContent = 'Enter your name';
			document.querySelector('.contact__message').style.maxHeight = '60px';
			document.querySelector('.contact__message').style.marginBottom = '20px';
			document.querySelector('.contact__message').style.color = '#ff4a4a';
			document.querySelectorAll('.contact__input')[0].style.background = "#ffc1c1";
			setTimeout( () => {
				document.querySelector('.contact__message').style.maxHeight = '0px';
				document.querySelector('.contact__message').style.marginBottom = '0px';
				document.querySelectorAll('.contact__input')[0].style.background = "#fff";
			}, 2000)
		} else if ( document.querySelectorAll('.contact__input')[1].value.length < 8 ) {
			document.querySelector('.contact__message').textContent = 'Enter your phone number';
			document.querySelector('.contact__message').style.maxHeight = '60px';
			document.querySelector('.contact__message').style.marginBottom = '20px';
			document.querySelector('.contact__message').style.color = '#ff4a4a';
			document.querySelectorAll('.contact__input')[1].style.background = "#ffc1c1";
			setTimeout( () => {
				document.querySelector('.contact__message').style.maxHeight = '0px';
				document.querySelector('.contact__message').style.marginBottom = '0px';
				document.querySelectorAll('.contact__input')[1].style.background = "#fff";
			}, 2000)
		} else if ( document.querySelectorAll('.contact__input')[2].value.length < 10 ) {
			document.querySelector('.contact__message').textContent = 'Write your message (minimum 10 characters)';
			document.querySelector('.contact__message').style.maxHeight = '60px';
			document.querySelector('.contact__message').style.marginBottom = '20px';
			document.querySelector('.contact__message').style.color = '#ff4a4a';
			document.querySelectorAll('.contact__input')[2].style.background = "#ffc1c1";
			setTimeout( () => {
				document.querySelector('.contact__message').style.maxHeight = '0px';
				document.querySelector('.contact__message').style.marginBottom = '0px';
				document.querySelectorAll('.contact__input')[2].style.background = "#fff";
			}, 2000)
		} else {

			let messageTg = `📞 <b>Заявка на обратную связь</b> 📞\n`;
			messageTg += `<b>👤 Имя - </b> ${document.querySelectorAll('.contact__input')[0].value}\n`;
			messageTg += `<b>📱 Телефон - </b> ${document.querySelectorAll('.contact__input')[1].value}\n`;
			messageTg += `<b>✏️ Сообщение - </b> ${document.querySelectorAll('.contact__input')[2].value}\n`;

			axios.post(URI_API, {
				chat_id: CHAT_ID,
				parse_mode: "html",
				text: messageTg
			});

			document.querySelectorAll('.contact__input')[0].value = "";
			document.querySelectorAll('.contact__input')[1].value = "";
			document.querySelectorAll('.contact__input')[2].value = "";

			document.querySelector('.contact__message').textContent = 'Your request has been sent ✉️';
			document.querySelector('.contact__message').style.maxHeight = '60px';
			document.querySelector('.contact__message').style.marginBottom = '20px';
			document.querySelector('.contact__message').style.color = 'rgb(0, 172, 49)';
			setTimeout( () => {
				document.querySelector('.contact__message').style.maxHeight = '0px';
				document.querySelector('.contact__message').style.marginBottom = '0px';
			}, 6000)

		}

	})

}

contactSend();