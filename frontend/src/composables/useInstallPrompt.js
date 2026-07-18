import { ref, onMounted, onUnmounted } from "vue";
// Minimal wrapper around the browser's `beforeinstallprompt` event so any
// component can offer an "Install App" action without duplicating the
// event-handling boilerplate. Not supported on iOS Safari — no event fires
// there, since install has to happen via the Share sheet — so `canInstall`
// simply stays false on those browsers.
let deferredPrompt = null;
export function useInstallPrompt() {
    const canInstall = ref(false);
    function handleBeforeInstallPrompt(event) {
        event.preventDefault();
        deferredPrompt = event;
        canInstall.value = true;
    }
    function handleAppInstalled() {
        deferredPrompt = null;
        canInstall.value = false;
    }
    onMounted(() => {
        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        window.addEventListener("appinstalled", handleAppInstalled);
        // In case the event already fired before this component mounted
        if (deferredPrompt)
            canInstall.value = true;
    });
    onUnmounted(() => {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        window.removeEventListener("appinstalled", handleAppInstalled);
    });
    async function install() {
        if (!deferredPrompt)
            return;
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        deferredPrompt = null;
        canInstall.value = false;
    }
    return { canInstall, install };
}
