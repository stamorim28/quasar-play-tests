<template>
  <div class="q-pa-md">
    <q-table
      title="Countries"
      :rows="countries"
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
    <!-- {{ countries }} -->
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref, computed } from "vue";
import { useCountriesStore } from "../stores/countries";
import { storeToRefs } from "pinia";

// const props = defineProps({
//   countries: Array,
// });

const store = useCountriesStore();
const { countries } = storeToRefs(store);
const { fetchAllCountries } = store;

onMounted(async () => {
  try {
    await fetchAllCountries();
  } catch (error) {
    alert(error);
    console.log(error);
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
  Math.ceil(countries.value?.length / pagination.value.rowsPerPage)
);

function formatLanguages(e) {
  const languages = Object.values(e);

  return languages.join(", ");
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
  // {
  //   name: "signs",
  //   label: "Signs",
  //   field: (row) => row.car.signs,
  //   sortable: true,
  //   align: "left",
  // },
  {
    name: "continents",
    label: "Continents",
    field: "continents",
    align: "left",
  },
  { name: "subregion", label: "Subregion", field: "subregion", align: "left" },
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
