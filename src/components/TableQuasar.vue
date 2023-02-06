<template>
  <div class="q-pa-md">
    <q-table
      title="Countries"
      :columns="columns"
      :rows="countries"
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
        size="lg"
        boundary-numbers
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useCountriesStore } from "../stores/countries";
import { storeToRefs } from "pinia";
import useNotify from "../composable/useNotify";

const store = useCountriesStore();
const { countries } = storeToRefs(store);
const { fetchAllCountries } = store;

const { notifySuccess, notifyError } = useNotify();

async function isNotification() {
  Notification.requestPermission().then((perm) => {
    if (perm === "granted") {
      new Notification("Teste de notificação", {
        body: "O aplicativo foi aberto!",
        icon: "/icons/icon-256x256.png",
      });
    }
  });
}

onMounted(async () => {
  try {
    await fetchAllCountries();
    await isNotification();
    notifySuccess();
  } catch (error) {
    notifyError();
    console.log(error);
  } finally {
  }
});

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
    field: (row) => row.continents.filter((conti) => conti),
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
