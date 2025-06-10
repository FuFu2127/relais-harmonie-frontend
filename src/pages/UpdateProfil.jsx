import React, { useState } from 'react';
import avatar from '../assets/icons/france.png';

const UpdateProfil = () => {
    const [selectedTab, setSelectedTab] = useState('profil'); // Etat pour gérer l'onglet sélectionné
    const [formData, setFormData] = useState({ // Etat pour les données du formulaire
        pseudo: 'Harmo',
        birthday: '',
        currentPassword: '',
        newPassword: '',
        avatar: null,
    });

    const handleInputChange = (e) => { // Fonction pour gérer les changements dans les champs du formulaire
        const { name, value, files } = e.target;
        if (name === 'avatar') {
            setFormData({ ...formData, avatar: files[0] }); // Met à jour l'avatar avec le fichier sélectionné
        } else {
            setFormData({ ...formData, [name]: value }); // Met à jour les autres champs du formulaire
        }
    };

    const handleSubmit = (e) => { // Fonction pour gérer la soumission du formulaire
        e.preventDefault(); // Logique de soumission du formulaire
        // Ici, ajouter la logique pour envoyer les données au backend
        console.log("Données soumises :", formData);
        // À connecter avec back Symfony plus tard
    };

    return (
        <div className="flex flex-col items-center justify-center px-4 py-1 mb-10">
            <h1 className="text-3xl font-bold mb-6 border-b-4 border-custom-green pb-2 mt-4">Modifier mon profil</h1>

            <div className="bg-custom-grey shadow-lg rounded-lg p-6 w-full max-w-lg border-2 border-custom-green">
                {/* Onglets */}
                <div className="flex justify-around mb-6">
                    <button
                        className={`text-lg font-semibold ${selectedTab === 'profil' ? 'border-b-2 border-custom-green text-black' : 'text-gray-600'}`}
                        onClick={() => setSelectedTab('profil')}
                    >
                        Profil
                    </button>
                    <button
                        className={`text-lg font-semibold ${selectedTab === 'suppression' ? 'border-b-2 border-custom-green text-black' : 'text-gray-600'}`}
                        onClick={() => setSelectedTab('suppression')}
                    >
                        Suppression
                    </button>
                </div>

                {selectedTab === 'profil' && (
                    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
                        {/* Avatar actuel */}
                        <img src={avatar} alt="avatar" className="w-20 h-20 rounded-full border border-custom-green object-cover mb-2" />

                        {/* Pseudo */}
                        <label className="block font-bold mb-1">Pseudo</label>
                        <input
                            type="text"
                            name="pseudo"
                            value={formData.pseudo}
                            onChange={handleInputChange}
                            placeholder="Pseudo"
                            className="w-full p-3 border rounded-bl-xl rounded-tr-xl border-custom-green focus:outline-none focus:ring-1 focus:ring-custom-green text-center"
                        />

                        {/* Image upload */}
                        <label className="block font-bold">Image</label>
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={handleInputChange}
                            className="w-full"
                        />

                        {/* Date de naissance */}
                        <label className="block font-bold">Date de naissance</label>
                        <input
                            type="date"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-bl-xl rounded-tr-xl border-custom-green focus:outline-none focus:ring-1 focus:ring-custom-green text-center"
                        />

                        {/* Ancien mot de passe */}
                        <label className="block font-bold">Ancien mot de passe</label>
                        <input
                            type="password"
                            name="currentPassword"
                            placeholder="Ancien mot de passe"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-bl-xl rounded-tr-xl border-custom-green focus:outline-none focus:ring-1 focus:ring-custom-green text-center"
                        />

                        {/* Nouveau mot de passe */}
                        <label className="block font-bold">Nouveau mot de passe</label>
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="Nouveau mot de passe"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-bl-xl rounded-tr-xl border-custom-green focus:outline-none focus:ring-1 focus:ring-custom-green text-center"
                        />

                        {/* Bouton Enregistrer */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="w-full bg-custom-green border-custom-yellow border-2 rounded-bl-xl rounded-tr-xl text-white font-bold hover:bg-custom-yellow hover:text-custom-green hover:border-custom-green px-4 py-2 transition-colors"
                            >
                                Enregistrer
                            </button>
                        </div>
                    </form>
                )}

                {selectedTab === 'suppression' && (
                    <div className="flex flex-col items-center text-center space-y-8 m-8">
                        <h2 className="text-2xl font-bold text-black">Suppression de mon compte</h2>
        
                        <button
                        className="bg-red-600 text-white font-bold py-2 px-6 rounded-bl-xl rounded-tr-xl border-2 border-black hover:bg-red-500 transition-colors"
                        onClick={() => {
                        // À connecter avec le backend plus tard
                        
                        }}
                        >
                            Oui, je veux supprimer mon compte
                        </button>

                        <p className="text-sm text-gray-700 px-4">
                            Après validation, votre compte sera supprimé. Les données personnelles ne seront jamais transmises à des tiers ; leur seule utilisation se limite au site ici présent.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpdateProfil;
