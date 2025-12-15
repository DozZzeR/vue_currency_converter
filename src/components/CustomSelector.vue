<template>
  <div class="selector">
    <ul class="selector__list">
      <li
        v-for="(item, index) in moneys"
        :key="index"
        class="selector__item"
        :class="{ 'is-selected': item === current }"
        @click="setMoney(item)"
      >
        {{ moneyNames[item] }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { moneys, moneyNames } from '@/constants/types.js';

defineProps({
  current: { type: String, required: true },
  setMoney: { type: Function, required: true },
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/index.scss' as *;

.selector__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 8px;
}

.selector__item {
  @include control-base;
  padding: 10px 14px;
  cursor: pointer;
  user-select: none;

  &.is-selected {
    background: var(--action-selected);
    border-color: var(--primary-light);
  }
}
</style>
