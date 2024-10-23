/*
*   @description    : This hook is used to set the viewport meta tag for responsive design.
*   @param           {ResponsiveLayoutOptions} options - The options for the hook.
*   @returns         {void}
*   @example         : useResponsiveLayout({ designWidth: 375 });
*/
import { onMounted, onBeforeUnmount } from 'vue';

interface ResponsiveLayoutOptions {
    designWidth?: number;
}

const DEFAULT_DESIGN_WIDTH = 375; // Default design width is 375px

export function useResponsiveLayout(options: ResponsiveLayoutOptions = {}) {
    const designWidth: number = options.designWidth || DEFAULT_DESIGN_WIDTH;

    const setViewport = (): void => {
        const scale: number = window.screen.width / designWidth;
        let meta: HTMLMetaElement | null = document.querySelector("meta[name=viewport]");
        const content: string = `width=${designWidth}, initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}`;

        if (!meta) {
            meta = document.createElement("meta");
            meta.setAttribute("name", "viewport");
            document.head.appendChild(meta);
        }
        meta.setAttribute("content", content);
    };

    const handleResize = (): void => {
        setViewport();
    };

    const handleOrientationChange = (): void => {
        setViewport();
    };

    onMounted((): void => {
        setViewport();
        window.addEventListener("resize", handleResize);
        window.addEventListener("orientationchange", handleOrientationChange);
    });

    onBeforeUnmount((): void => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("orientationchange", handleOrientationChange);
    });
}
