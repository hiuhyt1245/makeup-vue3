<template>
  <div id="makeup">
    <Navbar />
    <main role="main" class="mt-5">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import Navbar from "./components/Navbar.vue";

</script>
