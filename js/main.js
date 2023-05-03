const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const btn_next = document.getElementById("button__next-first");
const input = document.getElementById("email");
const name_user = document.getElementById('name');
const check = document.querySelectorAll('.input__form');
const first_form = document.getElementById('first__form');
const second_form = document.getElementById('second__form');


function isEmailValid(value) {
    return EMAIL_REGEXP.test(value);
}

function onInput() {
	if (isEmailValid(input.value)) {
		input.style.borderColor = 'green';
	} else {
		input.style.borderColor = 'red';
	}
}

input.addEventListener('input', onInput);

var dateInput = document.getElementById('date');

dateInput.oninput = function() {
  var date = this.value;
  // Удаляем все символы, кроме цифр
  date = date.replace(/[^\d]/g, "");
  if (date.length > 8) {
    date = date.slice(0, 8);
  }
  if (date.length > 2) {
    date = date.slice(0, 2) + "." + date.slice(2);
  }
  if (date.length > 5) {
    date = date.slice(0, 5) + "." + date.slice(5);
  }
  this.value = date;
};

function checkDate() {
    var inputDate = new Date(date.value);
    var now = new Date();
    if (isNaN(inputDate.getTime()) || inputDate > now) {
        dateInput.style.borderColor = 'red';
    }
    else {
        dateInput.style.borderColor = 'green';
    }
}

name_user.addEventListener('input', (e) => {
  if (name_user.value) {
    name_user.style.borderColor = 'green';
  }
  else if (name_user.value === '') name_user.style.borderColor = 'red';
})

dateInput.addEventListener('input', checkDate);

btn_next.addEventListener('click', (e) => {
  e.preventDefault();
  var allGreen = true;

  for (var i = 0; i < check.length; i++) {
    if (check[i].value === '') {
      check[i].style.borderColor = 'red';
    }
    else if (check[i].value) {
      check[i].style.borderColor = 'green';
    }
  }

  for (var i = 0; i < check.length; i++) {
    if (check[i].style.borderColor !== 'green'){
      allGreen = false;
      break;
    }
  }
  if (allGreen) {
    first_form.style.left = "-450px";
    first_form.style.opacity = "0";
    first_form.style.visibility = "hidden";

    second_form.style.left = "0px";
    second_form.style.opacity = "1";
    second_form.style.visibility = "visible";
  }
})

// Second Form

var dropdown = document.querySelectorAll('.dropdown');
var arrow = document.querySelectorAll('.fa-circle-down');
var dropdown_content = document.querySelectorAll('.dropdown__content');
var header = document.querySelectorAll('.dropdown__header');
var header_text = document.querySelectorAll('.dropdown__header-text');
var items = document.querySelectorAll('.dropdown__item');
var mention = document.querySelector('.optional__input');
var btn_back = document.querySelector('.button__back');
var btn_submit = document.getElementById('button__submit');

var check_second = document.querySelectorAll('.input__form-second');
var people_number = document.getElementById('people');
var date_first = document.querySelector('.date-first');
var date_second = document.querySelector('.date-second');
var loading = document.querySelector('.loading');

date_first.oninput = function() {
  var date = this.value;
  // Удаляем все символы, кроме цифр
  date = date.replace(/[^\d]/g, "");
  if (date.length > 8) {
    date = date.slice(0, 8);
  }
  if (date.length > 2) {
    date = date.slice(0, 2) + "." + date.slice(2);
  }
  if (date.length > 5) {
    date = date.slice(0, 5) + "." + date.slice(5);
  }
  this.value = date;
};

date_second.oninput = function() {
  var date = this.value;
  // Удаляем все символы, кроме цифр
  date = date.replace(/[^\d]/g, "");
  if (date.length > 8) {
    date = date.slice(0, 8);
  }
  if (date.length > 2) {
    date = date.slice(0, 2) + "." + date.slice(2);
  }
  if (date.length > 5) {
    date = date.slice(0, 5) + "." + date.slice(5);
  }
  this.value = date;
};

function checkFirstDate() {
  var inputDate = new Date(date_first.value);
  var now = new Date();

  if (isNaN(inputDate.getTime()) || inputDate < now) {
    date_first.style.borderColor = 'red';
  }
  else {
    date_first.style.borderColor = 'green';
  }
}

function checkSecondDate() {
  var inputDate = new Date(date_second.value);
  var now = new Date();

  if (isNaN(inputDate.getTime()) || inputDate < now) {
    date_second.style.borderColor = 'red';
  }
  else {
    date_second.style.borderColor = 'green';
  }
}

function checkDropDown() {
  for (let i = 0; i < header.length; i++) {
    if (header_text[i].textContent === 'Event Space' || header_text[i].textContent === 'City/Area' || header_text[i].textContent === 'Preference') {
      header[i].style.borderColor = 'red';
    }
    else {
      header[i].style.borderColor = 'green';
    }
  }
}

function checkBothDates() {
  const dateValue_first = new Date (date_first.value);
  const dateValue_second = new Date (date_second.value);

  if (dateValue_first <= dateValue_second && dateValue_second >= dateValue_first) {
    const timeDiff = Math.abs(dateValue_second.getTime() - dateValue_first.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (diffDays <= 30) {
      date_first.style.borderColor = 'green';
      date_second.style.borderColor = 'green';
    } else {
      date_first.style.borderColor = 'red';
      date_second.style.borderColor = 'red';
    }
  }
  else {
    date_first.style.borderColor = 'red';
    date_second.style.borderColor = 'red';
  }
}


date_first.addEventListener('input', checkFirstDate);
date_second.addEventListener('input', checkSecondDate);
people_number.addEventListener('input', () => {
  if (people_number.value < 0) {
    people_number.style.borderColor = 'red';
  }
  else {
    people_number.style.borderColor = 'green';
  }
});


for (let i = 0; i < header.length; i++) {
  header[i].addEventListener('click', () => {
    dropdown_content[i].classList.toggle('active');
    arrow[i].classList.toggle('active');
  })
}

for (let i = 0; i < dropdown.length; i++) {
  document.addEventListener('click', (e) => {
    console.log(dropdown[i]);
    if (!dropdown[i].contains(e.target)) {
      dropdown_content[i].classList.remove('active');
      arrow[i].classList.remove('active');
    }
  })
}

for (let i = 0; i < items.length; i++) {
  items[i].addEventListener('click', (e) => {
    if (i < 4) {
      header_text[0].textContent = items[i].textContent;
      dropdown_content[0].classList.remove('active');
      arrow[0].classList.remove('active');
    }
    if (i >= 4 && i < 6) {
      header_text[1].textContent = items[i].textContent;
      dropdown_content[1].classList.remove('active');
      arrow[1].classList.remove('active');
    }
    if (i >= 6) {
      header_text[2].textContent = items[i].textContent;
      dropdown_content[2].classList.remove('active');
      arrow[2].classList.remove('active');
      if (header_text[2].textContent === "Yes") {
        mention.classList.toggle('active');
      }
      else {
        mention.classList.remove('active');
      }
    }
  })
}

btn_back.addEventListener('click', (e) => {
    e.preventDefault();
    first_form.style.left = "0px";
    first_form.style.opacity = "1";
    first_form.style.visibility = "visible";

    second_form.style.left = "450px";
    second_form.style.opacity = "0";
    second_form.style.visibility = "hidden";
})

btn_submit.addEventListener('click', (e) => {
  e.preventDefault();

  var allGreen = true;

  for (var i = 0; i < check_second.length; i++) {
    if (check_second[i].value === '') {
      check_second[i].style.borderColor = 'red';
    }
    else if (check_second[i].value) {
      check_second[i].style.borderColor = 'green';
    }
  }

  for (var i = 0; i < check_second.length; i++) {
    if (check_second[i].style.borderColor !== 'green'){
      allGreen = false;
      break;
    }
  }
  checkBothDates();
  checkDropDown();
  if (allGreen) {
      loading.style.opacity = '1';
      loading.style.visibility = 'visible';
      setTimeout(() => {
        window.location.reload();
      }, 4000)
  }
})