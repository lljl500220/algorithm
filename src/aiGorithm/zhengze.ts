let zzHD = 'dsajhjk214543jshds,.eqw'

//不使用正则
/*
let zzNum = [...zzHD].filter(item=>!isNaN(parseInt(item)))
console.log(zzNum.join(''))
*/


//使用正则获取数字
// let match:RegExpMatchArray | null | undefined = zzHD.match(/\d/g)
//
// if (match){
//     console.log(match.join(''))
// }

//手机号校验
let reg  = /1[12345678]\d{9}/
let phone = 'hd@18656032392 '
console.log(reg.test(phone))

// \d匹配数字
console.log(phone.match(/2/g));
console.log(phone.match(/\d/g));

// \D匹配非数字和字符
console.log(phone.match(/\D{2}/g));

// \s匹配空白 \S除了空白
console.log(phone.match(/\s/g));
console.log(phone.match(/\S/g));

// \w 字母数字下划线
const hd1 = 'luolj2022@qq.com'
console.log(hd1.match(/\w+/));
console.log(hd1.match(/\w+@\w+\.\w+/));

// \W除了字母数字下划线
console.log(hd1.match(/\W/));

// . 出去换行符之外的任意字符
const hd2 = 'luolj'
console.log(hd2.match(/.+/))


//练习

export default {}

