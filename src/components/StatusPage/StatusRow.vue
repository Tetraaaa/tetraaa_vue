<script setup lang="ts">
import Row from '../Row.vue';

const { label, value } = defineProps<{ label: string, value: string }>();

</script>

<template>
    <Row>
        <p class="left">{{ label }} :</p>
        <p class="right">{{ value }}</p>
    </Row>
</template>

<style scoped lang="scss">
.left {
    color: #bbb;
    flex: 1;
}

.right {
    color: white;
    font-weight: bold;
}
</style>
