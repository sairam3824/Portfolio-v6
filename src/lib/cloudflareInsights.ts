const BEACON_SRC = "https://static.cloudflareinsights.com/beacon.min.js";
const BEACON_TOKEN = "d3cf8d9d6c604694a7bb42505af50d76";

export function loadCloudflareInsights() {
    if (!import.meta.env.PROD) return;

    const loadBeacon = () => {
        const script = document.createElement("script");
        script.defer = true;
        script.src = BEACON_SRC;
        script.setAttribute("data-cf-beacon", JSON.stringify({ token: BEACON_TOKEN }));
        document.body.appendChild(script);
    };

    if ("requestIdleCallback" in window) {
        requestIdleCallback(loadBeacon, { timeout: 3500 });
    } else {
        setTimeout(loadBeacon, 2500);
    }
}
