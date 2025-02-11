<script setup lang="ts">
import Modal from '../Modal.vue';
import loadingGif from "@/assets/images/kirby-headphones.gif";


const { isOpen, isLoaded, onClose } = defineProps<{ isOpen: boolean, isLoaded: boolean, onClose: () => void }>()
</script>
<template>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true">
    <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet">
    <Modal :is-open="isOpen" @close=""
        :container-styles="{ background: `linear-gradient(45deg, rgb(61, 61, 117), rgb(33 33 87))`, color: 'white' }">
        <div class="modal-content">
            <h3 style="font-weight: bold;">Cette page utilise l'audio de votre navigateur</h3>
            <span>Vous pouvez brancher un clavier MIDI pour jouer avec, ou directement cliquer sur les touches du
                piano.</span>
            <img :src="loadingGif" />
            <div class="loading" v-if="!isLoaded" style="display: flex;align-items: center;gap:1rem">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="20"
                    height="20" style="shape-rendering: auto; display: block; background: transparent;"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g>
                        <g transform="translate(80,50)">
                            <g transform="rotate(0)">
                                <circle fill-opacity="1" fill="#ffffff" r="6" cy="0" cx="0">
                                    <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1"
                                        values="1.5 1.5;1 1" begin="-0.875s" type="scale" attributeName="transform">
                                    </animateTransform>
                                    <animate begin="-0.875s" values="1;0" repeatCount="indefinite" dur="1s"
                                        keyTimes="0;1" attributeName="fill-opacity"></animate>
                                </circle>
                            </g>
                        </g>
                        <g transform="translate(71.21320343559643,71.21320343559643)">
                            <g transform="rotate(45)">
                                <circle fill-opacity="0.875" fill="#ffffff" r="6" cy="0" cx="0">
                                    <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1"
                                        values="1.5 1.5;1 1" begin="-0.75s" type="scale" attributeName="transform">
                                    </animateTransform>
                                    <animate begin="-0.75s" values="1;0" repeatCount="indefinite" dur="1s"
                                        keyTimes="0;1" attributeName="fill-opacity"></animate>
                                </circle>
                            </g>
                        </g>
                        <g transform="translate(50,80)">
                            <g transform="rotate(90)">
                                <circle fill-opacity="0.75" fill="#ffffff" r="6" cy="0" cx="0">
                                    <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1"
                                        values="1.5 1.5;1 1" begin="-0.625s" type="scale" attributeName="transform">
                                    </animateTransform>
                                    <animate begin="-0.625s" values="1;0" repeatCount="indefinite" dur="1s"
                                        keyTimes="0;1" attributeName="fill-opacity"></animate>
                                </circle>
                            </g>
                        </g>
                        <g transform="translate(28.786796564403577,71.21320343559643)">
                            <g transform="rotate(135)">
                                <circle fill-opacity="0.625" fill="#ffffff" r="6" cy="0" cx="0">
                                    <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1"
                                        values="1.5 1.5;1 1" begin="-0.5s" type="scale" attributeName="transform">
                                    </animateTransform>
                                    <animate begin="-0.5s" values="1;0" repeatCount="indefinite" dur="1s" keyTimes="0;1"
                                        attributeName="fill-opacity"></animate>
                                </circle>
                            </g>
                        </g>
                        <g transform="translate(20,50.00000000000001)">
                            <g transform="rotate(180)">
                                <circle fill-opacity="0.5" fill="#ffffff" r="6" cy="0" cx="0">
                                    <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1"
                                        values="1.5 1.5;1 1" begin="-0.375s" type="scale" attributeName="transform">
                                    </animateTransform>
                                    <animate begin="-0.375s" values="1;0" repeatCount="indefinite" dur="1s"
                                        keyTimes="0;1" attributeName="fill-opacity"></animate>
                                </circle>
                            </g>
                        </g>
                        <g transform="translate(28.78679656440357,28.786796564403577)">
                            <g transform="rotate(225)">
                                <circle fill-opacity="0.375" fill="#ffffff" r="6" cy="0" cx="0">
                                    <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1"
                                        values="1.5 1.5;1 1" begin="-0.25s" type="scale" attributeName="transform">
                                    </animateTransform>
                                    <animate begin="-0.25s" values="1;0" repeatCount="indefinite" dur="1s"
                                        keyTimes="0;1" attributeName="fill-opacity"></animate>
                                </circle>
                            </g>
                        </g>
                        <g transform="translate(49.99999999999999,20)">
                            <g transform="rotate(270)">
                                <circle fill-opacity="0.25" fill="#ffffff" r="6" cy="0" cx="0">
                                    <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1"
                                        values="1.5 1.5;1 1" begin="-0.125s" type="scale" attributeName="transform">
                                    </animateTransform>
                                    <animate begin="-0.125s" values="1;0" repeatCount="indefinite" dur="1s"
                                        keyTimes="0;1" attributeName="fill-opacity"></animate>
                                </circle>
                            </g>
                        </g>
                        <g transform="translate(71.21320343559643,28.78679656440357)">
                            <g transform="rotate(315)">
                                <circle fill-opacity="0.125" fill="#ffffff" r="6" cy="0" cx="0">
                                    <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1"
                                        values="1.5 1.5;1 1" begin="0s" type="scale" attributeName="transform">
                                    </animateTransform>
                                    <animate begin="0s" values="1;0" repeatCount="indefinite" dur="1s" keyTimes="0;1"
                                        attributeName="fill-opacity"></animate>
                                </circle>
                            </g>
                        </g>
                        <g></g>
                    </g>
                </svg>Chargement des sons...
            </div>
            <button v-if="isLoaded" @click="onClose">C'est parti</button>
        </div>
    </Modal>
</template>
<style scoped lang="scss">
.modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    font-family: "Geist";
}

img {
    width: 10vw;
    min-width: 10rem;
}

button {
    background-color: brown;
    outline: none;
    border: none;
    padding: .75rem 1rem;
    border-radius: 1rem;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    font-family: "Geist";
}

.loading {
    font-weight: bold;
}
</style>