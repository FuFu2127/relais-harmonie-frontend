import { FaCircleArrowRight, FaXTwitter, FaDiscord, FaPinterest } from "react-icons/fa6";
import fond from '../assets/img/background-form.jpg';
import FAQ from '../components/FAQ';
import { toast } from "react-toastify";
import axios from "axios";

const Contact = () => {

    const emailRegex = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Vérifie si l'email est au format valide

    const handleSubmit = async (s) => { // Fonction pour gérer la soumission du formulaire
            s.preventDefault(); // empêche le rechargement
            
            const formData = new FormData(s.target); // Récupère les données du formulaire
            const firstname = formData.get("firstname")?.trim(); // Récupère le prénom et supprime les espaces inutiles
            const name = formData.get("name")?.trim(); // Récupère le nom et supprime les espaces inutiles
            const email = formData.get("email")?.trim(); // Récupère l'email et supprime les espaces inutiles
            const subject = formData.get("subject"); // Récupère le sujet
            const message = formData.get("message")?.trim(); // Récupère le message et supprime les espaces inutiles

            if (!firstname || !name || !email || !subject || !message) { // Vérifie si tous les champs obligatoires sont remplis
                toast.error("Veuillez remplir tous les champs !", { // Affiche un message d'erreur si un champ obligatoire est vide
                    position: "top-center",
                    autoClose: 3000,
                });
                return;
            }

            if (!emailRegex(email)) { // Vérifie si l'email est au format valide
                toast.error("Veuillez entrer un email valide", { // Affiche un message d'erreur si l'email n'est pas valide
                    position: "top-center",
                    autoClose: 3000,
                });
                return;
            }

            try {
                await axios.post(
                    "http://localhost:8000/contact/new",
                    {
                        firstName: firstname,
                        name: name,
                        email: email,
                        subject: subject,
                        message: message,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                toast.success("Message envoyé avec succès !", { // Affiche un message de succès si tout est valide
                    position: "top-center",
                    autoClose: 3000,
                });
                s.target.reset(); // Réinitialise le formulaire après l'envoi
            } catch (error) {
                console.error(error.response ? error.response.data : error);
                toast.error(
                    error.response?.data?.detail ||
                    "Erreur lors de l'envoi du message.",
                    {
                        position: "top-center",
                        autoClose: 3000,
                    }
                );
            }
    };

    return (
    <div className="min-h-screen bg-custom-grey text-custom-greyd flex flex-col items-center px-4 py-6">
        <h1 className="text-3xl font-bold mb-4 border-b-4 border-custom-green pb-2">Nous contacter</h1>
        <p className="text-xl mb-8 text-center">Une question ? Une suggestion ? Ecrit-nous !</p>

        <div className="w-full max-w-4xl bg-cover bg-center rounded-xl p-10 border-2 border-custom-green drop-shadow-xl" style={{ backgroundImage: `url(${fond})` }}>
            <form method="post" className="space-y-6 p-2 rounded-xl" onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row sm:space-x-6">

                    <div className="flex-1 mb-4 sm:mb-0">
                        <label className="block font-bold mb-1">Prénom *</label>
                        <input type="text" name="firstname" className="w-full border rounded-bl-xl rounded-tr-xl border-custom-green focus:outline-none focus:ring-1 focus:ring-custom-green px-4 py-2" placeholder="Prénom" aria-required="true" aria-label="Prénom"/>
                    </div>

                    <div className="flex-1">
                        <label className="block font-bold mb-1">Nom *</label>
                        <input type="text" name="name" className="w-full border rounded-bl-xl rounded-tr-xl border-custom-green focus:outline-none focus:ring-1 focus:ring-custom-green px-4 py-2" placeholder="Nom" aria-required="true" aria-label="Nom"/>
                    </div>

                </div>

                <div>
                    <label className="block font-bold mb-1">Email *</label>
                    <input type="email" name="email" required className="w-full border rounded-bl-xl rounded-tr-xl border-custom-green focus:outline-none focus:ring-1 focus:ring-custom-green px-4 py-2" placeholder="Email" aria-required="true" aria-label="Email"/>
                </div>

                <div>
                    <label className="block font-bold mb-2">Sujet *</label>
                    <div className="flex flex-wrap gap-4">
                        {[
                            { label: "Problème technique", value: "problème technique" },
                            { label: "Question", value: "question" },
                            { label: "Suggestion", value: "suggestion" }
                        ].map((option, idx) => (
                            <label key={idx} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="subject"
                                    value={option.value}
                                    className="accent-custom-green"
                                    required
                                />
                                <span>{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block font-bold mb-1">Message*</label>
                    <textarea name="message" className="w-full h-32 border rounded-bl-xl rounded-tr-xl border-custom-green focus:outline-none focus:ring-1 focus:ring-custom-green px-4 py-2 resize-none" placeholder="Message..." aria-required="true" aria-label="Message"></textarea>
                </div>

                <p className="text-sm">* Champs obligatoire</p>
                <div className="flex justify-end items-center">
                    <button type="submit" className="flex items-center px-4 py-2 bg-custom-green border-custom-yellow border rounded-bl-xl rounded-tr-xl text-white font-bold hover:bg-custom-yellow hover:text-custom-green hover:border-custom-green transition-colors" aria-label="Envoyer le message">
                        <span>Envoyer</span>
                        <FaCircleArrowRight className="ml-2" />
                    </button>
                </div>
            </form>
            </div>
            <div className="mt-4 text-center">
                <h2 className="text-lg mb-2">Autres moyens de nous joindre</h2>
                <p className="text-lg mb-4"><span className="font-bold underline">Email :</span><a href="mailto:contact@relaisdharmonie.fr" className="hover:underline"> contact@relaisdharmonie.fr</a></p>
                <div className="flex justify-center space-x-6 text-5xl text-custom-green">
                    <a href="https://x.com/" className="text-custom-green hover:text-custom-yellow" aria-label="Visiter notre page X-twitter" target="_blank" rel="noopener noreferrer"> <FaXTwitter /> </a>
                    <a href="https://discord.com/" className="text-custom-green hover:text-custom-yellow" aria-label="Notre communauté discord" target="_blank" rel="noopener noreferrer"> <FaDiscord /> </a>
                    <a href="https://fr.pinterest.com/" className="text-custom-green hover:text-custom-yellow" aria-label="Visiter notre page Pinterest" target="_blank" rel="noopener noreferrer"> <FaPinterest /> </a>
                </div>
        </div>
    <FAQ/>
    </div>

    );
};

export default Contact;
