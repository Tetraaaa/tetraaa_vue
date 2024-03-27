
<script setup lang="ts">
const emit = defineEmits(['click'])

import nierButtonSound from '@/assets/audio/menu_move.ogg';

function onClick() {
    const audio = new Audio(nierButtonSound);
    audio.play();
    emit('click');
}
</script>
<template>
    <button @click="onClick">
        <span>
            <slot></slot>
        </span>
    </button>
</template>

<style scoped lang="scss">
button {
    z-index: 1;
    letter-spacing: 2px;
    position: relative;
    font-size: inherit;
    font-family: "Rodin-Medium", sans-serif;
    background: linear-gradient(90deg, rgba(72, 70, 61, 0.25) 0%, rgba(72, 70, 61, 0.25) 50%, rgba(72, 70, 61, 1) 50%, rgba(72, 70, 61, 1) 100%);
    background-size: 200%;
    color: rgba(72, 70, 61, 1);
    border: none;
    border-top: transparent 3px solid;
    border-bottom: transparent 3px solid;
    padding: 8px 8px 7px;
    line-height: 1;
    cursor: pointer;
    text-align: left;
    transition: background 0.4s ease-in-out, border-color 0.3s ease-in-out, color 0.3s ease-in-out, box-shadow 0.4s ease-in-out;

    &:before {
        content: "";
        display: block;
        position: absolute;
        left: -42px;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 40px;
        height: 20px;
        background: url("../../assets/images/nier-pointer.svg") no-repeat;
        background-size: contain;
        opacity: 0;
        transition: opacity 0.4s ease-in-out;
    }

    &:after {
        content: "";
        display: block;
        position: absolute;
        top: -5px;
        left: 0;
        right: 0;
        bottom: -5px;
        border-top: transparent 2px solid;
        border-bottom: transparent 2px solid;
        transition: border-color 0.3s ease-in-out;
    }

    &:hover,
    &:active {
        background-position: -100% 100%;
        border-color: rgba(194, 189, 166, 1);
        color: rgba(194, 189, 166, 1);
        box-shadow: 4px 4px 6px 2px rgba(72, 70, 61, 1) 15;
        outline: 0;

        span:before {
            background: rgba(194, 189, 166, 1);
        }

        &:before {
            opacity: 1;
        }

        &:after {
            border-top-color: rgba(72, 70, 61, 1);
            border-bottom-color: rgba(72, 70, 61, 1);
        }
    }
}

span {
    display: inherit;
    text-transform: inherit;
    flex: 1;

    &:before {
        content: "";
        display: inline-block;
        height: clamp(12px, 1vw, 16px);
        width: clamp(12px, 1vw, 16px);
        background: rgba(72, 70, 61, 1);
        margin-right: 6px;
        transition: background-color 0.3s ease-in-out;
    }
}
</style>
