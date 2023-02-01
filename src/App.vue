<template>
  <router-view />
  <div></div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});

// import { onBeforeMount } from "vue";
// import { useCountriesStore } from "./stores/countries";
// // import { storeToRefs } from "pinia";

// const store = useCountriesStore();
// // const { countries } = storeToRefs(store);
// const { fetchAllCountries } = store;

// onBeforeMount(async () => {
//   try {
//     await fetchAllCountries();
//   } catch (error) {
//     // alert(error);
//     console.log(error);
//   }
// });
</script>
