import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaXTwitter, FaDiscord, FaPinterest, FaGithub} from 'react-icons/fa6';
import logo from '../assets/logo.png';

const Footer = () => {


    return (
        <footer className="bg-custom-greyd text-white border-t-2 border-custom-green">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">

                <div className="flex flex-col items-center">
                    <h3 className="text-custom-green text-xl font-bold uppercase">Relais <span className='text-custom-yellow'><span className="lowercase">d</span>'Harmonie</span></h3>
                    <img src={logo} alt="logo" className="h-[7rem]" />
                </div>

                <div className="flex flex-col items-center">
                    <h3 className="text-custom-yellow text-lg font-bold uppercase mb-4">Navigation</h3>
                    <ul className="space-y-1 font-bold text-left">
                        <li><NavLink to="/" className="hover:text-custom-yellow">Accueil</NavLink></li>
                        <li><NavLink to="/about" className="hover:text-custom-yellow">A Propos</NavLink></li>
                        <li><NavLink to="/community" className="hover:text-custom-yellow">Communauté</NavLink></li>
                        <li><NavLink to="/map" className="hover:text-custom-yellow">Carte</NavLink></li>
                        <li><NavLink to="/contact" className="hover:text-custom-yellow">Contact</NavLink></li>
                    </ul>
                </div>

                <div className="flex flex-col items-center">
                    <h3 className="text-custom-yellow text-lg font-bold uppercase mb-4">Contact</h3>
                    <div className="flex gap-4 text-5xl sm:text-6xl">
                        <a href="https://x.com/" className="text-custom-green hover:text-custom-yellow transition-colors" aria-label="Visiter notre page X-twitter" target="_blank" rel="noopener noreferrer"> <FaXTwitter /> </a>
                        <a href="https://discord.com/" className="text-custom-green hover:text-custom-yellow transition-colors" aria-label="Notre communauté discord" target="_blank" rel="noopener noreferrer"> <FaDiscord /> </a>
                        <a href="https://fr.pinterest.com/" className="text-custom-green hover:text-custom-yellow transition-colors" aria-label="Visiter notre page Pinterest" target="_blank" rel="noopener noreferrer"> <FaPinterest /> </a>
                    </div>
                </div>
            </div>

                <div className="border-t-2 border-white py-4 text-center text-sm flex flex-col items-center space-y-2 md:space-y-0 md:flex-row md:justify-center md:space-x-6">

                    <Link to="/terms" className="hover:text-custom-yellow">Conditions d'utilisation</Link>
                    <Link to="/privacy" className="hover:text-custom-yellow">Politique de confidentialités</Link>
                    <Link to="/legal" className="hover:text-custom-yellow">© {new Date().getFullYear()} Relais d'Harmonie - Tous droits réservés</Link> {/*Année dynamique*/}
                    <a href="https://github.com/" className="text-custom-green hover:text-custom-yellow text-3xl" aria-label="Le lien Github" target="_blank" rel="noopener noreferrer"> <FaGithub /> </a>

            </div>
        </footer>
    );
};

export default Footer;