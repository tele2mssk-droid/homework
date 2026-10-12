// Задача 1

const number = 14;

if (number % 2 === 0) {
  console.log(`${number} — чётное число`);
} else {
  console.log(`${number} — нечётное число`);
}

// Задача 2

const age = +prompt("Сколько вам лет?")
const discount = age < 18 ? 10 : (age <= 65 ? 20 : 30);

console.log(`Скидка: ${discount}%`);

// Доп. Задача 2

let discount1;

switch (true) {
  case age < 18:
    discount1 = 10;
    break;
  case age <= 65:
    discount1 = 20;
    break;
  case age > 65:
    discount1 = 30;
    break;
  default:
    discount1 = 0;
    break;
}

console.log(`Скидка: ${discount1}%`);

// Задача 3

const username = prompt('Введите имя пользователя:');
const password = prompt('Введите пароль:');

if ((username === 'admin' || username === 'user') && password === '123456') {
  console.log('Доступ разрешен!');
} else {
  console.log('Доступ запрещен!');
}

// *Задача 4.

let weightInput = prompt('Введите вес посылки (в килограммах):');
let deliveryType = prompt('Введите тип доставки (Стандарт / Экспресс / Премиум):');

// Преобразуем вес в число
let weight = parseFloat(weightInput);

if (weight <= 0 || isNaN(weight)) {
  alert('Некорректный вес посылки');
} else if (!['Стандарт', 'Экспресс', 'Премиум'].includes(deliveryType)) {
  alert('Неверный тип доставки');
} else {
  let baseCost;
  if (weight < 1) {
    baseCost = 5;
  } else if (weight >= 1 && weight <= 5) {
    baseCost = 10;
  } else {
    baseCost = 15;
  }

  let coefficient;
  switch (deliveryType) {
    case 'Стандарт':
      coefficient = 1;
      break;
    case 'Экспресс':
      coefficient = 1.5;
      break;
    case 'Премиум':
      coefficient = 2;
      break;
    default:
      alert('Неверный тип доставки');
      coefficient = 1;
  }

  const finalCost = baseCost * coefficient;

  alert(`Итоговая стоимость доставки: ${finalCost}$`);
}