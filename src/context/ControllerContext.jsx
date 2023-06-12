import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const ControllerContext = createContext({
  disableButton: false,
  displayInfo: true,
  setDisableButton: () => {},
  setDisplayInfo: () => {},
  resetClock: () => {},
  infoDisplay: () => {},
});

export const ControllerProvider = ({ children }) => {
  const [displayInfo, setDisplayInfo] = useState(true);
  const [disableButton, setDisableButton] = useState(false);

  const infoDisplay = () => {
    setDisplayInfo(!displayInfo);
  };

  return (
    <ControllerContext.Provider
      value={{
        disableButton,
        setDisableButton,
        displayInfo,
        setDisplayInfo,
        infoDisplay,
      }}
    >
      {children}
    </ControllerContext.Provider>
  );
};

ControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
