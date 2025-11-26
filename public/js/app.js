var counter = 0;

document.addEventListener("click", function() {
    counter++;
    document.getElementById("counter").innerText = counter;
});

// Register the service worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("/my-pwa/js/serviceWorker.js", { scope: '/my-pwa/' })
            .then(function() {
                console.log("Service Worker registered successfully");
            })
            .catch(function(err) {
                console.log("Service Worker registration failed", err);
            });
    });
}
