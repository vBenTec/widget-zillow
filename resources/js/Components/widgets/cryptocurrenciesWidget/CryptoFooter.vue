<script setup lang="ts">
import BaseButton from "@/Components/library/BaseButton.vue";

import type {CryptoData} from "@/types/cryptocurrencyApiTypes";

// ************* TYPES ************* //
interface Props {
    crypto: CryptoData
}

// ************* PROPS ************* //
const props = defineProps<Props>()
</script>

<template>
    <footer>
        <a :href="`https://coinmarketcap.com/currencies/${crypto.nameid}`" target="_blank">
            <base-button name="Info"/>
        </a>
    </footer>
</template>

<style scoped lang="scss">

</style>
