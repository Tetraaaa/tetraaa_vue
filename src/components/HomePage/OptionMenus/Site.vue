<script setup lang="ts">
import NierLeftBars from "../NierLeftBars.vue";
import NierButton from "../NierButton.vue";
import { inject } from "vue";
import type { IUserPreferences } from "@/main";

const { userPreferences, toggleSkipLandingPage } = inject<IUserPreferences>("userPreferences")!;
</script>

<template>
    <NierLeftBars direction="column" spacing="1.5rem" class="options-right">
        <Transition appear>
            <NierButton @click="toggleSkipLandingPage" style="display: flex">
                <span style="display: flex; flex: 1">
                    <div style="flex: 1">Vidéo d'introduction</div>
                    <div>
                        {{ userPreferences.skipLandingPage ? "Sans" : "Avec" }}
                    </div>
                </span>
            </NierButton>
        </Transition>
    </NierLeftBars>
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
    transition:
        opacity 0.3s linear,
        transform 0.3s ease-out;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: translateX(-75px);
}
</style>
