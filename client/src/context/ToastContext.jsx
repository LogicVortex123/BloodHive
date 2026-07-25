import { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCheckmarkCircle, IoCloseCircle, IoInformationCircle } from "react-icons/io5";
import styles from "../components/Toast.module.css";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = "info") => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3500);
    }, []);

    const icons = {
        success: <IoCheckmarkCircle size={20} />,
        error: <IoCloseCircle size={20} />,
        info: <IoInformationCircle size={20} />,
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className={styles.container}>
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            className={`${styles.toast} ${styles[toast.type]}`}
                            initial={{ opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 60 }}
                        >
                            {icons[toast.type]}
                            <span>{toast.message}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
