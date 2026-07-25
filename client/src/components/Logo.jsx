import logoImg from "../assets/logo.png";
import styles from "./Logo.module.css";

const Logo = ({ size = 48, showText = true, light = false }) => {
    return (
        <div className={styles.logo} style={{ gap: `calc(${size}px * 0.2)` }}>
            <div 
                className={styles.imgWrapper} 
                style={{ 
                    width: size, 
                    height: size,
                }}
            >
                <img
                    src={logoImg}
                    alt="BloodHive Logo"
                    className={styles.img}
                />
            </div>
            {showText && (
                <span 
                    className={`${styles.text} ${light ? styles.light : ""}`}
                    style={{ fontSize: `calc(${size}px * 0.44)` }}
                >
                    <span className={styles.blood}>Blood</span>
                    <span className={styles.hive}>Hive</span>
                </span>
            )}
        </div>
    );
};

export default Logo;


