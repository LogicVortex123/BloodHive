import { motion } from "framer-motion";
import styles from "./AnimatedBackground.module.css";

const drops = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${8 + i * 8.5}%`,
    size: 6 + (i % 4) * 5,
    delay: i * 0.4,
    duration: 6 + (i % 3) * 2,
}));

const glowOrbs = [
    { id: "orb1", color: "rgba(224, 36, 71, 0.08)", size: "450px", top: "-10%", left: "-10%", duration: 15 },
    { id: "orb2", color: "rgba(255, 74, 104, 0.06)", size: "550px", bottom: "-15%", right: "-10%", duration: 20 },
    { id: "orb3", color: "rgba(127, 29, 29, 0.05)", size: "350px", top: "40%", left: "50%", duration: 18 },
];

const AnimatedBackground = ({ variant = "default" }) => {
    return (
        <div className={`${styles.bg} ${styles[variant]}`}>
            {/* Glowing Drift Orbs */}
            {glowOrbs.map((orb) => (
                <motion.div
                    key={orb.id}
                    className={styles.orb}
                    style={{
                        background: orb.color,
                        width: orb.size,
                        height: orb.size,
                        top: orb.top,
                        left: orb.left,
                        right: orb.right,
                        bottom: orb.bottom,
                    }}
                    animate={{
                        x: [0, 40, -30, 0],
                        y: [0, -30, 40, 0],
                        scale: [1, 1.08, 0.93, 1],
                    }}
                    transition={{
                        duration: orb.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Rising Blood Drops */}
            {drops.map((drop) => (
                <motion.div
                    key={drop.id}
                    className={styles.drop}
                    style={{
                        left: drop.left,
                        width: drop.size,
                        height: drop.size * 1.4,
                    }}
                    animate={{
                        y: ["100vh", "-20vh"],
                        opacity: [0, 0.35, 0.6, 0.15, 0],
                        scale: [0.5, 1, 1, 0.8],
                    }}
                    transition={{
                        duration: drop.duration,
                        repeat: Infinity,
                        delay: drop.delay,
                        ease: "linear",
                    }}
                />
            ))}

            {/* Pulsing Core */}
            <motion.div
                className={styles.pulse}
                animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.1, 0.03] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* ECG Pulse path */}
            <svg className={styles.ecg} viewBox="0 0 400 60" preserveAspectRatio="none">
                <motion.path
                    d="M0,30 L120,30 L130,15 L135,45 L145,5 L155,55 L165,30 L170,35 L175,25 L180,30 L400,30"
                    fill="none"
                    stroke="rgba(224,36,71,0.08)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
            </svg>
        </div>
    );
};

export default AnimatedBackground;

