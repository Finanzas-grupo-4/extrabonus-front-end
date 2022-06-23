<script>
export default {
  data() {
    return {
      drawer: false,
      iniciosesion: false,
      loginDialog: false,
      inicioOpcion: "Iniciar sesión",
      opciones: ["Iniciar sesión", "Registrarse"],
    };
  },
  methods: {
    IniciarSesion() {
      this.loginDialog = true;
    },
  },
};
</script>

<template>
  <pv-toolbar class="bg-primary">
    <template #start>
      <pv-button icon="pi pi-bars" @click="drawer = !drawer"></pv-button>
    </template>
    <template #end>
      <router-link
        v-if="iniciosesion"
        :to="{ name: 'perfil' }"
        style="text-decoration: None"
      >
        <pv-button icon="pi pi-user" label="Usuario 1"></pv-button>
      </router-link>
      <pv-button
        v-else
        icon="pi pi-sign-in"
        @click="IniciarSesion"
        label="Iniciar sesión"
      ></pv-button>
    </template>
  </pv-toolbar>

  <pv-dialog
    v-model:visible="loginDialog"
    :style="{ width: '600px' }"
    :modal="true"
    class="p-fluid"
  >
    <pv-select-button class="bg-primary w-full" v-model="inicioOpcion" :options="opciones" />
    <div v-if="inicioOpcion === 'Iniciar sesión'" class="w-full">
      <pv-card class="mt-3 surface-card p-4 shadow-2 border-round w-full">
        <template #content>
        <div class="text-center mb-5">
          <div class="text-900 text-3xl font-medium mb-3">Iniciar sesión</div>
        </div>

        <div>
          <label for="email1" class="block text-900 font-medium mb-2">Nombre de usuario</label>
          <pv-input-text id="email1" type="text" class="w-full mb-3" />

          <label for="password1" class="block text-900 font-medium mb-2">Contraseña</label>
          <pv-input-text id="password1" type="password" class="w-full mb-3" />

          <pv-button label="Iniciar sesión" class="mt-3 w-full"></pv-button>
        </div>
        </template>
      </pv-card>
    </div>
    <div v-else class="w-full">
      <pv-card class="mt-3 surface-card p-4 shadow-2 border-round w-full">
        <template #content>
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">Registrarse</div>
          </div>

          <div>
            <label for="email1" class="block text-900 font-medium mb-2">Nombre de usuario</label>
            <pv-input-text type="text" class="w-full mb-3" />

            <label for="password1" class="block text-900 font-medium mb-2">Contraseña</label>
            <pv-input-text type="password" class="w-full mb-3" />

            <label for="email1" class="block text-900 font-medium mb-2">Correo electrónico</label>
            <pv-input-text  type="text" class="w-full mb-3" />

            <label for="email1" class="block text-900 font-medium mb-2">RUC</label>
            <pv-input-number  type="text" class="w-full mb-3" />

            <pv-button label="Registrarse" class="mt-3 w-full"></pv-button>
          </div>
        </template>
      </pv-card>
    </div>
  </pv-dialog>

  <pv-sidebar v-if="iniciosesion" v-model:visible="drawer" class="p-sidebar-sm">
    <h3>Menú</h3>
    <div>
      <router-link :to="{ name: 'crear-bono' }" style="text-decoration: None">
        <pv-button
          class="p-button-text"
          icon="pi pi-plus-circle"
          iconPos="left"
          label="Crear bono"
          @click="drawer = false"
        />
      </router-link>
    </div>
    <div>
      <router-link :to="{ name: 'historial' }" style="text-decoration: None">
        <pv-button
          class="p-button-text"
          icon="pi pi-history"
          iconPos="left"
          label="Historial"
          @click="drawer = false"
        />
      </router-link>
    </div>
    <pv-divider />
    <div>
      <router-link
        :to="{ name: 'configuracion' }"
        style="text-decoration: None"
      >
        <pv-button
          class="p-button-text"
          icon="pi pi-cog"
          iconPos="left"
          label="Configuración"
          @click="drawer = false"
        />
      </router-link>
    </div>
    <div>
      <pv-button
        class="p-button-text"
        icon="pi pi-sign-out"
        iconPos="left"
        label="Cerrar sesión"
        @click="
          drawer = false;
          iniciosesion = false;
        "
      />
    </div>
  </pv-sidebar>
  <pv-sidebar v-else v-model:visible="drawer" class="p-sidebar-sm">
    <h3>Inicia sesión para acceder a Extra Bonus</h3>
    <div>
      <pv-button
        class="p-button-text"
        icon="pi pi-sign-in"
        iconPos="left"
        label="Iniciar sesión"
        @click="
          this.loginDialog = true;
          drawer = false;
        "
      />
    </div>
  </pv-sidebar>
  <RouterView />
</template>

<style>
.p-selectbutton{
  background-color: #f2f2f2;
}
</style>
