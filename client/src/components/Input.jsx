import styles from "./Input.module.css";

const Input = ({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    error,
    required = false,
    as = "input",
    options = [],
    ...rest
}) => {
    const Field = as === "select" ? "select" : as === "textarea" ? "textarea" : "input";

    return (
        <div className={styles.group}>
            {label && (
                <label htmlFor={name} className={styles.label}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
            )}

            {as === "select" ? (
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`${styles.field} ${error ? styles.error : ""}`}
                    {...rest}
                >
                    <option value="">Select...</option>
                    {options.map((opt) => (
                        <option key={opt.value || opt} value={opt.value || opt}>
                            {opt.label || opt}
                        </option>
                    ))}
                </select>
            ) : (
                <Field
                    id={name}
                    name={name}
                    type={as === "input" ? type : undefined}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`${styles.field} ${error ? styles.error : ""}`}
                    {...rest}
                />
            )}

            {error && <span className={styles.errorMsg}>{error}</span>}
        </div>
    );
};

export default Input;
