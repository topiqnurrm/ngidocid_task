// src/map.js
import L from 'leaflet';

const initMap = (latitude, longitude) => {
    const map = L.map('map').setView([latitude, longitude], 13);
    
    const baseLayers = {
        'OpenStreetMap': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map),
        'Stamen Toner': L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
            attribution: '&copy; Stamen Design'
        }),
        'Esri World Imagery': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '&copy; Esri & contributors'
        })
    };
    
    L.control.layers(baseLayers).addTo(map);
    
    L.marker([latitude, longitude]).addTo(map)
        .bindPopup('Lokasi Anda')
        .openPopup();
};

export default initMap;
