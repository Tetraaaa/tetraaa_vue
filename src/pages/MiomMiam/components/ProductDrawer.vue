<script setup lang="ts">
import type { Product } from '../types';

const { product } = defineProps<{ product: Product | undefined }>()
</script>

<template>
  <div class="drawer" :style="{ transform: `translateX(${product ? '0%' : '100%'})` }">
    <div class="drawer-header">
      <img :src="`/images/miom-miam/${product?.name}.jpg`" alt="">
      <div class="header-text">
        {{ product?.name }}
      </div>
    </div>
    <div class="drawer-body">
      <div class="nutritional-values">
        <div class="flex">
          <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5c-16.5-21-46-58.5-62.8-79.8c-6.3-8-18.3-8.1-24.7-.1c-33.8 42.5-50.8 69.3-50.8 99.4C112 375.4 162.6 416 225.7 416z" />
          </svg>
          <div style="font-size: 1.25rem;font-weight: bold;">{{ product?.kcal }}kcal</div>
        </div>
        <div class="view">
          <div class="flex">
            <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M256 32C192 32 0 64 0 192c0 35.3 28.7 64 64 64V432c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V256c35.3 0 64-28.7 64-64C512 64 320 32 256 32z" />
            </svg>
            <div style="font-size: 1.25rem;font-weight: bold;"> {{ product?.macros.glucides }}g glucides</div>
          </div>
          <div style="margin-left: 22px; font-style: italic;">
            {{ product?.macros.sucres }}g (dont sucres)
          </div>
        </div>
        <div class="view">
          <div class="flex">
            <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path
                d="M96 0C82.7 0 72 10.7 72 24s10.7 24 24 24c4.4 0 8 3.6 8 8l0 64.9c0 12.2-7.2 23.1-17.2 30.1C53.7 174.1 32 212.5 32 256l0 192c0 35.3 28.7 64 64 64l128 0c35.3 0 64-28.7 64-64l0-192c0-43.5-21.7-81.9-54.8-105c-10-7-17.2-17.9-17.2-30.1L216 56c0-4.4 3.6-8 8-8c13.3 0 24-10.7 24-24s-10.7-24-24-24l-8 0s0 0 0 0s0 0 0 0L104 0s0 0 0 0s0 0 0 0L96 0zm64 382c-26.5 0-48-20.1-48-45c0-16.8 22.1-48.1 36.3-66.4c6-7.8 17.5-7.8 23.5 0C185.9 288.9 208 320.2 208 337c0 24.9-21.5 45-48 45z" />
            </svg>
            <div style="font-size: 1.25rem;font-weight: bold;"> {{ product?.macros.lipides }}g lipides</div>
          </div>
          <div style="margin-left: 22px; font-style: italic;">
            {{ product?.macros.acidesGrasSatures }}g (dont acides gras saturés)
          </div>
        </div>
        <div class="flex">
          <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M160 265.2c0 8.5-3.4 16.6-9.4 22.6l-26.8 26.8c-12.3 12.3-32.5 11.4-49.4 7.2C69.8 320.6 65 320 60 320c-33.1 0-60 26.9-60 60s26.9 60 60 60c6.3 0 12 5.7 12 12c0 33.1 26.9 60 60 60s60-26.9 60-60c0-5-.6-9.8-1.8-14.5c-4.2-16.9-5.2-37.1 7.2-49.4l26.8-26.8c6-6 14.1-9.4 22.6-9.4l89.2 0c6.3 0 12.4-.3 18.5-1c11.9-1.2 16.4-15.5 10.8-26c-8.5-15.8-13.3-33.8-13.3-53c0-61.9 50.1-112 112-112c8 0 15.7 .8 23.2 2.4c11.7 2.5 24.1-5.9 22-17.6C494.5 62.5 422.5 0 336 0C238.8 0 160 78.8 160 176l0 89.2z" />
          </svg>
          <div style="font-size: 1.25rem;font-weight: bold;"> {{ product?.macros.proteines }}g protéines</div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.flex {
  display: flex;
  align-items: center;
  gap: .25rem;
}

.view {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.drawer {
  position: fixed;
  height: 100%;
  background-color: white;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  top: 0;
  right: 0;
  width: clamp(350px, 30%, 50rem);
  transition: transform 300ms ease;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  overflow-x: hidden;
  z-index: 99;
}

.drawer-header {
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 10rem;
    filter: blur(4px);
    object-fit: cover;
  }

  .header-text {
    text-transform: uppercase;
    color: white;
    font-weight: bold;
    font-size: 3rem;
    text-align: center;
    position: absolute;
    top: 3rem;
    width: 100%;
  }
}

.drawer-body {
  padding: 1rem;
}

.nutritional-values {
  display: flex;
  flex-direction: column;
  gap: .25rem;
}
</style>