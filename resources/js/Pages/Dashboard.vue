<script setup lang="ts">
import {ref, onBeforeMount} from 'vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import {Head} from '@inertiajs/vue3';
import CryptocurrenciesWidget from "@/Components/widgets/CryptocurrenciesWidget.vue";
import {useFetch} from "@/composables/useFetch";
import cryptoApi from "@/services/cryptocurrenyApi";
import {addIcons} from 'oh-vue-icons'

const {callApi, isFetching, data, error} = useFetch()

const iconNameList = ref()

onBeforeMount(async () => {
    const res = await callApi(() => cryptoApi.getCurrencies())
    if (res?.data) {
        const icons = await import(`oh-vue-icons/icons`)
        const iconList = res.data.data.map((crypto) => {
            let icon = crypto.symbol.toLowerCase()
            const iconName = `CiColor${
                icon[0].toUpperCase() + icon.slice(1)
            }`
            return icons[iconName]
        }).filter((icon) => !!icon)
        addIcons(...iconList)
        iconNameList.value = iconList.map((icon)=> icon.name)
    }
})
</script>

<template>
    <Head title="Dashboard"/>

    <AuthenticatedLayout>
        <cryptocurrencies-widget v-if="iconNameList && data?.data" :icon-list="iconNameList" :data="data?.data"/>
    </AuthenticatedLayout>

    <!--     Left Code for future use -->
    <!--        <template #header>-->
    <!--            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>-->
    <!--        </template>-->

    <!--        <div class="py-12">-->
    <!--            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">-->
    <!--                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">-->
    <!--                    <div class="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--        </div>-->
</template>
