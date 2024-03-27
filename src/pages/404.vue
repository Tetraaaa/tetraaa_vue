<script setup lang="ts">
import BackButton from '@/components/BackButton.vue';


</script>

<template>
    <BackButton />
    <div class="container">
        <div class="stars"></div>
        <div class="text">404</div>
    </div>
</template>


<style scoped lang="scss">
@font-face {
    font-family: 'Pacifico';
    src: url("@/assets/fonts/Pacifico_Regular.ttf") format('truetype');
    font-weight: 400;
    font-style: normal;
}

@keyframes smallMove {
    from {
        transform: translateY(0px);
    }

    to {
        transform: translateY(-2000px);
    }
}

@function multiple-box-shadow ($n) {
    $value: '#{random(2000)}px #{random(2000)}px #FFF';

    @for $i from 2 through $n {
        $value: '#{$value} , #{random(2000)}px #{random(2000)}px #FFF';
    }

    @return unquote($value);
}

;

$shadows-small: multiple-box-shadow(700);

.container {
    height: 100vh;
    width: 100%;
    background: radial-gradient(ellipse at bottom, #2f1b35 0%, #090A0F 100%);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}


.stars {
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    width: 1px;
    height: 1px;
    box-shadow: $shadows-small;
    animation: smallMove 50s linear infinite;

    &:after {
        content: " ";
        position: absolute;
        top: 2000px;
        width: 1px;
        height: 1px;
        box-shadow: $shadows-small;
    }
}

.text {
    font-family: Pacifico;
    z-index: 0;
    font-size: clamp(12.5rem, 25vw, 28rem);
    font-weight: bold;
}
</style>