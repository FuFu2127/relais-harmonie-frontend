import {Link} from "react-router-dom";

const Privacy = () => {

    return (
        <main>
            <h1 className="text-2xl font-bold mb-6 text-center pt-4">Politique de confidentialité</h1>
        
            <div className="px-10 mb-6">
                <h2 className="text-2xl underline mb-4">Comment nous protégeons vos données sur Relais d'Harmonie :</h2>
                <p className="text-lg text-justify">Chez Relais d'Harmonie, nous nous engageons à protéger votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles lorsque vous utilisez notre site. En accédant à notre site, vous acceptez les pratiques décrites ci-dessous.</p>
            </div>

            <div className="px-10 mb-6">
                <h2 className="text-2xl underline mb-4">1. Données collectées :</h2>
                <p className="text-lg text-justify">1.1 Données que vous fournissez :</p>
                <ul className="text-lg list-disc list-inside mb-2">
                    <li>Lors de l'inscription : Pseudo, adresse email, mot de passe.</li>
                    <li>Lors de la publication d'un acte : Titre, description, photo (optionnelle).</li>
                    <li>Lors de l'ajout de commentaires : texte du commentaires.</li>
                </ul>
                <p className="text-lg text-justify">1.2 Données collectées automatiquement :</p>
                    <ul className="text-lg list-disc list-inside mb-2">
                        <li>Données techniques : adresses IP, type de navigateur, pages visitées.</li>
                    </ul>
                <p className="text-lg text-justify">1.3 Cookies : Nous utilisons des cookies pour améliorer votre expérience.</p>
            </div>

            <div className="px-10 mb-6">
                <h2 className="text-2xl underline mb-4">2. Utilisation des données :</h2>
                <p className="text-lg text-justify">2.1 Nous utilisons vos données pour :</p>
                <ul className="text-lg list-disc list-inside mb-2">
                    <li>Gérer votre compte et vos publications.</li>
                    <li>Afficher les actes sur la carte.</li>
                    <li>Améliorer notre site (analyse des données techniques).</li>
                </ul>
                <p className="text-lg text-justify">2.2 Nous ne vendons ni ne louons vos données à des tiers.</p>
                <p className="text-lg text-justify">2.3 Vos données peuvent être partagées avec des partenaires mais uniquement avec votre consentement.</p>
            </div>

            <div className="px-10 mb-6">
                <h2 className="text-2xl underline mb-4">3. Protection des données :</h2>
                <p className="text-lg text-justify">3.1 Nous utilisons des mesures de sécurité pour protéger vos données.</p>
                <p className="text-lg text-justify">3.2 L'accès à vos données est limité.</p>
                <p className="text-lg text-justify">3.3 En cas de violation des données, nous vous informerons dans les plus brefs délais, conformément au RGPD.</p>
            </div>

            <div className="px-10 mb-6">
                <h2 className="text-2xl underline mb-4">4. Vos droits :</h2>
                <p className="text-lg text-justify">4.1 Conformément au RGPD, vous avez les droits suivants :</p>
                <ul className="text-lg list-disc list-inside mb-2">
                    <li>Droit d'accès : Consulter les données que nous avons sur vous.</li>
                    <li>Droit de rectification : Modifier vos données si elles sont incorrectes.</li>
                    <li>Droit de suppression : Demander la suppression de vos données.</li>
                    <li>Droit d'opposition : Refuser certains traitements de données.</li>
                </ul>
                <p className="text-lg text-justify">4.2 Pour exercer ces droits, contactez-nous à contact@relaisdharmonie.fr.</p>
            </div>

            <div className="px-10 mb-6">
                <h2 className="text-2xl underline mb-4">5. Cookies :</h2>
                <p className="text-lg text-justify">5.1 Nous utilisons des cookies pour :</p>
                <ul className="text-lg list-disc list-inside mb-2">
                    <li>Mémoriser vos préférences.</li>
                    <li>Analyser l'utilisation du site (via des outils).</li>
                </ul>
                <p className="text-lg text-justify">5.2 Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur.</p>
                <p className="text-lg text-justify">5.3 En continuant à utiliser le site, vous accepter notre utilisation des cookies.</p>
            </div>

            <div className="px-10 mb-6">
                <h2 className="text-2xl underline mb-4">6. Modifications de la politique :</h2>
                <p className="text-lg text-justify">6.1 Nous pouvons modifier cette politique de confidentialité à tout moment. Les modifications seront publiées sur cette page.</p>
                <p className="text-lg text-justify">6.2 En continuant à utiliser le site après une modification, vous acceptez la nouvelle politique.</p>
            </div>

            <div className="px-10 mb-6">
                <h2 className="text-2xl underline mb-4">7. Contact :</h2>
                <p className="text-lg text-justify mb-2">Pour toute question concernant cette politique de confidentialité, veuillez nous contacter à :</p>
                <ul className="text-lg list-disc list-inside mb-2">
                    <li>Email : contact@relaisdharmonie.fr</li>
                </ul>
                <Link to="/contact" className="text-lg font-bold underline">Page de contact</Link>
            </div>
        </main>
    )
}

export default Privacy;