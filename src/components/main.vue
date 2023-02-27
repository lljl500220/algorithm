<template>
  <div id="div1" @drop="drop" @mouseup="mouseup" @dragover="dragover"></div>
  <div style="position:relative;width: 120px;height: 120px;background-color: red" id="drag1" draggable="true"
       @dragstart="drag"></div>
</template>

<script lang="ts" setup>
import axios from "axios";

function dragover(ev:any) {
  ev.preventDefault();
}

function drag(ev:any) {
  ev.dataTransfer.setData("Text", ev.target.id);
}

function drop(ev:any) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("Text");
  ev.target.appendChild(document.getElementById(data));
  setupPosition(data,50,50)
  let arr1 = prompt("输入字符串")
// @ts-ignore
  console.log(arr1.split("\\"))
}

function setupPosition(target:string,left:number,top:number){
  let doc:any = window.document.getElementById(target)
  doc.style.position = "absolute"
  doc.style.left = left.toString() + "px"
  doc.style.top = left.toString() + "px"
}
function ws(url: string) {
  let webSocket = new WebSocket(url)
  webSocket.onopen = () => {
    webSocket.send('连上了')
    console.log(url)
  }
  webSocket.onclose = () => {
    ws(url)
  }
  webSocket.onerror = (error) => {
    console.log(error)
  }
  return webSocket;
}

ws("wss://117.175.182.152:40011/test-ws/websocket?phone=116")

axios.get('',{
  headers:{

  }
})
</script>

<style scoped lang="less">
#div1{
  width: 200px;
  height: 200px;
  border: 1px solid wheat;
}
</style>
