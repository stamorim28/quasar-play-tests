import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useCountriesStore = defineStore("countries", {
  state: () => ({
    countries: [],
  }),
  // getters: {
  //   name(state) {
  //     state.name;
  //   },
  // },
  actions: {
    async fetchAllCountries() {
      const data = await api.get("all");
      this.countries = data.data;
    },
  },
});
