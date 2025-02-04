<script setup lang="ts"></script>

<template>
    <div class="card">
        <slot />
    </div>
</template>

<style scoped lang="scss">
.card {
    border: 1px solid #777;
    padding: 2rem;
    border-radius: 10px;
    width: 100%;
    max-width: 35rem;
}
</style>
