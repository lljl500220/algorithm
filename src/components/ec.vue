<template>
<div id="main"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import {onMounted, reactive, ref} from "vue";
const main:any = ref(null)
const myChart = echarts.init(main.value)

const option  = reactive({
  title:{
    text:'关系图'
  },
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  series:[
    {

    }
  ]
})

const init = () => {

}

onMounted(()=>{
  init()
})
</script>

<style scoped lang="less">
.main{
  width: 1000px;
  height: 1000px;
}
</style>