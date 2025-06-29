import { usePomodoroContext } from '@/contexts/PomodoroContext';
import { useSoundContext } from '@/contexts/SoundContext';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import Modal from "@/components/modal";
import { Textarea } from '@/components/ui/textarea';
import { toMinutesFormat } from '@/helper';
import { type BreadcrumbItem, StudySession, Subject } from '@/types';
import { useEffect } from 'react';
import states from '@/constants/states';
import { sleep } from '@/helper';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from 'date-fns';
import SubjectForm from '@/components/subject-form';



const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Pomodoro",
    href: "/pomodoro"
  }
]

type UsePageProps = {
  studySession: StudySession,
  subjects: Subject[],
  completedPomodoro: number 
}

export default function pomodoro() {
  const { studySession, subjects, completedPomodoro } = usePage<UsePageProps>().props;
  const studySessionForm = useForm();
  const pomodoroForm = useForm({ 'subject_id': 0 });
  
  const { 
    state, setState,
    timer, setTimer,
    start, setStart,
    notice, setNotice,
    pomodoroCount, setPomodoroCount,
    started
  } = usePomodoroContext();
  
  const {
    startBeepingSound, 
    pauseBeepingSound,
    startFlashSound
  } = useSoundContext();


  function toggleTimer() {
    if (start) pauseBeepingSound();
    if (timer <= 5 && !start) startBeepingSound();
    setStart((prev: boolean) => !prev);
  }
  

  useEffect(() => {
    if (!started.current) return;

    if (!studySession) {
      studySessionForm.post('/study-session');
      return;
    }
    
    if (format(new Date(), "yy-LL-d") !== format(studySession.created_at, "yy-LL-d")) {
      studySessionForm.post('/study-session')
    }
  }, [started.current]);

  useEffect(() => {
    if (!start) return;
    if (started) started.current = true;

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
      setNotice(true);
      
      pauseBeepingSound();
      startFlashSound();
    }
  }, [timer]); 
  
  useEffect(() => {
    if (!notice) return;

    sleep(5000).then(() => {

      if (state === states.pomodoro) {
        setState(pomodoroCount < 3 ? states.short_break : states.long_break);
        setTimer(pomodoroCount < 3 ? states.short_break.time : states.long_break.time);
        setPomodoroCount(prev => prev < 3 ? prev + 1 : 0);
        pomodoroForm.post('/pomodoro');
      } else {
        setState(states.pomodoro);
        setTimer(states.pomodoro.time);
      }

      setNotice(false);
      setStart(true);
    });
  }, [notice])

  
  return (
    <>
      <Modal isOpen={notice} handleClose={() => setNotice(false)}>
        <div className='bg-black border px-8 py-4 rounded-xl'>
          <p>{state.name} Ended.</p>
          {state == states.pomodoro && <p>You can log what you learn...</p>}
        </div>
      </Modal>

      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Pomodoro" />

        <div className='w-full text-center'>
          <div className='w-full flex flex-wrap justify-center items-start p-8 gap-x-8 gap-y-12'>
            <div className='bg-background w-full h-min md:w-2/5 lg:w-2/6 space-y-4 p-2 border rounded-xl'>
              <div className='w-full border rounded-xl p-4 text-primary'>
                Completed Pomodoros: <span className='text-lg'>{completedPomodoro}</span>
              </div>

              <div className='w-full border rounded-xl p-4 text-primary'>
                Completed Pomodoros: <span className='text-lg'>{pomodoroCount}</span>
              </div>
      
              <div className='w-full border rounded-xl p-4 text-primary'>
                Phase: <span className='text-lg'>{state.name}</span>
              </div>
      
              <div className='w-full border text-primary p-2 rounded-xl'>
                <h1 className='text-2xl'>PomoLog</h1>
                <p className='tracking-wide text-sm text-gray-400'>
                  Pomodoro with a twist of log.
                </p>
                <div className='mt-8 rounded-xl w-min mx-auto'>
                  <span className='text-5xl'>
                    { toMinutesFormat(timer) }
                  </span>
                </div>
                 <Button className='w-full mt-8 rounded-xl cursor-pointer' onClick={toggleTimer}>  {/* BUTTON*/}
                  {!started.current ? "Start" : start ? "Pause" : "Continue"} Pomodoro
                </Button>
              </div>
            </div>
            
            <div className='bg-background flex-1 min-w-1/2 p-2 space-y-4 border rounded-xl'>
              <Select 
                onValueChange={(value) => pomodoroForm.setData('subject_id', Number(value)) } 
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  {
                    subjects.map(subject => (
                      <SelectItem key={subject.id} value={String(subject.id)} >
                        {subject.name}
                      </SelectItem>
                    ))
                  }

                  <SubjectForm />
                  
                </SelectContent>
              </Select>
            
              <div className='w-full h-24 flex gap-4 items-start'>
                <Textarea 
                  className='border border-primary flex-1 resize-none h-full scrollbar-hidden' 
                  placeholder='type your logs here.'
                  disabled={state === states.pomodoro}
                />
                <Button className='aspect-square h-16'>
                  Log
                </Button>
              </div>

              <div className='w-full min-h-40 border rounded-xl'>
                <p className='mt-2 border-b'>Logs</p>
                <div className='p-4 space-y-2'>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores tenetur fuga reiciendis ullam tempore cupiditate fugiat sapiente. Amet fuga, ab explicabo atque, natus accusantium quaerat, ullam molestiae iusto illo voluptas!</p>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus eos fugiat reprehenderit! Quos veritatis repellendus suscipit iste autem dolores nemo voluptatibus fugit sint, aperiam quas ad iure dolorum nulla exercitationem!</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </AppLayout>
    </>
  )
}
