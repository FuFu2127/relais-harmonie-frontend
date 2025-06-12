import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaRegCompass } from "react-icons/fa6";


const NotFound = () => {
    
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] text-center bg-custom-grey text-custom-greyd px-6">
            <motion.div 
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0, -5, 0],}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut",}}
            className="text-[8rem] mb-4"
            >
            🤖
            </motion.div>

            <motion.h1
            className="text-6xl font-extrabold mb-4 text-custom-yellow"
            initial={{ scale: 0.8}}
            animate={{ scale: 1}}
            transition={{ duration: 0.3}}
            >
            404
            </motion.h1>

            <motion.p
            className="text-xl max-w-md mb-6"
            initial= {{ opacity: 0}}
            animate= {{ opacity: 1}}
            transition={{ delay: 0.3}}
            >
            Le petit robot s'est perdu au fin fond de l'espace...<br/> Cette page n'existe pas (ou plus) 🛸
            </motion.p>

            <motion.div
            whileHover={{ scale: 1.1}}
            whileTap={{ scale: 0.95}}
            >
                <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-custom-green text-white font-semibold hover:bg-custom-yellow hover:text-custom-green transition-all">
                    <FaRegCompass className="text-xl" />
                    Revenir à l'accueil
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;