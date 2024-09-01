<script setup lang="ts">
import { ref } from "vue";
import AnimatedText from "../AnimatedText.vue";
import NierButton from "./NierButton.vue";
import NierLeftBars from "./NierLeftBars.vue";
import Affichage from "./OptionMenus/Affichage.vue";
import MusiqueEtSon from "./OptionMenus/MusiqueEtSon.vue";
import Autre from "./OptionMenus/Autre.vue";
import Site from "./OptionMenus/Site.vue";

const selectedSection = ref<"Site" | "Affichage" | "Musique & Son" | "Autre" | null>(null);
</script>

<template>
    <AnimatedText class="menuLabel" text="Options" />
    <div class="content">
        <NierLeftBars direction="column" spacing="1.5rem" class="options">
            <Transition appear>
                <NierButton @click="selectedSection = 'Site'">Site</NierButton>
            </Transition>
            <Transition appear>
                <NierButton @click="selectedSection = 'Affichage'" style="transition-delay: 0.05s">Affichage </NierButton>
            </Transition>
            <Transition appear>
                <NierButton style="transition-delay: 0.1s" @click="selectedSection = 'Musique & Son'">Musique & Son </NierButton>
            </Transition>
            <Transition appear>
                <NierButton style="transition-delay: 0.15s" @click="selectedSection = 'Autre'">Autre</NierButton>
            </Transition>
        </NierLeftBars>
        <Site v-if="selectedSection === 'Site'" />
        <Affichage v-if="selectedSection === 'Affichage'" />
        <MusiqueEtSon v-if="selectedSection === 'Musique & Son'" />
        <Autre v-if="selectedSection === 'Autre'" />
        <div style="flex: 2" v-if="selectedSection === null"></div>
    </div>
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

.content {
    display: flex;
    gap: clamp(0rem, 2vw, 3rem);
    height: 100%;
}

.options {
    flex: 1;
}

.options-right {
    flex: 2;
}

.button {
    letter-spacing: 1px;
    font-size: 1.2rem;
}

.menuLabel {
    margin-bottom: 3rem;
}
</style>
