import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from 'react-toastify';
import axios from "axios";

const LoginModal = ({ isOpen, onClose, onForgotPassword, onRegister, onLoginSuccess }) => {
        // Gestion de l'état email
        const [email, setEmail] = useState(""); // email valeur = chaîne de caractère / setEmail met a jour l'état
        // Gestion de l'état mdp
        const [password, setPassword] = useState(""); // mot de passe valeur = chaîne de caractère / setPassword met a jour l'état

        // fonction gestion soumission connexion
        const handleLogin = async (e) => {
        e.preventDefault(); // Annule le comportement par défaut du formulaire (rechargement de la page)

        // Vérification si les champs email et mot de passe sont remplis
        if (!email || !password){
            // Si l'un des champs est vide, afficher un message d'erreur
            toast.error("Tous les champs sont obligatoires",{
                position:"top-center",
                autoClose: 3000,
            });
            return;
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pour valider l'email
        if (!emailRegex.test(email)) {
            // Si l'email n'est pas valide, afficher un message d'erreur
            toast.error("Veuillez entrer un email valide", {
                position: "top-center",
                autoClose: 3000,
            });
            return;
        };

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login_check", {
                email: email,
                password: password
            });
            const token = response.data.token;
            localStorage.setItem("jwt", token);
            toast.success("Connexion réussie !", {
                position: "top-center",
                autoClose: 3000,
            });
            setEmail("");
            setPassword("");
            onClose();
            if (onLoginSuccess) onLoginSuccess();
        } catch (error) {
            toast.error("Erreur de connexion : " + (error.response?.data?.message || error.message), {
                position: "top-center",
                autoClose: 5000,
            });
        }
    };
    // Si la modal n'est pas ouverte, ne rien afficher
    if (!isOpen) return null; // bolean pour controller la visibilité de la modal


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-custom-grey bg-opacity-30 px-4">
            <div className="bg-custom-grey border-2 border-custom-green rounded-xl shadow-lg p-6 w-full max-w-md relative">
                
                <button onClick={onClose} className="absolute top-4 right-4 text-custom-greyd hover:text-red-500 text-3xl" aria-label="Fermer la modal">
                    <IoClose />
                </button>

                <h2 className="text-2xl font-bold text-center text-custom-greyd mb-6">Se connecter</h2>

                <div className="mb-6">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-custom-grey border-custom-green border-2 rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-custom-green" placeholder="Adresse email*" aria-label="Adresse email"/>
                </div>

                <div className="mb-6">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-custom-grey border-custom-green border-2 rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-custom-green" placeholder="Mot de passe*" aria-label="Mot de passe" />
                </div>

                <div className="text-sm text-left text-custom-greyd hover:underline cursor-pointer mb-4" onClick={onForgotPassword}>
                    <p>Mot de passe oublié ?</p>
                </div>

                <div className="text-sm text-left text-custom-greyd mb-8">
                    <p>Première fois sur le site ? <span className="hover:underline cursor-pointer font-bold" onClick={onRegister}>Inscris-toi</span></p>
                </div>

                <button className="w-full text-custom-greyd py-2 px-4 rounded-xl border-2 border-custom-green hover:bg-custom-greenl hover:text-white hover:border-custom-green transition-colors" aria-label="Se connecter" onClick={handleLogin}>Se connecter</button>
            </div>
        </div>
    );
};

export default LoginModal;
