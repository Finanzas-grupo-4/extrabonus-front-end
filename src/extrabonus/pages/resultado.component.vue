<template>
  <pv-card class="mt-3">
    <template #title>
      Resultados de la estructuración del bono
    </template>
    <template #content>
      <div class="flex flex-row">
        <h3>Frecuencia del cupón:</h3>
        <h3 class="ml-1 font-normal">{{resultado.frecuencia }} días</h3>
      </div>
      <div class="flex flex-row">
        <h3>Días capitalización: </h3>
        <h3 class="ml-1 font-normal">{{resultado.capitalizacion }} días</h3>
      </div>
      <div class="flex flex-row">
        <h3>Número de periodos por año: </h3>
        <h3 class="ml-1 font-normal">{{ resultado.periodo }} </h3>
      </div>
      <div class="flex flex-row">
        <h3>Tasa efectiva anual:</h3>
        <h3 class="ml-1 font-normal">{{ resultado.efectivaAnual }} </h3>
      </div>
      <div class="flex flex-row">
        <h3>Tasa efectiva {{ this.frecuencia }}:</h3>
        <h3 class="ml-1 font-normal">{{resultado.efectiva }} </h3>
      </div>
      <div class="flex flex-row">
        <h3>COK {{ this.frecuencia }}:</h3>
        <h3 class="ml-1 font-normal">{{resultado.periodo }} </h3>
      </div>
      <div class="flex flex-row">
        <h3>Costos/gastos iniciales del emisor:</h3>
        <h3 class="ml-1 font-normal"> {{resultado.costoEmisor }} </h3>
      </div>
      <div class="flex flex-row">
        <h3>Costos/gastos iniciales del inversor:</h3>
        <h3 class="ml-1 font-normal">{{resultado.costoInversor }} </h3>
      </div>
    </template>
  </pv-card>

</template>

<script>
import {ResultadoApiService} from "../services/resultado-api.service";
import {StorageService} from "../../core/services/storage.service";

export default {
  name: "resultado-view.component",
  data(){
    return{
      storageApiService: null,
      resultadoApiService: null,
      resultado: {},
      frecuencia: ""
    }
  },
  created() {
    this.storageService = new StorageService()
    this.resultadoApiService = new ResultadoApiService()

    this.resultadoApiService.getByBondId(this.storageService.get("bono")).then( response =>{
      this.resultado = response.data[0]
      switch (response.data[0].frecuencia){
        case 30: this.frecuencia = "mensual"; break;
        case 60: this.frecuencia = "bimestral"; break;
        case 90: this.frecuencia = "trimestral"; break;
        case 120: this.frecuencia = "cuatrimestral"; break;
        case 180: this.frecuencia = "semestral"; break;
        case 360: this.frecuencia = "anual"; break;
      }
    })
  }
}
</script>

<style scoped>

</style>