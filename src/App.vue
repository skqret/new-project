<template>
  <router-view />

  <canvas id="gameCanvas" width="480" height="320"></canvas>
</template>

<script setup>
import { computed, onMounted, ref, onBeforeUnmount } from "vue"

const element = ref({
  x: 40,
  y: 40,
})
let interval

const comp = computed(() => {
  return element.value + 1
})

onMounted(() => {
  const canvas = document.getElementById("gameCanvas")
  const ctx = canvas.getContext("2d")

  function draw() {
    clearCanvas()

    drawElement()
  }

  interval = setInterval(draw, 10)

  addEventListener("keydown", (evt) => {
    if (evt.code === "KeyD") {
      element.value.x += 2
    }
    if (evt.code === "KeyA") {
      element.value.x -= 2
    }
    if (evt.code === "KeyS") {
      element.value.y += 2
    }
    if (evt.code === "KeyW") {
      element.value.y -= 2
    }
  })

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  function drawElement() {
    ctx.beginPath()
    ctx.rect(element.value.x, element.value.y, 50, 50)
    ctx.fillStyle = "#7c8358"
    ctx.fill()
    ctx.closePath()
  }
})

onBeforeUnmount(() => {
  clearInterval(interval)
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
