import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => { // Composant pour remonter en haut de la page à chaque changement de route
    const { pathname } = useLocation(); // Récupère le chemin actuel de l'URL

    useEffect(() => {
        window.scrollTo(0, 0); // remonte en haut
    }, [pathname]); // A chaque chargement de page

    return null;
}

export default ScrollToTop;