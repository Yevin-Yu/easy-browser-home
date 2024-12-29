import { ref, onMounted, watch } from "vue";

type Theme = "light" | "dark";

export function useTheme() {
    const currentTheme = ref<Theme>(localStorage.getItem("theme") as Theme || "light");
    const setTheme = (theme: Theme) => {
        const rootElement = document.documentElement;
        if (theme === "dark") {
            rootElement.classList.add("dark-theme");
            rootElement.classList.remove("light-theme");
        } else {
            rootElement.classList.add("light-theme");
            rootElement.classList.remove("dark-theme");
        }
    };

    onMounted(() => {
        setTheme(currentTheme.value);
    });

    watch(currentTheme, (newValue) => {
        setTheme(newValue);
    });

    const toggleTheme = () => {
        currentTheme.value = currentTheme.value === "light" ? "dark" : "light";
        localStorage.setItem("theme", currentTheme.value);
    };

    return {
        currentTheme,
        toggleTheme,
    };
}
