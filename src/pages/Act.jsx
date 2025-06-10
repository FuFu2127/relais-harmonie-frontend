import { useParams } from "react-router-dom";
import { FaEllipsis, FaRegHeart, FaRegCommentDots, FaBullhorn } from "react-icons/fa6";
import avatar from "../assets/icons/france.png";
import actImg from "../assets/img/img-acte-1.jpg";
import { useState } from 'react';

const Act = () => {
    const { id } = useParams(); // récupère l'identifiant de l'acte (act/1)

    const [showCommentField, setShowCommentField] = useState(false); // Etat pour afficher ou masquer le champ de commentaire
    const [commentText, setCommentText] = useState(""); // Etat pour stocker le texte du commentaire

    const [showActMenu, setShowActMenu] = useState(false); // Etat pour afficher ou masquer le menu de l'acte
    const [activeCommentMenuId, setActiveCommentMenuId] = useState(null); // Etat pour gérer le menu des commentaires actifs

    const acts = [
        {
            id: "1",
            user: {
                avatar: avatar,
                name: "Harmo",
                date: "10 juin 2025",
                category: "Solidarité",
            },
            title: "J'ai aidé un voisin à faire ses courses",
            description: "J'ai proposé à mon voisin âgé de 70 ans de faire ses courses pour lui. Il était tellement content et reconnaissant!",
            likes: 20,
            comments: 3,
            hasImage: false,
            image: null,
        },

        {
            id: "2",
            user: {
                avatar: avatar,
                name: "Harmo",
                date: "10 juin 2025",
                category: "Solidarité",
            },
            title: "J'ai payé des courses à des inconnus",
            description: "J'ai payé les courses a une famille qui était devant moi dans la file d'attente ! Ils étaient surprit et étonner !",
            likes: 20,
            comments: 3,
            hasImage: true,
            image: actImg,
        },
    ];

    const act = acts.find((a) => a.id === id); // Recherche l'acte correspondant à l'identifiant

    // Si l'acte n'est pas trouvé, afficher un message d'erreur
    if (!act) {
        return (
            <div className="text-center mt-10 text-red-500 text-lg">
                Acte introuvable
            </div>
        );
    };

    // Etats pour gérer les likes et les commentaires
    const [likes, setLikes] = useState(act.likes);
    const [hasLiked, setHasLiked] = useState(false);

    // Fonction pour gérer le clic sur le bouton "J'aime"
    const toggleLike = () => {
        if (hasLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setHasLiked(!hasLiked);
    };

    const comments = [
        {
            id: 1,
            author: "Harmo",
            avatar: avatar,
            date: "10 juin 2025",
            text: "Wow c'est tellement inspirant ! Merci pour ce geste ça me donne envie de faire pareil !",
        },

        {
            id: 2,
            author: "Harmo",
            avatar: avatar,
            date: "10 juin 2025",
            text: "Incroyable,j'adore ton idée, je vais essayer de faire quelque chose de similaire demain.",
        },

        {
            id: 3,
            author: "Thomas08",
            avatar: avatar,
            date: "10 juin 2025",
            text: "Quel bel acte de bonté ! Tu as dû faire une différence énorme pour cette personne !",
        },

        {
            id: 4,
            author: "Neo-77",
            avatar: avatar,
            date: "10 juin 2025",
            text: "Merci de partager ça, ça me rappelle l'importance des petites actions au quotidien.",
        },
    ];


    return (
        <div className="px-4 py-6 bg-custom-grey min-h-screen text-custom-greyd flex flex-col items-center">
            <div className="w-full max-w-xl bg-custom-grey border border-custom-green rounded-xl p-4 shadow space-y-4">

                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <img src={act.user.avatar} alt={`Avatar de ${act.user.name}`} className="w-6 h-6 rounded-full mr-3" />
                                <span className="font-semibold">
                                    {act.user.name}{""} <span className="text-sm text-custom-greyd">- {act.user.date} - {act.user.category}</span>
                                </span>
                            </div>

                            <div className="relative">
                                <button onClick={() => setShowActMenu(!showActMenu)} className="text-xl" aria-label="Menu de déroulant de l'acte">
                                    <FaEllipsis />
                                </button>
                                {showActMenu && (
                                    <div className="absolute right-0 mt-1 bg-custom-grey border border-red-600 rounded shadow text-sm z-10">
                                        <button className="block px-4 py-2 text-red-600" onClick={() => alert("Acte supprimé")}>Supprimer</button>
                                    </div>
                                )}
                            </div>
                        </div>

                            <h3 className="text-xl font-bold mb-2 text-center">{act.title}</h3>
                            {act.hasImage && (
                                <img src={act.image} alt={`Image de l'acte "${act.title}"`} className="h-[12vh] w-[15vh] sm:h-[20vh] sm:w-[26vh] rounded-xl mb-4 mx-auto" />
                            )}

                            <p className="mb-4 text-justify">{act.description}</p>

                            <div className="flex justify-center space-x-10 text-xl mb-6">
                                
                                <button onClick={toggleLike} className={`flex items-center space-x-2 border border-black rounded-full px-3 py-1 ${ hasLiked ? "text-red-600" : "hover:text-red-700"}`} aria-label={hasLiked ? "Retirer le j'aime" : "J'aime"}>
                                    <FaRegHeart />
                                    <span>{likes}</span>
                                </button>

                                <button onClick={() => setShowCommentField(true)} className="flex items-center space-x-2 border border-black rounded-full px-3 py-1 hover:text-blue-500" aria-label="Commenter">
                                    <FaRegCommentDots />
                                    <span>{act.comments}</span>
                                </button>

                                <button className="border border-black rounded-full px-5 py-1 hover:text-yellow-500" aria-label="Signaler acte">
                                    <FaBullhorn />
                                </button>
                            </div>

                            {showCommentField && (
                                <div>
                                    <input 
                                    type="text" 
                                    value={commentText} 
                                    onChange={(e) => setCommentText(e.target.value)} 
                                    placeholder="Ajouter un commentaire" 
                                    className="w-full bg-custom-grey border p-2 rounded-bl-xl rounded-tr-xl border-custom-green focus:outline-none focus:ring-1 focus:ring-custom-green"/>

                                    <div className="flex justify-end gap-2 mt-2">
                                        <button onClick={() => {
                                            setCommentText("");
                                            setShowCommentField(false);
                                        }} className="px-4 py-1 border rounded-bl-xl rounded-tr-xl border-red-700 bg-red-300 text-custom-greyd">
                                            Annuler
                                        </button>

                                        <button onClick={() => {
                                            // Valide l'ajout du com
                                            console.log("Commentaire :", commentText);
                                            setCommentText("");
                                            setShowCommentField(false);
                                        }} className="px-4 py-1 text-custom-greyd border border-black rounded-bl-xl rounded-tr-xl bg-custom-yellow">
                                            Valider
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                {comments.map(comment => (
                                    <div key={comment.id} className="p-4">
                                        <div className="flex justify-between items-start mb-2">

                                            <div className="flex items-center">

                                                <img src={comment.avatar} alt="avatar" className="w-6 h-6 rounded-full mr-3" />
                                                <span className="font-semibold">
                                                    {comment.author}{""} <span className="text-sm text-custom-greyd">- {comment.date}</span>
                                                </span>
                                            </div>

                                            <div className="relative">
                                                <button onClick={() => setActiveCommentMenuId(activeCommentMenuId === comment.id ? null : comment.id)} className="text-xl">
                                                    <FaEllipsis />
                                                </button>

                                                {activeCommentMenuId === comment.id && (
                                                    <div className="absolute right-0 mt-1 bg-custom-grey border border-red-600 rounded shadow text-sm z-10">
                                                        <button className="block px-4 py-2 text-red-600" onClick={() => alert(`Commentaire ${comment.id} supprimé`)}>Supprimer</button>
                                                    </div>
                                                )}
                                            </div>

                                        </div>
                                            <p>{comment.text}</p>
                                        </div>
                                ))}
                            </div>
                        
                </div>
        </div>
    );


};



export default Act;