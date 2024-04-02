<script setup lang="ts">
import HomePageContent from '@/components/HomePage/HomePageContent.vue';
import LandingPage from '@/components/HomePage/LandingPage.vue';
import type { IUserPreferences } from '@/main';
import { inject, ref } from 'vue';

const { userPreferences } = inject<IUserPreferences>('userPreferences')!;
const { landingPageAlreadyShownThisSession, toggleLandingPageAlreadyShownThisSession } = inject<any>('sessionInfos')!;


const showLandingPage = ref(true);
let shouldSkipLandingPage = userPreferences.value.skipLandingPage || landingPageAlreadyShownThisSession.value;

showLandingPage.value = !shouldSkipLandingPage;

</script>

<template>
    <main>
        <LandingPage v-if="showLandingPage"
            @show-content="showLandingPage = false; toggleLandingPageAlreadyShownThisSession()" />
        <HomePageContent v-else @show-landing="showLandingPage = true" />
    </main>
</template>

<style scoped>
* {
    font-family: 'Rodin'
}

main {
    font-family: "Rodin";
    color: white;
    display: flex;
    width: 100vw;
    height: 100vh;
    flex-direction: column;
    min-height: 100vh;
    background-color: #cbc6b2;
    box-shadow: inset 0 0 150px rgb(77 73 62 / 40%), inset 0 0 150px rgb(77 73 62 / 30%);
    overflow: hidden;
    background-size: 4px 4px;
    background-image: linear-gradient(90deg, transparent, transparent 3px, rgba(0, 0, 0, 0.05) 4px),
        linear-gradient(transparent, transparent 3px, rgba(0, 0, 0, 0.05) 4px);
}
</style>