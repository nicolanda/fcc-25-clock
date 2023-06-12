import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import { ControllerContext } from "./ControllerContext";

const initialState = {
  breakLength: 5,
  runningBreak: false,
};

export const BreakContext = createContext({
  breakLength: initialState.breakLength,
  setBreakLength: () => {},
  setRunningBreak: () => {},
  incrementBreak: () => {},
  decrementBreak: () => {},
  playStopTimerBreak: () => {},
  autoPlayTimerBreak: () => {},
});

export const BreakProvider = ({ children }) => {
  const [breakLength, setBreakLength] = useState(initialState.breakLength);
  const [runningBreak, setRunningBreak] = useState(initialState.runningBreak);

  const incrementBreak = () => {
    setBreakLength((prevBreakTime) =>
      prevBreakTime < 60 ? prevBreakTime + 1 : 60
    );
  };

  const decrementBreak = () => {
    setBreakLength((prevBreakTime) =>
      prevBreakTime > 1 ? prevBreakTime - 1 : 1
    );
  };

  const { disableButton, setDisableButton } = useContext(ControllerContext);

  const playStopTimerBreak = () => {
    setRunningBreak(!runningBreak);
    setDisableButton(!disableButton);
  };

  const autoPlayTimerBreak = () => {
    setRunningBreak(true);
    setDisableButton(true);
  };

  return (
    <BreakContext.Provider
      value={{
        breakLength,
        setBreakLength,
        runningBreak,
        setRunningBreak,
        incrementBreak,
        decrementBreak,
        playStopTimerBreak,
        autoPlayTimerBreak,
      }}
    >
      {children}
    </BreakContext.Provider>
  );
};

BreakProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
