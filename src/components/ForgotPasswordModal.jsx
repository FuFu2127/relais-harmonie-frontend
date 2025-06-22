import { IoClose } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { useState } from "react";

const ForgotPasswordModal = ({ isOpen, onClose, onBackToLogin}) => {
    // Gestion de l'état de l'email
    const [email, setEmail] = useState(""); // email valeur = chaîne de caractère / setEmail met a jour l'état

    // fonction gestion soumission 
    const handleSendEmail = (e) => { // Annule le comportement par défaut du formulaire (rechargement de la page)
        e.preventDefault();

        // Vérification si le champ email est rempli
        if (!email){
            toast.error("Le champ n'est pas rempli !",{
                position:"top-center",
                autoClose: 3000,
            });
            return;
        };

        // Regex pour valider l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Si l'email n'est pas valide, afficher un message d'erreur
        if(!emailRegex.test(email)) {
            toast.error("Adresse email invalide", {
                position:"top-center",
                autoClose: 3000,
            });
            return;
        };

        // Affiche un message de succès (simulation de l'envoi d'email)
        toast.success ("📩 Email envoyé !", {
            position: "top-center",
            autoClose: 3000,
        });
        setEmail(""); // Réinitialise le champ email après l'envoi
    };

    // Si la modal n'est pas ouverte, ne rien afficher
    if (!isOpen) return null; // bolean pour controller la visibilité de la modal

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-custom-grey bg-opacity-30 px-4">
            <div className="bg-custom-grey border-2 border-custom-green rounded-xl shadow-lg p-6 w-full max-w-md relative">
                
                <button onClick={onClose} className="absolute top-4 right-4 text-custom-greyd hover:text-red-500 text-3xl" aria-label="Fermer la modale">
                    <IoClose />
                </button>

                <button onClick={onBackToLogin} className="absolute top-4 left-4 text-custom-greyd hover:text-custom-green" aria-label="Retour à se connecter">
                    <FaArrowLeft />
                </button>

                <h2 className="text-2xl font-bold text-center text-custom-greyd mb-10 mt-2">Réinitialiser le mot de passe</h2>
            
                <div className="text-base text-center text-custom-greyd mb-6">
                    <p>Saisis ton adresse email et nous t'enverrons un lien pour réinitialiser ton mot de passe.</p>
                </div>

                <div className="mb-20">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-custom-grey border-custom-green border-2 rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-custom-green" placeholder="Adresse email*" aria-label="Adresse email"/>
                </div>

                <button className="w-full text-custom-greyd py-2 px-4 rounded-xl border-2 border-custom-green hover:bg-custom-greenl hover:text-white hover:border-custom-green transition-colors" aria-label="Réinitialiser le mot de passe" onClick={handleSendEmail}>Réinitialiser le mot de passe</button>
            </div>
        </div>
    );
};

export default ForgotPasswordModal;