

export function sleep(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export function toMinutesFormat(timer: number): string {
  const _mins = Math.floor(timer/60);
  const _secs = Math.floor(timer % 60);
  return `${_mins >= 10 ? _mins : `0${_mins}`}:${_secs >= 10 ? _secs : `0${_secs}`}`
}
