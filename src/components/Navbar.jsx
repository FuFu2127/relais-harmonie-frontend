import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png';
import LoginModal from "./LoginModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import RegisterModal from "./RegisterModal";

const Navbar = () => {
    // Gestion de l'état du menu burger
    const [isOpen, setIsOpen] = useState(false); // isOpen indique si le menu est ouvert (true/false) setIsOpen : met a jour l'état

    // Fonction qui bascule l'état du menu burger
    const toggleMenu = () => { // Inverse l'état ouvre ou ferme le menu
        setIsOpen(!isOpen); // inversion de valeur, si true deviens false <->
    };

    // Modals Connexion / Inscription / Réinitialisation
    const [isLoginOpen, setIsLoginOpen] = useState(false); // Bolean si la modal est ouverte (true), modal initialisé à false, setIsLoginOpen (met a jour sont état)
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false); // same
    const [isRegisterOpen, setIsRegisterOpen] = useState(false); // same

    // Ajoute cet état :
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Vérifie le token au chargement et à chaque ouverture de modal
    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem("jwt"));
    }, [isLoginOpen, isRegisterOpen]);

    // Fonction de déconnexion
    const handleLogout = () => {
        localStorage.removeItem("jwt");
        setIsAuthenticated(false);
        setIsLoginOpen(false);
    };

    return (
        <nav className="bg-custom-greyd py-4 h-[8rem] border-b-4 border-custom-green sticky top-0 z-50">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div>
                    <img src={logo} alt="Logo" className="flex-shrink-0 h-[7rem]" />
                </div>

                <div className="hidden custom:flex space-x-8">
                    <NavLink to="/" className={({ isActive }) => `font-semibold transition-colors ${ isActive ? 'text-custom-yellow border-b-2 border-custom-yellow' : 'text-white hover:text-custom-yellow'}`}>
                        Accueil
                    </NavLink>

                    <NavLink to="/community" className={({ isActive }) => `font-semibold transition-colors ${ isActive ? 'text-custom-yellow border-b-2 border-custom-yellow' : 'text-white hover:text-custom-yellow'}`}>
                        Communauté
                    </NavLink>

                    <NavLink to="/publish" className={({ isActive }) => `font-semibold transition-colors ${ isActive ? 'text-custom-yellow border-b-2 border-custom-yellow' : 'text-white hover:text-custom-yellow'}`}>
                        Publier un acte
                    </NavLink>

                    <NavLink to="/map" className={({ isActive }) => `font-semibold transition-colors ${ isActive ? 'text-custom-yellow border-b-2 border-custom-yellow' : 'text-white hover:text-custom-yellow'}`}>
                        Carte
                    </NavLink>

                    <NavLink to="/my-tree" className={({ isActive }) => `font-semibold transition-colors ${ isActive ? 'text-custom-yellow border-b-2 border-custom-yellow' : 'text-white hover:text-custom-yellow'}`}>
                        Mon arbre
                    </NavLink>

                    <NavLink to="/contact" className={({ isActive }) => `font-semibold transition-colors ${ isActive ? 'text-custom-yellow border-b-2 border-custom-yellow' : 'text-white hover:text-custom-yellow'}`}>
                        Contact
                    </NavLink>
                    
                </div>
                
                {/* Bouton Co */}
                <div className="hidden custom:block">
                    {isAuthenticated ? (
        <button
            onClick={handleLogout}
            className="bg-red-600 border-custom-yellow border-2 rounded-bl-xl rounded-tr-xl text-white px-4 py-2 font-bold hover:bg-custom-yellow hover:text-red-600 hover:border-red-600 transition-colors"
            aria-label="Se déconnecter"
        >
            Se déconnecter
        </button>
    ) : (
        <button
            onClick={() => setIsLoginOpen(true)}
            className="bg-custom-green border-custom-yellow border-2 rounded-bl-xl rounded-tr-xl text-white px-4 py-2 font-bold hover:bg-custom-yellow hover:text-custom-green hover:border-custom-green transition-colors"
            aria-label="Se connecter"
        >
            Se connecter
        </button>
    )}
                </div>

                {/* Bouton Menu Hamburger sur mobile */}
                <div className="custom:hidden">
                    <button onClick={toggleMenu} aria-label="Menu burger" className={`relative w-12 h-12 flex items-center justify-center p-4 ${isOpen ? "border border-white rounded-md" : ""}`}>
                        <span className={`absolute w-12 h-[6px] rounded-xl bg-white transition-all duration-300 ${isOpen ? 'rotate-45' : '-translate-y-3'}`}></span>
                        <span className={`absolute w-12 h-[6px] rounded-xl bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`absolute w-12 h-[6px] rounded-xl bg-white transition-all duration-300 ${isOpen ? '-rotate-45' : 'translate-y-3'}`}></span>

                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="custom:hidden bg-custom-greyd px-4 pt-2 pb-4 flex flex-col items-center text-center space-y-3">
                    <NavLink to="/" className={({ isActive }) => `font-semibold transition-colors ${ isActive ? 'text-custom-yellow' : 'text-white hover:text-custom-yellow'}`} onClick={toggleMenu}>
                        Accueil
                    </NavLink>

                    <NavLink to="/community" className={({ isActive }) => `font-semibold transition-colors ${ isActive ? 'text-custom-yellow' : 'text-white hover:text-custom-yellow'}`} onClick={toggleMenu}>
                        Communauté
                    </NavLink>

                    <NavLink to="/publish" className={({ isActive }) => `font-semibold transition-colors ${ isActive ? 'text-custom-yellow' : 'text-white hover:text-custom-yellow'}`} onClick={toggleMenu}>
                        Publier un acte
                    </NavLink>

                    <NavLink to="/map" className={({ isActive }) => `font-semibold transition-colors ${ isActive ? 'text-custom-yellow' : 'text-white hover:text-custom-yellow'}`} onClick={toggleMenu}>
                        Carte
                    </NavLink>

                    <NavLink to="/my-tree" className={({ isActive }) => `font-semibold transition-colors ${ isActive ? 'text-custom-yellow' : 'text-white hover:text-custom-yellow'}`} onClick={toggleMenu}>
                        Mon arbre
                    </NavLink>

                    <NavLink to="/contact" className={({ isActive }) => `font-semibold transition-colors ${ isActive ? 'text-custom-yellow' : 'text-white hover:text-custom-yellow'}`} onClick={toggleMenu}>
                        Contact
                    </NavLink>

                    <button onClick={() => {setIsLoginOpen(true); toggleMenu();}} className="bg-custom-green border-custom-yellow border-2 rounded-bl-xl rounded-tr-xl text-white px-4 py-2 font-bold hover:bg-custom-yellow hover:text-custom-green hover:border-custom-green transition-colors" aria-label="Se connecter">
                        Se connecter
                    </button>
                </div>
            )}

            <LoginModal 
            isOpen={isLoginOpen} 
            onClose={() => setIsLoginOpen(false)} 
            onForgotPassword={() => {
            setIsLoginOpen(false);
            setIsForgotPasswordOpen(true);
            }} //Modal pour mot de réinitialisation
            onRegister={() => {
            setIsLoginOpen(false);
            setIsRegisterOpen(true);
            }} // Modal pour inscription
            onLoginSuccess={() => setIsAuthenticated(true)}
            />

            {/* Modal réinitialisation */}
            <ForgotPasswordModal
            isOpen={isForgotPasswordOpen} 
            onClose={() => setIsForgotPasswordOpen(false)}
            onBackToLogin={() => {
                setIsForgotPasswordOpen(false); // Ferme la modal actuelle
                setIsLoginOpen(true);
            }}
            />

            {/* Modal inscription */}
            <RegisterModal
            isOpen={isRegisterOpen} 
            onClose={() => setIsRegisterOpen(false)} 
            onLogin={() => {
            setIsRegisterOpen(false);
            setIsLoginOpen(true);
            }}
            />
        </nav>
    );

};

export default Navbar;