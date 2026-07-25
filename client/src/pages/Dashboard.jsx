import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    IoPeopleOutline,
    IoWaterOutline,
    IoAlertCircleOutline,
    IoCheckmarkCircleOutline,
    IoDocumentTextOutline,
} from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Loader from "../components/Loader";
import RequestCard from "../components/RequestCard";
import styles from "./Dashboard.module.css";

const statIcons = {
    totalDonors: <IoPeopleOutline />,
    availableDonors: <IoWaterOutline />,
    activeRequests: <IoAlertCircleOutline />,
    completedRequests: <IoCheckmarkCircleOutline />,
    myRequests: <IoDocumentTextOutline />,
};

const statLabels = {
    totalDonors: "Total Donors",
    availableDonors: "Available Donors",
    activeRequests: "Active Requests",
    completedRequests: "Completed Requests",
    myRequests: "My Requests",
};

const navCards = [
    { to: "/donors", title: "Find Donors", desc: "Search for available blood donors near you", icon: <IoPeopleOutline /> },
    { to: "/requests", title: "Blood Requests", desc: "View and create emergency blood requests", icon: <IoAlertCircleOutline /> },
    { to: "/profile", title: "My Profile", desc: "Update your donor information and availability", icon: <IoWaterOutline /> },
];

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [latestRequests, setLatestRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const { data } = await API.get("/dashboard");
                setStats(data.stats);
                setLatestRequests(data.latestRequests || []);
            } catch (err) {
                console.error("Dashboard fetch failed:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    return (
        <div className="page-wrapper">
            <Navbar />

            {loading ? (
                <Loader text="Loading dashboard..." />
            ) : (
                <>
                    <div className="page-content">
                        <div className="container">
                            <motion.div
                                className={styles.welcome}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h1>Welcome, {user?.fullName?.split(" ")[0]}!</h1>
                                <p>Here&apos;s an overview of the BloodHive community.</p>
                            </motion.div>

                            {stats && (
                                <div className={styles.statsGrid}>
                                    {Object.entries(stats).map(([key, value], i) => (
                                        <motion.div
                                            key={key}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.08 }}
                                        >
                                            <Card className={styles.statCard}>
                                                <div className={styles.statIcon}>{statIcons[key]}</div>
                                                <div>
                                                    <h3>{value}</h3>
                                                    <p>{statLabels[key]}</p>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            <h2 className={styles.sectionHeading}>Quick Actions</h2>
                            <div className={styles.navGrid}>
                                {navCards.map((item, i) => (
                                    <motion.div
                                        key={item.to}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + i * 0.1 }}
                                    >
                                        <Link to={item.to}>
                                            <Card hover className={styles.navCard}>
                                                <div className={styles.navIcon}>{item.icon}</div>
                                                <h3>{item.title}</h3>
                                                <p>{item.desc}</p>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <h2 className={styles.sectionHeading}>Recent Requests</h2>
                            {latestRequests.length > 0 ? (
                                <div className={styles.requestGrid}>
                                    {latestRequests.map((req) => (
                                        <RequestCard key={req._id} request={req} />
                                    ))}
                                </div>
                            ) : (
                                <Card>
                                    <p className={styles.empty}>No recent requests found.</p>
                                </Card>
                            )}
                        </div>
                    </div>

                    <Footer />
                </>
            )}
        </div>
    );
};

export default Dashboard;
