<script setup lang="ts">
import success from "@/assets/data/dofus.json";
import DofusSuccess from "@/components/DofusPage/DofusSuccess.vue";
</script>

<template>
    <div class="container">
        <header>
            <h1>Dofus - Ordre des succès</h1>
        </header>
        <div class="main">
            <DofusSuccess v-for="succes in success" :level="succes.level" :name="succes.name"
                :reward-name="succes.rewardName" :reward-asset-path="succes.rewardAssetPath" />
        </div>
    </div>
</template>

<style scoped lang="scss">
header {
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    display: flex;
    flex-direction: row;
    flex-direction: column;
    background-color: #000;
    background-image: url("/images/dofus/dofus_background.jpg");
    background-size: cover;
    height: 100vh;
}

.main {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    overflow: auto;
    padding: 1rem;
}

h1 {
    font-size: 3rem;
    text-align: center;
    color: white;
    text-shadow: 2px 2px 4px #00000059;
    margin-bottom: 20px;
}
</style>
