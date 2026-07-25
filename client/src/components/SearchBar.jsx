import { IoSearch } from "react-icons/io5";
import styles from "./SearchBar.module.css";

const SearchBar = ({ value, onChange, placeholder = "Search...", onSubmit }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit();
    };

    return (
        <form className={styles.bar} onSubmit={handleSubmit}>
            <IoSearch className={styles.icon} />
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={styles.input}
            />
        </form>
    );
};

export default SearchBar;
