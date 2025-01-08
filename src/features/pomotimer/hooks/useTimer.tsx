import useTimerStore from "@/store/useTmerStore";
import useSetting from "./useSetting";
import useTaskStore from "@/store/taskStore";
import { useEffect, useMemo, useState } from "react";
import breakSound from "@/assets/sound/sound-1.mp3";

export default function useTimer() {
  const { workduration, shortbreakduration } = useSetting();
  const { currentDuration, setCurrentDuration, workSession, setWorkSession, isRunning, setIsRunning } = useTimerStore();
  const { selectedTask } = useTaskStore();
  const [speed, setSpeed] = useState <number>(1);

  const breakAudio = useMemo(() => new Audio(breakSound), []);

  const handleReset = () => {
    setCurrentDuration(workduration);
    setIsRunning(false);
    setWorkSession(true);
    setSpeed(1);
    breakAudio.pause();
    breakAudio.currentTime = 0;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
    breakAudio.pause();
  };

  const handleFastForward = () => {
    if ( speed === 3) {
      setSpeed(1);
    } else {
      setSpeed(speed + 1);
    }
  };

  useEffect(() => {
    if (isRunning) {
      const timer = setTimeout(() => {
        setCurrentDuration(currentDuration - 1);
      }, 1000 / speed);

      return () => clearTimeout(timer);
    }
  }, [isRunning, currentDuration, setCurrentDuration, speed]);

  useEffect(() => {
    if (currentDuration === 0) {
      setWorkSession(!workSession);
      setCurrentDuration(workSession ? shortbreakduration : workduration);
      // sound
      if (workSession) {
        breakAudio.play();
      } else {
        breakAudio.pause(); 
        breakAudio.currentTime = 0;
      }
    }
  }, [currentDuration, workSession, selectedTask, setWorkSession, setCurrentDuration, shortbreakduration, workduration, breakAudio]);  

  useEffect(() => {
    const handleAudioEnd = () => {
      if (!workSession) {
        breakAudio.play();
      }
    };

    breakAudio.addEventListener('ended', handleAudioEnd);
    return () => {
      breakAudio.removeEventListener('ended', handleAudioEnd);
    };
  }, [breakAudio, workSession]);  

  return { handleReset, handleStartPause, handleFastForward, workSession, currentDuration, isRunning, speed}
}