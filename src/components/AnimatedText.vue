<script setup lang="ts">
import { onBeforeUnmount, onBeforeUpdate, onMounted, onUpdated, ref, watch } from "vue";

const { text } = defineProps<{ text: string }>();

const div = ref<HTMLDivElement | null>(null);
const letterInterval = ref<number | null>(null);
const letterSwitchInterval = ref<number | null>(null);

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomLetter(word: string) {
    return word.charAt(getRandomInt(0, word.length));
}

onMounted(() => {
    let textToShow = "";
    let currentLetterIndex = 0;
    letterInterval.value = setInterval(() => {
        if (currentLetterIndex >= text!.length - 1) {
            clearInterval(letterInterval.value!);
            setTimeout(() => {
                div.value!.innerText = text!;
            }, 25);
            return;
        }
        let letter = text!.charAt(currentLetterIndex);

        let tries = getRandomInt(2, 5);
        letterSwitchInterval.value = setInterval(() => {
            if (tries <= 0) {
                clearInterval(letterSwitchInterval.value!);
                return;
            }
            let randomLetter = getRandomLetter(text!);

            textToShow = textToShow.slice(0, currentLetterIndex) + randomLetter;
            div.value!.innerText = textToShow;
            tries--;
        }, 15);
        textToShow = textToShow.slice(0, currentLetterIndex) + letter;
        currentLetterIndex++;
    }, 75);
});

onBeforeUnmount(() => {
    clearInterval(letterInterval.value!);
    clearInterval(letterSwitchInterval.value!);
});
</script>

<template>
    <div ref="div">
        <div style="visibility: hidden">{{ text }}</div>
    </div>
</template>

<style scoped lang="scss"></style>
