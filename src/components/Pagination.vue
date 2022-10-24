<template>
  <div class="pagination">
    <nav aria-label="Page navigation example">
      <ul class="pagination" v-if="tabs.length">
        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
        <li 
          v-for="tab in tabs"
          :key = "tab.id"
          :class="['page-item', { active: currentPage === tab.id }]"
          @click="changePage(tab.id)"
        >
          <div class="page-link" >{{ tab.id }}</div>
        </li>
        <li class="page-item"><a class="page-link" href="#">Next</a></li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { onMounted, ref } from "@vue/runtime-core";


const props = defineProps({
  products: {
    type: Array,
    default: [],
  },
  currentPage: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(['changePage'])
const tabs = ref([])
const showTabs = (productLenth) => {
  let maxTabs = Math.ceil(Number(productLenth / 12))
  for (let i = 1; i <= maxTabs; i++) {
    tabs.value.push({ id: i })
  }
}
const changePage = (id) => {
  emit('changePage', id)
}
onMounted(() => {
  showTabs(props.products.length)
})

// const emit = defineEmits(["updatePage"]);
// const props = defineProps({
//   currentPage: {
//     type: Number,
//     default: 1,
//   },
//   totalPage: {
//     type: Array,
//     required: true,
//   },
//   filterProducts: {
//     type: Array,
//     default: [],
//   }
//   previousPage: {
//     type: Number,
//     required: true,
//   },
//   nextPage: {
//     type: Number,
//     required: true,
//   },
// });

// const updatePage = (page) => {
//   emit("updatePage", page);
// };

// const pages= computed(() => 
//   props.totalPage = Math.ceil(props.filterProducts.length / 8)
// );

</script>
