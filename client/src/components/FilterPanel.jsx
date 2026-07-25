import Input from "./Input";
import Button from "./Button";
import styles from "./FilterPanel.module.css";

const FilterPanel = ({ filters, onChange, onApply, onReset, bloodGroups }) => {
    return (
        <div className={styles.panel}>
            <h4 className={styles.title}>Filters</h4>

            <Input
                label="Blood Group"
                name="bloodGroup"
                as="select"
                value={filters.bloodGroup}
                onChange={onChange}
                options={bloodGroups}
            />

            <Input
                label="City"
                name="city"
                value={filters.city}
                onChange={onChange}
                placeholder="Enter city name"
            />

            <Input
                label="Availability"
                name="availability"
                as="select"
                value={filters.availability}
                onChange={onChange}
                options={[
                    { value: "true", label: "Available" },
                    { value: "false", label: "Not Available" },
                ]}
            />

            <div className={styles.actions}>
                <Button variant="primary" onClick={onApply}>Apply</Button>
                <Button variant="ghost" onClick={onReset}>Reset</Button>
            </div>
        </div>
    );
};

export default FilterPanel;
