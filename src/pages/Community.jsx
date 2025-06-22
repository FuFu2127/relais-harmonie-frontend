import { useEffect, useState, useRef } from "react";
import { FaRegHeart, FaRegCommentDots, FaSync } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import avatar from "../assets/icons/france.png";

const Community = () => {
    const navigate = useNavigate();
    const requestsCompleted = useRef(false);
    
    // Ajout du cache utilisateur
    const [userCache, setUserCache] = useState({});
    
    // Données de test avec des IDs spéciaux (utilisées uniquement si l'API échoue)
    const testChallenges = [
        { id: 99001, title: "Planter 100 arbres (EXEMPLE)", progress: 50, objective: 100 },
        { id: 99002, title: "Réduire les déchets (EXEMPLE)", progress: 30, objective: 200 },
        { id: 99003, title: "Économiser l'eau (EXEMPLE)", progress: 75, objective: 150 }
    ];

    const testActs = [
        { 
            id: 99001, 
            title: "J'ai planté un arbre (EXEMPLE)", 
            description: "Aujourd'hui j'ai planté un chêne dans mon jardin. (Donnée de test)", 
            createdAt: new Date().toISOString(),
            user: { username: "Éco-citoyen (Test)" },
            likes: [],
            comments: []
        },
        { 
            id: 99002, 
            title: "Réduction des déchets (EXEMPLE)", 
            description: "J'ai commencé à composter mes déchets organiques. (Donnée de test)", 
            createdAt: new Date().toISOString(),
            user: { username: "GreenFuture (Test)" },
            likes: [1, 2, 3],
            comments: [1]
        }
    ];

    // États pour les données dynamiques
    const [challenges, setChallenges] = useState([]);
    const [acts, setActs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [apiStatus, setApiStatus] = useState({
        challenges: { status: 'loading', message: null },
        acts: { status: 'loading', message: null }
    });
    
    // Fonction améliorée pour extraire le nom d'utilisateur
    const getUserDisplayName = (user) => {
        // Si user est inexistant ou null
        if (!user) return "Utilisateur";
        
        // Si user est une référence d'API (chaîne comme '/api/users/123')
        if (typeof user === 'string') {
            if (user.includes('/api/users/')) {
                const userId = user.split('/').pop();
                
                // Vérifier si nous avons cet utilisateur dans le cache
                if (userCache[userId]) {
                    return userCache[userId].pseudo || 
                            userCache[userId].username || 
                            `Utilisateur #${userId}`;
                }
                
                // Si non, essayer de charger les données utilisateur
                loadUserDetails(user);
                
                // Retourner un placeholder avec l'ID
                return `Utilisateur #${userId}`;
            }
            return user; // Utiliser la chaîne comme nom
        }
        
        // Si user est un objet, extraire le pseudo ou autres propriétés
        if (typeof user === 'object') {
            console.log("Propriétés de l'objet utilisateur:", Object.keys(user));
            
            if (user.pseudo) return user.pseudo;
            if (user.username) return user.username;
            if (user.email) return user.email.split('@')[0];
            
            // Pour API Platform, vérifier @id
            if (user['@id'] && typeof user['@id'] === 'string') {
                if (user['@id'].includes('/api/users/')) {
                    // Vérifier si l'utilisateur a un pseudo
                    if (user.pseudo) return user.pseudo;
                    if (user.username) return user.username;
                    
                    // Sinon, charger les détails
                    loadUserDetails(user['@id']);
                    return "Chargement...";
                }
            }
        }
        
        return "Utilisateur";
    };
    
    // Nouvelle fonction pour charger les détails d'un utilisateur
    const loadUserDetails = (userIri) => {
        if (!userIri || typeof userIri !== 'string') return;
        
        // Extraire l'ID utilisateur de l'IRI
        const userId = userIri.split('/').pop();
        
        // Vérifier si nous avons déjà cet utilisateur dans le cache
        if (userCache[userId]) return;
        
        console.log(`Chargement des détails pour l'utilisateur #${userId}...`);
        
        // Configuration axios
        const config = {
            headers: {
                'Accept': 'application/ld+json'
            }
        };
        
        // Ajouter le token d'authentification seulement s'il existe
        const token = localStorage.getItem('jwt') || localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        // S'assurer que l'URL est correcte
        const apiUrl = userIri.startsWith('http') 
            ? userIri 
            : `http://localhost:8000${userIri.startsWith('/') ? userIri : `/${userIri}`}`;
        
        // Requête API pour obtenir les détails de l'utilisateur
        axios.get(apiUrl, config)
            .then(response => {
                console.log('Détails utilisateur chargés:', response.data);
                
                // Mettre à jour le cache
                setUserCache(prev => ({
                    ...prev,
                    [userId]: response.data
                }));
            })
            .catch(error => {
                console.error(`Erreur lors du chargement des détails de l'utilisateur ${userId}:`, error);
                
                // En cas d'erreur, ajouter un placeholder dans le cache
                if (error.response && error.response.status === 401) {
                    setUserCache(prev => ({
                        ...prev,
                        [userId]: { pseudo: `Utilisateur #${userId}` }
                    }));
                }
            });
    };

    // Fonction pour charger les données depuis l'API
    const loadData = (refresh = false) => {
        if (refresh) {
            setLoading(true);
            setApiStatus({
                challenges: { status: 'loading', message: null },
                acts: { status: 'loading', message: null }
            });
        }
        
        // Charger les défis
        loadChallenges();
        
        // Charger les actes
        loadActs();
    };
    
    // Fonction pour charger les défis avec axios
    const loadChallenges = () => {
        console.log('Chargement des défis avec axios...');
        
        // Configuration axios
        const token = localStorage.getItem('jwt') || localStorage.getItem('token');
        const config = {
            headers: {
                'Accept': 'application/ld+json',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            timeout: 10000 // 10 secondes timeout
        };
        
        // Ajout du token d'authentification si disponible
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        // Requête axios
        axios.get('http://localhost:8000/api/challenges', config)
            .then(response => {
                console.log('Statut de la réponse défis:', response.status);
                console.log('Réponse défis complète:', response);
                
                const data = response.data;
                console.log('Structure des données défis:', Object.keys(data));
                
                // Gestion plus flexible du format de données
                let challengesData = [];
                
                if (data && data["hydra:member"] && Array.isArray(data["hydra:member"])) {
                    // Format API Platform standard
                    challengesData = data["hydra:member"];
                    console.log(`${challengesData.length} défis trouvés dans hydra:member`);
                } else if (data && Array.isArray(data)) {
                    // Format tableau simple
                    challengesData = data;
                    console.log(`${challengesData.length} défis trouvés dans le tableau`);
                } else if (data && typeof data === 'object' && Object.keys(data).length > 0) {
                    // Essayer de trouver les données dans une autre structure
                    console.log('Tentative de recherche dans d\'autres clés:', Object.keys(data));
                    
                    // Essayer de trouver un tableau dans l'une des clés du premier niveau
                    const arrayProps = Object.keys(data).filter(key => Array.isArray(data[key]));
                    if (arrayProps.length > 0) {
                        const arrayProp = arrayProps[0];
                        challengesData = data[arrayProp];
                        console.log(`${challengesData.length} défis trouvés dans la clé "${arrayProp}"`);
                    } else {
                        // Si aucun tableau n'est trouvé, essayer de voir si data est lui-même un objet défis
                        if (data.id && data.title) {
                            challengesData = [data]; // Un seul défi
                            console.log('Un seul défi trouvé dans la réponse');
                        }
                    }
                }
                
                // Vérification supplémentaire: les objets ont-ils la structure attendue?
                if (challengesData.length > 0) {
                    const sampleChallenge = challengesData[0];
                    console.log('Structure d\'un défi:', Object.keys(sampleChallenge));
                    
                    // Vérifier que les données ont un format compatible
                    const hasRequiredProps = sampleChallenge.id !== undefined && 
                                                (sampleChallenge.title !== undefined || sampleChallenge.name !== undefined);
                    
                    if (hasRequiredProps) {
                        // Normaliser le format si nécessaire
                        const normalizedChallenges = challengesData.map(challenge => ({
                            id: challenge.id,
                            title: challenge.title || challenge.name || "Sans titre",
                            progress: challenge.progress || 0,
                            objective: challenge.objective || 100
                        }));
                        
                        setChallenges(normalizedChallenges);
                        setApiStatus(prev => ({
                            ...prev,
                            challenges: { status: 'success', message: null }
                        }));
                    } else {
                        console.warn('Les défis ne contiennent pas les propriétés requises');
                        setChallenges(testChallenges);
                        setApiStatus(prev => ({
                            ...prev,
                            challenges: { status: 'error', message: 'Structure de données incompatible' }
                        }));
                    }
                } else {
                    console.warn('Aucun défi trouvé dans les données');
                    setChallenges(testChallenges);
                    setApiStatus(prev => ({
                        ...prev,
                        challenges: { status: 'error', message: 'Format de données inattendu' }
                    }));
                }
            })
            .catch(error => {
                console.error('Erreur lors du chargement des défis:', error);
                console.error('Message d\'erreur complet:', error.toString());
                if (error.response) {
                    // La requête a été faite et le serveur a répondu avec un code d'état hors de la plage 2xx
                    console.error('Données d\'erreur:', error.response.data);
                    console.error('Statut d\'erreur:', error.response.status);
                    console.error('En-têtes d\'erreur:', error.response.headers);
                } else if (error.request) {
                    // La requête a été faite mais aucune réponse n'a été reçue
                    console.error('Aucune réponse reçue:', error.request);
                } else {
                    // Quelque chose s'est mal passé lors de la configuration de la requête
                    console.error('Erreur de configuration:', error.message);
                }
                
                setChallenges(testChallenges);
                setApiStatus(prev => ({
                    ...prev,
                    challenges: { status: 'error', message: error.message }
                }));
            })
            .finally(() => {
                if (requestsCompleted.current) {
                    setLoading(false);
                } else {
                    requestsCompleted.current = true;
                }
            });
    };
    
    // Fonction pour charger les actes avec axios
    const loadActs = () => {
        console.log('Chargement des actes avec axios...');
        
        // Configuration axios
        const token = localStorage.getItem('jwt') || localStorage.getItem('token');
        const config = {
            headers: {
                'Accept': 'application/ld+json',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            timeout: 10000 // 10 secondes timeout
        };
        
        // Ajout du token d'authentification si disponible
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        // Requête axios
        axios.get('http://localhost:8000/api/acts', config)
            .then(response => {
                console.log('Statut de la réponse actes:', response.status);
                console.log('Réponse actes complète:', response);
                
                const data = response.data;
                console.log('Structure des données actes:', Object.keys(data));
                
                // Gestion plus flexible du format de données
                let actsData = [];
                
                if (data && data["hydra:member"] && Array.isArray(data["hydra:member"])) {
                    // Format API Platform standard
                    actsData = data["hydra:member"];
                    console.log(`${actsData.length} actes trouvés dans hydra:member`);
                } else if (data && Array.isArray(data)) {
                    // Format tableau simple
                    actsData = data;
                    console.log(`${actsData.length} actes trouvés dans le tableau`);
                } else if (data && typeof data === 'object' && Object.keys(data).length > 0) {
                    // Essayer de trouver les données dans une autre structure
                    console.log('Tentative de recherche dans d\'autres clés:', Object.keys(data));
                    
                    // Essayer de trouver un tableau dans l'une des clés du premier niveau
                    const arrayProps = Object.keys(data).filter(key => Array.isArray(data[key]));
                    if (arrayProps.length > 0) {
                        const arrayProp = arrayProps[0];
                        actsData = data[arrayProp];
                        console.log(`${actsData.length} actes trouvés dans la clé "${arrayProp}"`);
                    } else {
                        // Si aucun tableau n'est trouvé, essayer de voir si data est lui-même un objet acte
                        if (data.id && (data.title || data.description)) {
                            actsData = [data]; // Un seul acte
                            console.log('Un seul acte trouvé dans la réponse');
                        }
                    }
                }
                
                // Vérification supplémentaire: les objets ont-ils la structure attendue?
                if (actsData.length > 0) {
                    const sampleAct = actsData[0];
                    console.log('Structure d\'un acte:', Object.keys(sampleAct));
                    
                    // Vérifier que les données ont un format compatible
                    const hasRequiredProps = sampleAct.id !== undefined && 
                                        (sampleAct.title !== undefined || sampleAct.name !== undefined);
                    
                    if (hasRequiredProps) {
                        // Normaliser le format si nécessaire
                        const normalizedActs = actsData.map(act => {
                            // Log pour examiner la structure de l'utilisateur
                            console.log(`Acte ${act.id} - Utilisateur:`, act.user);
                            
                            const normalizedAct = {
                                id: act.id,
                                title: act.title || act.name || "Sans titre",
                                description: act.description || act.content || "Aucune description",
                                createdAt: act.createdAt || act.created_at || new Date().toISOString(),
                                user: act.user || act.author || { username: "Utilisateur" },
                                likes: act.likes || [],
                                comments: act.comments || [],
                                image: act.image || act.photo || null
                            };
                            
                            // Si l'utilisateur est une référence d'API, charger ses détails
                            if (typeof normalizedAct.user === 'string' && normalizedAct.user.includes('/api/users/')) {
                                loadUserDetails(normalizedAct.user);
                            }
                            
                            return normalizedAct;
                        });
                        
                        setActs(normalizedActs);
                        setApiStatus(prev => ({
                            ...prev,
                            acts: { status: 'success', message: null }
                        }));
                    } else {
                        console.warn('Les actes ne contiennent pas les propriétés requises');
                        setActs(testActs);
                        setApiStatus(prev => ({
                            ...prev,
                            acts: { status: 'error', message: 'Structure de données incompatible' }
                        }));
                    }
                } else {
                    console.warn('Aucun acte trouvé dans les données');
                    setActs(testActs);
                    setApiStatus(prev => ({
                        ...prev,
                        acts: { status: 'error', message: 'Format de données inattendu' }
                    }));
                }
            })
            .catch(error => {
                console.error('Erreur lors du chargement des actes:', error);
                if (error.response) {
                    // La requête a été faite et le serveur a répondu avec un code d'état hors de la plage 2xx
                    console.error('Données d\'erreur:', error.response.data);
                    console.error('Statut d\'erreur:', error.response.status);
                    console.error('En-têtes d\'erreur:', error.response.headers);
                } else if (error.request) {
                    // La requête a été faite mais aucune réponse n'a été reçue
                    console.error('Aucune réponse reçue:', error.request);
                } else {
                    // Quelque chose s'est mal passé lors de la configuration de la requête
                    console.error('Erreur de configuration:', error.message);
                }
                
                setActs(testActs);
                setApiStatus(prev => ({
                    ...prev,
                    acts: { status: 'error', message: error.message }
                }));
            })
            .finally(() => {
                if (requestsCompleted.current) {
                    setLoading(false);
                } else {
                    requestsCompleted.current = true;
                }
            });
    };

    // Mettre à jour les actes quand le cache utilisateur change
    useEffect(() => {
        // Si le cache utilisateur a été mis à jour et que nous avons des actes
        if (Object.keys(userCache).length > 0 && acts.length > 0) {
            console.log("Mise à jour des actes avec les informations utilisateur du cache");
            
            // Créer une copie des actes pour mettre à jour
            const updatedActs = [...acts];
            let hasUpdates = false;
            
            updatedActs.forEach((act, index) => {
                // Si l'utilisateur est une référence IRI
                if (typeof act.user === 'string' && act.user.includes('/api/users/')) {
                    const userId = act.user.split('/').pop();
                    
                    // Si nous avons cet utilisateur dans le cache
                    if (userCache[userId]) {
                        console.log(`Mise à jour de l'utilisateur pour l'acte ${act.id}:`, userCache[userId]);
                        updatedActs[index] = {
                            ...act,
                            user: userCache[userId]
                        };
                        hasUpdates = true;
                    }
                }
            });
            
            // Si des mises à jour ont été effectuées, mettre à jour l'état
            if (hasUpdates) {
                console.log("Actes mis à jour avec les informations utilisateur");
                setActs(updatedActs);
            }
        }
    }, [userCache, acts]);

    // Charger les données au chargement du composant
    useEffect(() => {
        loadData();
        
        // Nettoyage lors du démontage du composant
        return () => {
            requestsCompleted.current = false;
        };
    }, []);

    const handleParticipate = (challengeTitle) => {
        const token = localStorage.getItem('jwt') || localStorage.getItem('token');
        
        if (!token) {
            navigate('/login', { 
                state: { 
                    from: `/publish?defi=${encodeURIComponent(challengeTitle)}`,
                    message: 'Vous devez être connecté pour participer à un défi.' 
                } 
            });
        } else {
            // Trouver l'ID du défi
            const challenge = challenges.find(c => c.title === challengeTitle);
            if (challenge) {
                navigate(`/publish?defi_id=${challenge.id}&defi_title=${encodeURIComponent(challengeTitle)}`);
            } else {
                navigate(`/publish?defi_title=${encodeURIComponent(challengeTitle)}`);
            }
        }
    };

    // Fonction pour afficher un message d'état
    const renderStatusMessage = (type) => {
        const status = apiStatus[type].status;
        
        if (status === 'loading') {
            return <span className="text-blue-500">Chargement...</span>;
        } else if (status === 'success') {
            return <span className="text-green-600">Données réelles</span>;
        } else {
            return (
                <span className="text-orange-500">
                    Données de test {apiStatus[type].message ? `(${apiStatus[type].message})` : ''}
                </span>
            );
        }
    };

    return (
        <div className="px-4 py-6 bg-custom-grey min-h-screen text-custom-greyd">
            <h1 className="text-3xl font-bold mb-4 w-fit border-b-4 border-custom-green text-center mx-auto">
                Communauté
            </h1>
            
            {/* Bouton de rafraîchissement */}
            <div className="flex justify-center mb-4">
                <button 
                    onClick={() => loadData(true)}
                    className="px-4 py-2 bg-custom-green text-white rounded-md hover:bg-custom-greenl transition-colors flex items-center"
                    disabled={loading}
                >
                    {loading ? 'Chargement...' : 'Rafraîchir les données'}
                    {loading ? null : <FaSync className="ml-2" />}
                </button>
            </div>
            
            {/* Indicateur de source de données */}
            <div className="flex justify-center mb-4 text-sm">
                <div className="flex space-x-4">
                    <div>
                        <span className="font-semibold">Défis:</span> 
                        {renderStatusMessage('challenges')}
                    </div>
                    <div>
                        <span className="font-semibold">Actes:</span> 
                        {renderStatusMessage('acts')}
                    </div>
                </div>
            </div>
            
            {loading && (
                <div className="text-center py-4">
                    <p className="text-lg">Chargement des données...</p>
                </div>
            )}
            
            <h2 className="text-2xl font-bold mb-6 text-center">Défis en cours :</h2>

            <div className="flex flex-col mid:flex-row flex-wrap justify-center items-stretch gap-6 mb-12">
                {challenges && challenges.length > 0 ? (
                    challenges.map((challenge, index) => {
                        // Vérification des propriétés requises avec des valeurs par défaut
                        const id = challenge.id || index;
                        const title = challenge.title || "Défi sans titre";
                        const progress = challenge.progress || 0;
                        const objective = challenge.objective || 100;
                        
                        return (
                            <div
                                key={id}
                                className="w-full md:w-[280px] h-[220px] rounded-2xl p-6 bg-custom-greenl flex flex-col text-white shadow-lg"
                            >
                                {/* Titre avec hauteur fixe */}
                                <div className="h-16 flex items-center justify-center mb-3">
                                    <h3 className="text-lg font-bold text-center text-white">{title}</h3>
                                </div>
                                
                                {/* Barre de progression */}
                                <div className="flex-grow flex flex-col justify-center">
                                    <div className="w-full bg-white bg-opacity-50 rounded-full h-5 mb-3 relative">
                                        <div
                                            className="bg-custom-green h-5 rounded-full"
                                            style={{ width: `${(progress / objective) * 100}%` }}>
                                        </div>
                                        <span className="absolute inset-0 flex justify-center items-center text-sm font-semibold text-black">
                                            {progress}/{objective}
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Bouton avec position fixe en bas */}
                                <div className="flex justify-center mt-auto">
                                    <button 
                                        onClick={() => handleParticipate(title)} 
                                        className="px-4 py-2 bg-custom-green border-custom-yellow border rounded-bl-xl rounded-tr-xl text-white font-bold hover:bg-custom-yellow hover:text-custom-green hover:border-custom-green transition-colors">
                                        Participer
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : loading ? (
                    <p className="text-center text-lg">Chargement des défis...</p>
                ) : (
                    <p className="text-center text-lg">Aucun défi disponible pour le moment.</p>
                )}
            </div>

            <h2 className="text-2xl font-semibold mb-6 text-center">Tous les actes publiés :</h2>

            <div className="space-y-5 flex flex-col items-center">
                {acts && acts.length > 0 ? (
                    acts.map((post, index) => {
                        // Vérification des propriétés requises avec des valeurs par défaut
                        const id = post.id || index;
                        const title = post.title || "Acte sans titre";
                        const description = post.description || "Aucune description";
                        const createdAt = post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Date inconnue";
                        
                        // Log pour débogage
                        console.log(`Affichage de l'acte ${id} - Utilisateur:`, post.user);
                        
                        return (
                            <Link to={`/act/${id}`} key={id} className="w-full max-w-xl bg-custom-greyl border border-custom-green rounded-xl p-4 shadow cursor-pointer">
                                <div className="flex items-center mb-2">
                                    <img src={avatar} alt="Avatar" className="w-6 h-6 rounded-full mr-3" />
                                    <span className="font-semibold">
                                        {getUserDisplayName(post.user)}
                                        <span className="text-sm text-custom-greyd">
                                            - {createdAt}
                                        </span>
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
                                {post.image && (
                                    <img 
                                        src={`http://localhost:8000/uploads/acts/${post.image}`} 
                                        alt={`Image de l'acte "${title}"`} 
                                        className="h-[12vh] w-[15vh] sm:h-[20vh] sm:w-[26vh] rounded-xl mb-4 mx-auto" 
                                        onError={(e) => {
                                            console.error('Erreur de chargement d\'image:', e);
                                            e.target.src = "https://via.placeholder.com/150?text=Image+non+disponible";
                                        }}
                                    />
                                )}
                                <p className="mb-4 text-justify">{description}</p>
                                <div className="flex justify-center space-x-10 text-xl">
                                    <div className="flex items-center space-x-2 border border-black rounded-full px-3 py-1 hover:text-red-700" aria-label="J'aime">
                                        <FaRegHeart />
                                        <span>{post.likes && Array.isArray(post.likes) ? post.likes.length : 0}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 border border-black rounded-full px-3 py-1 hover:text-blue-500" aria-label="Commenter">
                                        <FaRegCommentDots />
                                        <span>{post.comments && Array.isArray(post.comments) ? post.comments.length : 0}</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                ) : loading ? (
                    <p className="text-center text-lg">Chargement des actes...</p>
                ) : (
                    <p className="text-center text-lg">Aucun acte publié pour le moment.</p>
                )}
            </div>
        </div>
    );
};

export default Community;