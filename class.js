class demo{
    constructor(){
        console.log("constructor called:--------");
    }
    demo_function(){
        console.log("demo class method:-----------")
    }
}
class hello extends demo{
    a=5;
    say_hello() {
        console.log("hello everyone:--------");
    }
    // demo_function();
}
h = new hello();
h.say_hello();
d = new demo();
h.demo_function();
// import console from s
function hello_globle(){
    console.log("this is from class.js file");
}