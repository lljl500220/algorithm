function father(this:any) {
    this.num = 935;
    this.work = ['read', 'write', 'listen'];
}
function son() {}
// @ts-ignore
son.prototype = new father();
// @ts-ignore
let son1 = new son();
// @ts-ignore
let son2 = new son();
son1.num = 117;
son1.work.pop();
console.log(son2.num);
console.log(son2.work);


function test() {
    var n = 4399;
    function add(){
        n++;
        console.log(n);
    }
    return {n:n,add:add}
}
var result = test();
var result2 = test();
result.add();
result.add();
console.log(result.n);
result2.add();

// @ts-ignore
let a = Symbol()
console.log(typeof  a)

// @ts-ignore
console.log('103'+'1')

// @ts-ignore
console.log(isNaN('bbb'));

class Build {
    rules: boolean;
    constructor(data:boolean) {
        this.rules = data;
    }
}
const build = new Build(false);
console.log(build.rules);
