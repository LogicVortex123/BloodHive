import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    IoHeartOutline,
    IoPeopleOutline,
    IoShieldCheckmarkOutline,
    IoFlashOutline,
    IoWaterOutline,
    IoLocationOutline,
} from "react-icons/io5";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import AnimatedBackground from "../components/AnimatedBackground";
import Logo from "../components/Logo";
import styles from "./Landing.module.css";

const features = [
    {
        icon: <IoHeartOutline />,
        title: "Save Lives",
        desc: "Connect with verified donors during emergencies and help save precious lives.",
    },
    {
        icon: <IoPeopleOutline />,
        title: "Community Driven",
        desc: "Join a growing network of donors committed to making a difference in their city.",
    },
    {
        icon: <IoShieldCheckmarkOutline />,
        title: "Trusted Platform",
        desc: "Secure authentication and verified profiles ensure reliable connections.",
    },
    {
        icon: <IoFlashOutline />,
        title: "Quick Response",
        desc: "Find available donors near you within minutes during critical situations.",
    },
];

const steps = [
    { num: "01", title: "Sign Up", desc: "Create your account and set up your donor profile." },
    { num: "02", title: "Set Availability", desc: "Update your blood group, location, and availability status." },
    { num: "03", title: "Connect", desc: "Search for donors or post emergency blood requests." },
    { num: "04", title: "Save Lives", desc: "Help someone in need or get help when you need it most." },
];



const Landing = () => {
    return (
        <div className="page-wrapper">
            <Navbar />

            <section className={styles.hero}>
                <AnimatedBackground />
                <div className={`container ${styles.heroContent}`}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className={styles.heroLogo}>
                            <Logo size={80} />
                        </div>
                        <h1>
                            Connecting Blood Donors<br />
                            <span>With People in Need</span>
                        </h1>
                        <p>
                            BloodHive bridges the gap between blood donors and patients during
                            emergencies. Join our community and be the reason someone smiles today.
                        </p>
                        <div className={styles.heroBtns}>
                            <Link to="/signup">
                                <Button size="lg">Get Started</Button>
                            </Link>
                            <Link to="/login">
                                <Button variant="secondary" size="lg">Login</Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className={styles.section}>
                <div className="container">
                    <h2 className="section-title">Why BloodHive?</h2>
                    <p className="section-subtitle">A platform built with care for every drop that matters.</p>
                    <div className={styles.featureGrid}>
                        {features.map((f, i) => (
                            <motion.div
                                key={f.title}
                                className={styles.featureCard}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className={styles.featureIcon}>{f.icon}</div>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={`${styles.section} ${styles.alt}`}>
                <div className="container">
                    <h2 className="section-title">How It Works</h2>
                    <p className="section-subtitle">Four simple steps to make a difference.</p>
                    <div className={styles.stepsGrid}>
                        {steps.map((step, i) => (
                            <motion.div
                                key={step.num}
                                className={styles.stepCard}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                            >
                                <span className={styles.stepNum}>{step.num}</span>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className="container">
                    <div className={styles.donateBanner}>
                        <IoWaterOutline className={styles.donateIcon} />
                        <div>
                            <h2>Why Donate Blood?</h2>
                            <p>
                                One donation can save up to three lives. Blood cannot be manufactured —
                                it can only come from generous donors like you. Every 2 seconds,
                                someone needs blood in India.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={`${styles.section} ${styles.alt}`}>
                <div className="container">
                    <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
                        <h2 className="section-title">Transparent & Voluntary</h2>
                        <p className="section-subtitle" style={{ marginBottom: "1.5rem" }}>Project Mission & Focus</p>
                        <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.8", marginBottom: "2.5rem" }}>
                            BloodHive is a newly launched, 100% free platform. Rather than showcasing inflated statistics or artificial testimonials, this project has been built with the intention of creating a simple, transparent channel from scratch. The goal is to connect patients directly with voluntary donors in their city, without any commercial interests, third-party involvement, or middleman delays.
                        </p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginTop: "2rem" }}>
                            <div style={{ padding: "1.75rem", background: "var(--bg)", borderRadius: "var(--radius)", border: "1px solid var(--border)", textAlign: "left" }}>
                                <h4 style={{ color: "var(--primary)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>Direct Contact</h4>
                                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: "1.5" }}>Search for donors and get contact details directly during emergencies.</p>
                            </div>
                            <div style={{ padding: "1.75rem", background: "var(--bg)", borderRadius: "var(--radius)", border: "1px solid var(--border)", textAlign: "left" }}>
                                <h4 style={{ color: "var(--primary)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>Availability Toggle</h4>
                                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: "1.5" }}>Easily switch availability on or off inside the profile settings.</p>
                            </div>
                            <div style={{ padding: "1.75rem", background: "var(--bg)", borderRadius: "var(--radius)", border: "1px solid var(--border)", textAlign: "left" }}>
                                <h4 style={{ color: "var(--primary)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>Personal Initiative</h4>
                                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: "1.5" }}>A non-commercial, personal project developed solely to help save lives.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.cta}>
                <div className="container">
                    <motion.div
                        className={styles.ctaBox}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Ready to Make a Difference?</h2>
                        <p>Join BloodHive today and become part of a life-saving community.</p>
                        <Link to="/signup">
                            <Button size="lg">Join BloodHive</Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Landing;
