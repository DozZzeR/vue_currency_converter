<template>
  <button
    class="btn"
    :class="[`btn--${variant}`, { 'btn--icon-only': iconOnly }]"
    :type="type"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <span v-if="$slots.icon" class="btn__icon">
      <slot name="icon" />
    </span>
    <span v-if="$slots.default" class="btn__label">
      <slot />
    </span>
  </button>
</template>

<script setup>
import { computed, useSlots } from 'vue';

defineProps({
  variant: { type: String, default: 'filled' }, // filled | outlined | text
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
});

defineEmits(['click']);

const slots = useSlots();
const iconOnly = computed(() => !slots.default);
</script>

<style scoped lang="scss">
@use '@/assets/scss/index.scss' as *;

.btn {
  border-radius: var(--btn-radius);
  min-height: var(--btn-min-h);
  padding: var(--btn-padding-y) var(--btn-padding-x);
  border: 1px solid transparent;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  font-weight: 650;
  letter-spacing: 0.2px;

  cursor: pointer;
  transition:
    background 120ms ease,
    border-color 120ms ease,
    box-shadow 120ms ease,
    color 120ms ease;

  &:focus-visible:not(:disabled) {
    /* focus ring uses control token */
    --control-ring: var(--action-focus);
    @include focus-ring;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.85;
    background: var(--action-disabled-bg);
    color: var(--text-disabled);
    border-color: var(--outline);
  }
}

.btn--filled {
  background: var(--primary-main);
  color: var(--primary-contrast);

  &:hover:not(:disabled) {
    background: var(--primary-dark);
  }
  &:active:not(:disabled) {
    background: var(--primary-dark);
  }
}

.btn--outlined {
  background: var(--bg-paper);
  color: var(--primary-main);
  border-color: var(--outline);

  &:hover:not(:disabled) {
    background: var(--action-hover);
    border-color: var(--primary-light);
  }

  &:active:not(:disabled) {
    background: var(--action-selected);
  }
}

.btn--text {
  background: transparent;
  color: var(--primary-main);

  &:hover:not(:disabled) {
    background: var(--action-hover);
  }
  &:active:not(:disabled) {
    background: var(--action-selected);
  }
}

.btn__icon {
  display: inline-flex;
}
.btn--icon-only {
  padding: 12px;
  width: 44px;
}

.btn__label {
  line-height: 1;
}
</style>
