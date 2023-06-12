import PropTypes from "prop-types";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "./IconButton";
import { useContext } from "react";
import { BreakContext } from "../../context/BreakContext";
import { ControllerContext } from "../../context/ControllerContext";
import { TimerContext } from "../../context/TimerContext";

export const ResetButton = ({
  setTimerLeftSession,
  setTimerLeftBreak,
  setSwapButton,
}) => {
  const { setDisplayInfo, setDisableButton } = useContext(ControllerContext);
  const { setSessionLength, setRunningSession } = useContext(TimerContext);
  const { setBreakLength, setRunningBreak } = useContext(BreakContext);

  const resetClock = () => {
    setSessionLength(25);
    setBreakLength(5);
    setRunningSession(false);
    setRunningBreak(false);
    setDisableButton(false);
    setDisplayInfo(true);
    setTimerLeftSession(25 * 60);
    setTimerLeftBreak(5 * 60);
    setSwapButton(true);
  };

  return (
    <IconButton
      id="reset"
      ariaL="reset_button"
      icon={faRotate}
      functionality={resetClock}
      controller="reset"
      disabled={false}
    />
  );
};

ResetButton.propTypes = {
  setTimerLeftSession: PropTypes.func,
  setTimerLeftBreak: PropTypes.func,
  setSwapButton: PropTypes.func,
};
