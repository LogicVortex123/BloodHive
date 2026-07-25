import { IoLocationOutline, IoCallOutline, IoTimeOutline } from "react-icons/io5";
import Card from "./Card";
import Button from "./Button";
import styles from "./RequestCard.module.css";

const urgencyClass = {
    Critical: "badge-critical",
    High: "badge-high",
    Medium: "badge-medium",
    Low: "badge-low",
};

const RequestCard = ({ request, isOwner, onStatusChange, onDelete }) => {
    const date = new Date(request.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
        <Card className={styles.card}>
            <div className={styles.top}>
                <div>
                    <h4>{request.patientName}</h4>
                    <span className={styles.blood}>{request.bloodGroup}</span>
                </div>
                <div className={styles.badges}>
                    <span className={`badge ${urgencyClass[request.urgency] || "badge-high"}`}>
                        {request.urgency}
                    </span>
                    <span className={`badge ${request.status === "Active" ? "badge-active" : "badge-completed"}`}>
                        {request.status}
                    </span>
                </div>
            </div>

            <div className={styles.info}>
                <p><strong>Hospital:</strong> {request.hospitalName}</p>
                <p><strong>Units:</strong> {request.unitsRequired}</p>
                <div className={styles.row}>
                    <IoLocationOutline /> {request.city}
                </div>
                <div className={styles.row}>
                    <IoCallOutline /> {request.contactNumber}
                </div>
                <div className={styles.row}>
                    <IoTimeOutline /> {date}
                </div>
                {request.message && <p className={styles.message}>{request.message}</p>}
            </div>

            {isOwner && (
                <div className={styles.actions}>
                    {request.status === "Active" && (
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => onStatusChange(request._id, "Completed")}
                        >
                            Mark Completed
                        </Button>
                    )}
                    <Button
                        size="sm"
                        variant="danger"
                        onClick={() => onDelete(request._id)}
                    >
                        Delete
                    </Button>
                </div>
            )}
        </Card>
    );
};

export default RequestCard;
