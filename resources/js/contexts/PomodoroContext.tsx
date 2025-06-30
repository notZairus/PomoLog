import React, { createContext, useContext, useState, useRef, useEffect } from 'react'
import { type State, Subject } from "@/types";
import { sleep } from '@/helper';
import states from '@/constants/states';
import { useSoundContext } from './SoundContext';
import { useForm, usePage } from '@inertiajs/react';


interface PomodoroContextType {
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    timer: number, 
    setTimer: React.Dispatch<React.SetStateAction<number>>,
    start: boolean, 
    setStart: React.Dispatch<React.SetStateAction<boolean>>,
    pomodoroCount: number,
    setPomodoroCount: React.Dispatch<React.SetStateAction<number>>,
    notice: boolean, 
    setNotice: React.Dispatch<React.SetStateAction<boolean>>,
    started: React.RefObject<boolean>,
    handleSubjectChange: (subject: Subject) => void,
    subject: Subject | null
}


export const PomodoroContext = createContext<PomodoroContextType | null>(null);


export function PomodoroContextProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<State>(states.pomodoro);
    const [timer, setTimer] = useState<number>(state.time);
    const [start, setStart] = useState<boolean>(false);
    const [pomodoroCount, setPomodoroCount] = useState<number>(0);
    const [notice, setNotice] = useState<boolean>(false);
    const started = useRef<boolean>(false);
    const pomodoroForm = useForm({ 
        'subject_id': 0 
    });
    const { startBeepingSound, pauseBeepingSound, startFlashSound } = useSoundContext();
    const [subject, setSubject] = useState<Subject | null>(null);

    // timer
    useEffect(() => {
        if (!start) return;
        if (started) started.current = true;

        const interval = setInterval(() => { setTimer(prev => Math.floor(prev - 1))}, 1000);
        
        return () => clearInterval(interval);
    }, [start]);

    // watches the timer
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
    
    // change the states / phase
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

    function handleSubjectChange(sub: Subject) {
        pomodoroForm.setData('subject_id', Number(sub.id));
        setSubject(sub);
    }

    return (
        <PomodoroContext.Provider value={{
            state,
            setState,
            timer, 
            setTimer,
            start, 
            setStart,
            pomodoroCount,
            setPomodoroCount,
            notice, 
            setNotice,
            started: started,
            handleSubjectChange,
            subject
        }} > 
            { children }
        </PomodoroContext.Provider>
    )
}


export function usePomodoroContext() {
    const context = useContext(PomodoroContext);
    if (!context) throw new Error('You tried to use PomodoroContext outside of its provider.');
    return context;
}