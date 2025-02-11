<script setup lang="ts">
import Modal from "../Modal.vue";

const { isOpen, onClose, attack, release, onAttackChange, onReleaseChange, isEnglishNotation, onNotationToggle, onSustainChange, sustain } = defineProps<{
    isOpen: boolean;
    onClose: () => void;
    attack: number;
    release: number;
    sustain: number;
    isEnglishNotation: boolean
    onAttackChange: (attack: number) => void;
    onReleaseChange: (release: number) => void;
    onSustainChange: (sustain: number) => void;
    onNotationToggle: (isEnglishNotation: boolean) => void;
}>();
</script>
<template>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
    <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet" />
    <Modal :is-open="isOpen" @close="onClose"
        :container-styles="{ background: `linear-gradient(45deg, rgb(61, 61, 117), rgb(33 33 87))`, color: 'white' }">
        <div class="modal-header">Paramètres</div>
        <div class="modal-content">
            <div class="row">Attack <input step=".1" max="5" :value="attack"
                    @change="(e: Event) => onAttackChange((e.currentTarget as HTMLInputElement).valueAsNumber)"
                    type="range" /> {{ attack }}
            </div>
            <div class="row">Sustain <input step=".1" max="5" :value="sustain"
                    @change="(e: Event) => onSustainChange((e.currentTarget as HTMLInputElement).valueAsNumber)"
                    type="range" /> {{ sustain }}
            </div>
            <div class="row">Release <input step=".1" max="5"
                    @change="(e: Event) => onReleaseChange((e.currentTarget as HTMLInputElement).valueAsNumber)"
                    :value="release" type="range" /> {{ release }}</div>
            <div class="row">
                Notation anglaise
                <input type="checkbox" :checked="isEnglishNotation" @change="onNotationToggle(!isEnglishNotation)" />
            </div>
        </div>
        <div class="modal-footer">
            <p>Inspiré par <a href="https://dotpiano.com/" target="_blank">dotpiano.com</a></p>
            <p>
                Samples de piano par
                <a href="https://archive.org/details/SalamanderGrandPianoV3" target="_blank">Salamander Grand Piano </a>
                <a href="https://creativecommons.org/licenses/by/3.0/">(CC BY 3.0) </a>
            </p>
        </div>
    </Modal>
</template>
<style scoped lang="scss">
a {
    color: white;
}

.modal-header {
    color: inherit;
    font-size: 1.5rem;
    font-weight: bold;
    font-family: "Geist";
    margin-bottom: 1rem;
}

.modal-footer {
    font-size: 0.75rem;
    margin-top: 1rem;
}

.row {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.modal-content {
    font-family: "Geist";
    display: flex;
    flex-direction: column;
    gap: .5rem;
}
</style>
