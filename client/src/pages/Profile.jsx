import { useState, useEffect } from "react";
import { IoPersonOutline, IoWaterOutline, IoLocationOutline } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import API from "../services/api";
import { BLOOD_GROUPS, GENDERS } from "../utils/constants";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import Loader from "../components/Loader";
import styles from "./Profile.module.css";

const Profile = () => {
    const { user, updateUser } = useAuth();
    const { addToast } = useToast();

    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        bloodGroup: "",
        phone: "",
        age: "",
        gender: "",
        city: "",
        state: "",
        lastDonationDate: "",
        availability: true,
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await API.get("/users/profile");
                const u = data.user;
                setForm({
                    bloodGroup: u.bloodGroup || "",
                    phone: u.phone || "",
                    age: u.age || "",
                    gender: u.gender || "",
                    city: u.city || "",
                    state: u.state || "",
                    lastDonationDate: u.lastDonationDate
                        ? new Date(u.lastDonationDate).toISOString().split("T")[0]
                        : "",
                    availability: u.availability ?? true,
                });
                updateUser(u);
            } catch (err) {
                addToast("Failed to load profile", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const payload = {
                ...form,
                age: form.age ? Number(form.age) : undefined,
                lastDonationDate: form.lastDonationDate || undefined,
            };

            const { data } = await API.put("/users/profile", payload);
            updateUser(data.user);
            addToast("Profile updated successfully!", "success");
            setEditing(false);
        } catch (err) {
            addToast(err.response?.data?.message || "Update failed", "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <Loader text="Loading profile..." />;

    return (
        <div className="page-wrapper">
            <Navbar />

            <div className="page-content">
                <div className="container">
                    <h1 className="section-title">My Profile</h1>
                    <p className="section-subtitle">Manage your donor information and availability.</p>

                    <div className={styles.layout}>
                        <Card className={styles.profileCard}>
                            <div className={styles.avatar}>
                                {user?.fullName?.charAt(0).toUpperCase()}
                            </div>
                            <h2>{user?.fullName}</h2>
                            <p className={styles.email}>{user?.email}</p>

                            <div className={styles.infoList}>
                                <div className={styles.infoItem}>
                                    <IoWaterOutline />
                                    <span>Blood Group: <strong>{form.bloodGroup || "Not set"}</strong></span>
                                </div>
                                <div className={styles.infoItem}>
                                    <IoLocationOutline />
                                    <span>{form.city ? `${form.city}, ${form.state}` : "Location not set"}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <IoPersonOutline />
                                    <span>{form.gender || "Gender not set"} {form.age ? `· ${form.age} yrs` : ""}</span>
                                </div>
                            </div>

                            <span className={`badge ${form.availability ? "badge-active" : "badge-low"}`}>
                                {form.availability ? "Available to Donate" : "Not Available"}
                            </span>
                        </Card>

                        <Card className={styles.formCard}>
                            <div className={styles.formHeader}>
                                <h3>Donor Details</h3>
                                {!editing && (
                                    <Button size="sm" variant="secondary" onClick={() => setEditing(true)}>
                                        Edit Profile
                                    </Button>
                                )}
                            </div>

                            {editing ? (
                                <form onSubmit={handleSave}>
                                    <div className={styles.formGrid}>
                                        <Input label="Blood Group" name="bloodGroup" as="select" value={form.bloodGroup} onChange={handleChange} options={BLOOD_GROUPS} />
                                        <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
                                        <Input label="Age" name="age" type="number" value={form.age} onChange={handleChange} min="18" max="65" />
                                        <Input label="Gender" name="gender" as="select" value={form.gender} onChange={handleChange} options={GENDERS} />
                                        <Input label="City" name="city" value={form.city} onChange={handleChange} />
                                        <Input label="State" name="state" value={form.state} onChange={handleChange} />
                                        <Input label="Last Donation Date" name="lastDonationDate" type="date" value={form.lastDonationDate} onChange={handleChange} />
                                    </div>

                                    <label className={styles.checkbox}>
                                        <input
                                            type="checkbox"
                                            name="availability"
                                            checked={form.availability}
                                            onChange={handleChange}
                                        />
                                        Available for blood donation
                                    </label>

                                    <div className={styles.formActions}>
                                        <Button type="submit" loading={saving}>Save Changes</Button>
                                        <Button variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
                                    </div>
                                </form>
                            ) : (
                                <div className={styles.viewGrid}>
                                    <div><label>Blood Group</label><p>{form.bloodGroup || "—"}</p></div>
                                    <div><label>Phone</label><p>{form.phone || "—"}</p></div>
                                    <div><label>Age</label><p>{form.age || "—"}</p></div>
                                    <div><label>Gender</label><p>{form.gender || "—"}</p></div>
                                    <div><label>City</label><p>{form.city || "—"}</p></div>
                                    <div><label>State</label><p>{form.state || "—"}</p></div>
                                    <div><label>Last Donation</label><p>{form.lastDonationDate || "—"}</p></div>
                                    <div><label>Availability</label><p>{form.availability ? "Yes" : "No"}</p></div>
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Profile;
