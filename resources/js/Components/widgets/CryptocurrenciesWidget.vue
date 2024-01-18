<script setup lang="ts">
// ************* import COMPONENTS ************* //
import BaseCard from "@/Components/library/BaseCard.vue";
import CryptoHeader from "@/Components/widgets/cryptocurrenciesWidget/CryptoHeader.vue";
import CryptoFooter from "@/Components/widgets/cryptocurrenciesWidget/CryptoFooter.vue";
import CryptoBody from "@/Components/widgets/cryptocurrenciesWidget/CryptoBody.vue";

// ************* import TYPES ************* //
import type {CryptoData} from "@/types/cryptocurrencyApiTypes";

// ************* TYPES ************* //
interface Props {
    data: CryptoData[]
    iconList: string[]
}

// ************* PROPS ************* //
defineProps<Props>()

</script>

<template>
    <transition-group tag="ul" name="fade-up" class="flex gap-4 flex-wrap text-gray-700 dark:text-gray-400" appear>
        <base-card
            class="crypto-card shadow-[0_1px_0.2rem_0_rgba(0,0,0,0.1)] dark:shadow-[0_1px_0.2rem_0_rgba(255,255,255,.2)]"
            tag="li" v-for="(crypto, index) in data" :style="{ '--i': index }" :key="crypto.id">
            <crypto-header :iconList="iconList" :index="index + 1" :crypto="crypto"/>
            <crypto-body :crypto="crypto"/>
            <crypto-footer :crypto="crypto"/>
        </base-card>
    </transition-group>
</template>

<style scoped lang="scss">
@mixin break($breakpoint) {
    @if $breakpoint == phone {
        @media only screen and (min-width: 43.75em) {
            // 600px = 37.5 em
            @content;
        }
    }
    @if $breakpoint == tablet {
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
        transition: all 250ms ease-in-out;

        &:hover {
            box-shadow: 0 1px 0.5rem 0 rgba(67, 0, 154, 0.79);
        }
    }

    // creating the stack effect on each card
    animation: fadeInMoveUp 0.5s both;
    animation-delay: calc(var(--i) * 0.1s);
}

// ************* TRANSITION ************* //
// should be in global transition file
@keyframes fadeInMoveUp {
    0% {
        opacity: 0;
        transform: translateY(1.5rem);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
