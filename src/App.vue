<template>
  <router-view />

  <canvas id="gameCanvas" width="480" height="320"></canvas>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue"

const element = ref({
  x: 10,
  y: 40,
  width: 50,
  height: 50,
})

let interval
let elementDirection

onMounted(() => {
  const canvas = document.getElementById("gameCanvas")
  const ctx = canvas.getContext("2d")

  function draw() {
    clearCanvas()

    drawElement()
    drawEnemy()
  }

  interval = setInterval(draw, 10)

  addEventListener("keydown", (evt) => {
    if (evt.code === "KeyD") {
      element.value.x += 2
      elementDirection = "right"
    }
    if (evt.code === "KeyA") {
      element.value.x -= 2
      elementDirection = "left"
    }
    if (evt.code === "KeyS") {
      element.value.y += 2
      elementDirection = "bottom"
    }
    if (evt.code === "KeyW") {
      element.value.y -= 2
      elementDirection = "top"
    }
    console.log(elementDirection)
  })

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  function drawElement() {
    ctx.beginPath()
    ctx.rect(
      element.value.x,
      element.value.y,
      element.value.width,
      element.value.height
    )
    ctx.fillStyle = "#7c8358"
    ctx.fill()
    ctx.closePath()
  }

  const bullet = ref({
    x: null,
    y: null,
    radius: 5,
    speed: 2,
  })

  addEventListener("keydown", (evt) => {
    if (evt.code === "ControlRight") {
      bullet.value.x = element.value.x + element.value.width
      bullet.value.y = element.value.y + element.value.height / 2
      console.log("shot")
      shot()
    }
  })

  const enemy = ref({
    x: 400,
    y: 100,
    width: 50,
    height: 50,
  })

  function drawEnemy() {
    ctx.beginPath()
    ctx.rect(
      enemy.value.x,
      enemy.value.y,
      enemy.value.width,
      enemy.value.height
    )
    ctx.fillStyle = "#ad0b17"
    ctx.fill()
    ctx.closePath()
  }

  function drawBullet() {
    ctx.beginPath()
    ctx.arc(bullet.value.x, bullet.value.y, 5, 0, 2 * Math.PI)
    // if (elementDirection === "right") {
    //   bullet.value.x = element.value.x + element.value.width
    //   bullet.value.y = element.value.y + element.value.height / 2
    //   ctx.arc(
    //     bullet.value.x,
    //     bullet.value.y,
    //     bullet.value.radius,
    //     0,
    //     2 * Math.PI
    //   )
    // }
    // if (elementDirection === "left") {
    //   ctx.arc(
    //     element.value.x,
    //     element.value.y + element.value.height / 2,
    //     5,
    //     0,
    //     2 * Math.PI
    //   )
    // }
    // if (elementDirection === "bottom") {
    //   ctx.arc(
    //     element.value.x + element.value.width / 2,
    //     element.value.y + element.value.height,
    //     5,
    //     0,
    //     2 * Math.PI
    //   )
    // }
    // if (elementDirection === "top") {
    //   ctx.arc(
    //     element.value.x + element.value.width / 2,
    //     element.value.y,
    //     bullet.value.radius,
    //     0,
    //     2 * Math.PI
    //   )
    // }
    ctx.fillStyle = "#aa59ec"
    ctx.fill()
    ctx.closePath()
  }

  function shot() {
    drawBullet()
    if (
      bullet.value.x > enemy.value.x &&
      bullet.value.x < enemy.value.x + enemy.value.width &&
      bullet.value.y > enemy.value.y &&
      bullet.value.y < enemy.value.y + enemy.value.height
    ) {
      console.log(1)
    }

    if (bullet.value.x + bullet.value.radius < canvas.width) {
      bullet.value.x += bullet.value.speed
      requestAnimationFrame(shot)
    }
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
