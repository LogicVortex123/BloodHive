import { Link } from "react-router-dom";
import { IoLogoLinkedin, IoLogoGithub, IoMailOutline } from "react-icons/io5";
import Logo from "./Logo";
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.brand}>
                    <Logo light />
                    <p>Connecting blood donors with people in need.</p>
                </div>

                <div className={styles.links}>
                    <h4>Quick Links</h4>
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                </div>

                <div className={styles.links}>
                    <h4>Platform</h4>
                    <Link to="/donors">Find Donors</Link>
                    <Link to="/requests">Blood Requests</Link>
                    <Link to="/dashboard">Dashboard</Link>
                </div>

                <div className={styles.developer}>
                    <h4>Created By</h4>
                    <p className={styles.devName}>Anushka Dudhe</p>
                    <div className={styles.socials}>
                        <a href="https://www.linkedin.com/in/anushka-dudhe-22549b369/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                            <IoLogoLinkedin />
                        </a>
                        <a href="https://github.com/LogicVortex123" target="_blank" rel="noopener noreferrer" title="GitHub">
                            <IoLogoGithub />
                        </a>
                        <a href="mailto:anushkadudhe9@gmail.com" title="Email">
                            <IoMailOutline />
                        </a>
                    </div>
                </div>
            </div>

            <div className={styles.bottom}>
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} BloodHive. Made with ❤️ by Anushka Dudhe. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

