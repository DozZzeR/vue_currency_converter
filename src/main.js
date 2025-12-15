import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/scss/global.scss";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { MdCurrencyexchangeTwotone } from "oh-vue-icons/icons";

addIcons(MdCurrencyexchangeTwotone);

createApp(App).component("v-icon", OhVueIcon).mount("#app");
