import { StatesType } from "@/types";

function toMinutes(minutes: number):number {
  return minutes * 60;
}
 

const states: StatesType = {
  pomodoro: {
    name: "Focus Session",
    time: toMinutes(1),
  },
  short_break: {
    name: "Short Break",
    time: toMinutes(1),
  },
  long_break: {
    name: "Long Break",
    time: toMinutes(1),
  }
}

export default states;