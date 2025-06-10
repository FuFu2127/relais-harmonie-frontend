import {Link} from "react-router-dom";

const Terms = () => {

    return (
        <main>
            <h1 className="text-2xl font-bold mb-6 text-center pt-4">Conditions d'utilisation</h1>
        
            <div className="px-10 mb-6">
                <h2 className="text-2xl underline mb-4">Règle et condition pour utiliser Relais d'Harmonie :</h2>
                <p className="text-lg text-justify">Bienvenue sur Relais d'Harmonie, en utilisant ce site, vous acceptez les présentes conditions d'utilisation. Ces conditions régissent votre accès et votre utilisation de notre site, qui vise à propager la bonté et l'harmonie à travers des actes désintéressés. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le site.</p>
            </div>

            <div className="px-10 mb-6">
                <h2 className="text-2xl underline mb-4">1. Conditions d'accès :</h2>
                <p className="text-lg text-justify">1.1 Pour utiliser Relais d'Harmonie, vous devez être âgé d'au moins 13 ans ou avoir l'autorisation d'un parent ou tuteur légal.</p>
                <p className="text-lg text-justify">1.2 Vous devez créer un compte avec une adresse email valide.</p>
                <p className="text-lg text-justify">1.3 L'accès au site est gratuit, mais peut être suspendu en cas de non-respect des présentes conditions.</p>
            </div>

            <div className="px-10 mb-6">
                <h2 className="text-2xl underline mb-4">2. Utilisation du site :</h2>
                <p className="text-lg text-justify">2.1 Vous vous engagez à utiliser Relais d'Harmonie dans le respect de sa mission : propager la bonté et l'harmonie.</p>
                <p className="text-lg text-justify">2.2 Il est interdit de publier des contenus illégaux, offensants, ou contraires aux valeurs du site (Discours de haine, spam, contenu inapproprié).</p>
                <p className="text-lg text-justify">2.3 Les actes publiés doivent être réels et désintéressés. Tout abus (exemple : fausses déclarations) peut entraîner la suppression de votre compte.</p>
            </div>

            <div className="px-10 mb-6">
                <h2 className="text-2xl underline mb-4">3. Responsabilités des utilisateurs :</h2>
                <p className="text-lg text-justify">3.1 Vous êtes responsable de la véracité des informations que vous publiez (actes, commentaires).</p>
                <p className="text-lg text-justify">3.2 Vous vous engagez à ne pas partager les informations personnelles d'autres utilisateurs sans leur consentement.</p>
                <p className="text-lg text-justify">3.3 Relais d'Harmonie n'est pas responsable des interactions entre utilisateurs en dehors du site.</p>
            </div>

            <div className="px-10 mb-6">
                <h2 className="text-2xl underline mb-4">4. Propriété intellectuelle :</h2>
                <p className="text-lg text-justify">4.1 Tous les contenus du site (textes...) sont la propriété de relais d'Harmonie.</p>
                <p className="text-lg text-justify">4.2 En publiant un acte ou un commentaire, vous accordez à relais d'Harmonie une licence non exclusive pour afficher et partager ce contenu sur le site.</p>
                <p className="text-lg text-justify">4.3 Vous ne pouvez pas reproduire ou distribuer les contenus du site sans autorisation.</p>
            </div>

            <div className="px-10 mb-6">
                <h2 className="text-2xl underline mb-4">5. Limitation de responsabilité :</h2>
                <p className="text-lg text-justify">5.1 Relais d'Harmonie est fourni tel quel et ne garantit pas un fonctionnement sans interruption.</p>
                <p className="text-lg text-justify">5.2 Nous ne sommes pas responsables des dommages indirects ou consécutifs liés à l'utilisation du site.</p>
                <p className="text-lg text-justify">5.3 Nous nous réservons le droit de modifier ou suspendre le site à tout moment.</p>
            </div>

            <div className="px-10 mb-6">
                <h2 className="text-2xl underline mb-4">6. Modifications des conditions :</h2>
                <p className="text-lg text-justify">6.1 Relais d'Harmonie peut modifier ces conditions à tout moment. Les modifications seront publiées sur cette page.</p>
                <p className="text-lg text-justify">6.2 En continuant à utiliser le site après une modification, vous acceptez les nouvelles conditions.</p>
            </div>

            <div className="px-10 mb-6">
                <h2 className="text-2xl underline mb-4">7. Contact :</h2>
                <p className="text-lg text-justify mb-2">Pour toute question concernant ces conditions d'utilisation, veuillez nous contacter à :</p>
                <ul className="text-lg list-disc list-inside mb-2">
                    <li>Email : contact@relaisdharmonie.fr</li>
                </ul>
                <Link to="/contact" className="text-lg font-bold underline">Page de contact</Link>
            </div>
        </main>
    )
}

export default Terms;