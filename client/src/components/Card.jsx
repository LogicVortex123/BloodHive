import { motion } from "framer-motion";
import styles from "./Card.module.css";

const Card = ({ children, className = "", hover = false, onClick }) => {
    return (
        <motion.div
            className={`${styles.card} ${hover ? styles.hover : ""} ${className}`}
            onClick={onClick}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={hover ? { y: -4, boxShadow: "0 12px 30px rgba(0,0,0,0.1)" } : {}}
        >
            {children}
        </motion.div>
    );
};

export default Card;
