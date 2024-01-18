<script setup lang="ts">
// ************* import COMPONENTS ************* //
import BaseIcon from "@/Components/library/BaseIcon.vue";
// ************* import TYPES ************* //
import type {CryptoData} from "@/types/cryptocurrencyApiTypes";

// ************* TYPES ************* //
interface Props {
    crypto: CryptoData
}

// ************* PROPS ************* //
defineProps<Props>()

// ************* FUNCTIONS | METHODS ************* //
const getStats = (crypto: CryptoData) => {
    return [
        {
            label: '24h',
            percent: crypto.percent_change_24h,
            isTrending: isTrendingUp(crypto.percent_change_24h)
        },
        {
            label: '1h',
            percent: crypto.percent_change_1h,
            isTrending: isTrendingUp(crypto.percent_change_1h)
        },
        {
            label: '7d',
            percent: crypto.percent_change_7d,
            isTrending: isTrendingUp(crypto.percent_change_7d)
        }
    ]
}

const isTrendingUp = (percent: string) => {
    return !percent.includes('-');
}

</script>

<template>
    <div class="flex justify-center gap-2 py-1 items-center bg-violet-100 dark:bg-gray-800 rounded-lg mb-4">
        <base-icon :icon="{name: 'fa-regular-money-bill-alt'}"/>
        <h5 class="text-xl font-bold dark:text-white text-center">{{ crypto.price_usd }} $</h5>
    </div>

    <ul class="list">
        <li v-for="(item, index) in getStats(crypto)" :key="item.label + index" class="list__item mb-4">
            <span>{{ item.label }}</span>
            <div class="flex text-lg font-bold"
                 :class="{'text-green-500': item.isTrending, 'text-red-500': !item.isTrending}">
                <base-icon
                    styling="none"
                    :icon="{name:item.isTrending? 'fa-caret-up': 'fa-caret-down'}"/>
                <span>{{ item.percent }}</span>
            </div>
        </li>
    </ul>

    <ul class="list">
        <li class="list__item mb-4">
            <div class="flex gap-2">
                <base-icon :icon="{name: 'fa-sort-amount-up'}"/>
                <span>Supply</span>
            </div>
            <span class="text-bold dark:text-white text-lg">{{ crypto.market_cap_usd }}</span>
        </li>
        <li class="list__item mb-4">
            <div class="flex gap-2">
                <base-icon :icon="{name: 'fa-trophy'}"/>
                <span>Rank</span>
            </div>
            <span class="text-bold dark:text-white text-lg">{{ crypto.rank }}</span>
        </li>
    </ul>
</template>

<style scoped lang="scss">
.list {
    display: flex;
    justify-content: center;
    gap: 1rem;
    border-bottom: 1px solid lightgrey;

    margin-bottom: 1rem;

    &__item {
        display: flex;
        flex-direction: column;
        align-items: center;

        > :first-child {
            font-size: .8rem;
        }
    }

}
</style>
