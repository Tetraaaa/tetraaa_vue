<script setup lang="ts">
import Modal from '../Modal.vue';


const { isOpen, onClose } = defineProps<{ isOpen: boolean, onClose: () => void }>()
</script>
<template>
    <Modal :is-open="isOpen" @close="onClose" :container-styles="{ background: 'rgb(59,59,107) 75%', color: 'white' }">
        <div class="modal-header">
            Paramètres
        </div>
        <div class="modal-content">

        </div>
    </Modal>
</template>
<style scoped lang="scss">
.modal-header {
    color: inherit;
    font-size: 1.5rem;
    font-weight: bold;
}

.modal-content {}
</style>