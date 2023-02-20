class animal {
    name:string
    private sex:string
    constructor(sex:string) {
        this.name = 'any'
        this.sex = sex
    }
    shout(){
        return `${this.name} is shouting`
    }
    getSex(){
        return this.sex
    }

    get SEX():string{
        return this.sex
    }
    set SEX(sex:string){
        this.sex = sex
    }
}

class dog extends animal{
    constructor(sex:string) {
        super(sex);
        this.name = 'dog'
    }

    shout(): string {
        return super.shout();
    }
}

class duck extends animal{
    constructor(sex:string) {
        super(sex);
        this.name = 'duck'
    }
    shout(): string {
        return super.shout();
    }
}

const dog1 = new dog('g')

const duck1 = new duck('m')

dog1.SEX = 'GGGG'
console.log(dog1.SEX)
console.log(duck1.getSex())

abstract class person {
    protected constructor(private name: string, protected age: number = 0) {
    }

    get NAME(){
        return this.name
    }

    set NAME(name:string){
        this.name = name
    }

    get AGE(){
        return this.age
    }

    abstract addAge(): void

}
class wdw extends person{
    constructor() {
        super('wdw');
    }
    addAge() {
       this.age++
    }
}

let wdw1 = new wdw()
wdw1.addAge()
console.log(wdw1.NAME)
console.log(wdw1.AGE)
