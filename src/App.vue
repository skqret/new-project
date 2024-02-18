<template>
  <router-view />

  {{ test }}

  {{ comp }}

  <canvas id="gameCanvas" width="480" height="320"></canvas>
</template>

<script setup>
import { computed, ref } from "vue"

const test = ref(1)

const comp = computed(() => {
  return test.value + 1
})
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

canvas {
  background: #eee;
  display: block;
  margin: 0 auto;
}
</style>
