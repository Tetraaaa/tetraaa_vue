<script setup lang="ts">
import { onMounted, ref } from 'vue';
import HomePageAnimations from '@/components/HomePage/HomePageAnimations.vue';
import NierButton from './NierButton.vue';
import NierLeftBars from './NierLeftBars.vue';
import Navigation from './Navigation.vue';
import Options from './Options.vue';
import quitMenuSound from "@/assets/audio/menu_close.ogg"

const emit = defineEmits(['show-landing']);

const currentlySelectedView = ref<'Navigation' | 'Options'>("Navigation");

function onQuitClick() {
    new Audio(quitMenuSound).play();
    emit('show-landing');
}

</script>

<template>
    <div class="container">
        <NierLeftBars :spacing="`clamp(.75rem, 2vw, 2rem)`">
            <Transition appear>
                <NierButton class="headerButton" @click="currentlySelectedView = 'Navigation'"
                    style="transition-delay: 0.1s;">NAVIGATION
                </NierButton>
            </Transition>
            <Transition appear>
                <NierButton class="headerButton" @click="currentlySelectedView = 'Options'"
                    style="transition-delay: 0.15s;">OPTIONS</NierButton>
            </Transition>
            <Transition appear>
                <NierButton class="headerButton" style="transition-delay: 0.2s;" @click="onQuitClick">QUITTER</NierButton>
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
    font-family: 'Rodin';
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