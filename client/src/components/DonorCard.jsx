import { IoLocationOutline, IoCallOutline, IoWaterOutline } from "react-icons/io5";
import Card from "./Card";
import styles from "./DonorCard.module.css";

const DonorCard = ({ donor }) => {
    return (
        <Card hover className={styles.card}>
            <div className={styles.header}>
                <div className={styles.avatar}>
                    {donor.fullName?.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h4>{donor.fullName}</h4>
                    <span className={`badge ${donor.availability ? "badge-active" : "badge-low"}`}>
                        {donor.availability ? "Available" : "Unavailable"}
                    </span>
                </div>
            </div>

            <div className={styles.details}>
                <div className={styles.row}>
                    <IoWaterOutline />
                    <span>Blood Group: <strong>{donor.bloodGroup || "N/A"}</strong></span>
                </div>
                <div className={styles.row}>
                    <IoLocationOutline />
                    <span>{donor.city}{donor.state ? `, ${donor.state}` : ""}</span>
                </div>
                {donor.phone && (
                    <div className={styles.row}>
                        <IoCallOutline />
                        <span>{donor.phone}</span>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default DonorCard;
