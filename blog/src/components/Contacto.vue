<template>
  <div class="contacto">
    <h1>Formulario de contacto</h1>
    <form @submit.prevent="enviarFormulario">
      <!-- Campo Nombre -->
      <Input
        label="Nombre:"
        id="nombre"
        v-model="formData.nombre"
        placeholder="Tu nombre"
      />
      <span v-if="errors.nombre" class="error">{{ errors.nombre }}</span>

      <!-- Campo Correo -->
      <Input
        label="Correo electrónico:"
        type="email"
        id="correo"
        v-model="formData.correo"
        placeholder="Tu correo electrónico"
      />
      <span v-if="errors.correo" class="error">{{ errors.correo }}</span>

      <!-- Campo Mensaje -->
      <Input
        label="Mensaje:"
        id="mensaje"
        v-model="formData.mensaje"
        placeholder="Escribe tu mensaje"
        is-textarea
      />
      <span v-if="errors.mensaje" class="error">{{ errors.mensaje }}</span>

      <Boton tipo="primario">Enviar</Boton>
    </form>

    <!-- Modal Personalizado -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Formulario Enviado</h2>
        <p><strong>Nombre:</strong> {{ formData.nombre }}</p>
        <p><strong>Correo:</strong> {{ formData.correo }}</p>
        <p><strong>Mensaje:</strong> {{ formData.mensaje }}</p>
        <button @click="showModal = false">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "../components/Input.vue";
import Boton from "../components/Boton.vue";

export default {
  name: "Contacto",
  components: {
    Input,
    Boton,
  },
  data() {
    return {
      formData: {
        nombre: "",
        correo: "",
        mensaje: "",
      },
      errors: {
        nombre: "",
        correo: "",
        mensaje: "",
      },
      showModal: false, // Controla la visibilidad del modal
    };
  },
  methods: {
    validarFormulario() {
      // Reinicia los errores
      this.errors = { nombre: "", correo: "", mensaje: "" };

      // Validar Nombre
      if (!this.formData.nombre || this.formData.nombre.trim().length === 0) {
        this.errors.nombre = "El nombre es obligatorio.";
      }

      // Validar Correo
      const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.formData.correo || this.formData.correo.trim().length === 0) {
        this.errors.correo = "El correo electrónico es obligatorio.";
      } else if (!correoRegex.test(this.formData.correo)) {
        this.errors.correo = "El correo electrónico no es válido.";
      }

      // Validar Mensaje
      if (!this.formData.mensaje || this.formData.mensaje.trim().length === 0) {
        this.errors.mensaje = "El mensaje es obligatorio.";
      }

      // Retorna verdadero si no hay errores
      return !this.errors.nombre && !this.errors.correo && !this.errors.mensaje;
    },
    enviarFormulario() {
      if (this.validarFormulario()) {
        this.showModal = true; // Muestra el modal con los datos del formulario
        //opcion 2 alert
        //alert(
        //  `Formulario enviado con éxito:\n\n` +
        //  `Nombre: ${this.formData.nombre}\n` +
        //  `Correo: ${this.formData.correo}\n` +
        //  `Mensaje: ${this.formData.mensaje}`
        //);
        // y despues de cerrar el modal o el alert, se enviarian los datos a un servidor, o enviarlos antes, y al recibir confirmacion, mostrar el alert o modal
      }
    },
  },
};
</script>

<style scoped>
.contacto {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.error {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: block;
}

/* Estilo del Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.modal-content h2 {
  margin-bottom: 1rem;
}

.modal-content button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-content button:hover {
  background: #0056b3;
}
</style>
