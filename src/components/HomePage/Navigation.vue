<script setup lang="ts">
import { ref } from 'vue';
import AnimatedText from '../AnimatedText.vue';
import NierButton from './NierButton.vue';
import NierContainer from './NierContainer.vue';
import NierLeftBars from './NierLeftBars.vue';
import { useRouter } from 'vue-router';

const pages = [
    { name: "Burger", content: "La tierlist des meilleurs burger/frites de Strasbourg en livraison." },
    { name: "Morpion", content: "Un morpion tout ce qu'il y a de plus banal, mais avec un twist et un système de points." },
    { name: "Daft", content: 'Une soundboard qui fait référence à "Harder, Better, Faster, Stronger" des Daft Punk.' },
    { name: "Life", content: "Une implémentation très abstraite du Game of Life de John Conway." },
    { name: "Pomme", content: "Ma foi c'est une image de pomme tout ce qu'il y a de plus banal." },
    { name: "Crédits", content: "La liste de tout ce qui m'a inspiré pour faire ce site, et les références des images et bouts de code utilisés." }
]
const selectedPage = ref<{ name: string, content: string } | null>(null);

const router = useRouter();

</script>

<template>
    <AnimatedText class="menuLabel" text="Navigation" />
    <div class="content">
        <NierLeftBars direction="column" spacing="1.5rem" class="options">
            <TransitionGroup appear>
                <NierButton :key="page.name" class="button" @click="selectedPage = page" v-for="(page, index) in pages"
                    :style="{ transitionDelay: index * 0.05 + 's' }">{{
                        page.name
                    }}</NierButton>
            </TransitionGroup>
        </NierLeftBars>
        <div v-if="selectedPage == null" style="flex:1"></div>
        <Transition appear name="container">
            <NierContainer v-if="selectedPage != null" class="details" :title="selectedPage.name">
                <div style="display: flex;flex-direction: column;flex:1">
                    <div style="flex:1">
                        {{ selectedPage.content }}
                    </div>
                    <div style="display:flex;justify-content: flex-end;">
                        <NierButton
                            @click="router.push('/' + selectedPage.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase())">
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
    transition: opacity 0.4s linear, transform 0.4s ease-out;
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

.content {
    display: flex;
    gap: clamp(1rem, 2vw, 3rem);
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
    margin-bottom: clamp(.75rem, 5vw, 3rem);
}
</style>