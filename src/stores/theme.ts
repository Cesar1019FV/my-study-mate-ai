import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
    const isDark = ref(false);

    function toggleTheme() {
        isDark.value = !isDark.value;
        updateTheme();
    }

    function initTheme() {
        if (typeof window !== 'undefined') {
            const storedTheme = localStorage.getItem('theme');
            if (storedTheme) {
                isDark.value = storedTheme === 'dark';
            } else {
                isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
            }
            updateTheme();
        }
    }

    function updateTheme() {
        if (typeof window !== 'undefined') {
            const html = document.documentElement;
            if (isDark.value) {
                html.classList.add('dark');
            } else {
                html.classList.remove('dark');
            }
            localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
        }
    }

    return { isDark, toggleTheme, initTheme };
});
