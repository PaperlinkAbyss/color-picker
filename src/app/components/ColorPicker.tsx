"use client"
import { useMemo, useState } from "react"
import {
  ColorSpace,
  Difficulties,
  difficulties,
  getColors,
  getTextColor,
} from "./lib/color"

export default function ColorPicker(props: {
  space: ColorSpace
  difficulty: Difficulties
}) {
  const [space, setSpace] = useState<ColorSpace>(props.space)
  const [difficulty, setDifficulty] = useState<Difficulties>(props.difficulty)
  const [didWin, setDidWin] = useState<boolean | null>(null)
  const [forceRerender, setForceRerender] = useState(true)
  const { elements, original, raw } = useMemo(() => {
    void forceRerender
    return getColors({ difficulty, space })
  }, [difficulty, space, forceRerender])

  const contrast = getTextColor({ elements: raw, space })

  return (
    <div>
      <main className="mb-auto grid h-full place-content-center">
        <header className="flex justify-around">
          <ColorSelector
            text="HSL"
            space={space}
            onClick={() => setSpace("HSL")}
          />
          <ColorSelector
            text="RGB"
            space={space}
            onClick={() => setSpace("RGB")}
          />
          <ColorSelector
            text="RGBA"
            space={space}
            onClick={() => setSpace("RGBA")}
          />
          <ColorSelector
            text="HEX"
            space={space}
            onClick={() => setSpace("HEX")}
          />
        </header>
        <nav className="flex">
          <DifficultySelector
            difficulty={difficulty}
            target="easy"
            onClick={() => setDifficulty(difficulties.easy)}
            original={original}
            contrast={contrast}
          />
          <DifficultySelector
            difficulty={difficulty}
            target="medium"
            onClick={() => setDifficulty(difficulties.medium)}
            original={original}
            contrast={contrast}
          />
          <DifficultySelector
            difficulty={difficulty}
            target="hard"
            onClick={() => setDifficulty(difficulties.hard)}
            original={original}
            contrast={contrast}
          />
          <DifficultySelector
            difficulty={difficulty}
            target="impossible"
            onClick={() => setDifficulty(difficulties.impossible)}
            original={original}
            contrast={contrast}
          />
        </nav>
        <div
          className="h-40 w-full"
          style={{ backgroundColor: original }}
          key={original}
        ></div>
        <ol>
          {elements.map((el, i) => {
            if (el === original)
              return (
                <li
                  className="m-2 list-inside text-center tabular-nums hover:text-blue-500"
                  key={el + i}
                  onClick={() => {
                    setDidWin(true)
                    setForceRerender(!forceRerender)
                  }}
                >
                  <pre>{el}</pre>
                </li>
              )
            return (
              <li
                className="m-2 list-inside text-center tabular-nums hover:text-blue-500"
                key={el + i}
                onClick={() => setDidWin(false)}
              >
                <pre>{el}</pre>
              </li>
            )
          })}
        </ol>

        <div className="mt-2">
          <p>
            The difficulty of this only makes the difference between colors
            smaller!
          </p>
        </div>
        {typeof didWin === "boolean" && didWin && (
          <div
            className="mx-auto mt-2 w-max bg-green-600 text-white"
            ref={(el) => {
              setTimeout(() => {
                if (!el) return
                el.style.display = "none"
              }, 1_500)
            }}
          >
            You got it right!
          </div>
        )}
        {typeof didWin === "boolean" && !didWin && (
          <div className="mx-auto mt-2 w-max bg-red-600 text-white">
            Woops, wrong :(
          </div>
        )}
      </main>
    </div>
  )
}

function ColorSelector({
  space,
  onClick,
  text,
}: {
  space: ColorSpace
  onClick: VoidFunction
  text: ColorSpace
}) {
  return (
    <button
      className={`mx-2 mb-4 mt-4 rounded-md border-2 ${
        space === text
          ? "bg-gradient-to-br from-red-500 via-green-500 to-blue-500"
          : ""
      } px-4 py-1 hover:bg-gray-400`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

function DifficultySelector({
  difficulty,
  target,
  original,
  onClick,
  contrast,
}: {
  difficulty: Difficulties
  target: keyof typeof difficulties
  original: string
  onClick: VoidFunction
  contrast: string
}) {
  return (
    <button
      style={{
        backgroundColor: difficulty === difficulties[target] ? original : "",
        color: difficulty === difficulties[target] ? contrast : undefined,
      }}
      className={`py-1-mb-4 m-2 mx-auto w-max rounded-md border-2 px-4 text-center hover:bg-gray-400 ${
        difficulty === difficulties[target] ? "" : ""
      }`}
      onClick={onClick}
    >
      <span
        style={{
          color: difficulty === difficulties[target] ? contrast : undefined,
        }}
        className={
          difficulty === difficulties[target]
            ? ""
            : "hover:text-white hover:mix-blend-difference" + "capitalize"
        }
      >
        {target}
      </span>
    </button>
  )
}
