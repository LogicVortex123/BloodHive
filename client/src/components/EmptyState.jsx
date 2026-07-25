import { IoSearchOutline } from "react-icons/io5";
import styles from "./EmptyState.module.css";

const EmptyState = ({ icon, title, message, action }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.iconWrap}>{icon || <IoSearchOutline size={48} />}</div>
            <h3>{title}</h3>
            <p>{message}</p>
            {action && <div className={styles.action}>{action}</div>}
        </div>
    );
};

export default EmptyState;
