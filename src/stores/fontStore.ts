import { ref, watchEffect, type Ref } from "vue";
import { defineStore } from "pinia";

export const useFontStore = defineStore("font", () => {
    const size = ["12", "16", "20", "24", "28"];
    const fontSize: Ref<string> = ref(localStorage.getItem("fontSize") || size[2]);
    const fontBold: Ref<string> = ref(localStorage.getItem("fontBold") || "normal");
    watchEffect(() => {
        if (fontSize.value) {
            localStorage.setItem("fontSize", fontSize.value);
        }
        if (fontBold.value) {
            localStorage.setItem("fontBold", fontBold.value);
        }
    });
    return { size, fontBold, fontSize };
});
