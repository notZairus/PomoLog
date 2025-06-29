import { useContext, createContext, useState } from "react";

import useSound from "use-sound";
import beepingSound from "/public/sounds/808524__newlocknew__uialert_glassy-tonal-alert-signal-1_em.mp3";
import flashSound from "/public/sounds/807391__vrymaa__magic-finger-snap.wav";
import { PlayFunction } from "node_modules/use-sound/dist/types";


interface SoundContextType {
    startBeepingSound: PlayFunction,
    stopBeepingSound: () => void,
    pauseBeepingSound: () => void,
    startFlashSound: PlayFunction,
    stopFlashSound: () => void,
    pauseFlashSound: () => void,
}


const SoundContext = createContext<SoundContextType | null>(null);


export function SoundContextProvider({ children }: { children: React.ReactNode }) {
    const [startBeepingSound, { stop: stopBeepingSound, pause: pauseBeepingSound}] = useSound(beepingSound, {
        loop: true
    });
    const [startFlashSound, { stop: stopFlashSound, pause: pauseFlashSound}] = useSound(flashSound);



    return (
        <SoundContext.Provider value={{
            startBeepingSound,
            stopBeepingSound,
            pauseBeepingSound,
            startFlashSound,
            stopFlashSound,
            pauseFlashSound,
        }}>
            { children }
        </SoundContext.Provider>
    )
}

export function useSoundContext() {
    const context = useContext(SoundContext);

    if (!context) {
        throw new Error('You tried to use SoundContext outside of its provider.');
    }

    return context;
}