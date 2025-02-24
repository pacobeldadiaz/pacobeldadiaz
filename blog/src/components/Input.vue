<template>
  <div class="input-group">
    <label :for="id">{{ label }}</label>
    <input
      :type="type"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    label: String,
    type: {
      type: String,
      default: "text",
    },
    id: String,
    placeholder: String,
    modelValue: String, // Cambiamos 'value' por 'modelValue' para soporte de v-model
  },
};
</script>
  
 <style scoped>
.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 10px;
}

/* Estilo para los inputs */
.input-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid darkred; /* Borde de color darkred */
  border-radius: 4px;
  font-size: 1rem;
}
</style>