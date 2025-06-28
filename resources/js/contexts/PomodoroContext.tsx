import React, { createContext, useContext, useState, useRef, useEffect } from 'react'
import { type State } from "@/types";

import states from '@/constants/states';



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
    started: React.RefObject<boolean>
}


export const PomodoroContext = createContext<PomodoroContextType | null>(null);


export function PomodoroContextProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<State>(states.pomodoro);
    const [timer, setTimer] = useState<number>(state.time);
    const [start, setStart] = useState<boolean>(false);
    const [pomodoroCount, setPomodoroCount] = useState<number>(0);
    const [notice, setNotice] = useState<boolean>(false);
    const started = useRef<boolean>(false);


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
            started: started
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