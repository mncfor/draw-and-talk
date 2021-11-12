<template>
  <button class="button-special-only-icon">
      <span>
        <slot></slot>
      </span>
      <i :class="icon"></i>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      require: true
    }
  }
}
</script>

<style>

</style>