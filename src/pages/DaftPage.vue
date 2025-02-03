<script setup lang="ts">
import { ref } from "vue";
import after from "@/assets/audio/daft/after.mp3";
import after1 from "@/assets/audio/daft/after1.mp3";
import after2 from "@/assets/audio/daft/after2.mp3";
import better from "@/assets/audio/daft/better.mp3";
import better1 from "@/assets/audio/daft/better1.mp3";
import better2 from "@/assets/audio/daft/better2.mp3";
import doit from "@/assets/audio/daft/doit.mp3";
import doit1 from "@/assets/audio/daft/doit1.mp3";
import doit2 from "@/assets/audio/daft/doit2.mp3";
import ever from "@/assets/audio/daft/ever.mp3";
import ever1 from "@/assets/audio/daft/ever1.mp3";
import ever2 from "@/assets/audio/daft/ever2.mp3";
import faster from "@/assets/audio/daft/faster.mp3";
import faster1 from "@/assets/audio/daft/faster1.mp3";
import faster2 from "@/assets/audio/daft/faster2.mp3";
import harder from "@/assets/audio/daft/harder.mp3";
import harder1 from "@/assets/audio/daft/harder1.mp3";
import harder2 from "@/assets/audio/daft/harder2.mp3";
import hour from "@/assets/audio/daft/hour.mp3";
import hour1 from "@/assets/audio/daft/hour1.mp3";
import hour2 from "@/assets/audio/daft/hour2.mp3";
import makeit from "@/assets/audio/daft/makeit.mp3";
import makeit1 from "@/assets/audio/daft/makeit1.mp3";
import makeit2 from "@/assets/audio/daft/makeit2.mp3";
import makesus from "@/assets/audio/daft/makesus.mp3";
import makesus1 from "@/assets/audio/daft/makesus1.mp3";
import makesus2 from "@/assets/audio/daft/makesus2.mp3";
import morethan from "@/assets/audio/daft/morethan.mp3";
import morethan1 from "@/assets/audio/daft/morethan1.mp3";
import morethan2 from "@/assets/audio/daft/morethan2.mp3";
import never from "@/assets/audio/daft/never.mp3";
import never1 from "@/assets/audio/daft/never1.mp3";
import never2 from "@/assets/audio/daft/never2.mp3";
import our from "@/assets/audio/daft/our.mp3";
import our1 from "@/assets/audio/daft/our1.mp3";
import our2 from "@/assets/audio/daft/our2.mp3";
import over from "@/assets/audio/daft/over.mp3";
import over1 from "@/assets/audio/daft/over1.mp3";
import over2 from "@/assets/audio/daft/over2.mp3";
import stronger from "@/assets/audio/daft/stronger.mp3";
import stronger1 from "@/assets/audio/daft/stronger1.mp3";
import stronger2 from "@/assets/audio/daft/stronger2.mp3";
import workis from "@/assets/audio/daft/workis.mp3";
import workis1 from "@/assets/audio/daft/workis1.mp3";
import workis2 from "@/assets/audio/daft/workis2.mp3";
import workit from "@/assets/audio/daft/workit.mp3";
import workit1 from "@/assets/audio/daft/workit1.mp3";
import workit2 from "@/assets/audio/daft/workit2.mp3";
import jamMusic from "@/assets/audio/daft/jam.mp3";
import BackButton from "@/components/BackButton.vue";

const backgroundGradients = [
    ["#000000", "#14182b"],
    ["#000000", "#391e83"],
    ["#000000", "#2930a3"],
    ["#000000", "#000000"],
];
const currentMood = ref<0 | 1 | 2 | 3>(0);
const waitingReset = ref(false);
const indexesPressed = ref<number[]>([]);
const jamming = ref<number[]>([]);

function rnd(max: number) {
    return Math.round(Math.random() * max);
}

function compareArrays(arr1: any[], arr2: any[]) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

function playSample(sampleIndex: number) {
    indexesPressed.value = indexesPressed.value.concat(sampleIndex);

    let samples: string[] = [];
    if (currentMood.value === 0) {
        samples = [workit, harder, makeit, better, doit, faster, makesus, stronger, morethan, ever, hour, after, our, workis, never, over];
    } else if (currentMood.value === 1) {
        samples = [
            workit1,
            harder1,
            makeit1,
            better1,
            doit1,
            faster1,
            makesus1,
            stronger1,
            morethan1,
            ever1,
            hour1,
            after1,
            our1,
            workis1,
            never1,
            over1,
        ];
    } else {
        samples = [
            workit2,
            harder2,
            makeit2,
            better2,
            doit2,
            faster2,
            makesus2,
            stronger2,
            morethan2,
            ever2,
            hour2,
            after2,
            our2,
            workis2,
            never2,
            over2,
        ];
    }

    let a = new Audio(samples[sampleIndex]);

    a.play();

    updateMoodShift();
}

function updateMoodShift() {
    if (waitingReset.value) {
        let last2Presses = indexesPressed.value.slice(-2);
        if (compareArrays(last2Presses, [14, 15])) {
            reset();
            return;
        }
    }

    if (indexesPressed.value.length < 16) return;

    let last16Presses = indexesPressed.value.slice(-16);

    if (currentMood.value < 3 && compareArrays(last16Presses, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])) currentMood.value++;
    if (currentMood.value === 3 && !waitingReset.value) jam();
}

function reset() {
    waitingReset.value = false;
    currentMood.value = 0;
    indexesPressed.value = [];
}

function drawEight() {
    let jamming = [];
    for (let i = 0; i <= 8; i++) {
        jamming.push(rnd(15));
    }
    return jamming;
}

function jam() {
    const jammingInterval = setInterval(() => {
        jamming.value = drawEight();
    }, 250);
    setTimeout(() => {
        jamming.value = [];
        clearInterval(jammingInterval);
        waitingReset.value = true;
    }, 15000);

    setTimeout(() => {
        let a = new Audio(jamMusic);
        a.play();
    }, 450);
}
</script>

<template>
    <BackButton />
    <div
        class="container"
        :style="{
            background: `radial-gradient(ellipse at bottom, ${backgroundGradients[currentMood][0]} 0%, ${backgroundGradients[currentMood][1]} 100%)`,
            pointerEvents: currentMood === 3 && !waitingReset ? 'none' : 'all',
        }"
    >
        <div v-if="!waitingReset" class="dedans">
            <div
                class="cell"
                :class="{ jamming: jamming.includes(inx) }"
                v-for="(cell, inx) in Array(16).fill(0)"
                @mousedown="playSample(inx)"
                :style="{ backgroundColor: `hsl(${rnd(360)} 100% 40%)` }"
            ></div>
        </div>
        <div v-else class="dedans" style="place-items: center; grid-template-columns: 1fr 1fr">
            <div
                class="cell"
                v-for="(cell, inx) in Array(2).fill(0)"
                @mousedown="playSample(inx + 14)"
                :style="{ backgroundColor: `hsl(${rnd(360)} 100% 40%)` }"
            ></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
    padding: clamp(3rem, 5vw, 12.5rem);
    overflow: hidden;
}

.dedans {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: clamp(1rem, 1.5vw, 2rem);
    aspect-ratio: 1;
}

@media (min-width: 800px) {
    .dedans {
        height: 100%;
    }
}

@media (max-width: 800px) {
    .dedans {
        width: 100%;
    }
}

.cell {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: clamp(4px, 1vw, 16px);
    font-size: 3em;
    cursor: pointer;
    min-height: 4rem;
    min-width: 4rem;
    aspect-ratio: 1;
    width: 100%;
    box-shadow: inset 0 0 clamp(8px, 4vw, 32px) clamp(8px, 4vw, 30px) rgba(0, 0, 0, 0.39);
    transition: filter 0.35s;

    &.jamming {
        filter: brightness(1.5);
    }

    &.disabled {
        transition: none;
        cursor: initial;

        &:hover {
            filter: none;
        }
    }

    &:hover {
        filter: brightness(1.3);
    }
}
</style>
