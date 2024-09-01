<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUnmounted } from "vue";
import menuOpenSound from "../../assets/audio/menu_open.ogg";

const emit = defineEmits(["animations-finished"]);

interface Coords {
    x: number;
    y: number;
    inverted: boolean;
}

onMounted(() => {
    new Audio(menuOpenSound).play();
    document.getElementById("video")!.style.filter = "blur(2px)";
    setTimeout(() => {
        animateLines();
        setTimeout(animateTriangles, 400);
    }, 1);
});

onBeforeUnmount(() => {
    document.getElementById("video")!.style.filter = "none";
    document.querySelectorAll<HTMLDivElement>(".home-line").forEach((e: HTMLDivElement) => (e.style.width = "0%"));
    document.querySelectorAll<HTMLDivElement>(".triangle").forEach((e: HTMLElement) => e.remove());
});

function animateLines() {
    document.querySelectorAll<HTMLDivElement>(".home-line").forEach((e: HTMLDivElement) => (e.style.width = "100%"));
}

function animateTriangles() {
    let container = document.querySelector(".lines")!;
    let availableCoords: Coords[] = [];

    let TRIANGLES_PER_ROW = 16;
    let TRIANGLES_PER_COLUMN = 8;
    if (document.body.clientWidth < document.body.clientHeight) {
        //L'écran est en mode portrait, on passe à 16 triangles en hauteur et 8 en largeur pour éviter qu'ils soient tout étirés
        TRIANGLES_PER_COLUMN = 16;
        TRIANGLES_PER_ROW = 8;
    }

    let triangleWidth = Math.ceil(document.body.clientWidth / TRIANGLES_PER_ROW);
    let triangleHeight = Math.ceil(document.body.clientHeight / TRIANGLES_PER_COLUMN);

    //On génère toutes les coordonnées possibles (la boucle commence à -1 pour qu'il n'y ait pas de trou à gauche de l'écran)
    for (let i = -1; i < TRIANGLES_PER_ROW; i++) {
        for (let j = 0; j < TRIANGLES_PER_COLUMN; j++) {
            availableCoords.push({
                x: i * triangleWidth,
                y: j * triangleHeight,
                inverted: i % 2 == 0 ? j % 2 == 1 : j % 2 == 0,
            });
        }
    }

    //Toutes les 30ms, on affiche 8 nouveaux triangles isocèles aléatoires parmi ceux qui ne sont pas encore affichés
    let interval = setInterval(() => {
        if (availableCoords.length == 0) {
            clearInterval(interval);
            emit("animations-finished");
            return;
        }
        for (let i = 0; i < 8; i++) {
            let randomIndex = Math.floor(Math.random() * availableCoords.length);
            let picked = availableCoords[randomIndex];
            container.appendChild(generateTriangle(picked.x, picked.y, triangleHeight, triangleWidth, picked.inverted));
            availableCoords.splice(randomIndex, 1);
        }
    }, 30);
}

function generateTriangle(x: number, y: number, height: number, width: number, inverted: boolean) {
    let triangle = document.createElement("div");
    triangle.style.position = "fixed";
    triangle.style.left = x + "px";
    triangle.style.top = y + "px";
    triangle.style.width = "0";
    triangle.style.height = "0";
    triangle.style.borderLeft = `${width + 1}px solid transparent`;
    triangle.style.borderRight = `${width + 1}px solid transparent`;
    triangle.style.borderBottom = `${height + 1}px solid #cbc6b2`;
    triangle.classList.add("triangle");
    if (inverted) triangle.style.transform = "rotate(180deg)";

    return triangle;
}
</script>

<template>
    <div class="lines">
        <div class="home-line horizontal-1"></div>
        <div class="home-line horizontal-2"></div>
        <div class="home-line top-left-1"></div>
        <div class="home-line top-left-2"></div>
        <div class="home-line top-right-1"></div>
        <div class="home-line top-right-2"></div>
        <div class="home-line bottom-left"></div>
        <div class="home-line bottom-right"></div>
    </div>
</template>

<style scoped lang="scss">
.home-line {
    background-color: #cbc6b2;
    height: 3px;
    width: 0;
    transition: width 0.4s;
    position: fixed;

    &.horizontal-1 {
        top: 10%;
        left: 0;
    }

    &.horizontal-2 {
        bottom: 10%;
        right: 0;
    }

    &.top-left-1 {
        top: 0;
        left: 0;
        transform: rotate(45deg);
        transform-origin: left;
    }

    &.top-left-2 {
        top: 0;
        left: 10%;
        transform: rotate(45deg);
        transform-origin: left;
    }

    &.top-right-1 {
        top: 0;
        right: 0;
        transform: rotate(-45deg);
        transform-origin: right;
    }

    &.top-right-2 {
        top: 0;
        right: 10%;
        transform: rotate(-45deg);
        transform-origin: right;
    }

    &.bottom-left {
        bottom: 0;
        left: 0;
        transform: rotate(-45deg);
        transform-origin: left;
    }

    &.bottom-right {
        bottom: 0;
        right: 0;
        transform: rotate(45deg);
        transform-origin: right;
    }
}
</style>
