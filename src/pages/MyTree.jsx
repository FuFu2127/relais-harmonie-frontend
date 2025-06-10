import React from 'react';
import { Link } from "react-router-dom";
import avatar from "../assets/icons/france.png";

const MyTree = () => {
    
    const user = {
        pseudo: "Harmo",
        avatar: avatar,
        actsCount: 20,
        commentsCount: 7,
        peopleImpacted: 60,
    };

    return (
        <div className="flex flex-col items-center justify-center px-4 py-1 bg-gray-50 mb-10">
            <h1 className="text-3xl font-bold mb-6 border-b-4 border-custom-green pb-2">Mon arbre</h1>
            <p className="text-lg text-center text-black mb-6">
                Découvre ton impact et modifie ton profil
            </p>
            <div className="bg-custom-grey shadow-lg rounded-lg p-8 w-full max-w-md text-left border-2 border-custom-green">
                <img src={user.avatar} alt="Photo de profil" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-custom-green" />
                <h2 className="text-2xl font-semibold mb-2 text-center">{user.pseudo}</h2>
                <p className="text-black mb-1">Nombre d'actes publiés : {user.actsCount}</p>
                <p className="text-black mb-1">Nombre de commentaires publiés : {user.commentsCount}</p>
                <p className="text-black mb-2">Personnes touchées : {user.peopleImpacted}</p>
                <div className="flex justify-center">
                    <Link to="/update-profil" className="block mx-auto bg-custom-yellow border-custom-green text-black border-2 rounded-bl-xl rounded-tr-xl font-bold hover:bg-custom-green hover:text-custom-yellow hover:border-custom-yellow py-2 px-4 transition-colors">Modifier mon profil</Link>
                </div>
            </div>
        </div>
    )
};

export default MyTree;