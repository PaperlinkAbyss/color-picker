import ColorPicker from "./components/ColorPicker"
import { difficulties } from "./components/lib/color"

export default function Home() {
  const difficulty = difficulties.easy
  const space = "RGB"
  return (
    <div className="">
      <ColorPicker difficulty={difficulty} space={space}></ColorPicker>
    </div>
  )
}
