export function getRandomInt(min: number, max: number) {
  const randomBuffer = new Uint32Array(1);

  crypto.getRandomValues(randomBuffer);

  let randomNumber = randomBuffer[0] / (0xffffffff + 1);

  const safeMin = Math.ceil(min);
  const safeMax = Math.floor(max);
  return Math.floor(randomNumber * (safeMax - safeMin + 1)) + safeMin;
}
