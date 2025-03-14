if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker Registered'));
}

function subscribePush() {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            navigator.serviceWorker.ready.then(registration => {
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: 'YOUR_VAPID_PUBLIC_KEY'
                }).then(subscription => {
                    console.log('Push Subscription:', subscription);
                });
            });
        }
    });
}
