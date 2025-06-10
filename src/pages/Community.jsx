import { FaRegHeart, FaRegCommentDots, FaBullhorn} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import defis1 from "../assets/img/defis-1.jpg";
import defis2 from "../assets/img/defis-2.jpg";
import defis3 from "../assets/img/defis-3.jpg";
import act from "../assets/img/img-acte-1.jpg";
import avatar from "../assets/icons/france.png";
import { Link } from "react-router-dom";


const Community = () => { 
    const navigate = useNavigate(); // Hook pour naviguer entre les pages

    // Liste des défis et des actes
    const challenges = [
        {   
            title : "Planter 100 arbres",
            progress: 75,
            total: 100,
            background: defis1,
        },

        {
            title : "Aider 100 inconnus",
            progress: 50,
            total: 100,
            background: defis2,
        },

        {
            title : "Nettoyer l'espace public",
            progress: 30,
            total: 100,
            background: defis3,
        },
    ];

    const posts = [
        {
            id: 1,
            user: {
                avatar: avatar,
                name: "Harmo",
                date: "10 juin 2025",
            },
            title: "J'ai aidé un voisin à faire ses courses",
            description: "J'ai proposé à mon voisin âgé de 70 ans de faire ses courses pour lui. Il était tellement content et reconnaissant!",
            likes: 20,
            comments: 3,
            hasImage: false,
            image: null,
        },

        {
            id: 2,
            user: {
                avatar: avatar,
                name: "Harmo",
                date: "10 juin 2025",
            },
            title: "J'ai payé des courses à des inconnus",
            description: "J'ai payé les courses a une famille qui était devant moi dans la file d'attente ! Ils étaient surprit et étonner !",
            likes: 20,
            comments: 3,
            hasImage: true,
            image: act,
        },
    ];

    


    return (
            <div className="px-4 py-6 bg-custom-grey min-h-screen text-custom-greyd">
                <h1 className="text-3xl font-bold mb-4 w-fit border-b-4 border-custom-green text-center mx-auto">
                    Communauté
                </h1>
                <h2 className="text-2xl font-bold mb-6 text-center">Défis en cours :</h2>

                <div className="flex flex-col mid:flex-row flex-wrap justify-center items-center gap-6 mb-12">
                    {challenges.map((challenge, index) => (
                        <div 
                            key={index} 
                            className="w-full md:w-[280px] rounded-2xl p-6 bg-cover bg-center flex flex-col items-center text-white shadow-lg" 
                            style={{ backgroundImage: `url(${challenge.background})`}}
                        >
                            <h3 className="text-lg font-bold mb-3 text-center text-strokechallengeh3">{challenge.title}</h3>
                            <div className="w-full bg-white bg-opacity-50 rounded-full h-5 mb-3 relative">
                                <div 
                                    className="bg-custom-greenl h-5 rounded-full" 
                                    style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}>
                                </div>

                                <span className="absolute inset-0 flex justify-center items-center text-sm font-semibold text-white">
                                    {challenge.progress}/{challenge.total}
                                </span>
                            </div>

                            <button onClick={() => navigate(`/publish?defi=${encodeURIComponent(challenge.title)}`)} className="mt-6 px-4 py-2 bg-custom-green border-custom-yellow border rounded-bl-xl rounded-tr-xl text-white font-bold hover:bg-custom-yellow hover:text-custom-green hover:border-custom-green transition-colors">
                                Participer
                            </button>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-semibold mb-6 text-center">Tous les actes publiés :</h2>

                <div className="space-y-5 flex flex-col items-center">
                    {posts.map((post) => (
                        <Link to={`/act/${post.id}`} key={post.id} className="w-full max-w-xl bg-custom-greyl border border-custom-green rounded-xl p-4 shadow cursor-pointer">
                            <div className="flex items-center mb-2">
                                <img src={post.user.avatar} alt={`Avatar de ${post.user.name}`} className="w-6 h-6 rounded-full mr-3" />
                                <span className="font-semibold">
                                    {post.user.name} <span className="text-sm text-custom-greyd">- {post.user.date}</span>
                                </span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-center">{post.title}</h3>
                            {post.hasImage && (
                                <img src={post.image} alt={`Image de l'acte "${post.title}"`} className="h-[12vh] w-[15vh] sm:h-[20vh] sm:w-[26vh] rounded-xl mb-4 mx-auto" />
                            )}
                            <p className="mb-4 text-justify">{post.description}</p>
                            <div className="flex justify-center space-x-10 text-xl">
                                <button className="flex items-center space-x-2 border border-black rounded-full px-3 py-1 hover:text-red-700" aria-label="J'aime">
                                    <FaRegHeart />
                                    <span>{post.likes}</span>
                                </button>
                                <button className="flex items-center space-x-2 border border-black rounded-full px-3 py-1 hover:text-blue-500" aria-label="Commenter">
                                    <FaRegCommentDots />
                                    <span>{post.comments}</span>
                                </button>
                                <button className="border border-black rounded-full px-5 py-1 hover:text-yellow-500" aria-label="Signaler l'acte">
                                    <FaBullhorn />
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
    );
};

export default Community;