export default function ColorPicker() {
  const selectedColorSpace = "" as string
  const difficulty = 0 as number
  const color = { variants: [], originalColor: "black" }
  const didWin = true as boolean | null
  return (
    <div>
      <main className="mb-auto grid h-full place-content-center">
        <header className="flex justify-around">
          <button
            className={`mx-2 mb-4 mt-4 rounded-md border-2 ${
              selectedColorSpace === "HSL"
                ? "bg-gradient-to-br from-red-500 via-green-500 to-blue-500"
                : ""
            } px-4 py-1 hover:bg-gray-400`}
          >
            HSL
          </button>
          <button
            className={`mx-2 mb-4 mt-4 rounded-md border-2 ${
              selectedColorSpace === "RGB"
                ? "bg-gradient-to-br from-red-500 via-green-500 to-blue-500"
                : ""
            } px-4 py-1 hover:bg-gray-400`}
          >
            RGB
          </button>
          <button
            className={`mx-2 mb-4 mt-4 rounded-md border-2 ${
              selectedColorSpace === "RGBA"
                ? "bg-gradient-to-br from-red-500/20 via-green-500/50 to-blue-500/95"
                : ""
            } px-4 py-1 hover:bg-gray-400`}
          >
            RGBA
          </button>
          <button
            className={`mx-2 mb-4 mt-4 rounded-md border-2 ${
              selectedColorSpace === "HEX"
                ? "bg-gradient-to-br from-red-500 via-green-500 to-blue-500"
                : ""
            } px-4 py-1 hover:bg-gray-400`}
          >
            HEX
          </button>
        </header>
        <nav className="flex">
          <button
            style={{
              backgroundColor:
                difficulty === 0.5 ? (color?.originalColor ?? "black") : "",
            }}
            className={`py-1-mb-4 m-2 mx-auto w-max rounded-md border-2 px-4 text-center hover:bg-gray-400 ${
              difficulty === 0.5 ? "" : ""
            }`}
          >
            Easy
          </button>
          <button
            style={{
              backgroundColor:
                difficulty === 0.3 ? (color?.originalColor ?? "black") : "",
            }}
            className="py-1-mb-4 m-2 mx-auto w-max rounded-md border-2 px-4 text-center hover:bg-gray-400"
          >
            Intermediate
          </button>
          <button
            style={{
              backgroundColor:
                difficulty === 0.2 ? (color?.originalColor ?? "black") : "",
            }}
            className="py-1-mb-4 m-2 mx-auto w-max rounded-md border-2 px-4 text-center hover:bg-gray-400"
          >
            Hard
          </button>
          <button
            style={{
              backgroundColor:
                difficulty === 0.05 ? (color?.originalColor ?? "black") : "",
            }}
            className="py-1-mb-4 m-2 mx-auto w-max rounded-md border-2 px-4 text-center hover:bg-gray-400"
          >
            Extreme{" "}
          </button>
        </nav>
        <div
          className="h-40 w-full"
          style={{ backgroundColor: color.originalColor }}
        ></div>
        <ol>
          {color.variants.map((el) => {
            if (el === color.originalColor)
              return (
                <li
                  className="m-2 list-inside text-center hover:text-blue-500"
                  key={el}
                >
                  {el}
                </li>
              )
            return (
              <li
                className="m-2 list-inside text-center hover:text-blue-500"
                key={el}
              >
                {el}
              </li>
            )
          })}
        </ol>
        {typeof didWin === "boolean" && didWin && (
          <div className="mx-auto mt-2 w-max bg-green-600 text-white">
            Has acertado!
          </div>
        )}
        {typeof didWin === "boolean" && !didWin && (
          <div className="mx-auto mt-2 w-max bg-red-600 text-white">
            Has fallado!
          </div>
        )}
        <div className="mt-2">
          <p>
            The difficulty of this only makes the difference between colors
            smaller, maybe some cases you get the same numbers for all, sorry!
          </p>
        </div>
      </main>
    </div>
  )
}
