<script setup lang="ts">
import BaseIcon from "@/Components/library/BaseIcon.vue";
import type {CryptoData} from "@/types/cryptocurrencyApiTypes";

// ************* TYPES ************* //
interface Props {
    iconList: string[]
    index: number
    crypto: CryptoData
}

// ************* PROPS ************* //
const props = defineProps<Props>()

const checkListForIcon = (ticker: string) => {
    return props.iconList.some(icon => {
        const iconNameParts = icon.split('-');
        // f.e ci-color-btc 0-1-2
        return iconNameParts[2] === ticker.toLowerCase();
    });
}
</script>

<template>
    <header class="flex items-center gap-2 mb-4">
        <span class="text-sm">#{{ index }}</span>
        <base-icon v-if="checkListForIcon(crypto.symbol)"
                   :icon="{name:`ci-color-${crypto.symbol.toLowerCase()}`, scale: 1.3}"/>
        <div class="ticker-placeholder" v-else>
            <span>?</span>
        </div>
        <h3 class="text-black font-bold dark:text-white">{{ crypto.name }}</h3>
        <h4 class="text-gray-400">{{ crypto.symbol }}</h4>
    </header>
</template>

<style scoped lang="scss">
:has
.ticker-placeholder {
    width: 1.2rem;
    height: 1.2rem;
    font-size: 0.8rem;
    border-radius: 100%;
    padding: .5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid darkgrey;
    color: darkgrey;
}
</style>
