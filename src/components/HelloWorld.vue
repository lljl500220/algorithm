<template>
  <button @click="router.back()">back</button>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
const router = useRouter()
</script>

<style scoped>
.video{
  width: 100%;
  height: 100%;
  margin: auto;
}
</style>
<style>
</style>
