<script setup lang="ts">
const { title } = defineProps<{ title: string }>();

</script>

<template>
    <div class="title">{{ title }}</div>
</template>

<style scoped lang="scss">
.title {
    font-size: 1.5rem;
    color: white;
    font-weight: bold;
    margin-bottom: 1rem;
}
</style>
