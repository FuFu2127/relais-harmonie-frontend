import Image from '../assets/img/a-propos.jpg';

const About = () => {

    return (

        <main>
            <div className="py-8 px-10 flex flex-col items-center">
                <h1 className="sm:text-3xl text-2xl font-bold mb-6">A Propos de Relais d'Harmonie</h1>
                <img src={Image} alt="Image" className="h-[10rem] sm:h-[15rem] rounded-3xl shadow-md" />
            </div>

            <div className="px-10 mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">D'ou vient Relais d'Harmonie ?</h2>
                <p className="text-lg text-justify">Née d'une idée simple : et si un petit acte de bonté pouvait transformer le monde ? Inspiré par des valeurs universelle tels que la bienveillance, l'empathie et la fraternité. J'ai décidez de créer un mouvement où chaque personne peut semer une graine d'Harmonie. L'idée est de rendre un service désintéressé à trois personnes, puis leur demander de faire de même, créant ainsi une chaîne infinie de bienveillante.</p>
                <p className="text-lg mt-6 mb-6 text-justify"><span className="font-bold">PS : </span>L'idée de base vient aussi du film "un monde meilleur" de 2000. ;) </p>
            </div>

            <div className="px-10 mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">Notre mission</h2>
                <ul className="list-disc list-inside space-y-2 text-justify">
                    <li>En courager des actes désintéressés qui créent des liens pour rassembler l'humanitée.</li>
                    <li>Rassembler les humains.</li>
                    <li>Promouvoir des valeurs bienveillance, respect, fraternité...</li>
                    <li>Construire une communauté où chaque graine de bonté fait grandir un arbre d'harmonie.</li>
                </ul>
            </div>

            <div className="px-10 mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">Nos valeurs</h2>
                <ul className="list-disc list-inside space-y-2 text-justify">
                    <li>Bienveillance : "Chaque acte compte, aussi petit soit-il".</li>
                    <li>Nature : "Inspirons-nous de la Terre pour semer l'harmonie".</li>
                    <li>Spiritualité : "La bonté est une énergie qui élève les âmes".</li>
                    <li>Communauté : "Ensemble, créons un monde plus uni".</li>
                </ul>
            </div>

            <div className="px-10 mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">Qui je suis ?</h2>
                    <p className="text-lg text-justify">Je suis étudiante en développement web et passionnée par la Spiritualité, la nature et les technologies. Ce projet est ma façon de contribuer à un monde meilleur.</p>
            </div>

        </main>
    )
}

export default About;