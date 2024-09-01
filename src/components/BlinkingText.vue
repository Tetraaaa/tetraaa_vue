<script setup lang="ts"></script>

<template>
    <div>
        <slot></slot>
    </div>
</template>

<style scoped>
* {
    margin-left: 0;
    animation: blink 1s step-start 0s infinite;
    visibility: visible;
}

@keyframes blink {
    50% {
        visibility: hidden;
    }
}
</style>
