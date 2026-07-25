import styles from "./Button.module.css";

const Button = ({
    children,
    type = "button",
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    fullWidth = false,
    onClick,
    className = "",
}) => {
    return (
        <button
            type={type}
            className={`${styles.btn} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.full : ""} ${className}`}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {loading ? <span className={styles.spinner} /> : children}
        </button>
    );
};

export default Button;
