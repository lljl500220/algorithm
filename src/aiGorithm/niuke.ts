/**
 * tips:js中 ‘/’ 运算发与java不同，java中会返回对结果的向下取整，但是js会得到浮点小数
 * 这是由于js的数字类型只有number而没有int，float等导致的，所以需要数字运算手动向下取整。
 * @param num
 */

const hw = (num: number): boolean | string => {
    if (!num) return '请输入有效数字'
    else {
        let newNum = 0
        let startNum = num
        while (num > 0) {
            debugger
            let bits = num % 10
            num = Math.floor(num / 10)
            newNum = newNum * 10 + bits
        }
        return startNum === newNum
    }
}

// console.log(hw(1221));

//求商和余数
/**
 * 不使用 / %
 * @param cs 除数
 * @param bcs 被除数
 */

const sy = (cs: number, bcs: number) => {
    if (cs > bcs) return '除数不能大于被除数'
    let count = 0
    while (cs <= bcs) {
        bcs = bcs - cs
        count++
    }
    return `商：${count};余数：${bcs}`
}

// console.log(sy(37, 100));

//leetCode 485
const findMaxConsecutiveOnes = (nums: number[]): number => {
    if (!nums) return 0;
    let count = 0
    let tempCount = 0
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 1) {
            tempCount++
            if (tempCount >= count) count = tempCount
        } else {
            tempCount = 0
        }
    }
    return count
}

// console.log(findMaxConsecutiveOnes([0, 1, 1, 1]));

//leetCode 495
const findPoisonedDuration = (timeSeries: number[], duration: number): number => {
    if (!timeSeries || !duration) return 0
    let count = 0
    for (let i = 0; i < timeSeries.length; i++) {
        if (i === timeSeries.length - 1) {
            count += duration
            continue
        }
        if (timeSeries[i + 1] - timeSeries[i] > duration) {
            count += duration
        } else {
            count += timeSeries[i + 1] - timeSeries[i]
        }
    }
    return count
}

// console.log(findPoisonedDuration([1, 2], 2));

//495优化

const findPoisonedDurationBest = (timeSeries: number[], duration: number): number => {
    let res = 0
    let count = -duration
    for (let next of timeSeries) {
        let temp = next - count
        res += temp > duration ? duration : temp
        count = next
    }
    return res
}

// console.log(findPoisonedDurationBest([1, 4], 2));

//leetCode 414 常规解法
const thirdMax = (nums: number[]): number => {
    nums.sort((a, b) => {
        return b - a
    })
    let res = nums[0]
    let count = 0
    for (let num of nums) {
        if (num < res) {
            res = num
            count += 1
        }
        if (count === 2) break
    }
    if (count < 2) return nums[0]
    return res
}

// console.log(thirdMax([1,2]));

//414优化 不是性能优化，只是代码更优雅些
const thirdMaxBest = (nums: number[]): number => {
    let arr: number[] = Array.from(new Set(nums)).sort((a, b) => {
        return a - b
    })
    //@ts-ignore
    return arr.length > 2 ? arr[arr.length - 3] : arr.pop()
}

// console.log(thirdMaxBest([3,2,3,1,2,4,5,5,6,7,7,8,2,3,1,1,1,10,11,5,6,2,4,7,8,5,6]));

//leetCode 628

/**
 * 首先需要明白数学模型：
 * 先排序，后结果只会存在两种情况 ：末尾三个数相乘||最小的两个负数和最大的一个正数相乘
 * 思路明白了就很简答
 * @param nums
 */
const maximumProduct = (nums: number[]): number => {
    let length = nums.length
    nums.sort((a, b) => a - b) //按照绝对值大小排列
    let res1 = nums[0] * nums[1] * nums[length - 1]
    let res2 = nums[length - 3] * nums[length - 2] * nums[length - 1]
    return res1 > res2 ? res1 : res2
}

// console.log(maximumProduct([1, 0, 100]));

// console.log([-100,-98,-1,-2,1,2,3,4].sort((a, b) => Math.abs(a) - Math.abs(b)))

//leetCode 645

/**
 * 明确只有一个数会有错误，所以直接循环到错误地点就行了
 * 错误：下一位比上一位的差值不为1即下一位错误
 * 从1开始，原数组必须包含1
 * @param nums
 */
const findErrorNums = (nums: number[]): number[] => {
    let res = [0, 0]
    nums.sort((a, b) => {
        if (a === b) res[0] = a
        return a - b
    })
    for (let i = 0; i < nums.length; i++) {
        if (nums.indexOf(i + 1) === -1) {
            res[1] = i + 1
            break
        }
    }
    return res
}

// console.log(findErrorNums([3, 2, 3, 4, 6, 5]));

// console.log(Array.from(new Set([1,1])))

//leetCode 697

const findShortestSubArray = (nums: number[]): number => {
    let res: number[] = []
    let newNums = Array.from(new Set(nums))
    let max = 0
    let choose = [0]
    newNums.map((num => {
        debugger
        let tempMax = 0
        nums.map((item => {
            if (item === num) tempMax += 1
        }))
        if (tempMax > max) {
            max = tempMax
            choose = [num]
        } else if (tempMax === max) {
            max = tempMax
            choose.push(num)
        }
    }))
    for (let i = 0; i < choose.length; i++) {
        debugger
        res.push(nums.lastIndexOf(choose[i]) - nums.indexOf(choose[i]) + 1)
    }
    res.sort((a, b) => a - b)
    return res[0]
}


const findShortestSubArray2 = (nums: number[]): number => {
    let res = 0
    let max = 0
    let hashMap = new Map
    nums.forEach((num, index) => {
        debugger
        let item = hashMap.get(num)
        if (!item) {
            hashMap.set(num, [1, index, index])
            item = hashMap.get(num)
        } else {
            hashMap.set(num, [item[0] + 1, item[1], index])
            item = hashMap.get(num)
        }
        let tempRes = item[2] - item[1] + 1
        if (item[0] > max || (item[0] === max && tempRes < res)) {
            max = item[0]
            res = tempRes
        }
    })
    return res
}
// console.log(findShortestSubArray2([1,2,3,4,5,6,4]));

//leetCode  448
const findDisappearedNumbers = (nums: number[]): number[] => {
    let res: number[] = []
    for (let i = 0; i < nums.length; i++) {
        if (!nums.includes(i + 1)) res.push(i + 1) //这行代码把时间复杂度提升到了O(n²)
    }
    return res
}

// console.log(findDisappearedNumbers2([4,3,2,7,8,2,3,1]))

//leetCode 442 #中等
/**
 * 思路：二元信息存储
 * 题目要求时间复杂度为O(n)，且空间复杂度为O(1)，所以只能考虑用nums本身来存储是否遇到过这个值
 * 遍历数组nums，遇到x时，将x-1位置的量值为相反数，再次遇到x时，去查看x-1位置是否为负数，若是，则是第二次遇到
 * @param nums
 */
function findDuplicates(nums: number[]): number[] {
    const res: number[] = []
    nums.sort((a, b) => a - b)
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] === nums[i + 1]) {
            res.push(nums[i])
        }
    }
    return res
}

function findDuplicates2(nums: number[]): number[] {
    const res = []
    for (let i = 0; i < nums.length; i++) {
        let index = Math.abs(nums[i]) - 1
        if (nums[index] < 0) {
            res.push(index + 1)
        }
        nums[index] *= -1
    }
    return res
}

// console.log(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1]));


//leetCode 41 困难
const firstMissingPositive = (nums: number[]): number => {
    for (let i = nums.length - 1; i >= 0; i--) {
        if (nums[i] <= 0 || nums[i] >= nums.length + 1) {
            nums.splice(i, 1);
        }
    }
    let hasChange = true;
    while (hasChange) {
        hasChange = false;
        for (let i = nums.length - 1; i >= 0; i--) {
            const num = nums[i];
            if (num >= nums.length + 1) { // 剔除大数
                nums.splice(i, 1);
                hasChange = true;
            } else {
                if (i === num - 1) {
                } else if (nums[num - 1] !== num) {
                    // 排序
                    nums[i] = nums[num - 1];
                    nums[num - 1] = num;
                    hasChange = true;
                } else {
                    nums.splice(i, 1);
                    hasChange = true;
                }
            }
        }
    }
    return nums.length + 1;
}

const firstMissingPositive2 = (nums: number[]): number => {
    const len = nums.length
    for (let i = 0; i < nums.length; i++) {
        while (nums[i] > 0 && nums[i] <= len && nums[i] !== nums[nums[i] - 1]) {
            let temp = nums[i]
            nums[i] = nums[temp - 1]
            nums[temp - 1] = temp
        }
    }
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== i + 1) {
            return i + 1
        }
    }
    return len + 1
}

// console.log(firstMissingPositive2([3, -8, -1, 47, 19, 22, 1, 1, 47, -4, -7, -3, 16, 21, 2, 7, 6]));

//leetCode 274
/**
 * 思路 先排序，后遍历，以res为基准h指数，遍历值大于res则使用该值代替res
 * @param citations
 */
function hIndex(citations: number[]): number {
    debugger
    let res = 0
    let len = citations.length
    citations.sort((a, b) => a - b)
    for (let i = len - 1; i >= 0; i--) {
        if (citations[i] >= len - i) {
            res = len - i
        }
    }
    return res
}

// console.log(hIndex([3,0,6,1,5]));

//leetCode 453
/**
 * 1.先排序，然后做n的n次方循环 时间复杂度相当高
 * 2.数学方法 论证如下
 *   假设需要做x次加1操作，最终所有的数字都会到达最大值max
 *   则有数学公式 x*(n-1)+原数组的和 sum  = max*n
 *   设原数组最小值为 min 则 max - min = x
 *   -》 sum -n*min = x
 * 3.反向思考 每次都有n-1个数执行加1操作 === 每次都有1个数执行-1操作
 *   一直到所有的数都与最小值相等
 *
 * 本例做2，3种实现，第一种太过简单，不考虑
 * @param nums
 */
function minMoves(nums: number[]): number {
    // let sum = nums.reduce((a,b)=>a+b)
    let sum = eval(nums.join("+")) //远没有reduce快，因为eval需要执行dom，而reduce是纯js驱动
    let min = Math.min(...nums)
    return sum - nums.length * min
}

function minMoves2(nums: number[]): number {
    let min = Math.min(...nums)
    let res = 0
    for (let num of nums) {
        res += num - min
    }
    return res
}

// console.log(minMoves([1,1,1]));

//leetCode 665 中等
function checkPossibility(nums: number[]): boolean {
    let count = 0
    for (let i = 0; i < nums.length - 1; i++) {
        //如果当前数字大于后一位，则肯定需要做一次改变，count++
        if (nums[i] >= nums[i + 1]) {
            count++
            //count>1说明做了不止一次改变，条件不符合了
            if (count > 1) return false
            //如果做了一次count++操作之后，还没有返回，则需要考虑其它情况
            //x,y,z分别为当前循环的前一个，当前，后一个数字
            //则必须满足 x<y<z，所以在置换更换x后，若z<x,则至少要将z置为y大小方可满足不递减的条件
            if (i > 0 && nums[i + 1] < nums[i - 1]) {
                nums[i + 1] = nums[i]
            }
        }
    }
    return true
}

// console.log(checkPossibility([4,2,3,1]));

//leetCode 283 中等

function moveZeroes(nums: number[]): void {
    let doHash = true
    let count = 0
    let time = 0
    let len = nums.length
    while (doHash) {
        if (nums[count] === 0) {
            nums.push(nums.splice(count, 1)[0])
        } else {
            count++
        }
        time++
        doHash = time !== len
    }
}

// moveZeroes([0])

const getTime = (type: number) => {
    let date = new Date(2023, 1, 1)
    if (type === 1) {
        date.setMonth(date.getMonth() - 2)
    } else {
        date.setMonth(date.getMonth() + 1)
    }
    let year = date.getFullYear()
    let month: string | number = date.getMonth()
    let day: string | number = date.getDate()
    if (month <= 9) month = "0" + month
    if (day <= 9) day = "0" + day
    return year + "-" + month + "-" + day
}

// console.log(getTime(0));

// console.log(121/10)

//leetCode 2331 计算布尔二叉树的值


class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null

    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

function evaluateTree(root: TreeNode): boolean {
    if (root.left === null) return root.val === 1
    //@ts-ignore
    if (root.val === 2) return evaluateTree(root.left) || evaluateTree(root.right)
    //@ts-ignore
    if (root.val === 3) return evaluateTree(root.left) && evaluateTree(root.right)
    return true
}

// let tree = new TreeNode(2)
// tree.left = new TreeNode(1)
// tree.right = new TreeNode(3)
// tree.right.left = new TreeNode(0)
// tree.right.right = new TreeNode(1)

// console.log(evaluateTree(tree));
// console.log(Math.pow(2,50))
// let count = 0
// for (let i = 900; i <= 1000 ; i++) {
//     console.log()
//     ++count
// }
// console.log(count)
// let rs = 0
// console.log(++rs)

//leetcode 97 所有子集
function subsets(nums: number[]): number[][] {
    let path: number[] = [] //定义回溯队列
    let result: number[][] = [] //结果
    const backtrack = (start: number) => {
        result.push([...path]) //每次回溯成功后将当前队列解构至结果集
        if (start > nums.length) return
        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]) //当前选择的结果集
            backtrack(i + 1) //递归
            path.pop() //回溯
        }
    }
    backtrack(0)
    return result
}

// console.log(subsets([1, 2, 3]));

//小米面试 两个数的乘积
const twoNumRide = (num1: string, num2: string): string => {
    return (parseInt(num1) * parseInt(num2)).toString()
}

var callbacks = []
for (let i = 0; i < 4; i++) {
    callbacks.push(function () {
        console.log(i);
    });
}
// callbacks.forEach(cb => cb())

const array1 = [1, 3, 5, 1, 2]
// array1.sort((a,b)=>{
//     // return a - b  正序
//     return b - a //倒序
// })
// console.log(array1.slice(0, 1));
// console.log(array1)

let str1 = "Str1d"

// str1.toLowerCase()
// console.log(str1.split("S"))
//
// console.log(str1.substring(0, 8));
// console.log(str1.slice(0, 8));
// console.log(str1)
//
// console.log(3%2)

const multiples = (num: number): string => {
    let path = 2;
    let res = ""
    while (path <= num && path * path <= num) {
        debugger
        if (num % path === 0) {
            res += ` ${path}`
            num /= path
            path = 2
        } else {
            path++
        }
    }
    if (num !== 1) {
        res += ` ${num}`
    }
    return res
}

// console.log(multiples(180));

// let map = new Map()
// map.set(5,6)
// map.set(1,3)
// map.set(4,2)
// // console.log(map)
// let mapArr = Array.from(map)
// mapArr.sort((a:any,b:any)=>{
//     return a[0]-b[0]
// })
// map = new Map(mapArr)
// map.forEach((value, key, map)=>{
//     console.log(value,key)
// })

let str2 = "abc"
let str3 = "bca"
// console.log(str2.localeCompare(str3));
// console.log(parseInt("0xff",16))
// console.log(0xf0f.toString(2))

/**
 * 800 2
 * 400 5
 * 300 5
 * 400 3
 * 500 2
 * @param arrNum
 */

//数据矩阵
const dpTable: number[][] = [
    [6, 2],
    [3, 2],
    [5, 6],
    [4, 5],
]

//动态规划
const dpFun = (arrNum: number[][], weight: number): number[][] => {
    let dp: number[][] = [] //定义记录过程的二维数组
    let v: number[] = [] //物品价值数组
    let w: number[] = [] //物品重量数组
    arrNum.forEach(item => { //初始化重量和价值
        v.push(item[0])
        w.push(item[1])
    })
    //初始化dp，防止为undefined的情况报错
    for (let i = 0; i < w.length; i++) {
        dp.push(new Array(weight))
    }
    for (let i = 0; i < w.length; i++) { //总共有w.lenght个物品，所以创建迭代
        for (let j = 0; j <= weight; j++) { //有边界，因为传入重量后从0开始计算的，所有最后也要计算一次边界
            if (i === 0) {
                dp[i][j] = j < w[i] ? 0 : v[i] //第一行特殊处理，此处可以优化为先添加-1行，这个if可以省略
            } else {
                if (j < w[i]) {
                    dp[i][j] = dp[i - 1][j] //第二行及之后，如果容量不如物品重量，则去之前计算出的最优解
                } else {
                    //如果重量小于背包容量
                    //1.相较于上一次的最优解，当前剩余容量能否装得下当前物品
                    //2.装不下则找到能装下当前物品的上一个最优解，装下之后与不装当前物品的最优解做比较
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - w[i]] + v[i])
                }
            }
        }
    }
    return dp
}

// console.log(dpFun(dpTable,8))

class tdArray {
    array: number[][] = []

    constructor(h: number, w: number) {
        for (let i = 0; i < h; i++) {
            this.array.push([])
            for (let j = 0; j < w; j++) {
                this.array[i].push(0)
            }
        }
    }

    get() {
        return this.array
    }

    set(h: number, w: number) {
        this.array = []
        for (let i = 0; i < h; i++) {
            this.array.push([])
            for (let j = 0; j < w; j++) {
                this.array[i].push(0)
            }
        }
    }
}

const dpData2 = [
    [6, 2],
    [3, 2],
    [5, 6],
    [4, 5],
]
const dpFun2 = (): number[][] => {
    const n = 4, m = 8
    const v = [6, 3, 5, 4], w = [2, 2, 6, 5]
    let dp = new tdArray(4, 8).array
    for (let i = 0; i < n; i++) {
        for (let j = w[i]; j <= m; j++) {
            if (i === 0) {
                dp[i][j] = j >= w[i] ? v[i] : 0
            } else {
                dp[i][j] = dp[i - 1][j]
                if (j >= w[i]) {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - w[i]] + v[i])
                }
            }
        }
    }
    return dp
}

const dpFun3 = (): number[] => {
    const n = 4, m = 8
    const v = [6, 3, 5, 4], w = [2, 2, 6, 5]
    let dp: any = new Array(10).fill(0)
    for (let i = 0; i < n; i++) {
        for (let j = w[i]; j <= m; j++) {
            dp[j] = Math.max(dp[j], dp[j - w[i]] + v[i])
        }
    }
    return dp
}

// console.log(dpFun3());


const dpt = new tdArray(5, 3)
// console.log(dpt.array)

const dpTable2: number[][] = [
    [810, 2, 0],
    [410, 5, 1],
    [310, 5, 1],
    [410, 3, 0],
    [510, 2, 0]
]
const H16 = (money: number, num: number, data: number[][]) => {
    //money是传统背包问题的容量
    //num是题目用于限制选择物品的数量
    //data是数据源
    //重组数据
    let value = []
    let wv = []
    for (let i = 0; i < num; i++) {
        value.push([0, 0, 0])
        wv.push([0, 0, 0])
    }
    for (let i = 0; i < num; i++) {
        if (data[i][2] === 0) {
            value[i][0] = data[i][0]
            wv[i][0] = data[i][0] * data[i][1]
        } else {
            let index = data[i][2] - 1
            if (value[index][1] === 0) {
                value[index][1] = data[i][0]
                wv[index][1] = data[i][0] * data[i][1]
            } else {
                value[index][2] = data[i][0]
                wv[index][2] = data[i][0] * data[i][1]
            }
        }
    }
    //定义dp数组，开始做动态规划
    let dp = new tdArray(num, money).array
    for (let i = 0; i < num; i++) {
        let v0 = value[i][0]
        let v1 = value[i][1]
        let v2 = value[i][2]
        let wv0 = wv[i][0]
        let wv1 = wv[i][1]
        let wv2 = wv[i][2]
        if (i === 0) {
            for (let j = 0; j <= money; j++) {
                dp[i][j] = j >= v0 ? wv0 : 0
                dp[i][j] = j >= v0 + v1 ? wv0 + wv1 : dp[i][j]
                dp[i][j] = j >= v0 + v2 ? wv0 + wv2 : dp[i][j]
                dp[i][j] = j >= v0 + v1 + v2 ? wv0 + wv1 + wv2 : dp[i][j]
            }
        } else {
            for (let j = 0; j <= money; j++) {
                dp[i][j] = j >= v0 ? Math.max(dp[i - 1][j], dp[i - 1][j - v0] + wv0) : dp[i - 1][j]
                dp[i][j] = j >= v0 + v1 ? Math.max(dp[i - 1][j], dp[i - 1][j - v1 - v0] + wv1 + wv0) : dp[i - 1][j]
                dp[i][j] = j >= v0 + v2 ? Math.max(dp[i - 1][j], dp[i - 1][j - v2 - v0] + wv2 + wv0) : dp[i - 1][j]
                dp[i][j] = j >= v0 + v2 + v1 ? Math.max(dp[i - 1][j], dp[i - 1][j - v2 - v0 - v2] + wv2 + wv0 + wv1) : dp[i - 1][j]
            }
        }
    }
    console.log(dp[num - 1][money])
}

// H16(1000,5,dpTable2)

let dataF: any = [
    'A10', 'S20', 'W10', 'D30', 'X', 'A1A', 'B10A11', '', 'A10'
];
let exec = /^[ABCD]\d{1,2}$/
let start = [0, 0];
const HJ17 = (): string => {
    dataF.forEach((item: any) => {
        if (exec.test(item)) {
            debugger
            switch (item[0]) {
                case "A":
                    start[0] -= parseInt(item.slice(1));
                    break;
                case "D":
                    start[0] += parseInt(item.slice(1));
                    break;
                case "W":
                    start[1] += parseInt(item.slice(1));
                    break;
                case "S":
                    start[1] -= parseInt(item.slice(1));
                    break;
                default:
                    return;
            }
        }
    });
    return start.join(",");
};

// console.log(HJ17());

//HJ18 识别有效的IP地址和掩码并进行分类统计
let ipList: string[] = [
    "10.70.44.68~255.254.255.0",
    "192.168.0.2~255.255.255.0",
    "1.0.0.1~255.0.0.0",
    "19..0.~255.255.255.0"
]
const HJ18 = () => {
    const result = [0, 0, 0, 0, 0, 0, 0]
    ipList.forEach((item: string) => {
        let ipYm = item.split("~")
        let ipRes0 = ipTrue(ipYm[0].split("."))
        let ymRes = ymTrue(ipYm[1])
        if (!ymRes || !ipRes0) {
            result[5] += 1
        } else {
            let ipRes = ipFunc(ipYm[0])
            switch (ipRes) {
                case "A":
                    result[0] += 1;
                    break
                case "B":
                    result[1] += 1;
                    break
                case "C":
                    result[2] += 1;
                    break
                case "D":
                    result[3] += 1;
                    break
                case "E":
                    result[4] += 1;
                    break
                case "1A":
                    result[0] += 1;
                    result[6] += 1;
                    break
                case "1B":
                    result[1] += 1;
                    result[6] += 1;
                    break
                case "1C":
                    result[2] += 1;
                    result[6] += 1;
                    break
                default:
                    break
            }
        }
    })
    return result.join(",")
}
/**
 * @function 判断非法ip ip归属 是否私有
 * @param ip 形如172.0.0.0的字符串
 * @return 0:非法ip string:五大类之一的名称 1：私有ip
 */
const ipFunc = (ip: string): number | string => {
    let list = ip.split(".")
    let start = parseInt(list[0])
    if (1 <= start && start <= 126) {
        if (start === 10) return "1A"
        return "A"
    } else if (128 <= start && start <= 191) {
        if (start === 172) return "1B"
        return "B"
    } else if (192 <= start && start <= 223) {
        if (start === 192) return "1C"
        return "C"
    } else if (224 <= start && start <= 239) {
        return "D"
    } else if (240 <= start && start <= 255) {
        return "E"
    } else {
        return -1
    }
}
const ymTrue = (ym: string) => {
    let list = ym.split(".")
    for (let i = 0; i < 4; i++) {
        list[i] = parseInt(list[i]).toString(2)
    }
    let res = list.join("")
    let per = 0
    let end = res.length - 1
    for (let i = 0; i <= end; i++) {
        if (res[i] === "0") {
            debugger
            per = i
            break
        }
    }
    for (let i = end; i >= 0; i--) {
        if (res[i] === "1") {
            debugger
            end = i
            break
        }
    }
    return per - end === 1
}
//判断掩码是否非法
const ipTrue = (list: Array<any>) => {
    let res = list.length === 4
    if (res) {
        for (let i = 0; i < 4; i++) {
            if (list[i] === "" || parseInt(list[i]) > 255) {
                res = false
                break
            }
        }
    }
    return res
}

console.log(HJ18())