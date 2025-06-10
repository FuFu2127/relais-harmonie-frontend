import { Link } from "react-router-dom";

const Legal = () => {

    return (
        <main>
            <h1 className="text-2xl font-bold mb-6 text-center pt-4">Mentions légales</h1>
            <p className="px-10 text-2xl underline mb-4">Informations légales sur Relais d'Harmonie :</p>
            
            <div className="px-10 mb-6">
                <h2 className="text-2xl underline mb-4">1. Editeur du site :</h2>
                <p className="text-lg text-justify">Le site relais d'Harmonie est édité par :</p>
                <ul className="text-lg list-disc list-inside mb-2">
                    <li>Les Anonymous.</li>
                    <li>Statut : Particulier.</li>
                    <li>Projet : Projet réalisé dans le cadre de ma formation.</li>
                    <li>Email : contact@relaisdharmonie.fr.</li>
                </ul>
            </div>

            <div className="px-10 mb-6">
                <h2 className="text-2xl underline mb-4">2. Hébergement :</h2>
                <p className="text-lg text-justify">Le site relais d'Harmonie est hébergé par :</p>
                <ul className="text-lg list-disc list-inside mb-2">
                    <li>Nom de l'hébergeur : OVH.</li>
                    <li>Adresse : 2 rue Kellermann, 59100 Roubais, France.</li>
                    <li>Téléphone : 01.02.03.04.05.</li>
                    <li>Site web : www.ovhcloud.com.</li>
                </ul>
            </div>

            <div className="px-10 mb-6">
                <h2 className="text-2xl underline mb-4">3. Propriété intellectuelle :</h2>
                <p className="text-lg text-justify">3.1 Tous le contenus du site (textes, design) sont la propriété de relais d'Harmonie ou de ses créateurs.</p>
                <p className="text-lg text-justify">3.2 Toute reproduction, distribution, ou utilisation sans autorisation préalable est interdite.</p>
            </div>

            <div className="px-10 mb-6">
                <h2 className="text-2xl underline mb-4">4. Données Personnelles :</h2>
                <p className="text-lg text-justify">4.1 Relais d'Harmonie s'engage à protéger vos données personnelles conformément au RGPD.</p>
                <p className="text-lg text-justify">4.2 Pour plus d'informations, consultez notre <Link to="/privacy" className="text-lg font-bold underline">politique de confidentialité.</Link></p>
            </div>

            <div className="px-10 mb-6">
                <h2 className="text-2xl underline mb-4">5. Contact :</h2>
                <p className="text-lg text-justify mb-2">Pour toute question concernant ces mentions légales veuillez nous contacter à :</p>
                <ul className="text-lg list-disc list-inside mb-2">
                    <li>Email : contact@relaisdharmonie.fr</li>
                </ul>
                <Link to="/contact" className="text-lg font-bold underline">Page de contact</Link>
            </div>
        </main>
    )
}

export default Legal;