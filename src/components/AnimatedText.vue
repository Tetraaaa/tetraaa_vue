<script setup lang="ts">
import { getRandomInt } from "@/tools/random";
import { onBeforeUnmount, onBeforeUpdate, onMounted, onUpdated, ref, watch } from "vue";

const { text } = defineProps<{ text: string }>();

const div = ref<HTMLDivElement | null>(null);

function getRandomLetter(word: string) {
    return word.charAt(getRandomInt(0, word.length));
}

function animateLetter(currentLetterIndex: number) {
    let tries = getRandomInt(3, 6)
    const inte = setInterval(() => {
        if (tries === 0) {
            clearInterval(inte)
            div.value!.textContent = div.value!.textContent!.slice(0, currentLetterIndex) + text[currentLetterIndex]
            document.dispatchEvent(new Event("letterPicked"))
            return
        }
        div.value!.textContent = div.value!.textContent!.slice(0, currentLetterIndex) + getRandomLetter(text)
        tries--
    }, 15)
}

function animateText() {
    let currentLetterIndex = 0
    animateLetter(currentLetterIndex)

    document.addEventListener("letterPicked", () => {
        if (currentLetterIndex === text.length - 1) return
        currentLetterIndex += 1
        animateLetter(currentLetterIndex)
    })
}

onMounted(animateText);

onBeforeUnmount(() => {

});
</script>

<template>
    <div ref="div">
        <div style="visibility: hidden">{{ text }}</div>
    </div>
</template>

<style scoped lang="scss"></style>
