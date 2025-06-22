import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import fond from '../assets/img/background-form.jpg';
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa6";
import { toast } from "react-toastify";
import axios from "axios";


const Publish = () => {
    // 1. Déclare tous les états au début
    const [localisationActive, setLocalisationActive] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [inviteLink, setInviteLink] = useState("");
    const [selectedDefi, setSelectedDefi] = useState("");
    const [challenges, setChallenges] = useState([]);
    
    // 2. Récupère les informations de navigation et params
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const defiTitleParam = params.get("defi_title");
    const defiIdParam = params.get("defi_id");
    const token = localStorage.getItem('jwt');
    
    // 3. Utilisation d'un useEffect pour définir le défi sélectionné initialement
    useEffect(() => {
        console.log('URL actuelle:', location.pathname + location.search);
        console.log('Paramètres URL:', { defiIdParam, defiTitleParam });
        
        // Si l'ID est fourni directement, utilise-le
        if (defiIdParam) {
            console.log('ID de défi défini depuis URL:', defiIdParam);
            setSelectedDefi(defiIdParam);
        }
    }, [defiIdParam, defiTitleParam, location.pathname, location.search]);
    
    // Charger les défis depuis l'API
    useEffect(() => {
        console.log('Tentative de chargement des défis...');
        
        axios.get('http://localhost:8000/api/challenges')
            .then(response => {
                console.log('Réponse complète API challenges:', response.data);
                
                // Extraction des défis
                let challengesData = [];
                
                if (response.data && Array.isArray(response.data.member)) {
                    challengesData = response.data.member;
                    console.log('Défis trouvés dans member:', challengesData);
                } else if (response.data && response.data["hydra:member"] && Array.isArray(response.data["hydra:member"])) {
                    challengesData = response.data["hydra:member"];
                    console.log('Défis trouvés dans hydra:member:', challengesData);
                } else if (Array.isArray(response.data)) {
                    challengesData = response.data;
                    console.log('Défis trouvés dans tableau direct:', challengesData);
                } else {
                    console.log('Exploration des données:', response.data);
                    
                    if (response.data && typeof response.data === 'object') {
                        for (const key in response.data) {
                            if (Array.isArray(response.data[key])) {
                                challengesData = response.data[key];
                                console.log(`Défis trouvés dans ${key}:`, challengesData);
                                break;
                            }
                        }
                    }
                }
                
                if (challengesData && challengesData.length > 0) {
                    console.log('Défis chargés avec succès:', challengesData);
                    setChallenges(challengesData);
                    
                    // Priorité #1: Si l'ID est fourni, utilise-le directement
                    if (defiIdParam && !selectedDefi) {
                        console.log('Sélection du défi par ID:', defiIdParam);
                        setSelectedDefi(defiIdParam);
                    }
                    // Priorité #2: Si nous avons un titre de défi, trouve l'ID correspondant
                    else if (defiTitleParam && !selectedDefi) {
                        console.log('Recherche du défi par titre:', defiTitleParam);
                        const matchingChallenge = challengesData.find(
                            c => c.title === defiTitleParam
                        );
                        
                        if (matchingChallenge) {
                            console.log('Défi trouvé par titre:', matchingChallenge);
                            setSelectedDefi(matchingChallenge.id);
                        } else {
                            console.log('Défi non trouvé par titre');
                        }
                    }
                    // Priorité #3: Compatibilité avec l'ancien format (juste "defi")
                    else {
                        const oldDefiParam = params.get("defi");
                        if (oldDefiParam && !selectedDefi) {
                            console.log('Utilisation de l\'ancien paramètre defi:', oldDefiParam);
                            const matchingChallenge = challengesData.find(
                                c => c.title === oldDefiParam
                            );
                            
                            if (matchingChallenge) {
                                console.log('Défi trouvé par ancien paramètre:', matchingChallenge);
                                setSelectedDefi(matchingChallenge.id);
                            }
                        }
                    }
                } else {
                    console.warn('Aucun défi trouvé dans la réponse API');
                    // Utilise des défis de test si nécessaire
                    setChallenges([
                        { id: 1, title: "Défi test 1" },
                        { id: 2, title: "Défi test 2" }
                    ]);
                }
            })
            .catch(error => {
                console.error('Erreur lors du chargement des défis:', error);
                setChallenges([
                    { id: 1, title: "Défi test (erreur)" },
                    { id: 2, title: "Défi test 2 (erreur)" }
                ]);
            });
    }, [defiIdParam, defiTitleParam, selectedDefi, params]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        try {
            // Validation côté client
            const title = e.target.title.value;
            const description = e.target.description.value;
            const category = e.target.category.value;
            
            if (!title || !description || !category) {
                toast.error("Tous les champs obligatoires doivent être remplis");
                setSubmitted(false);
                return;
            }

            // Création du FormData
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('category', category);
            
            // Gestion du défi
            if (selectedDefi && selectedDefi !== "") {
                formData.append('challenge', `/api/challenges/${selectedDefi}`);
                console.log(`Ajout du défi: /api/challenges/${selectedDefi}`);
            }
            
            // Gestion de l'image
            const imageFile = e.target.imageFile.files[0];
            if (imageFile) {
                formData.append('imageFile', imageFile);
                console.log(`Ajout de l'image: ${imageFile.name}`);
            }
            
            // Gestion de la localisation
            if (localisationActive && e.target.place && e.target.place.value) {
                formData.append('location', e.target.place.value);
                console.log(`Ajout de la localisation: ${e.target.place.value}`);
            }
            
            // Debug des données envoyées
            console.log("Contenu du FormData:");
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
            
            // Envoi de la requête
            const response = await axios.post("http://localhost:8000/api/acts", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            console.log("Réponse API complète:", response);
            
            // Vérifie si l'acte a été créé avec succès (statut 201)
            if (response.status === 201) {
                toast.success("Ton acte a été publié avec succès !");
                
                // Ne génère pas de lien d'invitation basé sur l'ID puisque la réponse ne contient pas de données
                setInviteLink(`http://localhost:5173/community`);  // Redirige vers la communauté
                
                // Optionnel : Réinitialise le formulaire
                e.target.reset();
                setSelectedDefi("");
                setLocalisationActive(false);
                setSubmitted(false);
                
                // Optionnel : Redirige vers la page communauté après quelques secondes
                setTimeout(() => {
                    navigate('/community');
                }, 2000);
            } else {
                console.warn("Réponse inattendue de l'API:", response);
                toast.warning("Acte créé mais avec une réponse inattendue");
            }
        } catch (error) {
            // Analyse détaillée de l'erreur
            console.error("Erreur complète:", error);
            
            let errorMessage = "Erreur lors de la publication de l'acte";
            
            if (error.response) {
                console.error("Détails de l'erreur:", error.response.data);
                
                if (error.response.data && error.response.data['hydra:description']) {
                    errorMessage += ` : ${error.response.data['hydra:description']}`;
                } else if (error.response.data && error.response.data.detail) {
                    errorMessage += ` : ${error.response.data.detail}`;
                } else if (error.response.status === 500) {
                    errorMessage += " : Erreur serveur interne. Vérifiez les logs du serveur.";
                } else {
                    errorMessage += ` : ${error.message}`;
                }
            } else {
                errorMessage += ` : ${error.message}`;
            }
            
            toast.error(errorMessage);
            setSubmitted(false);
        }
    };

    const handleReset = () => { // Fonction pour réinitialiser le formulaire et l'état après la soumission
        setSubmitted(false); // Réinitialisation de l'état de soumission du formulaire
        setInviteLink(""); // Réinitialisation du lien d'invitation
        setLocalisationActive(false); // Réinitialisation de l'état de localisation active
        setSelectedDefi(""); // Réinitialisation du défi sélectionné
    };

    // Vérifie si l'utilisateur est connecté
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
                            {challenges.map(challenge => (
                                <option key={challenge.id} value={challenge.id}>
                                    {challenge.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-bold">Image</label>
                        <input type="file" name="imageFile" className="w-full p-3" />
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
                        <button type="submit" className="flex items-center px-4 py-2 bg-custom-green border-custom-yellow border rounded-bl-xl rounded-tr-xl text-white font-bold hover:bg-custom-yellow hover:text-custom-green hover:border-custom-green transition-colors" aria-label="Envoyer">
                            <span>Envoyer</span>
                                <FaCircleArrowRight className="ml-2" />
                            </button>
                    </div>

                </form>
            </div>
            ) : (
                <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-lg text-center space-y-4">
                    <h2 className="text-2xl font-bold text-custom-greyd">Ton acte a été publié avec succès !</h2>
                    <p className="text-md">Merci d'avoir partagé ton acte ! Voici le lien d'invitation à envoyer à la personne que tu as aidée</p>

                    <div className="bg-custom-grey p-3 rounded-lg flex items-center justify-between text-sm">
                        <span>{inviteLink}</span>
                        <button onClick={() => {
                            navigator.clipboard.writeText(inviteLink);
                            toast.success("Lien copié !");
                        }} className="ml-4 text-sm text-custom-greyd font-semibold hover:underline flex items-center"> <FaCopy className="mr-1" /> Copier le lien </button>
                    
                    </div>

                    <button onClick={handleReset} className="mt-6 px-4 py-2 bg-custom-green border-custom-yellow border rounded-bl-xl rounded-tr-xl text-white font-bold hover:bg-custom-yellow hover:text-custom-green hover:border-custom-green transition-colors" aria-label="Publier un autre acte">Publier un autre acte</button>
                </div>
            )}
        </div>
    );
};

export default Publish;