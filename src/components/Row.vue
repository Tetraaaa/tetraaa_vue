<script setup lang="ts">

</script>

<template>
    <div class="row">
        <slot />
    </div>
</template>

<style scoped lang="scss">
.row {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
}
</style>