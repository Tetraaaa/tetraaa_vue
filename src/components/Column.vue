<script setup lang="ts">

</script>

<template>
    <div class="col">
        <slot />
    </div>
</template>

<style scoped lang="scss">
.col {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>