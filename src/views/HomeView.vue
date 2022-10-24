<template>

  <DataPanel :products="products"/>
  <ProductInfo :products="products"/>
</template>


<script setup>
import DataPanel from "../components/DataPanel.vue";
import ProductInfo from "../components/ProductInfo.vue";
import { reactive} from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import axios from "axios";

const products = reactive([]);
// const BASE_URL = "http://makeup-api.herokuapp.com";
// const INDEX_URL = BASE_URL + "/api/v1/products.json"

onMounted(() => {
  axios
    .get("http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
    .then((response) => {
      const data = response.data;
      data.forEach((e) => {
        products.push(e);
      });
    })
    .catch((error) => console.log(error));
});
</script>
