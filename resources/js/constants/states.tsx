import { StatesType } from "@/types";

function toMinutes(minutes: number):number {
  return minutes * 60;
}





// const states: StatesType = {
//   pomodoro: {
//     name: "Focus Session",
//     time: toMinutes(25),
//   },
//   short_break: {
//     name: "Short Break",
//     time: toMinutes(5),
//   },
//   long_break: {
//     name: "Long Break",
//     time: toMinutes(15),
//   }
// }


//for test

const states: StatesType = {
  pomodoro: {
    name: "Focus Session",
    time: toMinutes(0.06),
  },
  short_break: {
    name: "Short Break",
    time: toMinutes(0.02),
  },
  long_break: {
    name: "Long Break",
    time: toMinutes(0.04),
  }
}

export default states;