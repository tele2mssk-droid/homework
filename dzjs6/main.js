// Задача 1

const users = [
  { name: 'Alex', age: 24, isAdmin: false },
  { name: 'Bob', age: 13, isAdmin: false },
  { name: 'John', age: 31, isAdmin: true },
  { name: 'Jane', age: 20, isAdmin: false },
];

users.push({ name: 'Ann', age: 19, isAdmin: false });
users.push({ name: 'Jack', age: 43, isAdmin: true });

console.log(users);


// Задача 2

function getUserAverageAge(users) {
  if (users.length === 0) {
    return 0;
  }

  const totalAge = users.reduce((sum, user) => sum + user.age, 0);
  return totalAge / users.length;
}

console.log(getUserAverageAge(users));

// Задача 3

function getAllAdmins(users) {
  return users.filter(user => user.isAdmin === true);
}

const admins = getAllAdmins(users);
console.log(admins);

// Задача 4

function first(arr, n) {
  if (n === undefined) {
    return arr.length > 0 ? [arr[0]] : [];
  }

  if (n === 0) {
    return [];
  }

  return arr.slice(0, n);
}

const numbers = [10, 20, 30, 40, 50];

console.log(first(numbers, 3));
console.log(first(numbers, 0));
