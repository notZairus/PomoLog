import { usePomodoroContext } from '@/contexts/PomodoroContext';

import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import Modal from "@/components/modal";
import { Textarea } from '@/components/ui/textarea';
import { toMinutesFormat } from '@/helper';
import { type BreadcrumbItem } from '@/types';
import { useEffect } from 'react';
import { useSoundContext } from '@/contexts/SoundContext';
import states from '@/constants/states';


const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Pomodoro",
    href: "/pomodoro"
  }
]

export default function pomodoro() {
  const { 
    state,
    timer,
    setTimer,
    start,
    setStart,
    pomodoroCount,
    setPomodoroCount,
    notice, 
    setNotice,
  } = usePomodoroContext();

  const {
    startBeepingSound, pauseBeepingSound, stopBeepingSound,
    startFlashSound, pauseFlashSound, stopFlashSound
  } = useSoundContext();



  function pausePlayTimer() {
    if (start) pauseBeepingSound();
    if (timer <= 5 && !start) startBeepingSound();
    setStart((prev: boolean) => !prev);
  }



  useEffect(() => {
    setTimer(state.time * 60);
  }, [state]);

  useEffect(() => {
    if (!start) return;
    const interval = setInterval(() => { setTimer(prev => Math.floor(prev - 1))}, 1000);
    return () => clearInterval(interval);
  }, [start]);

  useEffect(() => {
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

  
  return (
    <>
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Pomodoro" />
        <Modal isOpen={notice} handleClose={() => setNotice(false)}>
          <div className='bg-black border px-8 py-4 rounded flex items-center justify-center'>
            <p>{state.name} Ended.</p>
          </div>
        </Modal>

        <div className='w-full text-center'>

          <div className='w-full flex flex-wrap justify-center items-start p-8 gap-x-8 gap-y-12'>
            
            <div className='bg-background w-full h-min md:w-2/5 lg:w-2/6 space-y-4 p-2 border rounded'>
              <div className='w-full border rounded p-4 text-primary'>
                Completed Pomodoros: <span className='text-lg'>{pomodoroCount}</span>
              </div>
      
              <div className='w-full border rounded p-4 text-primary'>
                Phase: <span className='text-lg'>{state.name}</span>
              </div>
      
              <div className='w-full border text-primary p-2 rounded'>
                <h1 className='text-2xl'>PomoLog</h1>
                <p className='tracking-wide text-sm text-gray-400'>
                  Pomodoro with a twist of log.
                </p>
                <div className='mt-8 rounded w-min mx-auto'>
                  <span className='text-5xl'>
                    { toMinutesFormat(timer) }
                  </span>
                </div>
                <Button className='w-full mt-8 rounded cursor-pointer' onClick={pausePlayTimer}>
                  {start ? "Pause" : "Continue"} Pomodoro
                </Button>
              </div>
            </div>
            
            <div className='bg-background flex-1 min-w-1/2 p-2 space-y-4 border rounded'>
              <div className='w-full h-24 flex gap-4 items-start'>
                <Textarea 
                  className='border border-primary flex-1 resize-none h-full scrollbar-hidden' 
                  placeholder='type your logs here.'
                />
                <Button className='aspect-square h-16'>
                  Log
                </Button>
              </div>

              <div className='w-full min-h-40 border rounded'>
                <p className='mt-2 border-b'>Logs</p>
                <div>
                    // logs container
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  )
}
