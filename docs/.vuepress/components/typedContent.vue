<script setup>
import { onMounted } from "vue";
import Typed from "typed.js"
import { ref } from "vue";

const typedRef = ref(null);
const props = defineProps({
  strings: {
    type: Array,
    default: () => ["This is a test", "check this vue component."]
  },
  typeSpeed: {
    type: Number,
    default: 50
  },
  backSpeed: {
    type: Number,
    default: 25
  },
  backDelay: {
    type: Number,
    default: 2000
  },
  loop: {
    type: Boolean,
    default: true
  },
  showCursor: {
    type: Boolean,
    default: true
  },
  cursorChar: {
    type: String,
    default: '|'
  }
});

onMounted(() => {
    if (!typedRef.value) return;
    var typed = new Typed(typedRef.value, props);
    
    
});
</script>

<template>
  <span ref="typedRef"></span>
</template>