import "./assets/main.css";

import { createApp, ref, type Ref } from "vue";
import HomePage from "./pages/HomePage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        component: HomePage,
    },
    {
        path: "/burger",
        component: () => import("./pages/BurgerPage.vue"),
    },
    {
        path: "/piano",
        component: () => import("./pages/PianoPage.vue"),
    },
    {
        path: "/daft",
        component: () => import("./pages/DaftPage.vue"),
    },
    {
        path: "/github",
        component: () => null,
        beforeEnter: () => {
            window.location.href = "https://github.com/Tetraaaa";
            return false;
        },
    },
    {
        path: "/roguelike",
        component: () => null,
        beforeEnter: () => {
            window.location.href = "https://tetraaa.itch.io/prototype-rogue-like";
            return false;
        },
    },
    {
        path: "/life",
        component: () => import("./pages/LifePage.vue"),
    },
    {
        path: "/credits",
        component: () => import("./pages/CreditsPage.vue"),
    },
    {
        path: "/pomme",
        component: () => import("./pages/PommePage.vue"),
    },
    {
        path: "/dofus",
        component: () => import("./pages/DofusPage.vue"),
    },
    {
        path: "/404",
        component: () => import("./pages/404.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/404",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

import { Howler } from "howler";

//Musiques et voix de fond --------------------------
import nierBackgroundMusic from "./assets/audio/music.ogg";
import nierBackgroundVoices from "./assets/audio/vocals.ogg";
import App from "./App.vue";

const DEFAULT_VOLUME = 0.3; //Volume maximal de la musique et des voix
const TRANSITION_TIME_IN_MILISECONDS = 800; //Réduire pour accélérer la vitesse des transitions musicales, augmenter pour les ralentir

const backroundMusicPlaying = ref(false);
const backroundVoicesPlaying = ref(false);

Howler.volume(DEFAULT_VOLUME);

const nierMusicPlayer = new Howl({
    src: [nierBackgroundMusic],
    loop: true,
});

const nierVoicesPlayer = new Howl({
    src: [nierBackgroundVoices],
    loop: true,
});

function toggleBackgroundMusic() {
    if (!nierMusicPlayer.playing()) {
        backroundMusicPlaying.value = true;
        if (nierVoicesPlayer.playing()) nierMusicPlayer.seek(nierVoicesPlayer.seek());
        nierMusicPlayer.volume(0);
        nierMusicPlayer.play();
        nierMusicPlayer.fade(0, DEFAULT_VOLUME, TRANSITION_TIME_IN_MILISECONDS);
    } else {
        backroundMusicPlaying.value = false;
        nierMusicPlayer.fade(DEFAULT_VOLUME, 0, TRANSITION_TIME_IN_MILISECONDS).once("fade", () => nierMusicPlayer.pause());
    }
}

function toggleBackgroundVoices() {
    if (!nierVoicesPlayer.playing()) {
        backroundVoicesPlaying.value = true;
        if (nierMusicPlayer.playing()) nierVoicesPlayer.seek(nierMusicPlayer.seek());
        nierVoicesPlayer.volume(0);
        nierVoicesPlayer.play();
        nierVoicesPlayer.fade(0, DEFAULT_VOLUME, TRANSITION_TIME_IN_MILISECONDS);
    } else {
        backroundVoicesPlaying.value = false;
        nierVoicesPlayer.fade(DEFAULT_VOLUME, 0, TRANSITION_TIME_IN_MILISECONDS).once("fade", () => nierVoicesPlayer.pause());
    }
}
// ---------------------------------------------------

// Préferences utilisateur ---------------------------

export interface IUserPreferences {
    userPreferences: Ref<{
        skipLandingPage: boolean;
        autoDestructionEnabled: boolean;
    }>;
    toggleSkipLandingPage: () => void;
    toggleAutoDestructionEnabled: () => void;
}

const userPreferences = ref({
    skipLandingPage: false,
    autoDestructionEnabled: false,
});

loadUserPreferencesFromLocalStorage();

function toggleSkipLandingPage() {
    userPreferences.value.skipLandingPage = !userPreferences.value.skipLandingPage;
    saveUserPreferencesInLocalStorage();
}

function toggleAutoDestructionEnabled() {
    userPreferences.value.autoDestructionEnabled = !userPreferences.value.autoDestructionEnabled;
    saveUserPreferencesInLocalStorage();
}

function loadUserPreferencesFromLocalStorage() {
    const userPreferencesFromLocalStorage = localStorage.getItem("userPreferences");
    if (userPreferencesFromLocalStorage) {
        userPreferences.value = JSON.parse(userPreferencesFromLocalStorage);
    }
}

function saveUserPreferencesInLocalStorage() {
    localStorage.setItem("userPreferences", JSON.stringify(userPreferences.value));
}

// ---------------------------------------------------

// Infos sur la session actuelle ---------------------

const landingPageAlreadyShownThisSession = ref(false);

// ---------------------------------------------------

createApp(App)
    .use(router)
    .provide("userPreferences", { userPreferences, toggleSkipLandingPage, toggleAutoDestructionEnabled })
    .provide("backgroundMusic", {
        backroundMusicPlaying: backroundMusicPlaying,
        toggleBackgroundMusic,
        backroundVoicesPlaying: backroundVoicesPlaying,
        toggleBackgroundVoices,
    })
    .provide("sessionInfos", {
        landingPageAlreadyShownThisSession,
        toggleLandingPageAlreadyShownThisSession: () => (landingPageAlreadyShownThisSession.value = true),
    })

    .mount("#app");
