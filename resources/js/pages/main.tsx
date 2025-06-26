import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { minsr } from 'lucide-react';
import useSound from "use-sound";
import beepingSound from "/public/sounds/808524__newlocknew__uialert_glassy-tonal-alert-signal-1_em.mp3";


type State = {
  name: "Pomodoro" | "Short Break" | "Long Break",
  mins: number
}

type StatesType = {
  pomodoro: State,
  short_break: State,
  long_break: State,
}

const states: StatesType = {
  pomodoro: {
    name: "Pomodoro",
    mins: 25,
  },
  short_break: {
    name: "Short Break",
    mins: 5,
  },
  long_break: {
    name: "Long Break",
    mins: 15,
  }
}



export default function main() {
  const [state, setState] = useState<State>(states.pomodoro);
  const [minsr, setminsr] = useState<number>(state.mins * 60);

  const [mins, setmins] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);

  const [pomodoroCount, setPomodoroCount] = useState<number>(0);

  const [startBeepingSound, { stop }] = useSound(beepingSound);


  function toMinutesFormat(minsr: number): string {
    const _mins = Math.floor(minsr/60);
    const _secs = minsr % 60;
    return `${_mins >= 10 ? _mins : `0${_mins}`}:${_secs >= 10 ? _secs : `0${_secs}`}`
  }

  useEffect(() => {
    setminsr(state.mins * 60);
  }, [state]);

  useEffect(() => {
    if (!start) return;
    const interval = setInterval(() => { setminsr(prev => prev - 1)}, 1000);
    return () => clearInterval(interval);
  }, [start]);


  useEffect(() => {

    if (minsr === 5) {
      startBeepingSound();
      return; 
    }

    if (minsr === - 1) {
      stop();
      alert('session ended');
    }
  }, [minsr]); 


  return (
    <div className='w-full h-dvh text-center font-mono'>

        <div className='mx-auto w-full md:max-w-2/5 lg:max-w-2/6 bg-background px-8 space-y-4 py-8'>

          <div className='w-full border border-primary rounded p-4 text-primary'>
            Completed Pomodoros: <span className='text-lg'>0</span>
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
                { toMinutesFormat(minsr) }
              </span>
            </div>
            <Button className='w-full mt-8 rounded' onClick={() => setStart(true)}>
              Start Pomodoro
            </Button>

          </div>
        </div>
    </div>
  )
}
