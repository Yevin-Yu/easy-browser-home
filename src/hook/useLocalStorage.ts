import { ref, onMounted } from 'vue';
import { ElMessage } from "element-plus";
interface LocalStorageData {
    [key: string]: string | number | boolean | null;
}

export function useLocalStorageIO() {
    const fileInputRef = ref<HTMLInputElement | null>(null);

    const downloadLocalStorage = (): void => {
        const data: LocalStorageData = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                data[key] = localStorage.getItem(key) || null;
            }
        }

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'localStorage.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    const importLocalStorage = (): void => {
        if (!fileInputRef.value) return;

        fileInputRef.value.addEventListener('change', async (event: Event) => {
            const target = event.target as HTMLInputElement;
            const file = target.files?.[0];
            if (!file) return;

            try {
                const content = await new Response(file).text();
                const data: LocalStorageData = JSON.parse(content);
                Object.keys(data).forEach(key => {
                    localStorage.setItem(key, data[key] as string);
                });
                ElMessage({
                    message: "导入成功",
                    type: "success",
                });
                window.location.reload();
            } catch (error) {
                ElMessage.error("导入失败");
            }
        });
    };

    onMounted(() => {
        importLocalStorage();
    });

    return {
        downloadLocalStorage,
        fileInputRef,
    };
}