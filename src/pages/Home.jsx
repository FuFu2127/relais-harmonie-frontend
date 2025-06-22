import { useEffect, useState } from 'react'; 
//import axios from 'axios';
import banner from '../assets/img/banner.jpg';
import icon1 from '../assets/icons/service.png';
import icon2 from '../assets/icons/relais.png';
import icon3 from '../assets/icons/impact.png';
import bannerstat from '../assets/img/banner-stat.jpg';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import RegisterModal from '../components/RegisterModal';
import LoginModal from '../components/LoginModal';
import ForgotPasswordModal from '../components/ForgotPasswordModal';

const Home = () => { 

    // Gestion de l'état avec useState
    const [isRegisterOpen, setIsRegisterOpen] = useState(false); // Bolean si la modal est ouverte (true), modal initialisé à false, setIsRegisterOpen (met a jour sont état)
    const [isLoginOpen, setIsLoginOpen] = useState(false); // same
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false); // same

    // fonction gestion de la modal Inscription
    const openRegisterModal = () => {
        setIsRegisterOpen(true); // Ouvre la modal inscription
        setIsLoginOpen(false); // Ferme la modal connexion
    };

    // fonction gestion de la modal Se connecter
    const openLoginModal = () => {
        setIsLoginOpen(true); // Ouvre la modal connexion
        setIsRegisterOpen(false); // Ferme la modal inscription
    };

    // fonction gestion de la modal Réinitialisé
    const openForgotPasswordModal = () => {
        setIsForgotPasswordOpen(true); // Ouvre la modal Réinitialisé
        setIsRegisterOpen(false); // Ferme la modal inscription
        setIsLoginOpen(false); // Ferme la modal connexion
    };

    // fonction fermetures modal
    const closeModal = () => { 
        setIsRegisterOpen(false); // Ferme toutes les modals
        setIsLoginOpen(false);
        setIsForgotPasswordOpen(false);
    };

    const [stats, /*setStats*/] = useState({ // Etat qui contient un objet pour simuler des statistiques
        total_acts: 1200,
        total_users: 500,
        total_chains: 200,
    });
    const [loading, setLoading] = useState(true); // fonction loading initialiser a true, // setLoading mise a jour de l'état

    // simulation chargement
    useEffect(() => {
        setTimeout(() => { // fonction js qui exécute un callback
            setLoading(false); // delais 1 seconde false pour simuler les stats
        }, 1000);
    },  []); // tableau de dépendances s'exécute une fois
    
    // Code pour le back
    /*useEffect(() => {
        //axios.get('http://localhost:8000/api/')
        //.then(response => {
            //setStats(response.data);
            //setLoading(false);
        //})
        //.catch(error => {
            //console.error('Erreur lors du chargement des statistiques', error);
            //setLoading(false);
        //});
    //}, //[]);  */

    return (
    <main>

        <section className="bg-cover bg-no-repeat h-[55vh] bg-[center_20%]" style={{ backgroundImage: `url(${banner})` }}>
            <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 h-full">

                <h1 className="text-strokebannert text-4xl md:text-6xl font-bold mb-10">Relais <span className='text-custom-yellow'>d'Harmonie</span></h1>
                <p className="text-strokebannerp text-lg md:text-xl mb-6 max-w-2xl font-bold py-2">Un acte désintéressé, trois vies touchées, un monde transformé</p>

                <button 
                onClick={openRegisterModal} 
                className="bg-custom-greenl border-custom-yellow border-2 rounded-bl-xl rounded-tr-xl text-white px-4 py-2 font-bold hover:bg-custom-yellow hover:text-custom-green hover:border-custom-green transition-colors" aria-label="Rejoindre la communauté">
                Rejoins la Chaîne
                </button>

            </div>
        </section>

        <section className="bg-custom-grey py-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-5">Comment ça fonctionne</h2>

            <div className="px-4 custom:flex justify-center">
                <div className="bg-custom-greenl border border-black p-6 flex flex-col items-center text-center">
                    <img src={icon1} alt="Icone 1" className="h-20 mb-4"/>
                    <h3 className="text-xl font-bold mb-4 uppercase">Rendre service</h3>
                    <p>Aide trois personnes de manière désintéressée.</p>
                </div>

                <div className="bg-custom-yellow p-6 border border-black flex flex-col items-center text-center">
                    <img src={icon2} alt="Icone 2" className="h-20 mb-4"/>
                    <h3 className="text-xl font-bold mb-4 uppercase">Passer le relais</h3>
                    <p>Invite-les à rejoindre la chaîne et à aider trois autres personnes.</p>
                </div>

                <div className="bg-custom-greenl p-6 border-black border flex flex-col items-center text-center">
                    <img src={icon3} alt="Icone 3" className="h-20 mb-4"/>
                    <h3 className="text-xl font-bold mb-4 uppercase">Passer le relais</h3>
                    <p>Vois ton arbre de bonté grandir et l'harmonie se propager.</p>
                </div>

            </div>
        </section>

        <section className="bg-cover bg-no-repeat h-[60vh] md:h-[55vh] bg-[center_10%]" style={{ backgroundImage: `url(${bannerstat})` }}>
            <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 h-full">
                <h2 className="text-3xl md:text-4xl font-bold mb-5 text-strokestattitle">Un mouvement qui grandit</h2>
                {loading ? (
                    <p className="text-center text-nav-bg">Chargement des statistiques...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-2 border-b-4">
                        <div className="rounded-lg p-2 sm:p-4 md:p-6 text-center">
                            <h3 className="text-4xl font-bold text-custom-yellow text-strokestatnumber">{stats.total_acts}</h3>
                            <p className="text-white mt-2 text-strokestatp text-2xl font-bold">Actes de bonté réalisés</p>
                        </div>

                        <div className="rounded-lg p-2 sm:p-4 md:p-6 text-center">
                            <h3 className="text-4xl font-bold text-custom-yellow text-strokestatnumber">{stats.total_users}</h3>
                            <p className="text-white mt-2 text-strokestatp text-2xl font-bold">Personnes touchées</p>
                        </div>

                        <div className="rounded-lg p-2 sm:p-4 md:p-6 text-center">
                            <h3 className="text-4xl font-bold text-custom-yellow text-strokestatnumber">{stats.total_chains}</h3>
                            <p className="text-white mt-2 text-strokestatp text-2xl font-bold">Branches créer</p>
                        </div>
                    </div>
                )}
            </div>
        </section>

        <section className="bg-custom-grey py-16 px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Des actes pour vous inspirez</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="bg-custom-greenl border-custom-green border-2 rounded-bl-xl p-6 min-h-[340px] rounded-tr-xl flex flex-col text-center transform transition-transform duration-300 hover:-translate-y-4 shadow-md hover:shadow-xl">
                    <div className="flex flex-col flex-grow">
                        <h3 className="text-xl font-bold mb-4 min-h-[56px] flex items-center justify-center">Jeanne a aider une inconnue</h3>
                        <p className="mb-6 text-sm min-h-[96px] flex items-center justify-center">Aujourd'hui en rentrant du marché, j'ai aidé une dame à porter ses sacs jusqu'à chez elle, juste à côter de mon quartier.</p>
                    </div>
                    <Link to="/community" className="bg-custom-yellow border-custom-green text-custom-green border-2 rounded-bl-xl rounded-tr-xl font-bold hover:bg-custom-green hover:text-custom-yellow hover:border-custom-yellow py-2 px-4 transition-colors">Découvrir plus...</Link>
                </div>

                <div className="bg-custom-greenl border-custom-green border-2 rounded-bl-xl p-6 min-h-[340px] rounded-tr-xl flex flex-col text-center transform transition-transform duration-300 hover:-translate-y-4 shadow-md hover:shadow-xl">
                    <div className="flex flex-col flex-grow">
                        <h3 className="text-xl font-bold mb-4 min-h-[56px] flex items-center justify-center">Jordan a donner des vêtements</h3>
                        <p className="mb-6 text-sm min-h-[96px] flex items-center justify-center">Aujourd'hui j'ai trié mes affaires et donné des vêtements à une association à côter de chez moi.</p>
                    </div>
                    <Link to="/community" className="bg-custom-yellow border-custom-green text-custom-green border-2 rounded-bl-xl rounded-tr-xl font-bold hover:bg-custom-green hover:text-custom-yellow hover:border-custom-yellow py-2 px-4 transition-colors">Découvrir plus...</Link>
                </div>

                <div className="bg-custom-greenl border-custom-green border-2 rounded-bl-xl p-6 min-h-[340px] rounded-tr-xl flex flex-col text-center transform transition-transform duration-300 hover:-translate-y-4 shadow-md hover:shadow-xl">
                    <div className="flex flex-col flex-grow">
                        <h3 className="text-xl font-bold mb-4 min-h-[56px] flex items-center justify-center">Nicolas a aider son collègue</h3>
                        <p className="mb-6 text-sm min-h-[96px] flex items-center justify-center">Aujourd'hui j'ai aidé mon collègue à réparer son vélo qui à crevé juste après le travail.</p>
                    </div>
                    <Link to="/community" className="bg-custom-yellow border-custom-green text-custom-green border-2 rounded-bl-xl rounded-tr-xl font-bold hover:bg-custom-green hover:text-custom-yellow hover:border-custom-yellow py-2 px-4 transition-colors">Découvrir plus...</Link>
                </div>

                <div className="bg-custom-greenl border-custom-green border-2 rounded-bl-xl p-6 min-h-[340px] rounded-tr-xl flex flex-col text-center transform transition-transform duration-300 hover:-translate-y-4 shadow-md hover:shadow-xl">
                    <div className="flex flex-col flex-grow">
                        <h3 className="text-xl font-bold mb-4 min-h-[56px] flex items-center justify-center">Nadia a aider sa voisine</h3>
                        <p className="mb-6 text-sm min-h-[96px] flex items-center justify-center">Aujourd'hui j'ai rendu visite à ma voisine une mamie qui se sentait seule, je lui ai tenu compagnie et nous avons discuté.</p>
                    </div>
                    <Link to="/community" className="bg-custom-yellow border-custom-green text-custom-green border-2 rounded-bl-xl rounded-tr-xl font-bold hover:bg-custom-green hover:text-custom-yellow hover:border-custom-yellow py-2 px-4 transition-colors">Découvrir plus...</Link>
                </div>

            </div>
        </section>

        <section className="bg-custom-grey py-16 px-4 text-center flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-10">Prêt à rejoindre la communauté ?</h2>
            <div className="text-lg md:text-xl mb-10 max-w-2xl text-center">
                <p>Rejoins des milliers de personnes qui propagent l'harmonie en un clic !</p>
            </div>
            <button onClick={openRegisterModal} className="bg-custom-green border-custom-yellow border-2 rounded-bl-xl rounded-tr-xl text-white px-6 py-3 font-bold hover:bg-custom-yellow hover:text-custom-green hover:border-custom-green transition-colors" aria-label="Nous rejoindre">Nous rejoindre</button>
        </section>

        <RegisterModal  
        isOpen={isRegisterOpen} // Controle si la modal est visible
        onClose={closeModal} // Ferme la modal
        onLogin={openLoginModal} // Ouvre la modal connexion
        />

        <LoginModal 
        isOpen={isLoginOpen} // Controle si la modal est visible
        onClose={closeModal} // Ferme la modal
        onRegister={openRegisterModal} // Ouvre la modal Inscription
        onForgotPassword={openForgotPasswordModal} // Ouvre la modal réinitialisation
        />

        <ForgotPasswordModal 
        isOpen={isForgotPasswordOpen} // Controle si la modal est visible
        onClose={closeModal}    // Ferme la modal
        onLogin={openLoginModal}    // Ouvre la modal connexion
        />
    </main>

    );
}; 

export default Home;