export default function getRandomNumber(maxx: number, min = 0) {
  const max = maxx + 1
  return Math.floor(Math.random() * (max - min)) + min
}
