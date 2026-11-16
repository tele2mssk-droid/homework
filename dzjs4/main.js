// Задача 1

function calculateFinalPrice(basePrice, discountPercent, taxRate) {
  const priceAfterDiscount = basePrice * (1 - discountPercent / 100);
  const finalPrice = priceAfterDiscount * (1 + taxRate);
  return Math.round(finalPrice * 100) / 100;
}

console.log(calculateFinalPrice(100, 10, 0.2))


// Задача 2

function checkAccess(username, password) {
  if (username === 'admin' && password === '123456') {
    return 'Доступ разрешен';
  } else {
    return 'Доступ запрещен';
  }
}

console.log(checkAccess('user', '123456'));
console.log(checkAccess('admin', '123456'))

// Задача 3

function getTimeOfDay(hour) {
  if (hour < 0 || hour > 23 || !Number.isInteger(hour)) {
    return "Некорректное время";
  }
  if (hour >= 0 && hour <= 5) {
    return "Ночь"
  }
    if (hour >= 6 && hour <= 11) {
    return "Утро"
  }
    if (hour >= 12 && hour <= 17) {
    return "День"
  }
    if (hour >= 18 && hour <= 23) {
    return "Вечер"
  }
}

console.log(getTimeOfDay(19))

// Задача 4

function findFirstEven(start, end) {
  if (start > end) {
    return "Чётных чисел нет";
  }

  for (let i = start; i <= end; i++) {
    if (i % 2 === 0) {
      return i;
    }
  }
  
  return "Чётных чисел нет";
}

console.log(findFirstEven(15, 20))
console.log(findFirstEven(21, 20))