import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import customMarkerIcon from "../assets/icons/feuille.png";
import MarkerClusterGroup from "react-leaflet-cluster";


const Map = () => { // Composant pour afficher la carte
    const [acts, setActs] = useState([]); // État pour stocker les données des actes

    const customIcon = new L.Icon({
        iconUrl: customMarkerIcon, // URL de l'image importée
        iconSize: [25, 35], // Taille de l'icône (ajuste selon la taille)
        iconAnchor: [16, 32], // Point d'ancrage de l'icône (la moitié de la largeur, bas de l'image)
        popupAnchor: [0, -32], // Position de la popup par rapport au marqueur (au-dessus)
    });

    useEffect(() => { // Hook pour charger les données des actes au chargement du composant
        const fetchedActs = [
            {
                id: 1,
                title: "J'ai aidé un voisin à faire ses courses",
                description: "A Paris, j'ai proposé mon aide à un voisin âgé de 70 ans de faire ses courses.",
                coordinates: [48.8566, 2.3522] // Coordonnées de Paris
            },
            {
                id: 2,
                title: "J'ai donné des vêtements à une association",
                description: "A Lyon, j'ai donné des vêtements à une association caritative.",
                coordinates: [45.7640, 4.8357] // Coordonnées de Lyon
            },
            {
                id: 3,
                title: "J'ai participé à un nettoyage de plage",
                description: "A Nice, j'ai participé à un nettoyage de plage avec des bénévoles.",
                coordinates: [43.7102, 7.2620] // Coordonnées de Nice
            },

            {
                id: 4,
                title: "Deuxième acte à Paris",
                description: "Encore un acte dans la même ville.",
                coordinates: [48.8566, 2.3522]
            }
        ];
        setActs(fetchedActs); // Met à jour l'état avec les données récupérées
    }, []); // Fin du useEffect
    return (
        <div class="min-h-screen bg-custom-grey text-custom-greyd flex flex-col items-center px-4 py-6">
            <h1 class="text-3xl font-bold mb-8 border-b-4 border-custom-green pb-2">Carte des Actes</h1>

            <div class="w-full max-w-4xl h-[70vh] rounded-xl overflow overflow-hidden shadow-lg">
                <MapContainer center={[46.603354, 1.888334]} zoom={6} style={{ height: "100%", width: "100%", zIndex: 0 }} class="rounded-xl">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                    <MarkerClusterGroup>
                        {acts.map((act) => (
                            <Marker key={act.id} position={act.coordinates} icon={customIcon}>
                                <Popup>
                                    <div class="text-center">
                                        <h3 class="font-bold text-sm mb-1">
                                            {act.title}
                                        </h3>
                                        <p class="text-xs">
                                            {act.description}
                                        </p>
                                    </div>
                                </Popup>
                            </Marker>
                            ))}
                    </MarkerClusterGroup>
                </MapContainer>
            </div>
        </div>
    )
};

export default Map;
