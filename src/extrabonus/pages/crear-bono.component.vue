<template>
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
        <pv-dropdown class="p-dropdown flex w-12rem ml-2" :options="capitalizaciones" optionLabel="name" optionValue="code" v-model="bono.capitalizaciones"></pv-dropdown>
        <h4 class="flex ml-2 ">Tasa de interés:</h4>
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
        <h4 class="flex ml-2 ">% Prima:</h4>
        <pv-input-number class="flex ml-2" v-model="bono.prima" suffix="%"></pv-input-number>
        <pv-dropdown class="p-dropdown flex w-12rem ml-2" :options="gastos" optionLabel="name" optionValue="code" v-model="bono.Gprima"></pv-dropdown>
      </div>
      <div class="flex flex-row align-items-center justify-content-center">
        <h4 class="flex ml-2 ">% Estructuracion:</h4>
        <pv-input-number class="flex ml-2" v-model="bono.estructuracion" suffix="%"></pv-input-number>
        <pv-dropdown class="p-dropdown flex w-12rem ml-2" :options="gastos" optionLabel="name" optionValue="code" v-model="bono.Gestructuracion"></pv-dropdown>
      </div>
      <div class="flex flex-row align-items-center justify-content-center">
        <h4 class="flex ml-2 ">% Colocación:</h4>
        <pv-input-number class="flex ml-2" v-model="bono.colocacion" suffix="%"></pv-input-number>
        <pv-dropdown class="p-dropdown flex w-12rem ml-2" :options="gastos" optionLabel="name" optionValue="code" v-model="bono.Gcolocacion"></pv-dropdown>
      </div>
      <div class="flex flex-row align-items-center justify-content-center">
        <h4 class="flex ml-2 ">% Flotación:</h4>
        <pv-input-number class="flex ml-2" v-model="bono.flotacion" suffix="%"></pv-input-number>
        <pv-dropdown class="p-dropdown flex w-12rem ml-2" :options="gastos" optionLabel="name" optionValue="code" v-model="bono.Gflotacion"></pv-dropdown>
      </div>
      <div class="flex flex-row align-items-center justify-content-center">
        <h4 class="flex ml-2 ">% CAVALI:</h4>
        <pv-input-number class="flex ml-2" v-model="bono.cavali" suffix="%"></pv-input-number>
        <pv-dropdown class="p-dropdown flex w-12rem ml-2" :options="gastos" optionLabel="name" optionValue="code" v-model="bono.Gcavali"></pv-dropdown>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-content-center">
        <pv-button class="flex justify-content-center w-8rem" @click="updateConfiguration">Crear bono</pv-button>
      </div>
    </template>
  </pv-card>
</template>

<script>
export default {
  name: "crear-bono.component",
  data(){
    return{
      bono: {},
      frecuencias: [
        { name: "Mensual", code: "mensual"},
        { name: "Bimestral", code: "bimestral"},
        { name: "Trimestral", code: "trimestral" },
        { name: "Cuatrimestral", code: "cuatrimestral" },
        { name: "Semestral", code: "semestral" },
        { name: "Anual", code: "anual" }
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
        { name: "Diaria", code: "diaria"},
        { name: "Quincenal", code: "quincenal"},
        { name: "Mensual", code: "mensual"},
        { name: "Bimestral", code: "bimestral"},
        { name: "Trimestral", code: "trimestral" },
        { name: "Cuatrimestral", code: "cuatrimestral" },
        { name: "Semestral", code: "semestral" },
        { name: "Anual", code: "anual" }
      ],
      gastos: [
        { name: "Emisor", code: "emisor"},
        { name: "Bonista", code: "bonista"},
        { name: "Ambos", code: "ambos"}
      ],
    }
  }
}
</script>

<style scoped>

</style>