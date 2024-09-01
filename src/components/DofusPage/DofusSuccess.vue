<script setup lang="ts">

const { level, name, rewardAssetPath, rewardName } = defineProps<{ level?: number, name: string, rewardAssetPath?: string, rewardName: string }>();

function getImageUrl(name: string) {
    return new URL(`@/assets/images/dofus/${name}`, import.meta.url).href
}

</script>

<template>
    <div class="success">
        <div class="level-libelle">Niveau</div>
        <div class="level">{{ level }}</div>
        <div class="name-container">
            <div class="name">{{ name }}</div>
        </div>
        <div class="reward">
            <img v-if="rewardAssetPath" :src="`/images/dofus/${rewardAssetPath}`" />
            <div class="reward-name">{{ rewardName }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.success {
    color: white;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(180, 215, 226, 0.3);
    backdrop-filter: blur(64px);
    text-shadow: 2px 2px 4px #00000059;
    box-shadow: 0 3px 24px rgba(0, 0, 0, 0.25);
    padding: 1.5rem;
    margin: 1rem;
    width: 20vw;
    min-width: 25rem;
    height: 25rem;
}

.level {
    font-size: 4rem;
    font-weight: bold;
}

.level-libelle {
    font-size: 1.75rem;
}

.name {
    font-size: 1.5rem;
    border-radius: 8px;
    background-color: rgba(138, 138, 138, 0.4);
    padding: 1rem;
    text-align: center;
}

.name-container {
    flex: 1;
}

.reward {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem;

    img {
        height: 32px;
        width: 32px;
    }

    font-size: 1.5rem;
    font-weight: bold;
}
</style>
