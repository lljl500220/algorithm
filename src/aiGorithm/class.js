function Animal(name) {
    this.name = name||"animol"
    this.sleep = function (){
        console.log(this.name + " is sleeping")
    }
}

Animal.prototype.eat = function (food) {
    console.log(this.name + " eating " + food)
}

var animol = new Animal('tiger')

console.log(animol.name)
animol.sleep()
animol.eat('shit')

function A (cName) {
    if (cName) {
        this.name = cName
    }
}
A.prototype.name = 'XiaoMi'
var a = new A()
console.log('A', a.name)
function B (cName) {
    this.name = cName
}
B.prototype.name = 'Xiaomi'
var b = new B()
console.log('B', b.name)

console.log(2<<3)
var callbacks = []
for (var i = 0; i < 4; i++) {
    callbacks.push(function() {
        console.log(i);
    });
}
console.log(callbacks)
callbacks.forEach(cb => cb());
