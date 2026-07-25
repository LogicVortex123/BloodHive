import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import API from "../services/api";
import Navbar from "../components/Navbar";
import AnimatedBackground from "../components/AnimatedBackground";
import Input from "../components/Input";
import Button from "../components/Button";
import Logo from "../components/Logo";
import Modal from "../components/Modal";
import styles from "./Auth.module.css";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Forgot password modal state
    const [forgotOpen, setForgotOpen] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotLoading, setForgotLoading] = useState(false);
    const [forgotError, setForgotError] = useState("");

    const { login, token, loading: authLoading } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/dashboard";

    // Auto-redirect if already logged in
    useEffect(() => {
        if (token && !authLoading) {
            navigate("/dashboard", { replace: true });
        }
    }, [token, authLoading, navigate]);

    const handleForgotSubmit = async (e) => {
        e.preventDefault();
        if (!forgotEmail.trim()) {
            setForgotError("Email is required");
            return;
        } else if (!/\S+@\S+\.\S+/.test(forgotEmail)) {
            setForgotError("Invalid email format");
            return;
        }
        setForgotError("");
        setForgotLoading(true);
        
        // Simulate API call delay
        setTimeout(() => {
            setForgotLoading(false);
            addToast(`Simulation: Password reset link sent to ${forgotEmail}`, "success");
            setForgotEmail("");
            setForgotOpen(false);
        }, 1200);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        const newErrors = {};
        if (!form.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format";
        if (!form.password) newErrors.password = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const { data } = await API.post("/auth/login", form);
            login(data.user, data.token);
            addToast(data.message || "Login successful!", "success");
            navigate(from, { replace: true });
        } catch (err) {
            addToast(err.response?.data?.message || "Login failed", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <AnimatedBackground variant="auth" />
            <Navbar />

            <div className={styles.wrapper}>
                <motion.div
                    className={styles.card}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className={styles.header}>
                        <Logo size={36} />
                        <h2>Welcome Back</h2>
                        <p>Login to your BloodHive account</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            error={errors.email}
                            required
                        />
                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            error={errors.password}
                            required
                        />

                        <p className={styles.forgot}>
                            <span 
                                onClick={() => setForgotOpen(true)} 
                                style={{ cursor: "pointer", textDecoration: "underline", color: "var(--primary)" }}
                            >
                                Forgot password?
                            </span>
                        </p>

                        <Button type="submit" fullWidth loading={loading}>
                            Login
                        </Button>
                    </form>

                    <p className={styles.switch}>
                        Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                </motion.div>
            </div>

            <Modal isOpen={forgotOpen} onClose={() => { setForgotOpen(false); setForgotError(""); }} title="Reset Password">
                <form onSubmit={handleForgotSubmit}>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
                        Enter your registered email address. We will simulate sending a password recovery link to your inbox.
                    </p>
                    <Input
                        label="Email Address"
                        name="forgotEmail"
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => { setForgotEmail(e.target.value); setForgotError(""); }}
                        placeholder="you@example.com"
                        error={forgotError}
                        required
                    />
                    <Button type="submit" fullWidth loading={forgotLoading}>
                        Send Reset Link
                    </Button>
                </form>
            </Modal>
        </div>
    );
};

export default Login;
