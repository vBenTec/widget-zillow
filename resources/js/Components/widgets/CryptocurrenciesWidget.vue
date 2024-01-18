<script setup lang="ts">
import BaseCard from "@/Components/library/BaseCard.vue";
import type {CryptoData} from "@/types/cryptocurrencyApiTypes";
import BaseIcon from "@/Components/library/BaseIcon.vue";
import BaseButton from "@/Components/library/BaseButton.vue";

// ************* TYPES ************* //
interface ImportedIcon {
    height: number
    minX: number
    minY: number
    name: string
    width: string
}

interface Props {
    data: CryptoData[]
    iconList: string[]
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

const isTrendingUp = (percent: string) => {
    return !percent.includes('-');
}

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
</script>

<template>
    <ul class="flex gap-4 flex-wrap">
        <base-card class="crypto-card" tag="li" v-for="(crypto, index) in data" :key="crypto.id">
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

            <div class="flex justify-center gap-2 py-1 items-center bg-violet-100 rounded-lg mb-4">
                <base-icon :icon="{name: 'fa-regular-money-bill-alt'}"/>
                <h5 class="text-xl font-bold text-center">{{ crypto.price_usd }} $</h5>
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
                    <span class="text-bold text-lg">{{ crypto.market_cap_usd }}</span>
                </li>
                <li class="list__item mb-4">
                    <div class="flex gap-2">
                        <base-icon :icon="{name: 'fa-trophy'}"/>
                        <span>Rank</span>
                    </div>
                    <span class="text-bold text-lg">{{ crypto.rank }}</span>
                </li>
            </ul>

            <footer>
                <a :href="`https://coinmarketcap.com/currencies/${crypto.nameid}`" target="_blank">
                    <base-button name="Info"/>
                </a>
            </footer>
        </base-card>
    </ul>
</template>

<style scoped lang="scss">
@mixin break($breakpoint) {
    @if $breakpoint == phone {
        @media only screen and (min-width: 43.75em) {
            // 600px = 37.5 em
            @content;
        }
    }
}

.crypto-card {
    flex-grow: 1;
    margin: 0 1rem;
    @include break('phone') {
        max-width: 18rem;
        margin: 0;
    }

    .list {
        display: flex;
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

    .ticker-placeholder {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 100%;
        padding: .5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid darkgrey;
        color: darkgrey;
    }
}
</style>
