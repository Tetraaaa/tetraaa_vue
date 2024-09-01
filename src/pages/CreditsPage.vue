<script setup lang="ts">
import creditsSound from "@/assets/audio/credits.mp3";
import credits from "@/assets/data/credits.json";
import BackButton from "@/components/BackButton.vue";
import { onMounted, ref } from "vue";

const audioPlayer = ref<HTMLAudioElement | null>(null);

onMounted(() => {
    audioPlayer.value!.volume = 0.3;
    audioPlayer.value!.play();
});
</script>

<template>
    <BackButton />
    <div class="container">
        <audio autoplay ref="audioPlayer" loop :src="creditsSound"></audio>
        <div
            class="creditBlock"
            v-for="credit in credits"
            :style="{
                textAlign: credit.priority >= 3 ? 'center' : 'initial',
                fontSize: `${credit.priority * 0.5}rem`,
                margin: `clamp(.25rem, ${(credit.priority - 2) * 1.75}vh ,2rem) 0`,
            }"
        >
            <a :href="credit.link">{{ credit.name }}</a>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    min-height: 100vh;
    background-color: black;
    color: white;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

.creditBlock {
    width: 100%;

    a {
        color: white;
        font-size: inherit;
    }
}
</style>
