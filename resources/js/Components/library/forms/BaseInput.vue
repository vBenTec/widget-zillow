<script setup lang="ts">
import {onMounted, ref} from 'vue';

interface Props {
    type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
}

withDefaults(defineProps<Props>(), {
    type: 'text',
});

// Sets up two-way binding for the model
const model = defineModel<string>({required: true});

const input = ref<HTMLInputElement | null>(null);

onMounted(() => {
    if (input.value?.hasAttribute('autofocus')) {
        input.value?.focus();
    }
});

defineExpose({focus: () => input.value?.focus()});
</script>

<template>
    <input
        class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
        :type="type"
        v-model="model"
        ref="input"
    />
</template>
