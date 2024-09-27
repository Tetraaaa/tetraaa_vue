<script setup lang="ts">
import { ref } from 'vue';
import type { Month, Product } from './types';
import { products } from './data';
import ProductDrawer from './components/ProductDrawer.vue';

const selectedMonth = ref<Month>();
const selectedProduct = ref<Product>();
const months: Month[] = ["Janvier", 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

function onDocumentClick(ev: MouseEvent) {
  let target = (ev.target) as HTMLElement | null

  if (target?.classList.contains("drawer")) return
  selectedProduct.value = undefined
}

function onProductClick(event: MouseEvent, product: Product) {
  event.stopPropagation()
  selectedProduct.value = product
}


</script>

<template>
  <div class="container" @click="onDocumentClick">
    <div class="months">
      <div class="monthCard" @click="selectedMonth = month" v-for="month in months">{{ month }}</div>
    </div>
    <div class="products">
      <div v-if="selectedMonth" class="product"
        v-for="product in products.filter(p => p.months.includes(selectedMonth!))"
        @click="(event) => onProductClick(event, product)">
        <img :src="`/images/miom-miam/${product.name}.jpg`" />
        <div>{{ product.name }}</div>
      </div>
    </div>

  </div>
  <ProductDrawer :product="selectedProduct"/>
</template>


<style scoped lang="scss">
.container {
  background-color: #34cb6a;
  background-image: url("/src/assets/images/miom-miam/pattern_grudge.svg");
  background-size: contain;
  height: 100vh;
  overflow: auto;
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