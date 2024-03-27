<script setup lang="ts">
import BackButton from '@/components/BackButton.vue';
import { onMounted } from 'vue';

onMounted(() => {
    const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    canvasElement!.width = window.innerWidth;
    canvasElement!.height = window.innerHeight;
    const canvasContext = canvasElement.getContext("2d") as CanvasRenderingContext2D;
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvasElement.width, canvasElement.height);
});

</script>

<template>
    <div class="container">
        <BackButton />
        <canvas id="canvas">

        </canvas>
    </div>
</template>


<style scoped lang="scss">
.container {
    background-color: rgb(51, 51, 51);
    min-height: 100vh;
    position: fixed;
}

.cell {
    width: 16px;
    height: 16px;
    background-color: black;
}
</style>
