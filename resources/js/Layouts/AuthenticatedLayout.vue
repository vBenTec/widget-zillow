<script setup lang="ts">
import {ref, onMounted} from 'vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import {Link} from '@inertiajs/vue3';
import TheAppHeader from "@/Components/layout/TheAppHeader.vue";
import TheAppSidebar from "@/Components/layout/TheAppSidebar.vue";

const appHeader = ref<InstanceType<typeof TheAppHeader>>()
const mainWrapper = ref<HTMLElement>()
onMounted(() => {
    if (!appHeader.value || !mainWrapper.value) return
    const headerHeight = appHeader.value.$el.clientHeight
    mainWrapper.value.style.height = `calc(100vh - ${headerHeight}px)`
})
</script>

<template>
    <div class="main-layout bg-gray-100 dark:bg-gray-900">
        <the-app-header ref="appHeader" class="main-layout__header"/>
        <div ref="mainWrapper" class="main-layout__main">
            <slot/>
        </div>
        <the-app-sidebar class="main-layout__sidebar"/>
    </div>
</template>
<style lang="scss" scoped>
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

    @if $breakpoint == desktop {
        @media only screen and (min-width: 68.75em) {
            // 1100px = 68.75em
            @content;
        }
    }
}

.main-layout {
    min-height: 100dvh;

    @include break(desktop) {
        display: grid;
        grid-template-columns: 20rem 1fr;
        grid-template-rows: auto 1fr;
        grid-template-areas:
        "sidebar header"
        "sidebar main";

        &__sidebar {
            grid-area: sidebar;
        }

        &__header {
            grid-area: header;
        }

        &__main {
            grid-area: main;
            overflow-y: auto;
            padding: 1rem;
        }
    }
}
</style>
