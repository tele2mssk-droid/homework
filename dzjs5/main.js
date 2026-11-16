// Задача 1

const person = {
  name: "Виктор",
  role: "Ученик",
  skills: ["Кушать", "Спать"],
  favoriteTopic: "программирование на html",
  location: "Москва"
};

console.log("Имя:", person.name);
console.log("Роль:", person.role);
console.log("Навыки:", person.skills.join(", "));
console.log("Любимая тема:", person.favoriteTopic);
console.log("Локация:", person.location);


// Задача 2

const isEmpty = object => {

//  Убрал null и массив из объектов
  if (typeof object !== 'object' || object === null || Array.isArray(object)) {
    return false;
  }

  for (const _ in object) {
    return false;
  }
  return true;
};

console.log(isEmpty({}));                 // true
console.log(isEmpty({ a: 1 }));           // false
console.log(isEmpty(null));               // false
console.log(isEmpty([]));                 // false
console.log(isEmpty('строка'));          // false

// Задача 3

const task = {
  title: "Сделать домашку",
  description: "Решить задачу по JavaScript",
  isCompleted: false
};

function cloneAndModify(object, modifications) {
  return { ...object, ...modifications };
}

const modifiedTask = cloneAndModify(task, {
  title: "Сделать домашку по JS",
  isCompleted: true
});

for (const key in modifiedTask) {
  console.log(key + ": " + modifiedTask[key]);
}

// Задача 4

function callAllMethods(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'function') {
      obj[key]();
    }
  }
}

const myObject = {
  method1() {
    console.log('Метод 1 вызван');
  },
  method2() {
    console.log('Метод 2 вызван');
  },
  property: 'Это не метод'
};

callAllMethods(myObject);