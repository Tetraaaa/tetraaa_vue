<script setup lang="ts">
import { ref } from "vue";
import AnimatedText from "../AnimatedText.vue";
import NierButton from "./NierButton.vue";
import NierContainer from "./NierContainer.vue";
import NierLeftBars from "./NierLeftBars.vue";
import { useRouter } from "vue-router";
import { useMediaQuery } from "@vueuse/core";

const pages = [
    { name: "Burger", content: "La tierlist des meilleurs burger/frites de Strasbourg en livraison." },
    { name: "Daft", content: 'Une soundboard qui fait référence à "Harder, Better, Faster, Stronger" des Daft Punk.' },
    { name: "GitHub", content: "Les sources pour ce site, et pour mes autres projets." },
    {
        name: "Rogue Like",
        content: "Comme son nom l'indique, un petit prototype de rogue lite inspiré par Crypt of the NecroDancer, développé sous Unity.",
    },
    { name: "Pomme", content: "Ma foi c'est une image de pomme tout ce qu'il y a de plus banal." },
    { name: "Dofus", content: "Un petit guide visuel sur l'ordre dans lequel réaliser les succès sur Dofus pour avoir une progression fluide et agréable." },
    { name: "Crédits", content: "La liste de tout ce qui m'a inspiré pour faire ce site, et les références des images et bouts de code utilisés." },
];
const selectedPage = ref<{ name: string; content: string } | null>(null);

const router = useRouter();

const isBelow800Px = useMediaQuery('(max-width: 800px)')
</script>

<template>
    <AnimatedText class="menuLabel" text="Navigation" />
    <div class="content">
        <NierLeftBars :direction="isBelow800Px ? 'row' : 'column'" :spacing="isBelow800Px ? '1rem' : '1.5rem'" class="options">
            <TransitionGroup appear>
                <NierButton :key="page.name" class="button" @click="selectedPage = page" v-for="(page, index) in pages"
                    :style="{ transitionDelay: index * 0.05 + 's' }">{{ page.name }}</NierButton>
            </TransitionGroup>
        </NierLeftBars>
        <div v-if="selectedPage == null" style="flex: 1"></div>
        <Transition appear name="container">
            <NierContainer v-if="selectedPage != null" class="details" :title="selectedPage.name">
                <div style="display: flex; flex-direction: column; flex: 1">
                    <div style="flex: 1">
                        {{ selectedPage.content }}
                    </div>
                    <div style="display: flex; justify-content: flex-end">
                        <NierButton @click="
                            router.push(
                                '/' +
                                selectedPage.name
                                    .normalize('NFD')
                                    .replace(/[\u0300-\u036f]/g, '')
                                    .replace(/\s+/g, '')
                                    .toLowerCase(),
                            )
                            ">
                            Accéder</NierButton>
                    </div>
                </div>
            </NierContainer>
        </Transition>
    </div>
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
    transition:
        opacity 0.4s linear,
        transform 0.4s ease-out;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: translateX(-75px);
}

.container-enter-active,
.container-leave-active {
    transition: opacity 0.1s linear;
}

.container-enter-from,
.container-leave-to {
    opacity: 0;
}

@media (max-width: 800px) {
    .content {
        flex-direction: column;
    }
    .options {
        flex: 0 !important;
    }
}


.content {
    display: flex;
    gap: clamp(0rem, 2vw, 3rem);
    height: 100%;
    flex-wrap: wrap;
}

.options,
.details {
    flex: 1;
}

.button {
    letter-spacing: 1px;
}

.menuLabel {
    margin-bottom: clamp(0.75rem, 5vw, 3rem);
}
</style>
