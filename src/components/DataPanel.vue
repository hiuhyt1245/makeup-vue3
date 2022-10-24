<template>
  <Searchbar @update="updateProducts" />

  <div class="container mt-5">
    <div class="row" id="data-panel">
      <div
        class="col-sm-3"
        v-if="currentPage === index"
        v-for="(products, index) in renderProductsByPage"
        :key="index"
      >
        <div v-for="product in products" :key="product.id">
          <div class="card mb-2">
            <img class="card-img-top" alt="Card image cap" :src="product.image_link" />
            <div class="card-body product-item-body">
              <h5 class="card-title">{{ product.name }}</h5>
            </div>
            <!-- "More" button -->
            <div class="card-footer d-flex justify-content-around">
              <button
                class="btn btn-primary btn-show-product"
                data-toggle="modal"
                data-target="#show-product-modal"
                @click="showDetail(product)"
              >
                More
              </button>
              <div class="showInfo" v-if="showInfo">
                <div>
                  <ProductInfo :moreInfo="moreInfo" @close-info="closeInfo" />
                </div>
              </div>
              <button
                class="btn btn-success btn-show-product"
                @click="addFavorite(product.id)"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="filterProducts.length === 0">查無此相關商品...</div>
    </div>
  </div>

  <Pagination
    @updatePage="getCurrentPage"
    :filterProducts="filterProducts"
    :current-page="pagination.currentPage"
    :total-page="pagination.totalPage"
  />
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { computed, nextTick, onBeforeMount, onMounted, watch } from "@vue/runtime-core";
import ProductInfo from "../components/ProductInfo.vue";
import Searchbar from "./Searchbar.vue";
import Pagination from "./Pagination.vue";

const props = defineProps({
  products: {
    type: Array,
    default: [],
  },
});

const searchProductName = ref("");
const showInfo = ref(false);
const moreInfo = ref("");
const pagination = reactive({
  currentPage: 1,
  totalPage: 0,
});
const filterProductsByPage = reactive([]);

const PRODUCTS_PER_PAGE = 8;

const updateProducts = (name) => {
  searchProductName.value = name.value;
};

const filterProducts = computed(() =>
  props.products.filter((product) =>
    product.name.toLowerCase().includes(searchProductName.value)
  )
);



// pagination.totalPage = Math.ceil(filterProducts.length / PRODUCTS_PER_PAGE);

const showDetail = (product) => {
  // const product = props.products.find((product) => product.id === productId);
  // if (product.id === productId) {
  //   return alert("添加成功！");
  // }
  // console.log(productId)
  // console.log(product)
  showInfo.value = true;
  moreInfo.value = product;
};

const closeInfo = () => {
  showInfo.value = false;
};

const addFavorite = (id) => {
  console.log("add favorite");
  const list = JSON.parse(localStorage.getItem("makeup-app-vue")) || [];
  const product = props.products.find((product) => product.id === id);
  if (list.some((product) => product.id === id)) {
    return alert("此商品已經在收藏清單中！");
  }

  if (list.some((product) => product.id !== id)) {
    list.push(product);
    localStorage.setItem("makeup-app-vue", JSON.stringify(list));
    return alert("添加成功！");
  }
};

// const pages = computed(
//   () => (pagination.totalPage = Math.ceil(props.filterProducts.length / 8))
// );

// const geProductsByPage = (page) => {
//   const data = filterProducts.length ? filterProducts : props.products;
//   const startIndex = (page - 1) * PRODUCTS_PER_PAGE;

//   const sliceProducts= data.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
//   //Vue3必须通过myArray.length = 0的方式清空数组，不能直接让它等于[]或重新声明
//   filterProductsByPage.length = 0
//   sliceProducts.forEach((e)=>{
//     filterProductsByPage.push(e)
//   })
//   console.log(filterProductsByPage)
// };

watch(filterProducts, (newValue)=>{
  pagination.totalPage = Math.ceil(newValue.length / PRODUCTS_PER_PAGE)
})

// const pages = computed(() => pagination.totalPage = Math.ceil(filterProducts.length / 8)
// );

// watch(filterProducts, (newValue) => {
//   // console.log(newValue);
//   for (let i = 1; i <= pages; i++) {
//     const data = newValue.length ? newValue : props.products;
//     const startIndex = (i - 1) * PRODUCTS_PER_PAGE;
//     const sliceProducts = data.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
//     console.log(sliceProducts);
//     filterProductsByPage.push(sliceProducts);
//   }
//   console.log(filterProductsByPage);
// });

const getCurrentPage = (page) => {
  pagination.currentPage = page;
};

const renderProductsByPage = computed(() => {
  for (let i = 1; i <= pagination.totalPage; i++) {
    const data = filterProducts.length ? filterProducts : props.products;
    const startIndex = (i - 1) * PRODUCTS_PER_PAGE;
    const sliceProducts = data.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
    filterProductsByPage.push(sliceProducts);
  }
  return filterProductsByPage;
});

// const geProductsByPage = (pages) => {
//   for (let i = 0; i < pages; i++) {
//     const data = filterProducts.length ? filterProducts : props.products;
//     const startIndex = (i - 1) * PRODUCTS_PER_PAGE;
//     const sliceProducts = data.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
//     //Vue3必须通过myArray.length = 0的方式清空数组，不能直接让它等于[]或重新声明
//     filterProductsByPage.length = 0;
//     sliceProducts.forEach((e) => {
//       filterProductsByPage.push(e);
//     });
//     console.log(filterProductsByPage);
//   }
// };
</script>
