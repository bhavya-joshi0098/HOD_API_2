const prompt = require('prompt-sync')();

let arr =[];
for (let i = 0; i < 10; i++) {
    let a =parseInt(prompt("Enter a number: "));
    arr.push(a);
}
console.log(arr);