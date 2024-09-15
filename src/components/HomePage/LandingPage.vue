<script setup lang="ts">
import BlinkingText from "@/components/BlinkingText.vue";
import LandingPageAnimations from "@/components/HomePage/LandingPageAnimations.vue";
import { getLandingPageVideo } from "@/tools/video";
import { inject, ref } from "vue";

const isAnimationShown = ref(false);

const emit = defineEmits(["show-content"]);

function onAnimationsFinished() {
    emit("show-content");
    isAnimationShown.value = false;
}

const { backroundMusicPlaying, toggleBackgroundMusic, backroundVoicesPlaying, toggleBackgroundVoices } = inject<any>("backgroundMusic");
</script>

<template>
    <div class="container">
        <video id="video" muted autoplay loop>
            <source :src="getLandingPageVideo()" type="video/mp4" />
        </video>
        <Transition appear>
            <h1>TETRAAA.FR<BlinkingText>_</BlinkingText></h1>
        </Transition>
        <Transition appear>
            <div class="buttons">
                <button @click="isAnimationShown = !isAnimationShown">Accéder au site</button>
                <button @click="toggleBackgroundMusic">{{ backroundMusicPlaying ? "Couper la musique" : "Activer la musique" }}</button>
                <button @click="toggleBackgroundVoices">{{ backroundVoicesPlaying ? "Couper le chant" : "Activer le chant" }}</button>
            </div>
        </Transition>

        <LandingPageAnimations v-if="isAnimationShown" @animations-finished="onAnimationsFinished" />
    </div>
</template>

<style scoped>
* {
    font-family: "Rodin";
    color: white;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.buttons {
    display: flex;
    margin-top: 1.5rem;
    gap: 0.75rem;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    user-select: none;
}

video {
    position: fixed;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    pointer-events: none;
}

button {
    cursor: pointer;
    font-size: clamp(0.75rem, 4vw, 1.25rem);
    position: relative;
    background: transparent;
    border: none;
    border-radius: 4px;
    padding: 0.75rem;
    transition: opacity 0.25s;
    color: inherit;
    font-family: inherit;
    text-transform: uppercase;
}

h1 {
    position: relative;
    display: flex;
    font-size: clamp(2.5rem, 5vw, 5rem);
    text-shadow: 0.75rem 0.75rem #989589;
    letter-spacing: 5px;
    margin-left: 2rem;
    padding-bottom: 3px;
    text-align: center;
    user-select: none;
    text-transform: uppercase;
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
