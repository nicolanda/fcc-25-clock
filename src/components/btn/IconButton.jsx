import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import PropTypes from "prop-types";
export const IconButton = ({
  id,
  ariaL,
  icon,
  functionality,
  controller,
  disabled,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  let iconColor = isHovered ? "#ffffff" : "#999999";

  switch (controller) {
    case "play":
      iconColor = isHovered ? "#39FF14" : "#999999";
      break;
    case "pause":
      iconColor = isHovered ? "#FF3131" : "#999999";
      break;
    case "reset":
      iconColor = isHovered ? "#FFFF00" : "#999999";
      break;
    default:
      break;
  }

  const handleClick = () => {
    if (!disabled && typeof functionality === "function") {
      functionality();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      id={id}
      aria-label={ariaL}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        color: iconColor,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};

IconButton.propTypes = {
  id: PropTypes.string.isRequired,
  ariaL: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  controller: PropTypes.string,
  functionality: PropTypes.func,
  disabled: PropTypes.bool,
};
