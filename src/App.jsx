import "./App.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Break } from "./components/Break";
import { Session } from "./components/Session";
import { TimerSession } from "./components/TimerSession";
import { useContext, useEffect, useRef, useState } from "react";
import { ButtonSlider } from "./components/btn/ButtonSlider";
import { TimerBreak } from "./components/TimerBreak";
import { ControllerContext } from "./context/ControllerContext";
import { FooterComponent } from "./components/FooterComponent";
import { TimerContext } from "./context/TimerContext";
import { BreakContext } from "./context/BreakContext";

function App() {
  // controller
  const { disableButton, displayInfo, setDisplayInfo } =
    useContext(ControllerContext);

  // sesion
  const {
    sessionLength,
    runningSession,
    setRunningSession,
    autoPlayTimerSession,
  } = useContext(TimerContext);
  const [timerLeftSession, setTimerLeftSession] = useState(sessionLength * 60);

  // break
  const { breakLength, runningBreak, setRunningBreak, autoPlayTimerBreak } =
    useContext(BreakContext);
  const [timerLeftBreak, setTimerLeftBreak] = useState(breakLength * 60);

  const audioRef = useRef(null);

  useEffect(() => {
    setDisplayInfo((prevDisplayInfo) => {
      if (prevDisplayInfo !== displayInfo) {
        return displayInfo;
      }
      return prevDisplayInfo;
    });
  }, [displayInfo, setDisplayInfo]);

  useEffect(() => {
    setTimerLeftSession(sessionLength * 60);
  }, [sessionLength]);

  useEffect(() => {
    let timerInterval = null;
    if (runningSession) {
      timerInterval = setInterval(() => {
        setTimerLeftSession((prevTimerLeftSession) => {
          if (prevTimerLeftSession > 0) {
            return prevTimerLeftSession - 1;
          } else {
            clearInterval(timerInterval);
            setDisplayInfo(false);
            setTimerLeftSession(sessionLength * 60);
            if (autoPlayTimerBreak) {
              autoPlayTimerBreak();
            }
            return 0;
          }
        });
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [
    runningSession,
    setDisplayInfo,
    setRunningBreak,
    sessionLength,
    autoPlayTimerBreak,
  ]);

  useEffect(() => {
    setTimerLeftBreak(breakLength * 60);
  }, [breakLength]);

  useEffect(() => {
    let intervalID = null;
    if (runningBreak) {
      intervalID = setInterval(() => {
        setTimerLeftBreak((prevTimerLeftBreak) => {
          if (prevTimerLeftBreak > 0) {
            return prevTimerLeftBreak - 1;
          } else {
            clearInterval(intervalID);
            setDisplayInfo(true);
            setTimerLeftBreak(breakLength * 60);
            if (autoPlayTimerSession) {
              autoPlayTimerSession();
            }
            return 0;
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalID);
    }

    return () => clearInterval(intervalID);
  }, [
    runningBreak,
    setDisplayInfo,
    setRunningSession,
    breakLength,
    autoPlayTimerSession,
  ]);

  // audio

  useEffect(() => {
    if (timerLeftSession === 0 && !runningBreak) {
      audioRef.current.play();
      setTimeout(() => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }, 2000);
    }
  }, [timerLeftSession, runningBreak]);

  useEffect(() => {
    if (timerLeftBreak === 0 && !runningSession) {
      audioRef.current.play();
      setTimeout(() => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }, 2000);
    }
  }, [timerLeftBreak, runningSession]);

  return (
    <div>
      <div>
        <h2> 25 + 5 clock</h2>
        <div
          style={{
            boder: "1px solid #ccc",
          }}
        >
          <ButtonSlider
            isChecked={displayInfo}
            setIsChecked={setDisplayInfo}
            disabled={disableButton}
          />
        </div>
      </div>
      <div className="dataContainer">
        {displayInfo ? (
          <TimerSession
            timerLeft={timerLeftSession}
            setTimerLeftSession={setTimerLeftSession}
            setTimerLeftBreak={setTimerLeftBreak}
          />
        ) : (
          <TimerBreak
            timerLeft={timerLeftBreak}
            setTimerLeftSession={setTimerLeftSession}
            setTimerLeftBreak={setTimerLeftBreak}
          />
        )}
        <div className="settingsContainer">
          <Break />
          <Session />
        </div>
      </div>
      <FooterComponent />
      <audio
        id="beep"
        ref={audioRef}
        src="/sound/build_testable-projects-fcc_audio_BeepSound.wav"
      />
    </div>
  );
}

export default App;
