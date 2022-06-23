<script>

export default{
  data(){
    return {
      drawer: false,
      items: [
        { label: "Bonos", to: "/bonos" },
        { label: "Historial", to: "/historial" },
      ],
    }
  }
}
</script>

<template>
  <pv-toolbar class="bg-primary">
    <template #start>
      <pv-button icon="pi pi-bars" @click="drawer=!drawer"></pv-button>
    </template>
  </pv-toolbar>

  <pv-sidebar v-model:visible="drawer" class="p-sidebar-sm">
    <h3>Menú</h3>
    <div>
      <router-link :to="{ name: 'crear-bono' }" style="text-decoration: None">
        <pv-button class="p-button-text" icon="pi pi-plus-circle" iconPos="left" label="Crear bono" @click="drawer = false"/>
      </router-link>
    </div>
    <div>
      <router-link :to="{ name: 'historial' }" style="text-decoration: None">
        <pv-button class="p-button-text" icon="pi pi-history" iconPos="left" label="Historial" @click="drawer = false" />
      </router-link>
    </div>
    <pv-divider />
    <div>
      <router-link :to="{ name: 'configuracion' }" style="text-decoration: None">
        <pv-button class="p-button-text" icon="pi pi-cog" iconPos="left" label="Configuración" @click="drawer = false"/>
      </router-link>
    </div>
  </pv-sidebar>
  <RouterView />
</template>
