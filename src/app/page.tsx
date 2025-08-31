import ColorPicker from "./components/ColorPicker"
import { difficulties, getColors } from "./components/lib/color"

export default function Home() {
  const difficulty = difficulties.easy
  const space = "RGB"
  return (
    <div className="">
      <ColorPicker
        color={getColors({ difficulty, space })}
        difficulty={difficulty}
        space={space}
      ></ColorPicker>
    </div>
  )
}
