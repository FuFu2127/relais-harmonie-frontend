import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaRegHeart, FaRegCommentDots, FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import avatar from "../assets/icons/france.png";

const Act = () => { // Composant pour afficher les détails d'un acte spécifique
    const { id } = useParams(); // Récupération de l'ID de l'acte depuis les paramètres de l'URL
    const navigate = useNavigate(); // Utilisation du hook useNavigate pour la navigation
    
    const [act, setAct] = useState(null); // État pour stocker les détails de l'acte
    const [loading, setLoading] = useState(true); // État pour indiquer si les données sont en cours de chargement
    const [error, setError] = useState(null); // État pour stocker les erreurs éventuelles lors du chargement des données
    const [commentText, setCommentText] = useState(""); // État pour stocker le texte du commentaire saisi par l'utilisateur
    const [submittingComment, setSubmittingComment] = useState(false); // État pour indiquer si un commentaire est en cours de soumission
    const [commentError, setCommentError] = useState(""); // État pour stocker les erreurs éventuelles lors de la soumission du commentaire
    const [userCache, setUserCache] = useState({}); // Cache pour stocker les détails des utilisateurs déjà chargés
    const [loadingComments, setLoadingComments] = useState(false); // État pour indiquer si les commentaires sont en cours de chargement
    const [commentsLoaded, setCommentsLoaded] = useState(false); // État pour indiquer si les commentaires ont été chargés
    const commentDetailsLoaded = useRef({}); // Référence pour suivre les commentaires déjà chargés afin d'éviter les doublons
    
    // Fonction pour charger les détails d'un utilisateur
    const loadUserDetails = useCallback((userIri) => { // Vérifier si l'IRI de l'utilisateur est valide
        if (!userIri || typeof userIri !== 'string') return; // S'assure que userIri est une chaîne de caractères
        
        // Extraire l'ID utilisateur de l'IRI
        const userId = userIri.split('/').pop();
        
        // Vérifier si nous avons déjà cet utilisateur dans le cache
        if (userCache[userId]) return;
        
        console.log(`Chargement des détails pour l'utilisateur #${userId}...`); // Log pour débogage
        
        // Configuration axios simplifiée - pas besoin d'authentification pour les utilisateurs
        const config = { // Configuration pour la requête axios
            headers: { 
                'Accept': 'application/ld+json' // Indique que l'on attend une réponse au format JSON-LD
            }
        };
        
        // S'assurer que l'URL est correcte
        const apiUrl = userIri.startsWith('http')  // Vérifier si l'IRI commence par http:// ou https://
            ? userIri // Si c'est déjà une URL complète, on l'utilise telle quelle
            : `http://localhost:8000${userIri.startsWith('/') ? userIri : `/${userIri}`}`; // Sinon, on la construit à partir de la base de l'API
        
        // Requête API pour obtenir les détails de l'utilisateur
        axios.get(apiUrl, config) // Envoi de la requête GET pour récupérer les détails de l'utilisateur
            .then(response => { // Vérification de la réponse
                console.log('Détails utilisateur chargés:', response.data); // Log pour débogage
                
                // Mettre à jour le cache
                setUserCache(prev => ({ // Met à jour le cache des utilisateurs
                    ...prev, // Conserve les utilisateurs déjà présents
                    [userId]: response.data // Ajoute ou met à jour l'utilisateur avec les détails récupérés
                }));
            })
            .catch(error => { // Gestion des erreurs lors de la récupération des détails de l'utilisateur
                console.error(`Erreur lors du chargement des détails de l'utilisateur ${userId}:`, error);
                // Ajouter un utilisateur par défaut au cache pour éviter des tentatives répétées
                setUserCache(prev => ({ // Met à jour le cache des utilisateurs
                    ...prev, // Conserve les utilisateurs déjà présents
                    [userId]: { pseudo: `Utilisateur #${userId}`, username: `user${userId}` } // Ajoute un utilisateur par défaut pour éviter les erreurs futures
                }));
            });
    }, [userCache]); // Ajout de userCache comme dépendance
    
    // Fonction pour charger les détails d'un commentaire spécifique
    const loadCommentDetails = useCallback(async (commentIri, index) => { // Vérifier si l'IRI du commentaire est valide
        if (!commentIri || typeof commentIri !== 'string') return; // S'assure que commentIri est une chaîne de caractères
        
        // Éviter de charger plusieurs fois le même commentaire
        const commentId = commentIri.split('/').pop(); // Extraire l'ID du commentaire de l'IRI
        if (commentDetailsLoaded.current[commentId]) { // Vérifier si ce commentaire a déjà été chargé
            console.log(`Commentaire #${commentId} déjà chargé, ignoré`); // Log pour débogage
            return; 
        }
        
        try {
            console.log(`Chargement des détails pour le commentaire #${index} (${commentId}):`, commentIri); // Log pour débogage
            
            const response = await axios.get( // Requête pour récupérer les détails du commentaire
                `http://localhost:8000/api/comments?id=${commentId}`, // Utilisation de l'ID du commentaire pour la requête
                { headers: { 'Accept': 'application/ld+json' } } // Indique que l'on attend une réponse au format JSON-LD
            );
            
            console.log("Réponse de recherche de commentaire:", response.data); // Log pour débogage
            
            let commentData = null; // Initialiser les données du commentaire
            if (response.data && response.data['hydra:member'] && response.data['hydra:member'].length > 0) { // Vérifier si la réponse contient des commentaires
                commentData = response.data['hydra:member'][0]; // Prend le premier commentaire de la liste
            }
            
            if (commentData && commentData.content) { // Vérifier si le commentaire a du contenu
                console.log(`Détails du commentaire #${index} chargés:`, commentData); // Log pour débogage
                
                // Marquer comme chargé
                commentDetailsLoaded.current[commentId] = true;
                
                // Mettre à jour le commentaire spécifique
                setAct(prev => {
                    if (!prev || !prev.comments || !Array.isArray(prev.comments)) return prev; // Vérifier que l'acte et les commentaires sont valides
                    
                    const updatedComments = [...prev.comments]; // Créer une copie des commentaires existants
                    updatedComments[index] = { // Mettre à jour le commentaire à l'index spécifié
                        id: commentData.id, // Utiliser l'ID du commentaire
                        content: commentData.content || "Contenu indisponible", // Utiliser le contenu du commentaire ou un message par défaut
                        createdAt: commentData.createdAt || new Date().toISOString(), // Utiliser la date de création du commentaire ou la date actuelle
                        user: commentData.user || "Utilisateur" // Utiliser l'utilisateur du commentaire ou un message par défaut
                    };
                    
                    return { // Mettre à jour l'état de l'acte avec les commentaires mis à jour
                        ...prev, // Conserver les autres propriétés de l'acte
                        comments: updatedComments // Mettre à jour les commentaires avec le commentaire chargé
                    };
                });
                
                // Charger les détails de l'utilisateur si nécessaire
                if (commentData.user && typeof commentData.user === 'string' && commentData.user.startsWith('/api/users/')) { // Vérifier si l'utilisateur est une référence
                    loadUserDetails(commentData.user); // Charger les détails de l'utilisateur associé au commentaire
                }
            }
        } catch (error) { // Gestion des erreurs lors du chargement des détails du commentaire
            console.error(`Erreur lors du chargement des détails du commentaire #${index}:`, error);
            
            // En cas d'erreur, mettre un message d'information pour ce commentaire
            setAct(prev => {
                if (!prev || !prev.comments || !Array.isArray(prev.comments)) return prev;
                
                const updatedComments = [...prev.comments];
                updatedComments[index] = {
                    id: commentId,
                    content: "Ce commentaire n'est pas disponible pour le moment",
                    createdAt: new Date().toISOString(),
                    user: "Système"
                };
                
                return {
                    ...prev,
                    comments: updatedComments
                };
            });
        }
    }, [loadUserDetails]);
    
    // Fonction pour charger tous les commentaires d'un acte
    const fetchComments = useCallback(async () => {
        if (!id) {
            console.error("Impossible de charger les commentaires: ID d'acte manquant");
            return;
        }
        
        // Éviter les chargements multiples
        if (loadingComments) {
            console.log("Chargement des commentaires déjà en cours, ignoré");
            return;
        }
        
        setLoadingComments(true);
        setCommentsLoaded(false);
        
        // Tentative 1: Utiliser la méthode la plus simple - récupérer tous les commentaires
        try {
            console.log(`Chargement direct des commentaires pour l'acte #${id}...`);
            
            // Requête sans authentification pour voir si ça fonctionne
            const allCommentsResponse = await axios.get(
                `http://localhost:8000/api/comments`,
                { headers: { 'Accept': 'application/ld+json' } }
            );
            
            console.log("Tous les commentaires:", allCommentsResponse.data);
            
            if (allCommentsResponse.data && allCommentsResponse.data['hydra:member']) {
                // Filtrer pour ne garder que les commentaires de cet acte
                const allComments = allCommentsResponse.data['hydra:member'];
                const actComments = allComments.filter(comment => 
                    comment.act === `/api/acts/${id}` || 
                    (comment.act && comment.act.id == id)
                );
                
                console.log(`Commentaires filtrés pour l'acte #${id}:`, actComments.length);
                
                if (actComments.length > 0) {
                    // Normaliser les commentaires
                    const normalizedComments = actComments.map(comment => ({
                        id: comment.id,
                        content: comment.content || "Contenu indisponible",
                        createdAt: comment.createdAt || new Date().toISOString(),
                        user: comment.user || "Utilisateur"
                    }));
                    
                    // Mettre à jour l'état
                    setAct(prev => ({
                        ...prev,
                        comments: normalizedComments
                    }));
                    
                    // Charger les détails des utilisateurs
                    normalizedComments.forEach(comment => {
                        if (typeof comment.user === 'string' && comment.user.startsWith('/api/users/')) {
                            loadUserDetails(comment.user);
                        }
                    });
                    
                    setCommentsLoaded(true);
                    setLoadingComments(false);
                    return; // Sortir de la fonction si réussi
                }
            }
        } catch (error) {
            console.error("Erreur lors du chargement de tous les commentaires:", error);
            // Continuer avec la tentative suivante
        }
        
        // Tentative 2: Récupérer les IRIs des commentaires depuis l'acte lui-même
        try {
            console.log(`Tentative de récupération des commentaires depuis l'acte #${id}...`);
            
            const actResponse = await axios.get(
                `http://localhost:8000/api/acts/${id}`,
                { headers: { 'Accept': 'application/ld+json' } }
            );
            
            if (actResponse.data && actResponse.data.comments) {
                let commentRefs = [];
                
                // Extraire les références des commentaires
                if (Array.isArray(actResponse.data.comments)) {
                    commentRefs = actResponse.data.comments;
                } else if (actResponse.data.comments['hydra:member'] && Array.isArray(actResponse.data.comments['hydra:member'])) {
                    commentRefs = actResponse.data.comments['hydra:member'];
                }
                
                console.log("Références de commentaires trouvées:", commentRefs.length);
                
                if (commentRefs.length > 0) {
                    // Créer des placeholders pour les commentaires
                    const placeholders = commentRefs.map((ref, index) => {
                        const commentId = typeof ref === 'string' ? ref.split('/').pop() : (ref.id || index);
                        return {
                            id: commentId,
                            content: `Chargement du commentaire #${index + 1}...`,
                            createdAt: new Date().toISOString(),
                            user: "Utilisateur"
                        };
                    });
                    
                    // Mettre à jour l'état avec les placeholders
                    setAct(prev => ({
                        ...prev,
                        comments: placeholders
                    }));
                    
                    // Charger les détails de chaque commentaire
                    for (let i = 0; i < commentRefs.length; i++) {
                        const ref = commentRefs[i];
                        if (typeof ref === 'string' && ref.startsWith('/api/')) {
                            await loadCommentDetails(ref, i);
                        } else if (ref && ref.content) {
                            // Si le commentaire est déjà un objet complet
                            placeholders[i] = {
                                id: ref.id,
                                content: ref.content,
                                createdAt: ref.createdAt || new Date().toISOString(),
                                user: ref.user || "Utilisateur"
                            };
                        }
                    }
                    
                    // Mettre à jour l'état avec les placeholders mis à jour
                    setAct(prev => ({
                        ...prev,
                        comments: [...placeholders]
                    }));
                    
                    setCommentsLoaded(true);
                    setLoadingComments(false);
                    return; // Sortir de la fonction si réussi
                }
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des commentaires depuis l'acte:", error);
        }
        
        // Tentative 3: Utiliser la méthode de secours pour les visiteurs
        try {
            console.log("Tentative de récupération via le proxy public...");
            
            const publicResponse = await axios.get(
                `http://localhost:8000/api/public/acts/${id}/comments`,
                { headers: { 'Accept': 'application/json' } }
            );
            
            if (publicResponse.data && Array.isArray(publicResponse.data)) {
                console.log("Commentaires récupérés via le proxy public:", publicResponse.data.length);
                
                const normalizedComments = publicResponse.data.map(comment => ({
                    id: comment.id,
                    content: comment.content || "Contenu indisponible",
                    createdAt: comment.createdAt || new Date().toISOString(),
                    user: comment.user || "Utilisateur"
                }));
                
                setAct(prev => ({
                    ...prev,
                    comments: normalizedComments
                }));
                
                setCommentsLoaded(true);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération via le proxy public:", error);
            
            // Dernière solution: Utiliser les commentaires génériques mais avec un message explicite
            setAct(prev => {
                if (!prev) return null;
                
                // Créer des commentaires génériques avec des messages d'information
                const genericComments = Array(4).fill(null).map((_, i) => ({
                    id: `generic-${i}`,
                    content: "Connexion requise pour voir le contenu complet des commentaires",
                    createdAt: new Date().toISOString(),
                    user: "Système"
                }));
                
                return {
                    ...prev,
                    comments: genericComments
                };
            });
        } finally {
            setLoadingComments(false);
            setCommentsLoaded(true);
        }
    }, [id, loadUserDetails, loadCommentDetails, loadingComments]); // Ajout de loadingComments
    
    // Fonction pour formater la date correctement
    const formatDate = useCallback((dateString) => {
        if (!dateString) return "Date inconnue";
        
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "Date invalide";
            
            return date.toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            console.error("Erreur lors du formatage de la date:", error);
            return "Date inconnue";
        }
    }, []);
    
    // Fonction pour extraire le nom d'utilisateur
    const getUserDisplayName = useCallback((user) => {
        if (!user) return "Utilisateur";
        
        if (typeof user === 'string') {
            if (user.startsWith('/api/users/')) {
                const userId = user.split('/').pop();
                
                // Vérifier si nous avons cet utilisateur dans le cache
                if (userCache[userId]) {
                    return userCache[userId].pseudo || 
                            userCache[userId].username || 
                            `Utilisateur #${userId}`;
                }
                
                // Si non, essayer de charger les données utilisateur
                loadUserDetails(user);
                return `Utilisateur #${userId}`;
            }
            return user;
        }
        
        if (typeof user === 'object') {
            if (user.pseudo) return user.pseudo;
            if (user.username) return user.username;
            if (user.email) return user.email.split('@')[0];
            
            if (user['@id'] && typeof user['@id'] === 'string') {
                if (user['@id'].includes('/api/users/')) {
                    const userId = user['@id'].split('/').pop();
                    // Vérifier si l'utilisateur a un pseudo
                    if (user.pseudo) return user.pseudo;
                    if (user.username) return user.username;
                    
                    // Sinon, charger les détails
                    loadUserDetails(user['@id']);
                    return `Utilisateur #${userId}`;
                }
            }
        }
        
        return "Utilisateur";
    }, [userCache, loadUserDetails]);
    
    // Initialiser le cache utilisateur
    useEffect(() => {
        // Initialiser le cache utilisateur avec des valeurs par défaut
        if (Object.keys(userCache).length === 0) {
            // Ajouter des entrées temporaires pour les ID d'utilisateurs communs
            const tempCache = {};
            for (let i = 1; i <= 10; i++) {
                tempCache[i] = { 
                    pseudo: `Utilisateur #${i}`, 
                    username: `user${i}` 
                };
            }
            setUserCache(tempCache);
        }
    }, [userCache]);
    
    // Charger les données de l'acte
    useEffect(() => {
        const fetchActDetails = async () => {
            setLoading(true);
            setError(null);
            
            try {
                // Validation de l'ID
                const numericId = parseInt(id, 10);
                if (isNaN(numericId)) {
                    throw new Error("ID d'acte invalide");
                }
                
                console.log(`Chargement des détails pour l'acte #${numericId}...`);
                
                // Configuration simplifiée
                const config = {
                    headers: {
                        'Accept': 'application/ld+json'
                    },
                    timeout: 15000 // 15 secondes
                };
                
                // Requête au serveur
                const response = await axios.get(`http://localhost:8000/api/acts/${numericId}`, config);
                console.log("Réponse brute du serveur:", response);
                
                if (!response.data) {
                    throw new Error("Réponse vide du serveur");
                }
                
                const actData = response.data;
                
                // Initialiser l'acte avec un tableau de commentaires vide
                // Les commentaires seront chargés séparément
                setAct({
                    id: actData.id,
                    title: actData.title || "Sans titre",
                    description: actData.description || "Aucune description",
                    createdAt: actData.createdAt ? new Date(actData.createdAt).toLocaleDateString() : "Date inconnue",
                    user: actData.user || { username: "Utilisateur" },
                    image: actData.image || null,
                    likes: actData.likes || [],
                    comments: [] // Tableau vide, sera rempli plus tard
                });
                
                // Si l'utilisateur est une référence, charger ses détails
                if (typeof actData.user === 'string' && actData.user.startsWith('/api/users/')) {
                    loadUserDetails(actData.user);
                }
                
                setLoading(false);
            } catch (error) {
                console.error("Erreur complète:", error);
                
                let errorMessage = "Impossible de charger les détails de l'acte";
                
                if (error.response) {
                    const status = error.response.status;
                    const data = error.response.data;
                    
                    console.error(`Erreur HTTP ${status}:`, data);
                    
                    if (status === 404) {
                        errorMessage = "Cet acte n'existe pas ou a été supprimé";
                    } else {
                        errorMessage = `Erreur ${status}: ${data?.['hydra:description'] || data?.detail || errorMessage}`;
                    }
                } else if (error.request) {
                    console.error("Aucune réponse du serveur:", error.request);
                    errorMessage = "Le serveur ne répond pas. Vérifiez votre connexion internet.";
                } else {
                    console.error("Erreur de configuration:", error.message);
                    errorMessage = error.message || errorMessage;
                }
                
                setError(errorMessage);
                setLoading(false);
            }
        };

        if (id) {
            fetchActDetails();
        }
    }, [id, loadUserDetails]);
    
    // Charger les commentaires dès que l'acte est disponible
    useEffect(() => {
        if (act && act.id && !loading && !commentsLoaded) {
            console.log("Acte chargé, chargement des commentaires...");
            fetchComments();
        }
    }, [act, loading, commentsLoaded, fetchComments]); // Remplacer act?.id par act
    
    // Mettre à jour l'acte lorsque le cache utilisateur change
    useEffect(() => {
        if (act && Object.keys(userCache).length > 0) {
            // Mettre à jour l'acte si l'utilisateur est maintenant dans le cache
            if (typeof act.user === 'string' && act.user.includes('/api/users/')) {
                const userId = act.user.split('/').pop();
                if (userCache[userId]) {
                    setAct(prev => ({
                        ...prev,
                        user: userCache[userId]
                    }));
                }
            }
            
            // Mettre à jour les commentaires si leurs utilisateurs sont maintenant dans le cache
            if (act.comments && act.comments.length > 0) {
                const updatedComments = [...act.comments];
                let hasUpdates = false;
                
                updatedComments.forEach((comment, index) => {
                    // Vérifier que comment est un objet et pas une chaîne
                    if (!comment || typeof comment !== 'object') return;
                    
                    if (typeof comment.user === 'string' && comment.user.includes('/api/users/')) {
                        const userId = comment.user.split('/').pop();
                        if (userCache[userId]) {
                            updatedComments[index] = {
                                ...comment,
                                user: userCache[userId]
                            };
                            hasUpdates = true;
                        }
                    }
                });
                
                if (hasUpdates) {
                    setAct(prev => ({
                        ...prev,
                        comments: updatedComments
                    }));
                }
            }
        }
    }, [userCache, act]);
    
    // Fonction pour gérer les likes
    const handleLike = async () => {
        // Implémentez la logique de like ici
        toast.info("Fonctionnalité de like non implémentée");
    };
    
    // Fonction pour soumettre un commentaire
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        
        if (!commentText.trim()) {
            setCommentError("Le commentaire ne peut pas être vide");
            return;
        }
        
        const token = localStorage.getItem('jwt') || localStorage.getItem('token');
        if (!token) {
            // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
            navigate('/login', { 
                state: { 
                    from: `/act/${id}`,
                    message: 'Vous devez être connecté pour commenter.'
                }
            });
            return;
        }
        
        setSubmittingComment(true);
        setCommentError("");
        
        try {
            // Préparation des données du commentaire
            const commentData = {
                content: commentText,
                act: `/api/acts/${id}`
            };
            
            console.log("Envoi du commentaire:", commentData);
            
            // Envoi de la requête avec le bon Content-Type
            const response = await axios.post(
                'http://localhost:8000/api/comments',
                commentData,
                {
                    headers: {
                        'Content-Type': 'application/ld+json',
                        'Accept': 'application/ld+json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            
            console.log("Réponse après création du commentaire:", response.data);
            
            // Réinitialiser le formulaire
            setCommentText("");
            
            //Recharge tous les commentaires au lieu d'ajouter juste le nouveau
            // Attend un peu pour que le serveur ait le temps de traiter la demande
            setTimeout(() => {
                // Réinitialiser l'état de chargement des commentaires
                setCommentsLoaded(false);
                fetchComments();
                toast.success("Commentaire ajouté avec succès!");
            }, 500);
            
        } catch (error) {
            console.error("Erreur lors de l'ajout du commentaire:", error);
            let errorMsg = "Erreur lors de l'ajout du commentaire. Veuillez réessayer.";
            
            if (error.response) {
                console.error("Réponse d'erreur:", error.response.data);
                if (error.response.data['hydra:description']) {
                    errorMsg = error.response.data['hydra:description'];
                } else if (error.response.data.detail) {
                    errorMsg = error.response.data.detail;
                }
            }
            
            setCommentError(errorMsg);
        } finally {
            setSubmittingComment(false);
        }
    };
    
    // Logger l'état des commentaires pour déboguer
    useEffect(() => {
        if (act && act.comments) {
            console.log("État actuel des commentaires:", act.comments);
        }
    }, [act]); // Ajout de act comme dépendance
    
    return (
        <div className="px-4 py-6 bg-custom-grey min-h-screen text-custom-greyd">
            <button 
                onClick={() => navigate(-1)} 
                className="flex items-center text-custom-green mb-4 hover:underline"
                aria-label="Retour à la liste des actes"
            >
                <FaArrowLeft className="mr-2" /> Retour
            </button>
            
            {loading ? (
                <p className="text-center text-lg">Chargement des détails de l'acte...</p>
            ) : error ? (
                <div className="text-center">
                    <p className="text-red-500 text-lg">{error}</p>
                    <button 
                        onClick={() => navigate('/community')}
                        className="mt-4 px-4 py-2 bg-custom-green text-white rounded-md hover:bg-custom-greenl transition-colors"
                        aria-label="Retour à la communauté"
                    >
                        Retour à la communauté
                    </button>
                </div>
            ) : act ? (
                <div className="w-full max-w-4xl mx-auto bg-custom-greyl border border-custom-green rounded-xl p-6 shadow">
                    <div className="flex items-center mb-4">
                        <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full mr-3" />
                        <span className="font-semibold">
                            {getUserDisplayName(act.user)}
                            <span className="text-sm text-custom-greyd ml-2">
                                - {act.createdAt}
                            </span>
                        </span>
                    </div>
                    
                    <h1 className="text-2xl font-bold mb-4 text-center">{act.title}</h1>
                    
                    {act.image && (
                        <div className="flex justify-center mb-6">
                            <img 
                                src={`http://localhost:8000/uploads/acts/${act.image}`} 
                                alt={`Image de l'acte "${act.title}"`} 
                                className="max-h-[40vh] max-w-full rounded-xl" 
                                onError={(e) => {
                                    console.error('Erreur de chargement d\'image:', e);
                                    e.target.src = "https://via.placeholder.com/300?text=Image+non+disponible";
                                }}
                            />
                        </div>
                    )}
                    
                    <div className="mb-6">
                        <p className="text-lg text-justify">{act.description}</p>
                    </div>
                    
                    <div className="flex justify-center space-x-10 text-xl">
                        <div 
                            className="flex items-center space-x-2 border border-black rounded-full px-3 py-1 hover:text-red-700 cursor-pointer" 
                            aria-label="J'aime"
                            onClick={handleLike}
                        >
                            <FaRegHeart />
                            <span>{act.likes.length}</span>
                        </div>
                        <div className="flex items-center space-x-2 border border-black rounded-full px-3 py-1 hover:text-blue-500" aria-label="Commenter">
                            <FaRegCommentDots />
                            <span>{act.comments.length}</span>
                        </div>
                    </div>
                    
                    {/* Section des commentaires */}
                    <div className="mt-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">
                                Commentaires ({act.comments.length})
                            </h3>
                            <button 
                                onClick={() => {
                                    setCommentsLoaded(false);
                                    fetchComments();
                                }}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm rounded-md border border-gray-300 flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Actualiser
                            </button>
                        </div>
                        
                        {/* Formulaire d'ajout de commentaire ou message pour les visiteurs */}
                        {localStorage.getItem('jwt') || localStorage.getItem('token') ? (
                            <form onSubmit={handleCommentSubmit} className="mb-6">
                                <div className="flex flex-col items-center space-y-2">
                                    <textarea
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        placeholder="Ajoutez un commentaire..."
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-green"
                                        rows={3}
                                    ></textarea>
                                    {commentError && <p className="text-red-500 text-sm">{commentError}</p>}
                                    <button
                                        type="submit"
                                        disabled={submittingComment}
                                        className="px-4 py-2 bg-custom-green text-white rounded-md hover:bg-custom-greenl transition-colors disabled:opacity-50 text-sm w-auto"
                                    >
                                        {submittingComment ? "Envoi en cours..." : "Commenter"}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-md mb-6 text-center">
                                <p className="mb-2">Connectez-vous pour pouvoir commenter.</p>
                            </div>
                        )}
                        
                        {/* Liste des commentaires */}
                        <div className="space-y-4">
                            {loadingComments ? (
                                <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="flex justify-center items-center">
                                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-custom-green mr-3"></div>
                                        <p className="text-gray-500">Chargement des commentaires...</p>
                                    </div>
                                </div>
                            ) : act.comments && act.comments.length > 0 ? (
                                act.comments
                                    .filter(comment => comment && typeof comment === 'object' && comment.content)
                                    .map((comment, index) => (
                                        <div key={comment.id || `comment-${index}`} className="p-4 bg-white rounded-lg shadow">
                                            <div className="flex items-center mb-2">
                                                <img src={avatar} alt="Avatar" className="w-6 h-6 rounded-full mr-3" />
                                                <span className="font-semibold">
                                                    {getUserDisplayName(comment.user)}
                                                    <span className="text-sm text-custom-greyd ml-2">
                                                        - {formatDate(comment.createdAt)}
                                                    </span>
                                                </span>
                                            </div>
                                            <div>
                                                {comment.content.startsWith("Chargement du commentaire") ? (
                                                    <div className="flex items-center text-gray-500">
                                                        <div className="animate-pulse mr-2 h-3 w-3 rounded-full bg-gray-300"></div>
                                                        Chargement du contenu...
                                                    </div>
                                                ) : comment.content === "Ce commentaire n'est visible qu'après connexion" ? (
                                                    <div className="flex items-center">
                                                        <p className="text-gray-500">
                                                            <span className="text-blue-500 mr-1">🔒</span>
                                                            Ce commentaire n'est visible qu'après connexion
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-700">{comment.content}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
                                    <p className="text-gray-500 mb-2">Aucun commentaire pour le moment.</p>
                                    <button 
                                        onClick={() => {
                                            setCommentsLoaded(false);
                                            fetchComments();
                                        }}
                                        className="text-sm text-custom-green underline"
                                    >
                                        Actualiser les commentaires
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-lg">Acte non trouvé.</p>
            )}
        </div>
    );
};

export default Act;