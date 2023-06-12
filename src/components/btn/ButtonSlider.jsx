import styles from "./ButtonSlider.module.css";
import PropTypes from "prop-types";

export const ButtonSlider = ({ isChecked, setIsChecked, disabled }) => {
  const handleToggle = () => {
    if (disabled) return;
    setIsChecked(!isChecked);
  };

  return (
    <label className={`${styles.container} ${disabled ? styles.disabled : ""}`}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        className={styles.checkbox}
        disabled={disabled}
        style={{
          pointerEvents: disabled ? "none" : "auto",
        }}
      />
      <span className={styles.slider}>
        <span
          className={`${styles.eye} ${isChecked ? styles.open : styles.closed}`}
        >
          {isChecked && <span className={styles.pupil}></span>}
        </span>
      </span>
    </label>
  );
};

ButtonSlider.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  setIsChecked: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
