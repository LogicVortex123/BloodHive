import { useState, useEffect } from "react";
import { IoAddOutline, IoAlertCircleOutline } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import API from "../services/api";
import { BLOOD_GROUPS, URGENCY_LEVELS } from "../utils/constants";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Input from "../components/Input";
import Modal from "../components/Modal";
import RequestCard from "../components/RequestCard";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";
import styles from "./Requests.module.css";

const emptyForm = {
    patientName: "",
    bloodGroup: "",
    unitsRequired: "",
    hospitalName: "",
    city: "",
    contactNumber: "",
    urgency: "High",
    message: "",
};

const Requests = () => {
    const { user } = useAuth();
    const { addToast } = useToast();

    const [tab, setTab] = useState("all");
    const [allRequests, setAllRequests] = useState([]);
    const [myRequests, setMyRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [submitting, setSubmitting] = useState(false);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const [allRes, myRes] = await Promise.all([
                API.get("/requests"),
                API.get("/requests/my"),
            ]);
            setAllRequests(allRes.data.requests || []);
            setMyRequests(myRes.data.requests || []);
        } catch (err) {
            addToast("Failed to load requests", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await API.post("/requests", {
                ...form,
                unitsRequired: Number(form.unitsRequired),
            });
            addToast("Request created successfully!", "success");
            setModalOpen(false);
            setForm(emptyForm);
            fetchRequests();
        } catch (err) {
            addToast(err.response?.data?.message || "Failed to create request", "error");
        } finally {
            setSubmitting(false);
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            await API.put(`/requests/${id}`, { status });
            addToast("Request updated!", "success");
            fetchRequests();
        } catch (err) {
            addToast(err.response?.data?.message || "Update failed", "error");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this request?")) return;

        try {
            await API.delete(`/requests/${id}`);
            addToast("Request deleted", "success");
            fetchRequests();
        } catch (err) {
            addToast(err.response?.data?.message || "Delete failed", "error");
        }
    };

    const requests = tab === "all" ? allRequests : myRequests;

    return (
        <div className="page-wrapper">
            <Navbar />

            <div className="page-content">
                <div className="container">
                    <div className={styles.header}>
                        <div>
                            <h1 className="section-title">Blood Requests</h1>
                            <p className="section-subtitle">View and manage emergency blood requests.</p>
                        </div>
                        <Button onClick={() => setModalOpen(true)}>
                            <IoAddOutline /> Create Request
                        </Button>
                    </div>

                    <div className={styles.tabs}>
                        <button
                            className={tab === "all" ? styles.activeTab : ""}
                            onClick={() => setTab("all")}
                        >
                            All Requests ({allRequests.length})
                        </button>
                        <button
                            className={tab === "my" ? styles.activeTab : ""}
                            onClick={() => setTab("my")}
                        >
                            My Requests ({myRequests.length})
                        </button>
                    </div>

                    {loading ? (
                        <Loader text="Loading requests..." />
                    ) : requests.length > 0 ? (
                        <div className={styles.grid}>
                            {requests.map((req) => (
                                <RequestCard
                                    key={req._id}
                                    request={req}
                                    isOwner={req.createdBy?._id === user?._id || req.createdBy === user?._id}
                                    onStatusChange={handleStatusChange}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            icon={<IoAlertCircleOutline size={48} />}
                            title="No Requests Found"
                            message={tab === "my" ? "You haven't created any requests yet." : "No active requests at the moment."}
                            action={
                                tab === "my" && (
                                    <Button onClick={() => setModalOpen(true)}>
                                        Create Your First Request
                                    </Button>
                                )
                            }
                        />
                    )}
                </div>
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create Blood Request">
                <form onSubmit={handleCreate}>
                    <Input label="Patient Name" name="patientName" value={form.patientName} onChange={handleChange} required />
                    <Input label="Blood Group" name="bloodGroup" as="select" value={form.bloodGroup} onChange={handleChange} options={BLOOD_GROUPS} required />
                    <Input label="Units Required" name="unitsRequired" type="number" value={form.unitsRequired} onChange={handleChange} required min="1" />
                    <Input label="Hospital Name" name="hospitalName" value={form.hospitalName} onChange={handleChange} required />
                    <Input label="City" name="city" value={form.city} onChange={handleChange} required />
                    <Input label="Contact Number" name="contactNumber" value={form.contactNumber} onChange={handleChange} required />
                    <Input label="Urgency" name="urgency" as="select" value={form.urgency} onChange={handleChange} options={URGENCY_LEVELS} />
                    <Input label="Message (optional)" name="message" as="textarea" value={form.message} onChange={handleChange} placeholder="Additional details..." />
                    <Button type="submit" fullWidth loading={submitting}>Submit Request</Button>
                </form>
            </Modal>

            <Footer />
        </div>
    );
};

export default Requests;
