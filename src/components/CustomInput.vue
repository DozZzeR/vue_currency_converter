<template>
  <input
    class="input"
    name="amount"
    type="number"
    @input="changeAmount($event.target.value)"
    aria-label="input amount"
    placeholder="input amount"
    min="0"
  />
</template>

<script setup>
defineProps({
  changeAmount: { type: Function, required: true },
});
</script>

<style scoped lang="scss">
@use "@/assets/scss/index.scss" as *;

.input {
  @include input-base;
  margin-top: 20px;
}
</style>
