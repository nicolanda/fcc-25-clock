import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import { ControllerContext } from "./ControllerContext";

const initialState = {
  sessionLength: 25,
  runningSession: false,
};

export const TimerContext = createContext({
  sessionLength: initialState.sessionLength,
  setSessionLength: () => {},
  setRunningSession: () => {},
  incrementSessionLength: () => {},
  decrementSessionLength: () => {},
  playStopTimerSession: () => {},
  autoPlayTimerSession: () => {},
});

export const TimerProvider = ({ children }) => {
  // ajust session length
  const [sessionLength, setSessionLength] = useState(
    initialState.sessionLength
  );
  // play or stop session
  const [runningSession, setRunningSession] = useState(
    initialState.runningSession
  );

  // disabled generals buttons
  const { disableButton, setDisableButton } = useContext(ControllerContext);

  const incrementSessionLength = () => {
    setSessionLength((prevSessionLength) => {
      if (prevSessionLength < 60) {
        return prevSessionLength + 1;
      } else {
        return 60;
      }
    });
  };

  const decrementSessionLength = () => {
    setSessionLength((prevSessionLength) => {
      if (prevSessionLength > 1) {
        return prevSessionLength - 1;
      } else {
        return 1;
      }
    });
  };

  const playStopTimerSession = () => {
    setRunningSession(!runningSession);
    setDisableButton(!disableButton);
  };

  const autoPlayTimerSession = () => {
    setRunningSession(true);
    setDisableButton(true);
  };

  return (
    <TimerContext.Provider
      value={{
        sessionLength,
        setSessionLength,
        runningSession,
        setRunningSession,
        incrementSessionLength,
        decrementSessionLength,
        playStopTimerSession,
        autoPlayTimerSession,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

TimerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
