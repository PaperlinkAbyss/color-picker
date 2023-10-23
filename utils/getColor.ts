export type ColorSpace = 'HSL' | 'RGB' | 'RGBA' | 'HEX'
import getCorrectColor from './getCorrectColor'
//This was spread between the functions getCorrectColor, getVariantColor for clarity and readability.
export default function getColor(type: ColorSpace, hardness: number) {
  switch (type) {
    case 'HSL': {
      const HSL = [360, 100, 100]
      const HSLOriginalColor = getCorrectColor(HSL, hardness, false, true)
      const HSLColorString = 'hsl' + HSLOriginalColor.originalColor
      const HSLVariants = HSLOriginalColor.totalColors.map((el) => 'hsl' + el)
      return { originalColor: HSLColorString, variants: HSLVariants }
    }
    case 'RGB': {
      const RGB = [255, 255, 255]
      const RGBOriginalColor = getCorrectColor(RGB, hardness)
      const RGBColorString = 'rgb' + RGBOriginalColor.originalColor
      const RGBvariants = RGBOriginalColor.totalColors.map((el) => 'rgb' + el)
      return { originalColor: RGBColorString, variants: RGBvariants }
    }
    case 'RGBA': {
      const RGBA = [255, 255, 255, 100]
      const RGBAOriginalColor = getCorrectColor(RGBA, hardness)
      const RGBAColorString = 'rgba' + RGBAOriginalColor.originalColor
      const RGBAvariants = RGBAOriginalColor.totalColors.map((el) => 'rgba' + el)
      return { originalColor: RGBAColorString, variants: RGBAvariants }
    }
    case 'HEX': {
      const HEX = [255, 255, 255]
      const HEXOriginalColor = getCorrectColor(HEX, hardness, true)
      const HEXColorString = '#' + HEXOriginalColor.originalColor.toUpperCase()
      const HEXVariants = HEXOriginalColor.totalColors.map((el) => '#' + el.toUpperCase())

      return { originalColor: HEXColorString, variants: HEXVariants }
    }
    default:
      throw Error('Unsupported type')
  }
}
