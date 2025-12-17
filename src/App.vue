<template>
  <div class="main-wrapper">
    <div class="topbar">
      <h1>Exchange it!</h1>

      <CustomButton variant="outlined" @click="toggle">
        {{ theme === 'dark' ? 'Light' : 'Dark' }}
      </CustomButton>
    </div>

    <div class="selectors">
      <CustomSelector :setMoney="setMoneyFrom" :current="moneyFrom" />
      <CustomSelector :setMoney="setMoneyTo" :current="moneyTo" />
    </div>
    <p v-if="error.value != ''">{{ error }}</p>

    <CustomInput :changeAmount="changeAmount" />

    <div class="cta">
      <CustomButton :disabled="!isReady || !!error" @click="convertation">
        <template #icon>
          <v-icon name="md-currencyexchange-twotone" />
        </template>
      </CustomButton>
    </div>

    <p class="hint">
      From: <strong>{{ moneyFrom }}</strong> → To: <strong>{{ moneyTo }}</strong
      >, amount:
      <strong>{{ result || 0 }}</strong>
    </p>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

import CustomInput from './components/CustomInput.vue';
import CustomSelector from './components/CustomSelector.vue';
import CustomButton from './components/CustomButton.vue';
import { moneys } from './constants/types.js';
import { useTheme } from './composables/useTheme';

import { getCryptoConvert, waitForCryptoConvert } from '@/services/cryptoConvert';
const convert = getCryptoConvert();
const isReady = ref(false);

const { theme, toggle } = useTheme();

const moneyFrom = ref(moneys.BTC);
const moneyTo = ref(moneys.USD);
const amount = ref(0);
const result = ref(0);
const error = ref('');

onMounted(async () => {
  try {
    await waitForCryptoConvert();
    isReady.value = true;
  } catch (e) {
    error.value = e.message;
  }
});

watch([moneyFrom, moneyTo, amount], ([newFrom, newTo, newAmount]) => {
  console.log([newFrom, newTo, newAmount]);
  if (newFrom == newTo) {
    error.value = 'Please select another currency pair';
  } else if (newAmount == 0) {
    error.value = 'Please enter amount';
  } else error.value = '';
});

const setMoneyFrom = (v) => {
  moneyFrom.value = v;
};
const setMoneyTo = (v) => {
  moneyTo.value = v;
};
const changeAmount = (v) => {
  const n = Number(v);
  amount.value = Number.isFinite(n) ? Math.max(0, n) : 0;
};
const convertation = async () => {
  if (!isReady.value) {
    error.value = 'Converter is not ready yet';
    return;
  }
  if (error.value) return;

  const fn = convert[moneyFrom.value]?.[moneyTo.value];
  if (typeof fn !== 'function') {
    error.value = `Conversion ${moneyFrom.value} → ${moneyTo.value} is not supported`;
    return;
  }

  result.value = fn(amount.value);
};
</script>

<style scoped lang="scss">
.main-wrapper {
  max-width: 520px;
  margin: auto auto;
  text-align: center;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.selectors {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  margin: 0 auto;
  max-width: 100%;
}

.hint {
  margin-top: 18px;
  color: var(--text-secondary);
}
.cta {
  margin-top: 20px;
  width: 100%;
  text-align: center;
}
</style>
