<script setup lang="ts">
import { months } from '@/assets/data/months';
import { ref } from 'vue';

const selectedMonth = ref<{ name: string; produits: string[]; }>();
const selectedProduct = ref<string>();

function onDocumentClick(ev: MouseEvent) {
  let target = (ev.target) as HTMLElement | null

  if (target?.classList.contains("drawer")) return
  selectedProduct.value = undefined
}

function onProductClick(event:MouseEvent, product:string)
{
  event.stopPropagation()
  selectedProduct.value = product
}


</script>

<template>
  <div class="container" @click="onDocumentClick">
    <div class="months">
      <div class="monthCard" @click="selectedMonth = month" v-for="month in months">{{ month.name }}</div>
    </div>
    <div class="products">
      <div v-if="selectedMonth" class="product" v-for="product in selectedMonth.produits"
        @click="(event) => onProductClick(event, product)">
        <img :src="`/images/miom-miam/${product}.jpg`" />
        <div>{{ product }}</div>
      </div>
    </div>

  </div>
  <div class="drawer" :style="{ transform: `translateX(${selectedProduct ? '0%' : '100%'})` }">
    {{ selectedProduct }}
  </div>
</template>


<style scoped lang="scss">
.container {
  background-color: #34cb6a;
  background-image: url("/src/assets/images/miom-miam/pattern_grudge.svg");
  background-size: contain;
  height: 100vh;
  overflow: auto;
}

.drawer {
  position: fixed;
  height: 100%;
  background-color: white;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  top: 0;
  right: 0;
  width: clamp(375px, 30%, 50rem);
  transition: transform 300ms ease;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.products {
  padding: 1rem;
  gap: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.product {
  background-color: white;
  padding: 1rem;
  height: 8rem;
  width: 8rem;
  border-radius: 1rem;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;
  position: relative;
  overflow: hidden;

  div {
    text-transform: uppercase;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    z-index: 1;
  }

  img {
    position: absolute;
    filter: blur(2px);
    height: 100%;
  }
}

.months {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  margin-bottom: 1rem;
  padding: 1rem;
}

.monthCard {
  cursor: pointer;
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}
</style>