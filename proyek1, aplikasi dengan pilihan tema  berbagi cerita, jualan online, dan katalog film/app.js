
// 1. Menambahkan Peta Digital di app.js
import L from 'leaflet';

function initMap(lat, lng) {
    const map = L.map('map').setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    L.marker([lat, lng]).addTo(map)
        .bindPopup('Lokasi Cerita')
        .openPopup();
}

// 2. Menambahkan "Skip to Content" di index.html
document.body.insertAdjacentHTML('afterbegin', `
    <a href="#main-content" class="skip-link">Lewati ke Konten</a>
`);

// 3. Menambahkan View Transition API
document.startViewTransition(() => {
    document.getElementById('app').innerHTML = '<h2>Loading...</h2>';
});

// 4. Menambahkan Kamera untuk Mengambil Gambar
function setupCamera() {
    const video = document.createElement('video');
    video.setAttribute('autoplay', '');
    document.body.appendChild(video);

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.srcObject = stream;
    });

    return video;
}

// 5. Menambahkan Event Klik di Peta untuk Mendapatkan Koordinat
function enableMapClick(map) {
    map.on('click', function (e) {
        const { lat, lng } = e.latlng;
        console.log(`Koordinat dipilih: ${lat}, ${lng}`);
    });
}

export { initMap, setupCamera, enableMapClick };
