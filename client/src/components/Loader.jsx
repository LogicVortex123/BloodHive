import styles from "./Loader.module.css";

const Loader = ({ size = "md", text = "Loading..." }) => {
    return (
        <div className={styles.wrapper}>
            <div className={`${styles.spinner} ${styles[size]}`} />
            {text && <p className={styles.text}>{text}</p>}
        </div>
    );
};

export default Loader;
