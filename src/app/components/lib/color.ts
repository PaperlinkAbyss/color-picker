const colorThreshold = {
  HSL: [360, 100, 100],
  RGB: [255, 255, 255],
  RGBA: [255, 255, 255, 100],
  HEX: [255, 255, 255],
}

export const difficulties = {
  easy: 0.5,
  medium: 0.3,
  hard: 0.2,
  impossible: 0.08,
} as const

export type Difficulties = (typeof difficulties)[keyof typeof difficulties]

export type ColorSpace = keyof typeof colorThreshold

function random(max: number, min = 0) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function variants({
  original,
  difficulty,
  max,
}: {
  original: number[]
  difficulty: number[]
  max: number[]
}) {
  return original.map((value, index) => {
    const low = Math.max(0, value - difficulty[index])
    const high = Math.min(max[index], value + difficulty[index])
    return random(high, low)
  })
}

function isEqual(arr: unknown[], original: unknown[]) {
  return arr.every((el, i) => el === original[i])
}

function getUniqueVariant(
  original: number[],
  difficulty: number[],
  max: number[],
  exclude: number[][] = [],
): number[] {
  let newVariant = variants({ original, difficulty, max })
  while (
    isEqual(newVariant, original) ||
    exclude.some((element) => isEqual(newVariant, element))
  ) {
    newVariant = variants({ original, difficulty, max })
  }
  return newVariant
}

export function getColors({
  difficulty,
  space,
}: {
  difficulty: number
  space: ColorSpace
}) {
  const colorDifficulty: number[] = []
  const raw: number[] = []
  const spaceValues = colorThreshold[space]

  spaceValues.forEach((el) => {
    colorDifficulty.push(Math.floor((el * difficulty) / 2))
    raw.push(random(el))
  })

  const variants = [raw]

  for (let i = 0; i < 2; i++) {
    variants.push(getUniqueVariant(raw, colorDifficulty, spaceValues, variants))
  }

  const transformed = transform(variants, space)
  const elements = shuffle(transformed)

  return {
    original: transformed[0],
    raw,
    elements,
  }
}

/**
 * Returns the stringified version of the elements, based on the provided `space`. This function normalizes spaces/ceroes so all the returned strings have the same length.
 */
function stringify(elements: number[], space: ColorSpace) {
  switch (space) {
    case "HSL":
      return `hsl(${elements[0].toString().padStart(3, " ")}, ${elements[1].toString().padStart(3, " ")}%, ${elements[2].toString().padStart(3, " ")}%)`
    case "RGB":
      return `rgb(${elements.map((el) => `${el}`.padStart(3, " ")).join(", ")})`
    case "RGBA":
      return `rgba(${elements
        .slice(0, 3)
        .map((el) => `${el}`.padStart(3, " "))
        .join(", ")}, ${(elements[3] / 100).toFixed(2)})`
    case "HEX":
      return `#${elements.map((el) => el.toString(16).toUpperCase().padStart(2, "0")).join("")}`
  }
}

/**
 * Helper to stringify all the variants at the same time.
 */
function transform(elements: number[][], space: ColorSpace) {
  return elements.map((color) => stringify(color, space))
}

/**
 * Returns either black or white based on the contrast of the provided rgb color in [r,g,b] form.
 */
function contrast([r, g, b]: number[]) {
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? [0, 0, 0] : [255, 255, 255]
}

/**
 * Returns a valid contrasting color on the same `space` as the provided color.
 */
export function getTextColor({
  elements,
  space,
}: {
  elements: number[]
  space: ColorSpace
}) {
  switch (space) {
    case "RGBA":
      return stringify(contrast(elements).concat(100), space)
    case "RGB":
      return stringify(contrast(elements), space)
    case "HSL":
      const [h, s, l] = elements
      const factor = l > 50 ? 20 : 80
      return stringify([h, s, factor], space)
    case "HEX":
      return stringify(contrast(elements), space)
  }
}

function shuffle<T extends unknown[]>(arr: T) {
  const elements = [...arr]
  for (let i = elements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[elements[i], elements[j]] = [elements[j], elements[i]]
  }

  return elements
}
