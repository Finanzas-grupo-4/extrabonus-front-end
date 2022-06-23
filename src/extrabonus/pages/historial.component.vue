<template>
  <pv-card class="mt-3">
    <template #title>
      Historial
    </template>
    <template #content>
      <pv-datatable
          ref="dt"
          :value="bonos"
          dataKey="id"
          responsiveLayout="scroll"
      >
        <pv-column
            field="id"
            header="N°"
        ></pv-column>
        <pv-column>
          <template #body="slotProps">
            <router-link
                :to="{ name: 'resultado', params: slotProps.data }"
                style="text-decoration: none"
            >
              <pv-button
                  label="Ver resultados"
                  class="p-button-outlined"
                  @click="resultados(slotProps.data.id)"
              ></pv-button>
            </router-link>
          </template>
        </pv-column>
      </pv-datatable>
    </template>
  </pv-card>
</template>

<script>
import {BonoApiService} from "../services/bono-api.service";
import {StorageService} from "../../core/services/storage.service";

export default {
  name: "historial-view.component",
  data() {
    return {
      bonoApiService: null,
      storageService: null,
      bonos: []
    }
  },
  created() {
    this.bonoApiService = new BonoApiService()
    this.storageService = new StorageService()

    this.bonoApiService.getAll().then(response => {
      this.bonos = response.data
    })
  },
  methods: {
    resultados(id) {
      this.storageService.set("bono", id)
    }
  }
}
</script>

<style scoped>

</style>