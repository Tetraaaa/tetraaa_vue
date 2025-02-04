<script setup lang="ts">
const { subtitle } = defineProps<{ subtitle: string }>();

</script>

<template>
    <div class="subtitle">{{ subtitle }}</div>
</template>

<style scoped lang="scss">
.subtitle {
    font-size: 1.25rem;
    color: white;
    font-weight: bold;
    margin: 1rem 0;
}
</style>
