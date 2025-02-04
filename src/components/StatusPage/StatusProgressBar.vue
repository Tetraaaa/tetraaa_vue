<script setup lang="ts">
const { label, value } = defineProps<{ label: string, value: number }>();

</script>

<template>
    <div>
        <div style="display: flex;">
            <div style="flex: 1;color: #bbb;">{{ label }}</div>
            <div style="color: #bbb;">{{ value }}%</div>
        </div>
        <div class="bar">
            <div class="bar-progress" :style="{ transform: `translateX(-${100 - value}%)` }"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.bar {
    height: 12px;
    border-radius: 10px;
    width: 100%;
    overflow: hidden;
    background: #333;
}

.bar-progress {
    position: relative;
    height: 100%;
    border-radius: 10px;
    background: white;
}
</style>
