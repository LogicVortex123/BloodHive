import { useState, useEffect } from "react";
import { IoPeopleOutline } from "react-icons/io5";
import API from "../services/api";
import { BLOOD_GROUPS } from "../utils/constants";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FilterPanel from "../components/FilterPanel";
import DonorCard from "../components/DonorCard";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";
import styles from "./FindDonors.module.css";

const emptyFilters = { bloodGroup: "", city: "", availability: "" };

const FindDonors = () => {
    const [filters, setFilters] = useState(emptyFilters);
    const [appliedFilters, setAppliedFilters] = useState(emptyFilters);
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDonors = async (params) => {
        setLoading(true);
        try {
            const query = new URLSearchParams();
            if (params.bloodGroup) query.append("bloodGroup", params.bloodGroup);
            if (params.city) query.append("city", params.city);
            if (params.availability) query.append("availability", params.availability);

            const { data } = await API.get(`/users/donors?${query.toString()}`);
            setDonors(data.donors || []);
        } catch (err) {
            console.error("Donor search failed:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDonors(appliedFilters);
    }, [appliedFilters]);

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleApply = () => setAppliedFilters({ ...filters });
    const handleReset = () => {
        setFilters(emptyFilters);
        setAppliedFilters(emptyFilters);
    };

    return (
        <div className="page-wrapper">
            <Navbar />

            <div className="page-content">
                <div className="container">
                    <h1 className="section-title">Find Donors</h1>
                    <p className="section-subtitle">Search for available blood donors in your area.</p>

                    <div className={styles.layout}>
                        <aside className={styles.sidebar}>
                            <FilterPanel
                                filters={filters}
                                onChange={handleChange}
                                onApply={handleApply}
                                onReset={handleReset}
                                bloodGroups={BLOOD_GROUPS}
                            />
                        </aside>

                        <main className={styles.results}>
                            {loading ? (
                                <div className={styles.skeletonGrid}>
                                    {[1, 2, 3, 4].map((n) => (
                                        <div key={n} className={`skeleton ${styles.skeleton}`} />
                                    ))}
                                </div>
                            ) : donors.length > 0 ? (
                                <>
                                    <p className={styles.count}>{donors.length} donor(s) found</p>
                                    <div className={styles.grid}>
                                        {donors.map((donor) => (
                                            <DonorCard key={donor._id} donor={donor} />
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <EmptyState
                                    icon={<IoPeopleOutline size={48} />}
                                    title="No Donors Found"
                                    message="Try adjusting your filters or check back later for new donors."
                                />
                            )}
                        </main>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default FindDonors;
