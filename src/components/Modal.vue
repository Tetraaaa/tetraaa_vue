<script setup lang="ts">
const { isOpen, onClose, containerStyles } = defineProps<{ isOpen: boolean, onClose: () => void, containerStyles?: any }>()
</script>

<template>
    <div v-if="isOpen" class="modal-backdrop" @click="onClose">
        <div class="modal-container" :style="containerStyles">
            <slot />
        </div>
    </div>
</template>

<style scoped lang="scss">
.modal-backdrop {
    position: fixed;
    background-color: rgb(0, 0, 0, 0.4);
    height: 100vh;
    width: 100vw;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-container {
    background: white;
    padding: 1rem;
    border-radius: .5rem;
    min-width: clamp(20rem, 30vw, 80vw);
}
</style>