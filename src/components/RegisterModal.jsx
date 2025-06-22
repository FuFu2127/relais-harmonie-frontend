import { IoClose } from "react-icons/io5";
import { toast } from 'react-toastify';
import { useState } from "react";
import axios from "axios";

const RegisterModal = ({ isOpen, onClose, onLogin}) => {
    const [username, setUsername] = useState(""); // Pseudonyme valeur = chaîne de caractère / setUsername met a jour l'état
    const [email, setEmail] = useState(""); // Adresse email valeur = chaîne de caractère / setEmail met a jour l'état
    const [password, setPassword] = useState(""); // Mot de passe valeur = chaîne de caractère / setPassword met a jour l'état

    // Fonction gestion soumission inscription
    const handleRegister = async (e) => { // Annule le comportement par défaut du formulaire (rechargement de la page)
        e.preventDefault();

        // Vérification si les champs pseudonyme, email et mot de passe sont remplis
        if (!username || !email || !password){
            toast.error("Tous les champs sont obligatoires",{
                position:"top-center",
                autoClose: 3000,
            });
            return;
        };

        // Regex pour valider l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

        // Si l'email n'est pas valide, afficher un message d'erreur
        if (!emailRegex.test(email)) {
            toast.error("Adresse email invalide : format valide : contact@relaisdharmonie.fr", {
                position: "top-center",
                autoClose: 5000,
            });
            return;
        };

        // Regex pour valider le mot de passe
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        // Si le mot de passe n'est pas valide, afficher un message d'erreur
        if (!passwordRegex.test(password)) {
            toast.error("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre, et un caractère spécial'[] () !_@ & # +-/*'", {
                position: "top-center",
                autoClose: 8000,
            });
            return;
        };

        try {
            await axios.post("http://localhost:8000/api/register", {
                pseudo: username,
                email: email,
                password: password
            });
            toast.success("Compte créé !", {
                position: "top-center",
                autoClose: 3000,
            });
            setUsername("");
            setEmail("");
            setPassword("");
            // Optionnel : ouvrir la modal de connexion
            // onLogin();
        } catch (error) {
            toast.error("Erreur lors de l'inscription : " + (error.response?.data['hydra:description'] || error.message), {
                position: "top-center",
                autoClose: 5000,
            });
        }
    };

    if (!isOpen) return null; // bolean pour controller la visibilité de la modal


    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-custom-grey bg-opacity-30 px-4">
            <div className="bg-custom-grey border-2 border-custom-green rounded-xl shadow-lg p-6 w-full max-w-md relative">
                
                <button onClick={onClose} className="absolute top-4 right-4 text-custom-greyd hover:text-red-500 text-3xl" aria-label="Fermer la modale">
                    <IoClose />
                </button>

                <h2 className="text-2xl font-bold text-center text-custom-greyd mb-6">S'inscrire</h2>

                <div className="mb-6">
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-custom-grey border-custom-green border-2 rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-custom-green" placeholder="Pseudonyme" aria-label="Pseudonyme"/>
                </div>

                <div className="mb-6">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-custom-grey border-custom-green border-2 rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-custom-green" placeholder="Adresse email" aria-label="Adresse email"/>
                </div>

                <div className="mb-6">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-custom-grey border-custom-green border-2 rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-custom-green" placeholder="Mot de passe" aria-label="Mot de passe"/>
                </div>

                <div className="text-sm text-left text-custom-greyd mb-8">
                    <p>Deja inscrit ? <span className="hover:underline cursor-pointer font-bold" onClick={onLogin}>Se connecter</span></p>
                </div>

                <button className="w-full text-custom-greyd py-2 px-4 rounded-xl border-2 border-custom-green hover:bg-custom-greenl hover:text-white hover:border-custom-green transition-colors" aria-label="Valider" onClick={handleRegister}>Valider</button>
            </div>
        </div>
    );

};


export default RegisterModal;