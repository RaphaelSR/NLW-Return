import { Camera, Trash } from "phosphor-react";
import html2canvas from "html2canvas";
import { Loading } from "../Loading";
import { useState } from "react";

interface ScreenshotButtonProps {
  onScreenshotTook: (screenshot: string) => void;
  screenshot: string | null;
}

export function ScreenshotButton({
  onScreenshotTook,
  screenshot,
}: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);
  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);
    const canvas = await html2canvas(document.querySelector("html")!);
    const base64image = canvas.toDataURL("image/png");
    onScreenshotTook(base64image);
    setIsTakingScreenshot(false);
  }

  if (screenshot) {
    return (
      <button
        type="button"
        className="p-1 w-10 h-10 rounded-md border-transparent justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        onClick={() => onScreenshotTook(null)}
        style={{
            backgroundImage: `url(${screenshot})`,
        }}
     >
          <Trash weight="fill"/>
      </button>
    );
  }

  return (
    <button
      type="button"
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors"
      onClick={handleTakeScreenshot}
    >
      {isTakingScreenshot ? (
        <Loading />
      ) : (
        <Camera className="w-6 h-6 text-zinc-100" />
      )}
    </button>
  );
}
