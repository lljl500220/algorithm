const getRandom = (size: number) => {
    return Math.floor(Math.random() * size) + 1
}

//01背包 -- 正常解法
/**
 *
 * @param num 选取物品的个数
 * @param weight 背包容量
 */
const o1dp = (num: number, weight: number): number[] => {
    let v = [0] //物品价值数组
    let w = [0] //物品重量数组
    let dp = new Array(num + 1)
    dp[0] = new Array(weight + 1).fill(0)
    for (let i = 1; i <= num; i++) {
        v.push(getRandom(10))
        w.push(getRandom(10))
        dp[i] = new Array(weight + 1).fill(0)
        for (let j = 1; j <= weight; j++) {
            if (j >= w[i]) dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - w[i]] + v[i])
            else {
                dp[i][j] = dp[i - 1][j]
            }
        }
    }
    return dp
}
// console.log(o1dp(5,10))
// o1dp(5,10)

//01背包 -- 倒序遍历 --空间复杂度优化 --一维数组
/**
 *
 * @param num 选取物品的个数
 * @param weight 背包容量
 */
const o1dp2 = (num: number, weight: number): number[] => {
    let dp = new Array(weight + 1).fill(0)
    for (let i = 1; i < num; i++) {
        let v = getRandom(10)
        let w = getRandom(10)
        for (let j = weight; j >= w; j--) {
            dp[j] = Math.max(dp[j - 1], dp[j - w] + v)
        }
    }
    return dp
}
// console.log(o1dp2(5,10))


//完全背包问题，与01背包不同的是所有物品可以重复放入，在有限的容量内获取最大价值。
//完全背包，从01背包公式的来的基础解法，沿用了基本的状态转移方程。但是要在基础循环上加上K个当前物品
/**
 *
 * @param num 选取物品的个数
 * @param weight 背包容量
 */
const completely = (num: number, weight: number): number[] => {
    let dp = new Array(num + 1)
    dp[0] = new Array(weight + 1).fill(0)
    for (let i = 1; i <= num; i++) {
        let v = getRandom(10)
        let w = getRandom(10)
        console.log(v,w)
        dp[i] = new Array(weight + 1).fill(0)
        for (let j = 1; j <= weight; j++) {
            if (j >= w) {
                for (let k = 1; k <= num && k * w <= j; k++) {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - k*w] + k*v)
                }
            } else {
                dp[i][j] = dp[i - 1][j]
            }
        }
    }
    return dp
}
// console.log(completely(5,10))

//完全背包优化 --时间复杂度优化
//本问题完全可以不遍历K次，因为在j>w的情况下，必然存在 v/w最大的数值能够满足在有限的空间内达成最大价值
/**
 *
 * @param num
 * @param weight
 */
const completely2 = (num: number, weight: number): number => {
    let proportion = 0 //记录v/w的大小
    let v_value = 0
    let w_weight = 0
    for (let i = 1; i <= num; i++) {
        let v = getRandom(10)
        let w = getRandom(10)
        console.log(v,w)
        let tempPro = v/w
        if (tempPro>proportion){
            proportion = tempPro
            w_weight = w
            v_value = v
        }
    }
    return v_value * (weight / w_weight)
}

// console.log(completely2(5,10))

// 类似01背包的优化
const completely3 = (num: number, weight: number): number[] => {
    let dp = new Array(weight+1).fill(0)
    for (let i = 1; i < num; i++) {
        let v = getRandom(10)
        let w = getRandom(10)
        console.log(v,w)
        for (let j = w; j <= weight; j++) {
            dp[j] = Math.max(dp[j],dp[j-w]+v)
        }
    }
    return dp
}
// console.log(completely3(5,10))

//多重背包
//多重背包问题
