import React, { createContext, useContext, useState, useRef, useEffect } from 'react'
import { type State } from "@/types";

import states from '@/constants/states';



interface PomodoroContextType {
    state: State,
    timer: number, 
    setTimer: React.Dispatch<React.SetStateAction<number>>,
    start: boolean, 
    setStart: React.Dispatch<React.SetStateAction<boolean>>,
    pomodoroCount: number,
    setPomodoroCount: React.Dispatch<React.SetStateAction<number>>,
    notice: boolean, 
    setNotice: React.Dispatch<React.SetStateAction<boolean>>
}


export const PomodoroContext = createContext<PomodoroContextType | null>(null);


export function PomodoroContextProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<State>(states.pomodoro);
    const [timer, setTimer] = useState<number>(state.time * 60);
    const [start, setStart] = useState<boolean>(false);
    const [pomodoroCount, setPomodoroCount] = useState<number>(0);
    const [notice, setNotice] = useState<boolean>(false);


    return (
        <PomodoroContext.Provider value={{
            state,
            timer, 
            setTimer,
            start, 
            setStart,
            pomodoroCount,
            setPomodoroCount,
            notice, 
            setNotice
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