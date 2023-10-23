import getRandomNumber from './getRandomNumber'
import getVariantColor from './getVariantColor'

//This function could be split into several functions.

export default function getCorrectColor(
  spaceArray: number[],
  difficulty: number,
  isHex = false,
  isHSL = false,
) {
  const colorDifficulty = spaceArray.map((el) => Math.floor((el * difficulty) / 2))
  const originalNumberColor = spaceArray.map((color) => getRandomNumber(color))
  const variantsArray = []
  //Fills variantsArray with another array so you can later reduce them into a string for each color ([[255,255,255]]-> ["(255,255,255)"])
  for (let index = spaceArray.length; index > 1; index--) {
    variantsArray.push(
      getVariantColor({
        originalColor: originalNumberColor,
        difficulty: colorDifficulty,
        max: spaceArray,
      }),
    )
  }
  //You need to keep up the reference to the original so you can check later which color is the valid one.
  const variantsPlusOriginal = [...variantsArray, originalNumberColor]
  let totalArray
  if (isHex) {
    //Hex needs to have different rules for the reduce since it as different structure. (no brackets or comma)
    totalArray = variantsPlusOriginal.map((currColor) =>
      currColor.reduce((acc, el) => {
        return (acc += el.toString(16))
      }, ''),
    )
  } else if (spaceArray.length === 4) {
    //This is only for RGBA values since those also need to have their last number be divided by 100.
    //This was done so you'd have more RNG and precission on the values.
    totalArray = variantsPlusOriginal.map((currColor) =>
      currColor
        .reduce((acc, el, i, arr) => {
          if (i === arr.length - 1) return (acc += el / 100)
          return (acc += el + ', ')
        }, '(')
        .concat(')'),
    )
  } else if (isHSL) {
    totalArray = variantsPlusOriginal.map((currColor) => {
      return currColor
        .reduce((acc, el, ind) => {
          if (ind > 0) return (acc += `${el}% `)
          return (acc += el + ' ')
        }, '(')
        .concat(')')
    })
  } else {
    totalArray = variantsPlusOriginal.map((currColor) =>
      currColor
        .reduce((acc, el, i, arr) => {
          if (i === arr.length - 1) return (acc += el)
          return (acc += el + ', ')
        }, '(')
        .concat(')'),
    )
  }
  //Keeping the string of the original color for later
  const originalColor = totalArray[totalArray.length - 1]
  //This shuffles they array
  for (let index = totalArray.length - 1; index > 0; index--) {
    const random = getRandomNumber(index)
    ;[totalArray[index], totalArray[random]] = [totalArray[random], totalArray[index]]
  }
  return {
    originalColor: originalColor,
    totalColors: totalArray,
  }
}
