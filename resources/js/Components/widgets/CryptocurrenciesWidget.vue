<script setup lang="ts">
import BaseCard from "@/Components/library/BaseCard.vue";
import type {CryptoData} from "@/types/cryptocurrencyApiTypes";

// ************* TYPES ************* //
interface Props {
    data: CryptoData[]
}

// ************* PROPS ************* //
defineProps<Props>()
</script>

<template>
    <ul class="flex gap-4 flex-wrap">
        <base-card class="crypto-card" tag="li" v-for="(crypto, index) in data" :key="crypto.id">
            <header class="flex items-center gap-2">
                <span class="text-sm">#{{ index }}</span>
                <h3 class="text-black font-bold dark:text-white">{{ crypto.name }}</h3>
                <h4 class="text-gray-400">{{ crypto.symbol }}</h4>
            </header>
            <ul class="list">
                <li class="list__item">
                    <span>24h</span>
                    <span>{{ crypto.percent_change_24h }}</span>
                </li>
                <li class="list__item">
                    <span>1h</span>
                    <span>{{ crypto.percent_change_24h }}</span>
                </li>
                <li class="list__item">
                    <span>7h</span>
                    <span>{{ crypto.percent_change_24h }}</span>
                </li>
            </ul>
            <footer>

            </footer>
        </base-card>
    </ul>
</template>

<style scoped lang="scss">
.crypto-card {
    max-width: 18rem;

    .list {
        display: flex;
        gap: 1rem;
        &__item {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
}
</style>
