<script setup lang="ts">
import { onMounted, ref } from "vue";
import HomePageAnimations from "@/components/HomePage/HomePageAnimations.vue";
import NierButton from "./NierButton.vue";
import NierLeftBars from "./NierLeftBars.vue";
import Navigation from "./Navigation.vue";
import Options from "./Options.vue";
import quitMenuSound from "@/assets/audio/menu_close.ogg";
import backgroundVideo from "../../assets/videos/2b_chilling_forest_v3.mp4";

const emit = defineEmits(["show-landing"]);

const currentlySelectedView = ref<"Navigation" | "Options">("Navigation");

interface Coords {
    x: number;
    y: number;
    inverted: boolean;
}

function onQuitClick() {
    new Audio(quitMenuSound).play();
    addVideoBehindMainElement();
    let main = document.querySelector("main");
    main!.style.position = "fixed";
    animateTriangles();
}

function addVideoBehindMainElement() {
    let video = document.createElement("video");
    video.muted = true;
    video.setAttribute("muted", "true");
    video.setAttribute("autoplay", "true");
    video.setAttribute("loop", "true");
    video.style.clipPath = "url(#myClip)";
    video.style.width = "100vw";
    video.style.height = "100vh";
    video.style.position = "fixed";
    video.style.objectFit = "cover";
    video.style.pointerEvents = "none";
    video.id = "seeThroughVideo";

    let source = document.createElement("source");
    source.setAttribute("src", backgroundVideo);
    source.setAttribute("type", "video/mp4");
    video.appendChild(source);
    document.getElementById("app")?.appendChild(video);
    video.load();
    video.play();
}

function getNode(name: string, v?: any) {
    let element = document.createElementNS("http://www.w3.org/2000/svg", name);
    for (var p in v) element.setAttributeNS(null, p, v[p]);
    return element;
}

function generateSVGTriangle(x: number, y: number, width: number, inverted: boolean) {
    width = width * 2 + 2;
    let triangle;
    if (inverted) {
        triangle = getNode("polygon", { points: `0 0, ${width / 2} ${width / 2}, ${width} 0` });
    } else {
        triangle = getNode("polygon", { points: `0 ${width / 2}, ${width} ${width / 2}, ${width / 2} 0` });
    }
    triangle.style.transform = `translate(${x}px, ${y}px)`;
    triangle.style.transformBox = `fill-box`;
    triangle.style.transformOrigin = `center`;
    return triangle;
}

function animateTriangles() {
    let svg = getNode("svg");
    svg.style.position = "fixed";
    svg.id = "svgMask";
    let mask = getNode("clipPath");
    mask.id = "myClip";
    svg.appendChild(mask);
    let container = mask;
    document.body.appendChild(svg);
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
            emit("show-landing");
            document.getElementById("svgMask")?.remove();
            setTimeout(() => {
                let seeThroughVideo: HTMLVideoElement = document.getElementById("seeThroughVideo") as HTMLVideoElement;
                document.getElementById("video")?.replaceWith(seeThroughVideo);
                document.getElementById("seeThroughVideo")!.id = "video";
            }, 200);
            return;
        }
        for (let i = 0; i < 8; i++) {
            let randomIndex = Math.floor(Math.random() * availableCoords.length);
            let picked = availableCoords[randomIndex];
            container.appendChild(generateSVGTriangle(picked.x, picked.y, triangleWidth, picked.inverted));
            availableCoords.splice(randomIndex, 1);
        }
    }, 30);
}
</script>

<template>
    <div class="container">
        <NierLeftBars :spacing="`clamp(.75rem, 2vw, 2rem)`">
            <Transition appear>
                <NierButton class="headerButton" @click="currentlySelectedView = 'Navigation'"
                    style="transition-delay: 0.1s">NAVIGATION </NierButton>
            </Transition>
            <Transition appear>
                <NierButton class="headerButton" @click="currentlySelectedView = 'Options'"
                    style="transition-delay: 0.15s">OPTIONS</NierButton>
            </Transition>
            <Transition appear>
                <NierButton class="headerButton" style="transition-delay: 0.2s" @click="onQuitClick">QUITTER
                </NierButton>
            </Transition>
        </NierLeftBars>
        <HomePageAnimations />
    </div>
    <div class="content">
        <Navigation v-if="currentlySelectedView === 'Navigation'" />
        <Options v-if="currentlySelectedView === 'Options'" />
    </div>
</template>

<style scoped>
:deep(.menuLabel) {
    font-size: clamp(2rem, 5vw, 3rem);
    text-transform: uppercase;
    text-shadow: 5px 5px #989589;
    color: #44423a;
    letter-spacing: 7px;
    font-family: "Rodin";
}

.headerButton {
    font-size: clamp(0.75rem, 1vw, 1.2rem);
}

.container {
    height: 10vh;
    display: flex;
    padding: clamp(0.5rem, 1vw, 1rem) clamp(1rem, 2vw, 4rem);
    align-items: center;
}

.content {
    margin: clamp(0.5rem, 1vw, 1rem) clamp(1rem, 2vw, 4rem);
    z-index: 1;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s linear;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
