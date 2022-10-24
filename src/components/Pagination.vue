<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <!-- 前一頁 previousPage -->
      <!-- <li :class="['page-item', { disable: currentPage === 1 }]">
        <router-link class="page-link" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </router-link>
      </li> -->

      <li
        v-for="page in pages"
        :key="page"
        :class="['page-item', { active: currentPage === page }]"
      >
        <a href="#" class="page-link" @click="updatePage(page)">
          {{ page }}
        </a>
      </li>

      <!-- 後一頁 nextPage -->
      <!-- <li
        :class="['page-item', { disable: currentPage === totalPage.length }]"
      >
        <router-link class="page-link" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </router-link>
      </li> -->
    </ul>
  </nav>
</template>

<script setup>
import { computed, onMounted } from "@vue/runtime-core";

const emit = defineEmits(["updatePage"]);
const props = defineProps({
  currentPage: {
    type: Number,
    default: 1,
  },
  totalPage: {
    type: Array,
    required: true,
  },
  filterProducts: {
    type: Array,
    default: [],
  }
  // previousPage: {
  //   type: Number,
  //   required: true,
  // },
  // nextPage: {
  //   type: Number,
  //   required: true,
  // },
});

const updatePage = (page) => {
  emit("updatePage", page);
};

const pages= computed(() => 
  props.totalPage = Math.ceil(props.filterProducts.length / 8)
);

</script>
