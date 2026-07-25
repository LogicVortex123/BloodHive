import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import API from "../services/api";
import Navbar from "../components/Navbar";
import AnimatedBackground from "../components/AnimatedBackground";
import Input from "../components/Input";
import Button from "../components/Button";
import Logo from "../components/Logo";
import styles from "./Auth.module.css";

const Signup = () => {
    const [form, setForm] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const { login, token, loading: authLoading } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();

    // Auto-redirect if already logged in
    useEffect(() => {
        if (token && !authLoading) {
            navigate("/dashboard", { replace: true });
        }
    }, [token, authLoading, navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        const newErrors = {};
        if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
        if (!form.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format";
        if (!form.password) newErrors.password = "Password is required";
        else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const { data } = await API.post("/auth/signup", {
                fullName: form.fullName,
                email: form.email,
                password: form.password,
            });
            login(data.user, data.token);
            addToast(data.message || "Account created successfully!", "success");
            navigate("/dashboard");
        } catch (err) {
            addToast(err.response?.data?.message || "Signup failed", "error");
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
                        <h2>Create Account</h2>
                        <p>Join BloodHive and start saving lives</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Full Name"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            placeholder="John Doe"
                            error={errors.fullName}
                            required
                        />
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
                            placeholder="Min 6 characters"
                            error={errors.password}
                            required
                        />
                        <Input
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            placeholder="Re-enter password"
                            error={errors.confirmPassword}
                            required
                        />

                        <Button type="submit" fullWidth loading={loading}>
                            Sign Up
                        </Button>
                    </form>

                    <p className={styles.switch}>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Signup;
