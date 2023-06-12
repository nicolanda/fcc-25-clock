import { faCircleLeft, faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "./btn/IconButton";
import { useContext } from "react";
import { TimerContext } from "../context/TimerContext";
import { ControllerContext } from "../context/ControllerContext";

export const Session = () => {
  const { disableButton } = useContext(ControllerContext);
  const { sessionLength, incrementSessionLength, decrementSessionLength } =
    useContext(TimerContext);
  return (
    <div>
      <div id="session-label">
        <h3>Session</h3>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          padding: "0 2rem",
          fontSize: "1.4rem",
        }}
      >
        <IconButton
          id="session-decrement"
          ariaL="button-session-decrement"
          icon={faCircleLeft}
          functionality={decrementSessionLength}
          disabled={disableButton}
        />
        <span id="session-length">{sessionLength}</span>
        <IconButton
          id="session-increment"
          ariaL="button-session-increment"
          icon={faCircleRight}
          functionality={incrementSessionLength}
          disabled={disableButton}
        />
      </div>
    </div>
  );
};
