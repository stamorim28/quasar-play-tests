import { defineStore } from "pinia";
import axios from "axios";

export const useCountriesStore = defineStore("countries", {
  state: () => ({
    countries: [],
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2,
  // },
  actions: {
    async fetchAllCountries() {
      const data = await axios.get("https://restcountries.com/v3.1/all");
      this.countries = data.data;
    },
  },
});
