import {computed, onMounted, onUnmounted, ref} from "vue";
/**
 * @info
 * Could also be a library of course
 * momentjs
 * dayjs
 * or just use vueuse
 **/
export const useTime = () => {
    const intervalForTime = ref<number | null>(null);
    const now = ref(new Date());

    const displayTime = computed(() => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = days[now.value.getDay()];
        const hours = now.value.getHours().toString().padStart(2, '0');
        const minutes = now.value.getMinutes().toString().padStart(2, '0');
        return `${day}, ${hours}:${minutes}`;
    });

    onMounted(() => {
        intervalForTime.value = window.setInterval(() => {
            now.value = new Date();
        }, 1000);
    });

    onUnmounted(() => {
        if (intervalForTime.value) {
            window.clearInterval(intervalForTime.value);
        }
    });

    return {displayTime}
}
