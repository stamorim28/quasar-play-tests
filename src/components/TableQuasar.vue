<template>
  <div class="q-pa-md">
    <q-table
      title="Countries"
      :columns="columns"
      row-key="name"
      v-model:pagination="pagination"
      hide-pagination
    >
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <div>
            <img
              style="width: 45px; height: 30px"
              :src="props.row.flags.png"
              :alt="props.row.name.common"
              loading="lazy"
            />
          </div>
          <div class="my-table-details">
            {{ props.row.name.common }}
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-population="props">
        <q-td :props="props">
          <div class="my-table-details">
            {{ formatNumbersToPTBR(props.row.population) }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-languages="props">
        <q-td :props="props">
          <div class="my-table-details">
            {{ formatLanguages(props.row.languages) }}
          </div>
        </q-td>
      </template>
    </q-table>
    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="primary"
        :max="pagesNumber"
        :max-pages="6"
        size="md"
        boundary-numbers
      />
    </div>
  </div>
  <!-- <div class="q-pa-md">
    <q-table title="Treats" :rows="rows" :columns="columns" row-key="name" />
  </div> -->
</template>

<!-- <script>
import countries from "../database/countries.js";

const columns = [
  {
    name: "name",
    required: true,
    label: "Dessert (100g serving)",
    align: "left",
    field: (row) => row.name.common,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "calories",
    align: "center",
    label: "Calories",
    field: "calories",
    sortable: true,
  },
  { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
  { name: "carbs", label: "Carbs (g)", field: "carbs" },
  { name: "protein", label: "Protein (g)", field: "protein" },
  { name: "sodium", label: "Sodium (mg)", field: "sodium" },
  {
    name: "calcium",
    label: "Calcium (%)",
    field: "calcium",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "iron",
    label: "Iron (%)",
    field: "iron",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
];

const rows = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: "3%",
    iron: "8%",
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: "7%",
    iron: "16%",
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: "0%",
    iron: "0%",
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: "0%",
    iron: "2%",
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: "0%",
    iron: "45%",
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: "2%",
    iron: "22%",
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: "12%",
    iron: "6%",
  },
];

export default {
  setup() {
    return {
      columns,
      rows: countries(),
    };
  },
};
</script> -->

<script setup>
import { onBeforeMount, ref, computed } from "vue";
import { useCountriesStore } from "../stores/countries";
import { storeToRefs } from "pinia";
import useNotify from "../composable/useNotify";
import axios from "axios";
// import countries from "../database/countries";

// const props = defineProps({
//   countries: Array,
// });

const store = useCountriesStore();
const { countries } = storeToRefs(store);
const { fetchAllCountries } = store;

// const rows = countries();

// const rows = Object.entries(countries.value).map(([name, obj]) => ({
//   name,
//   ...obj,
// }));

const { notifySuccess, notifyError } = useNotify();

onBeforeMount(async () => {
  try {
    await fetchAllCountries();
    // rows.value = await axios.get("https://restcountries.com/v3.1/all");
    // rows.value = Object.entries(countries.value).map(([name, obj]) => ({
    //   name,
    //   ...obj,
    // }));
    // rows.value = countries();
    console.log(countries.value);
    notifySuccess();
  } catch (error) {
    notifyError();
    console.log(error);
  } finally {
  }
});

// const countries = ref(props.countries);

const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 10,
  // rowsNumber: 5,
});

const pagesNumber = computed(() =>
  Math.ceil(countries?.value.length / pagination.value.rowsPerPage)
);

function formatLanguages(e) {
  if (e === null || e === undefined) {
    return "--";
  } else {
    const languages = Object.values(e);

    return languages.join(", ");
  }
}

function formatNumbersToPTBR(e) {
  const population = Intl.NumberFormat("pt-BR", {
    notation: "compact",
    minimumFractionDigits: "1",
  }).format(e);

  return population;
}

const columns = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
  },
  {
    name: "signs",
    label: "Signs",
    field: (row) => (row.cca3 == "" ? "---" : row.cca3),
    sortable: true,
    align: "left",
  },
  {
    name: "continents",
    label: "Continents",
    field: "continents",
    align: "left",
  },
  {
    name: "subregion",
    label: "Subregion",
    field: (row) => (row?.subregion ? row?.subregion : "---"),
    align: "left",
  },
  {
    name: "population",
    label: "Population",
    align: "left",
  },
  {
    name: "languages",
    label: "Languages",
    align: "left",
  },
];
</script>
