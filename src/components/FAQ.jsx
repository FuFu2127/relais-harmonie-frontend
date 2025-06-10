import { useState } from "react";
import { FaCircleChevronDown, FaCircleChevronRight } from "react-icons/fa6";

// Composant FAQ pour afficher les questions fréquentes
// Chaque question a un état ouvert ou fermé, et on peut cliquer pour afficher ou masquer la réponse
const faqs = [
    {
        question: "Comment publier un acte ?",
        answer: "Inscrivez-vous/Connectez-vous, allez sur la page \"Publier un acte\" et remplisse le formulaire.",
    },

    {
        question: "Quels types dactes puis-je publier ?",
        answer: "Vous pouvez publier tout acte désintéressé qui apporte de l'harmonie, comme aider un voisin, un inconnu, une association... Assurez-vous que votre acte respecte nos valeurs de bienveillance et de respect",
    },

    {
        question: "Est-ce que Relais d'Harmonie est gratuit ?",
        answer: "Oui, Relais d'Harmonie est entièrement gratuit ! Notre mission est de propager l'harmonie sans barrière financière.",
    },

    {
        question: "Comment puis-je contribuer à un défis collectif ?",
        answer: "Rendez-vous sur la page \"Communauté\" pour découvrir les défis collectifs en cours (Exemple : Planter 100 arbres). Publiez un acte en lien avec le défi et séléctionner le dans le formulaire.",
    },

    {
        question: "Que faire si je rencontre un problème technique ?",
        answer: "Si vous rencontrez un problème technique contactez-nous à contact@relaisdharmonie.fr ou directement sur le formulaire du site, et nous vous aiderons le plus rapidement possible."
    },

    {
        question: "Comment puis-je soutenir relais d'Harmonie ?",
        answer: "Vous pouvez soutenir le projet en participant activement (publiez des actes, invitez des amis...) en partageant notre site sur les réseaux sociaux, ou en nous envoyant vos suggestions pour améliorer l'expérience.",
    },

    {
        question: "Comment signaler un contenu inapproprié ?",
        answer: "Si vous voyez un acte ou un commentaire qui ne respecte pas nos valeurs utilisez le bouton signaler à côté du contenu. Notre équipe examinera votre signalement dans les plus bref délais.",
    },
];

// Composant FAQ
const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null); // État pour suivre l'index de la question ouverte

    const toggleFAQ = (index) => { // Fonction pour basculer l'état d'ouverture d'une question
        setOpenIndex(openIndex === index ? null : index); // Si la question est déjà ouverte, on la ferme, sinon on l'ouvre
    };


    return (

        <section className="max-w-3xl my-16 px-4">
            <h2 className="text-3xl font-bold text-center mb-8 inline-block pb-2">Questions fréquentes</h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => ( // on map chaque question et réponse dans un tableau
                    <div key={index} className="border border-custom-grey rounded-xl p-8 shadow-sm bg-white">
                        <button onClick={() => toggleFAQ(index)} className="flex justify-between items-center w-full font-semibold text-custom-greyd m-2">
                            {faq.question}
                            {openIndex === index ? <FaCircleChevronDown /> : <FaCircleChevronRight />}
                        </button>
                        {openIndex === index && (
                            <p className="mt-3 text-custom-greyd text-justify">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </section>

    );
};

export default FAQ