<script setup lang="ts">
import { Transition, ref, watch } from "vue";
import NierButton from "../NierButton.vue";
import NierLeftBars from "../NierLeftBars.vue";

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => (isFullScreen.value = true));
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen().then(() => (isFullScreen.value = false));
        }
    }
}

function invertColors() {
    document.getElementById("app")?.classList.toggle("inverted");
}

const isFullScreen = ref(document.fullscreenElement !== null);
</script>

<template>
    <NierLeftBars direction="column" spacing="1.5rem" class="options-right">
        <Transition appear>
            <NierButton @click="invertColors">Inverser les couleurs</NierButton>
        </Transition>
        <Transition appear>
            <NierButton @click="toggleFullScreen">{{ isFullScreen ? "Quitter le plein écran" : "Passer en plein écran" }} </NierButton>
        </Transition>
    </NierLeftBars>
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
    transition:
        opacity 0.3s linear,
        transform 0.3s ease-out;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: translateX(-75px);
}
</style>
