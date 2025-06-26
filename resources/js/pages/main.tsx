import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button';
import { Timer } from 'lucide-react';
import useSound from "use-sound";
import beepingSound from "/public/sounds/808524__newlocknew__uialert_glassy-tonal-alert-signal-1_em.mp3";
import flashSound from "/public/sounds/807391__vrymaa__magic-finger-snap.wav";
import Modal from "@/components/modal";


type State = {
  name: "Pomodoro" | "Short Break" | "Long Break",
  time: number
}

type StatesType = {
  pomodoro: State,
  short_break: State,
  long_break: State,
}

const states: StatesType = {
  pomodoro: {
    name: "Focus Session",
    time: 0.3,
  },
  short_break: {
    name: "Short Break",
    time: 0.2,
  },
  long_break: {
    name: "Long Break",
    time: 0.1,
  }
}


export default function main() {
  const [state, setState] = useState<State>(states.pomodoro);
  const [timer, setTimer] = useState<number>(state.time * 60);
  const [time, setTime] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);
  const [pomodoroCount, setPomodoroCount] = useState<number>(0);
  const [notice, setNotice] = useState<boolean>(false);
  const firstMount = useRef<boolean>(true);


  const [startBeepingSound, { stop: stopBeepingSound, pause: pauseBeepingSound }] = useSound(beepingSound, {
    volume: 1,
    loop: true
  });

  const [startFlashSound, { stop: stopFlashSound, pause: pauseFlashSound }] = useSound(flashSound, {
    volume: 2,
  });


  function toMinutesFormat(timer: number): string {
    const _mins = Math.floor(timer/60);
    const _secs = Math.floor(timer % 60);
    return `${_mins >= 10 ? _mins : `0${_mins}`}:${_secs >= 10 ? _secs : `0${_secs}`}`
  }

  useEffect(() => {
    firstMount.current = false;
  }, [])

  useEffect(() => {
    if (firstMount.current) return;
    setTimer(state.time * 60);
  }, [state]);

  useEffect(() => {
    if (firstMount.current || !start) return;
    const interval = setInterval(() => { setTimer(prev => Math.floor(prev - 1))}, 1000);
    return () => clearInterval(interval);
  }, [start]);

  useEffect(() => {
    if (firstMount.current) return;

    if (timer === 5) {
      startBeepingSound();
      return; 
    }

    if (timer === 0) {
      setStart(false);
      
      pauseBeepingSound();
      startFlashSound();

      setPomodoroCount(prev => state === states.pomodoro ? prev + 1 : prev);
      setNotice(true);
    }
  }, [timer]); 

  useEffect(() => {
    if (firstMount.current || !notice) return;

    let timeout = setTimeout(() => {
      setNotice(false);

      if (state === states.pomodoro) {
        setState(pomodoroCount < 4 ? states.short_break : states.long_break);
      } else {
        setState(states.pomodoro);
      }

    }, 2000);

    return () => clearTimeout(timeout);
  }, [notice]);

  useEffect(() => {
    if (firstMount.current || notice) return;
    const timeout = setTimeout(() => {
      setStart(true);
    }, 3000)
  }, [notice]);



  function handleClick() {
    if (start) pauseBeepingSound();
    if (timer <= 5 && !start) startBeepingSound();
    setStart(prev => !prev);
  }


  return (
    <>
      <Modal isOpen={notice} handleClose={() => setNotice(false)}>
        <div className='bg-black border px-8 py-4 rounded flex items-center justify-center'>
          <p>{state.name} Ended.</p>
        </div>
      </Modal>

      <div className='w-full h-dvh text-center'>

        <div className='w-full bg-red-400 flex flex-wrap'>
          
          <div className='w-full md:w-2/5 lg:w-2/6 bg-background px-8 space-y-4 pt-8 pb-12'>
            <div className='w-full border border-primary rounded p-4 text-primary'>
              Completed Pomodoros: <span className='text-lg'>{pomodoroCount}</span>
            </div>
    
            <div className='w-full border border-primary rounded p-4 text-primary'>
              Phase: <span className='text-lg'>{state.name}</span>
            </div>
    
            <div className='w-full border-primary border rounded p-4 text-primary'>
              <h1 className='text-2xl'>PomoLog</h1>
              <p className='tracking-wide text-sm text-gray-400'>
                Pomodoro with a twist of log.
              </p>
              <div className='mt-8 rounded w-min mx-auto'>
                <span className='text-5xl'>
                  { toMinutesFormat(timer) }
                </span>
              </div>
              <Button className='w-full mt-8 rounded cursor-pointer' onClick={handleClick}>
                {start ? "Pause" : "Continue"} Pomodoro
              </Button>
            </div>
          </div>
          
          <div className='flex-1 min-w-1/2 bg-red-400'>

          </div>

        </div>
        
      </div>
    </>
  )
}
