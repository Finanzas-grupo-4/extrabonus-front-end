<template>
  <pv-toast />
  <pv-card class="mt-3">
    <template #title>
      Datos del bono
    </template>
    <template #content>
      <div class="flex flex-row align-items-center justify-content-center">
        <h4 class="flex">Valor nominal:</h4>
        <pv-input-number class="flex ml-2" v-model="bono.nominal"></pv-input-number>
        <h4 class="flex ml-2">Valor comercial:</h4>
        <pv-input-number class="flex ml-2" v-model="bono.comercial"></pv-input-number>
        <h4 class="flex ml-2">Número de años:</h4>
        <pv-input-number class="flex ml-2" v-model="bono.anos"></pv-input-number>
      </div>
      <div class="flex flex-row align-items-center justify-content-center">
        <h4 class="flex">Frecuencia del cupón:</h4>
        <pv-dropdown class="p-dropdown flex w-12rem ml-2" :options="frecuencias" optionLabel="name" optionValue="code" v-model="bono.frecuencia"></pv-dropdown>
        <h4 class="flex ml-2 ">Días por año:</h4>
        <pv-dropdown class="flex w-12rem ml-2" :options="dias" optionLabel="name" optionValue="code" v-model="bono.dias"></pv-dropdown>
        <h4 class="flex ml-2">Tipo de tasa de interes:</h4>
        <pv-dropdown class="flex w-12rem ml-2" :options="tasas" optionLabel="name" optionValue="code" v-model="bono.tasa"></pv-dropdown>
      </div>
      <div class="flex flex-row align-items-center justify-content-center">
        <h4 class="flex">Capitalización:</h4>
        <pv-dropdown class="p-dropdown flex w-12rem ml-2" :options="capitalizaciones" optionLabel="name" optionValue="code" v-model="bono.capitalizacion"></pv-dropdown>
        <h4 class="flex ml-2 ">Tasa de interés anual:</h4>
        <pv-input-number class="flex ml-2" v-model="bono.interes" suffix="%"></pv-input-number>
        <h4 class="flex ml-2">Tasa anual de descuento:</h4>
        <pv-input-number class="flex ml-2" v-model="bono.descuento" suffix="%"></pv-input-number>
      </div>
      <div class="flex flex-row align-items-center justify-content-center">
        <h4 class="flex">Impuesto a la renta:</h4>
        <pv-input-number class="flex ml-2" v-model="bono.renta" suffix="%"></pv-input-number>
        <h4 class="flex ml-2 ">Fecha de emisión:</h4>
        <pv-calendar class="flex ml-2" v-model="bono.fecha" dateFormat="dd/mm/yy" :showIcon="true" />
      </div>
    </template>
  </pv-card>

  <pv-card class="mt-3">
    <template #title>
      Datos de los costos/gastos iniciales
    </template>
    <template #content>
      <div class="flex flex-row align-items-center justify-content-center">
        <h4 class="flex ml-2">% Prima:</h4>
        <pv-input-number class="flex ml-2" v-model="bono.prima" suffix="%"></pv-input-number>
      </div>
      <div class="flex flex-row align-items-center justify-content-center">
        <h4 class="flex ml-2 ">% Estructuracion:</h4>
        <pv-input-number class="flex ml-2" v-model="bono.estructuracion" suffix="%"></pv-input-number>
      </div>
      <div class="flex flex-row align-items-center justify-content-center">
        <h4 class="flex ml-2 ">% Colocación:</h4>
        <pv-input-number class="flex ml-2" v-model="bono.colocacion" suffix="%"></pv-input-number>
      </div>
      <div class="flex flex-row align-items-center justify-content-center">
        <h4 class="flex ml-2 ">% Flotación:</h4>
        <pv-input-number class="flex ml-2" v-model="bono.flotacion" suffix="%"></pv-input-number>
      </div>
      <div class="flex flex-row align-items-center justify-content-center">
        <h4 class="flex ml-2 ">% CAVALI:</h4>
        <pv-input-number class="flex ml-2" v-model="bono.cavali" suffix="%"></pv-input-number>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-content-center">
        <router-link :to="{ name: 'resultado', params: { id: this.storageService.get('bono') } }" style="text-decoration: none">
          <pv-button class="flex justify-content-center w-8rem" @click="addBono">Crear bono</pv-button>
        </router-link>
      </div>
    </template>
  </pv-card>
</template>

<script>
import { BonoApiService } from "../services/bono-api.service"
import { ResultadoApiService } from "../services/resultado-api.service";
import { StorageService } from "../../core/services/storage.service";

export default {
  name: "crear-bono.component",
  data(){
    return{
      bonoApiService: null,
      resultadoApiService: null,
      storageService: null,
      bono: {},
      resultado: {},
      frecuencias: [
        { name: "Mensual", code: 30},
        { name: "Bimestral", code: 60},
        { name: "Trimestral", code: 90 },
        { name: "Cuatrimestral", code: 120 },
        { name: "Semestral", code: 180 },
        { name: "Anual", code: 360 }
      ],
      dias: [
        { name: "Año ordinario (360 días)", code: 360},
        { name: "Año exacto (365 días)", code: 365}
      ],
      tasas: [
        { name: "Nominal", code: "nominal"},
        { name: "Efectiva", code: "efectiva"}
      ],
      capitalizaciones: [
        { name: "Diaria", code: 1},
        { name: "Quincenal", code: 15},
        { name: "Mensual", code: 30},
        { name: "Bimestral", code: 60},
        { name: "Trimestral", code: 90 },
        { name: "Cuatrimestral", code: 120 },
        { name: "Semestral", code: 180 },
        { name: "Anual", code: 360 }
      ],
    }
  },
  created() {
    this.bonoApiService = new BonoApiService
    this.resultadoApiService = new ResultadoApiService
    this.storageService = new StorageService();
    this.storageService.set("bono", 1)

    this.bonoApiService.getAll().then(response => {
      this.storageService.set("bono", response.data.pop().id + 1)
    })
  },
  methods: {
    addBono() {
      this.bono.id = 0
      this.bono.userId = 1
      this.bonoApiService.create(this.bono).then(response => {
        console.log("hola")
      })
      this.resultado.id = 0
      this.resultado.bonoId = parseInt(this.storageService.get("bono"))
      if (this.bono.frecuencia === 360) this.resultado.frecuencia = this.bono.dias
      else this.resultado.frecuencia = this.bono.frecuencia

      if (this.bono.capitalizacion === 360) this.resultado.capitalizacion = this.bono.dias
      else this.resultado.capitalizacion = this.bono.capitalizacion

      this.resultado.periodo = this.bono.dias / this.resultado.frecuencia
      this.resultado.totalPeriodo = this.resultado.periodo * this.bono.anos

      if (this.bono.tasa === "efectiva") this.resultado.efectivaAnual = this.bono.interes
      else this.resultado.efectivaAnual = Math.pow(1 + this.bono.interes / (this.bono.dias / this.resultado.capitalizacion), this.bono.dias / this.resultado.capitalizacion) - 1

      this.resultado.efectiva = Math.pow(1 + this.resultado.efectivaAnual, this.resultado.frecuencia / this.bono.dias) - 1
      this.resultado.cok = Math.pow(1 + this.bono.descuento, this.resultado.frecuencia / this.bono.dias) - 1

      this.resultado.costoEmisor = ((this.bono.estructuracion + this.bono.cavali + this.bono.colocacion + this.bono.flotacion) / 100) * this.bono.comercial
      this.resultado.costoInversor = ((this.bono.cavali + this.bono.flotacion) / 100) * this.bono.comercial

      this.resultadoApiService.create(this.resultado)

      this.resultado = {}
      this.bono = {}
    }
  }
}
</script>

<style scoped>

</style>