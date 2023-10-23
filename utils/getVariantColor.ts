import getRandomNumber from './getRandomNumber'
//
export default function getVariantColor({
  originalColor,
  difficulty,
  max,
}: {
  originalColor: number[]
  difficulty: number[]
  max: number[]
}) {
  return originalColor.map((value, index) => {
    //On a 360 basis and 0.5 difficulty example (total range of 180, +90 -90 away from the  value)
    //If number is < than the range (0-90)
    if (value <= difficulty[index]) {
      return getRandomNumber(difficulty[index])
    }
    //If number is bigger than the max - the range (270-360)
    if (value >= max[index] - difficulty[index]) {
      return getRandomNumber(max[index] - difficulty[index], difficulty[index])
    }
    //The rest of possible values
    return getRandomNumber(value + difficulty[index], value - difficulty[index])
  })
}
