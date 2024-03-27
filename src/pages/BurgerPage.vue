<script setup lang="ts">
import burgers from "@/assets/data/burgers.json";
import BackButton from "@/components/BackButton.vue";
</script>

<template>
    <BackButton />
    <div class="container">
        <div class="header">
            <img height="48" src="@/assets/images/hamburger.png" />
            <h1>La tierlist officielle des meilleurs burgers</h1>
            <h2>de Strasbourg</h2>
            <h3>selon Tetra</h3>
            <h4>et des frites aussi</h4>
        </div>
        <div class="content">
            <div class="burger thead">
                <div class="restaurantName">Nom du restaurant</div>
                <div>Note du burger</div>
            </div>
            <div class="burger" v-for="burger in burgers.sort((a, b) => b.burgerRating - a.burgerRating)">
                <div>{{ burger.restaurantName }}</div>
                <div>{{ burger.burgerRating }}</div>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
@font-face {
    font-family: 'Rubik';
    src: url("@/assets/fonts/Rubik_Light.ttf") format('truetype');
    font-weight: 400;
    font-style: normal;
}

* {
    font-family: "Rubik";
}

.burger {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid rgba(78, 78, 78, 0.3);
    font-size: clamp(1rem, 2vw, 1.2rem);
    padding: clamp(0rem, 1vh, 1rem);

    div:nth-child(1) {
        flex: 3;
    }

    div:nth-child(2) {
        flex: 1;
    }

    div:nth-child(3) {
        flex: 1;
    }
}

.burger:nth-child(2n) {
    background: #EEF0F2;
}

.thead {
    position: sticky;
    top: 0;
    background: white;
}

.thead div {
    font-weight: bold;
}

.container {
    background: linear-gradient(180deg, rgb(255, 172, 47) 0%, rgb(255, 255, 255) 40%);
    height: 100vh;
    padding: clamp(3.75rem, 8vh, 10rem) 6vw;
    padding-bottom: clamp(1rem, 4vh, 5rem);
    display: flex;
    flex-direction: column;
}

.header {
    display: flex;
    align-items: center;
    background: white;
    color: #000;
    border-radius: 64px;
    padding: .5rem;
    box-shadow: 0 3px 4px #35353580;
    margin-bottom: 1rem;
}

@media (max-width: 1175px) {

    h2,
    h3,
    h4 {
        display: none;
    }
}

@media (max-width: 1400px) {

    h3,
    h4 {
        display: none;
    }
}

@media (max-width: 1760px) {
    h4 {
        display: none;
    }
}

h1,
h2,
h3,
h4 {
    margin: 0.5rem;
    font-weight: bold;
}

h1 {
    font-size: clamp(1.5rem, 3vw, 2.2rem);
}

h2 {
    font-size: clamp(1.5rem, 3vw, 2.2rem);
}

h3 {
    font-size: clamp(1.5rem, 3vw, 2.2rem);
}

h4 {
    font-size: clamp(1.5rem, 3vw, 2.2rem);
}

.content {
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 3px 4px #35353580;
    overflow: auto;
    flex: 1;
}
</style>