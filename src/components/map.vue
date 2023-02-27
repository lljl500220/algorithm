<template>
  <div ref="map" style="width: 50%;height: 33.3vh"></div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import guizhou from "../guizhou.json"
import * as echarts from "echarts"

const map: any = ref(null)

const data = reactive([{name: "贵阳市", value: 0, selected: true},
  {name: "遵义市", value: 1000},
  {name: "六盘水市", value: 2000},
  {name: "毕节市", value: 3000},
  {name: "铜仁市", value: 4000},
  {name: "安顺市", value: 5000},
  {name: "黔西南布依族苗族自治州", value: 6000},
  {name: "黔东南苗族侗族自治州", value: 7000},
  {name: "黔南布依族苗族自治州", value: 8000},])

const option = reactive({
  tooltip: {
    trigger: "item",
    position:"right",
    formatter: (name) => {
      let str =
          `
      <div style="height: 30vh;width: 25vh;font-size: 5px">
      <p class="e-tootip-p">加油站</p>
      <p class="e-tootip-p">加油站数量（个</p>
     <p class="e-tootip-p">国营：${1}  民营：${1}<p/>
       <p class="e-tootip-p">加油量（万升）<p/>
      <p class="e-tootip-p">全年：${1}   上月：${1}<p/>
      <p class="e-tootip-p">交易额（万元）<p/>
     <p class="e-tootip-p">全年：${1}   上月：${1}<p/>
      <p class="e-tootip-p">异常预警（次）<p/>
      <p class="e-tootip-p">当前：0   全年：1</p>
      </div>
`
      return str
    }
  },
  series: [
    {
      name: "数据名称",
      type: "map",
      map: "贵州",
      label: {show: true,formatter:(param:any)=>{
          if (param.name.length>4){
            return param.name.slice(0,4)+"\n"+param.name.slice(4)
          }
      }},
      itemStyle: {
        emphasis: {areaColor: "#019FE9"},
      },
      layoutCenter: ["50%", "50%"], //位置
      layoutSize: "100%",
      data: data
    },
  ],
})

onMounted(() => {
  echarts.registerMap("贵州", guizhou)
  let emap = echarts.init(map.value)
  emap.setOption(option)
  window.addEventListener("resize", () => {
    emap.resize();
  });
})
</script>
<style>
.e-tootip-p{
  padding: 0;
  margin: 0;
  line-height: 12px;
  font-size: 5px;
}
</style>