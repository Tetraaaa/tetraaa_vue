<script setup lang="ts">
import BackButton from '@/components/BackButton.vue';


</script>

<template>
    <BackButton />
    <div class="container">
        <img class="pomme" src="@/assets/images/poire.png" alt="Pomme ?" />
    </div>
</template>


<style scoped lang="scss">
.container {
    background-color: black;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.pomme {
    aspect-ratio: 1/1;
}
</style>