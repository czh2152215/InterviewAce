<template>
  <mindmap v-model="data"></mindmap>
</template>

<script setup>
import mindmap from "vue3-mindmap";
import "vue3-mindmap/dist/style.css";
import { ref } from "vue";

const props = defineProps({
  externalData: {
    type: Array,
    required: true,
  },
});

const data = ref(props.externalData);
</script>
