<script setup lang="ts">
const { direction, spacing } = defineProps({
    direction: {
        type: String,
        default: "row",
    },
    spacing: {
        type: String,
        default: "2.5rem",
    },
});
</script>

<template>
    <div class="leftBarsParent">
        <div class="leftBars"></div>
        <div class="leftBarsChildren">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.leftBars {
    height: auto;
    margin: 0 clamp(1rem, 2vw, 2rem);
}

.leftBarsChildren {
    display: flex;
    flex: 1;
    flex-direction: v-bind(direction);
    gap: v-bind(spacing);
}

.leftBarsParent {
    flex: 1;
    align-items: center;
    justify-content: space-evenly;
    display: flex;
    background-repeat: no-repeat;
    background-image: linear-gradient(
        90deg,
        rgba(77, 73, 62, 0.2),
        rgba(77, 73, 62, 0.2) 14px,
        transparent 14px,
        transparent 20px,
        rgba(77, 73, 62, 0.2) 20px,
        rgba(77, 73, 62, 0.2) 23px,
        transparent 23px
    );
}
</style>
