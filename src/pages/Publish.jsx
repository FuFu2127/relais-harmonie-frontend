import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import fond from '../assets/img/background-form.jpg';
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa6";
import { toast } from "react-toastify";
import axios from "axios";


const Publish = () => {
    const location = useLocation(); // Récupération de l'URL actuelle
    const params = new URLSearchParams(location.search); //Extraction des paramètres de l'URL (Si l'URL est de la forme /publish?defi=Planter%20100%20arbres)
    const defiParam = params.get("defi"); // Récupération du paramètre "defi" de l'URL

    const [localisationActive, setLocalisationActive] = useState(false); // État pour gérer l'affichage du champ de localisation
    const [submitted, setSubmitted] = useState(false); // État pour gérer l'état de soumission du formulaire
    const [inviteLink, setInviteLink] = useState(""); // État pour stocker le lien d'invitation généré
    const [selectedDefi, setSelectedDefi] = useState(""); // État pour gérer le défi sélectionné

    useEffect(() => { // Vérification si le paramètre "defi" est présent dans l'URL
        if (defiParam) { // Si oui, on met à jour l'état du défi sélectionné
            setSelectedDefi(defiParam); // Met à jour le défi sélectionné avec la valeur du paramètre "defi"
        }
    }, [defiParam]); // useEffect pour mettre à jour le défi sélectionné si le paramètre "defi" change

    const generateInviteLink = () => { // Fonction pour générer un lien d'invitation unique
        // Simulation de lien unique
        const code = Math.random().toString(36).substring(2,8); // Génération d'un code aléatoire de 6 caractères
        return `https://relaisdharmonie.fr/invite/${code}`; // Génération d'un lien d'invitation avec un code aléatoire
    };

    const handleSubmit = async (s) => { // Fonction pour gérer la soumission du formulaire
        s.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
        const formData = new FormData(s.target); // Récupération des données du formulaire
        const title = formData.get("title")?.trim(); // Récupération du titre du formulaire et suppression des espaces inutiles
        const description = formData.get("description")?.trim(); // Récupération de la description du formulaire et suppression des espaces inutiles
        const category = formData.get("category"); // Récupération de la catégorie sélectionnée dans le formulaire
        const localisationValue = formData.get("localisation"); // Récupération de la valeur de la localisation (oui ou non) sélectionnée dans le formulaire
        const localisation = localisationValue === "oui" ? formData.get("place")?.trim() : localisationValue === "non"; // Si la localisation est "oui", on récupère la valeur du champ de localisation, sinon on met false

        if (!title || !description || !category || localisationValue === null || localisation === false || localisation === "" ) { // Vérification si tous les champs obligatoires sont remplis
            toast.error("Veuillez remplir tous les champs obligatoire", { // Affichage d'un message d'erreur si un champ obligatoire est manquant
                position: "top-center",
                autoClose: 3000,
            });
            return;
        };

        // Construction de l'objet à envoyer
        const actData = {
            title,
            description,
            category,
            challenge: selectedDefi || null, // Si un défi est sélectionné, on l'ajoute, sinon on met null
            localisation: localisation || null, // Si la localisation est active, on l'ajoute, sinon on met null
            image: formData.get("image") ? formData.get("image").name : null // Si une image est sélectionnée, on récupère son nom, sinon on met null
        };

        // Récupère le token JWT
        const token = localStorage.getItem('jwt'); // ou selon ton stockage

        try {
            await axios.post("http://localhost:8000/api/acts", actData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/ld+json"
                }
            });
            const link = generateInviteLink(); // Génération du lien d'invitation unique
            setInviteLink(link); // Mise à jour de l'état du lien d'invitation avec le lien généré
            setSubmitted(true); // Mise à jour de l'état de soumission du formulaire pour afficher le message de succès
            setLocalisationActive(false); // Réinitialisation de l'état de localisation active
            s.target.reset(); // Réinitialisation du formulaire après la soumission
            setSelectedDefi(""); // Réinitialisation du défi sélectionné après la soumission
        } catch {
            toast.error("Erreur lors de la publication de l'acte");
        }
    };

    const handleReset = () => { // Fonction pour réinitialiser le formulaire et l'état après la soumission
        setSubmitted(false); // Réinitialisation de l'état de soumission du formulaire
        setInviteLink(""); // Réinitialisation du lien d'invitation
        setLocalisationActive(false); // Réinitialisation de l'état de localisation active
        setSelectedDefi(""); // Réinitialisation du défi sélectionné
    };

    // Vérifie si l'utilisateur est connecté
    const token = localStorage.getItem('jwt');

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-custom-greyl p-8 rounded-xl shadow-lg text-center border-2 border-custom-green">
                    <h2 className="text-2xl font-bold text-custom-greyd mb-4">Vous devez être connecté pour publier un acte.</h2>
                    <p className="mb-4">Merci de vous connecter ou de créer un compte pour accéder à cette fonctionnalité.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-custom-grey text-custom-greyd flex flex-col items-center px-4 py-6">
            <h1 className="text-3xl font-bold mb-4 border-b-4 border-custom-green pb-2">Publier un acte</h1>

            {!submitted ? (
            <div className="w-full max-w-4xl bg-cover bg-center rounded-xl p-10 border-2 border-custom-green drop-shadow-xl" style={{ backgroundImage: `url(${fond})` }}>
                <form method="post" className="space-y-6 p-2 rounded-xl" onSubmit={handleSubmit}>
                    <div className="flex flex-col sm:flex-row sm:space-x-6">

                        <div className="flex-1 mb-4 sm:mb-0">
                            <label className="block font-bold mb-1">Titre *</label>
                            <input type="text" name="title" className="w-full border rounded-bl-xl rounded-tr-xl border-custom-green focus:outline-none focus:ring-1 focus:ring-custom-green px-4 py-2" placeholder="Titre" aria-required="true" aria-label="Titre de l'acte"/>
                        </div>

                    </div>

                    <div className="flex-1 mb-4 sm:mb-0">
                        <label className="block font-bold mb-1">Description *</label>
                        <textarea name="description" className="w-full h-32 border rounded-bl-xl rounded-tr-xl border-custom-green focus:outline-none focus:ring-1 focus:ring-custom-green px-4 py-2 resize-none" placeholder="Description..." aria-required="true" aria-label="Description de l'acte"></textarea>
                    </div>

                    <div>
                        <label className="block font-bold ">Catégorie *</label>
                        <select name="category" className="w-full p-3 border rounded-bl-xl rounded-tr-xl border-custom-green focus:outline-none focus:ring-1 focus:ring-custom-green">
                            <option value="">-- Choisir une catégorie --</option>
                            <option value="Solidarité">Solidarité</option>
                            <option value="Nature">Nature</option>
                            <option value="Spiritualité">Spiritualité</option>
                            <option value="Culture">Culture</option>
                            <option value="Animaux">Animaux</option>
                            <option value="Partage">Partage</option>
                            <option value="Inspiration">Inspiration</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-bold">Défis</label>
                        <select 
                        name="challenge" 
                        className="w-full p-3 border rounded-bl-xl rounded-tr-xl border-custom-green focus:outline-none focus:ring-1 focus:ring-custom-green" 
                        value={selectedDefi} 
                        onChange={(e) => setSelectedDefi(e.target.value)}>

                            <option value="">-- Aucun défi sélectionné --</option>
                            <option value="Planter 100 arbres">Planter 100 arbres</option>
                            <option value="Aider 100 inconnus">Aider 100 inconnus</option>
                            <option value="Nettoyer l'espace public">Nettoyer l'espace public</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-bold">Image</label>
                        <input type="file" name="image" className="w-full p-3" />
                    </div>

                    <div>
                        <label className="block font-bold">Localisation *</label>
                        <div className="flex gap-4 items-center mt-2">
                            <label className="inline-flex items-center">
                                <input type="radio" name="localisation" value="oui" onChange={() => setLocalisationActive(true)} className="accent-custom-green" />
                                <span className="ml-2">Oui</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input type="radio" name="localisation" value="non" onChange={() => setLocalisationActive(false)} className="accent-custom-green" />
                                <span className="ml-2">Non</span>
                            </label>
                        </div>
                        {localisationActive && (
                            <input type="text" name="place" placeholder="Localisation (Exemple : Paris, France)" className="w-full mt-4 border rounded-bl-xl rounded-tr-xl border-custom-green focus:outline-none focus:ring-1 focus:ring-custom-green px-4 py-2" aria-label="Localisation"/>
                        )}
                    </div>
                    
                    <p className="text-sm">* Champs obligatoire</p>
                    <div className="flex justify-end items-center">
                        <button type="submit" className="flex items-center px-4 py-2 bg-custom-green border-custom-yellow border rounded-bl-xl rounded-tr-xl text-white font-bold hover:bg-custom-yellow hover:text-custom-green hover:border-custom-green transition-colors">
                            <span>Envoyer</span>
                                <FaCircleArrowRight className="ml-2" />
                            </button>
                    </div>

                </form>
            </div>
            ) : (
                <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-lg text-center space-y-4">
                    <h2 className="text-2xl font-bold text-custom-greyd">Ton acte a été publé avec succès !</h2>
                    <p className="text-md">Merci d'avoir partagé ton acte ! Voici le lien d'invitation à envoyer à la personne que tu as aidée</p>

                    <div className="bg-custom-grey p-3 rounded-lg flex items-center justify-between text-sm">
                        <span>{inviteLink}</span>
                        <button onClick={() => {
                            navigator.clipboard.writeText(inviteLink);
                            toast.success("Lien copié !");
                        }} className="ml-4 text-sm text-custom-greyd font-semibold hover:underline flex items-center"> <FaCopy className="mr-1" /> Copier le lien </button>
                    
                    </div>

                    <button onClick={handleReset} className="mt-6 px-4 py-2 bg-custom-green border-custom-yellow border rounded-bl-xl rounded-tr-xl text-white font-bold hover:bg-custom-yellow hover:text-custom-green hover:border-custom-green transition-colors">Publier un autre acte</button>
                </div>
            )}
        </div>
    );
};

export default Publish;