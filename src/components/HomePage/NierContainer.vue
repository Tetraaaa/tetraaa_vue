<script setup lang="ts">
const { title } = defineProps<{ title?: string }>();
</script>

<template>
    <div class="container">
        <div v-if="title" class="title">{{ title }}</div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
* {
    font-family: "Rodin-Medium";
    font-size: clamp(0.9rem, 2vw, 1.2rem);
    letter-spacing: 2px;
}

.container {
    color: #4e4b42;
    background-color: #dad4bb;
    display: flex;
    flex-direction: column;
    padding: 0;
}

.title {
    background-color: #4e4b42;
    color: #dad4bb;
    padding: 0 1rem;
}

.content {
    padding: 0.5rem 1rem;
    display: flex;
    height: 100%;
}
</style>
