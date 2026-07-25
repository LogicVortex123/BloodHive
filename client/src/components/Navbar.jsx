import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMenu, IoClose, IoChevronDown, IoLogOutOutline, IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import Logo from "./Logo";
import Button from "./Button";
import styles from "./Navbar.module.css";

const Navbar = () => {
    const { user, token, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const isAuth = !!token;

    const navLinks = isAuth
        ? [
              { to: "/dashboard", label: "Dashboard" },
              { to: "/donors", label: "Find Donors" },
              { to: "/requests", label: "Requests" },
              { to: "/profile", label: "Profile" },
          ]
        : [];

    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
        navigate("/login");
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.inner}`}>
                <Link to={isAuth ? "/dashboard" : "/"} onClick={() => setMenuOpen(false)}>
                    <Logo />
                </Link>

                {isAuth && (
                    <ul className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
                        {navLinks.map((link) => (
                            <li key={link.to}>
                                <Link
                                    to={link.to}
                                    className={isActive(link.to) ? styles.active : ""}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}

                <div className={styles.actions}>
                    <button
                        onClick={toggleTheme}
                        className={styles.themeToggleBtn}
                        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    >
                        {theme === "dark" ? <IoSunnyOutline size={20} /> : <IoMoonOutline size={20} />}
                    </button>

                    {isAuth ? (
                        <div className={styles.profile}>
                            <button
                                className={styles.profileBtn}
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <span className={styles.avatar}>
                                    {user?.fullName?.charAt(0).toUpperCase()}
                                </span>
                                <span className={styles.name}>{user?.fullName?.split(" ")[0]}</span>
                                <IoChevronDown />
                            </button>

                            {dropdownOpen && (
                                <div className={styles.dropdown}>
                                    <Link to="/profile" onClick={() => setDropdownOpen(false)}>
                                        My Profile
                                    </Link>
                                    <button onClick={handleLogout}>
                                        <IoLogOutOutline /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className={styles.authBtns}>
                            <Link to="/login">
                                <Button variant="ghost" size="sm">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button size="sm">Sign Up</Button>
                            </Link>
                        </div>
                    )}

                    {isAuth && (
                        <button
                            className={styles.menuBtn}
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

