import { faCircleLeft, faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { IconButton } from "./btn/IconButton";
import { BreakContext } from "../context/BreakContext";
import { ControllerContext } from "../context/ControllerContext";

export const Break = () => {
  const { disableButton } = useContext(ControllerContext);
  const { breakLength, incrementBreak, decrementBreak } =
    useContext(BreakContext);

  return (
    <div>
      <div id="break-label">
        <h3>Break</h3>
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
          id="break-decrement"
          icon={faCircleLeft}
          ariaL="button-break-decrement"
          functionality={decrementBreak}
          disabled={disableButton}
        />
        <span id="break-length">{breakLength}</span>
        <IconButton
          id="break-increment"
          icon={faCircleRight}
          ariaL="button-break-increment"
          functionality={incrementBreak}
          disabled={disableButton}
        />
      </div>
    </div>
  );
};
