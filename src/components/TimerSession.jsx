import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "./btn/IconButton";
import { useContext, useState } from "react";
import { TimerContext } from "../context/TimerContext";
import { formaterTimer } from "../services/formaterTimer";
import { ResetButton } from "./btn/ResetButton";
import PropTypes from "prop-types";

export const TimerSession = ({
  timerLeft,
  setTimerLeftSession,
  setTimerLeftBreak,
}) => {
  const { playStopTimerSession } = useContext(TimerContext);
  const [swapButton, setSwapButton] = useState(true);

  const handleSwapButtonClick = () => {
    setSwapButton((prevSwapButton) => !prevSwapButton);
  };
  return (
    <div
      style={{
        width: "50%",
        paddingTop: "1.17rem",
      }}
    >
      <div id="timer-label">
        <h3>Session</h3>
      </div>
      <div id="time-left">
        <h3
          style={{
            fontSize: "1.5rem",
          }}
        >
          {formaterTimer(timerLeft)}
        </h3>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          fontSize: "1.4rem",
        }}
      >
        <div id="start_stop" onClick={handleSwapButtonClick}>
          {swapButton ? (
            <IconButton
              id="play"
              ariaL="play_button"
              icon={faPlay}
              controller="play"
              functionality={playStopTimerSession}
            />
          ) : (
            <IconButton
              id="pause"
              ariaL="pause_button"
              icon={faPause}
              controller="pause"
              functionality={playStopTimerSession}
            />
          )}
        </div>
        <ResetButton
          setTimerLeftSession={setTimerLeftSession}
          setTimerLeftBreak={setTimerLeftBreak}
          setSwapButton={setSwapButton}
        />
      </div>
    </div>
  );
};

TimerSession.propTypes = {
  timerLeft: PropTypes.number.isRequired,
  setTimerLeftSession: PropTypes.func.isRequired,
  setTimerLeftBreak: PropTypes.func.isRequired,
};
