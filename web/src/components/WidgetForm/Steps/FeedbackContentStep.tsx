import { ArrowLeft } from "phosphor-react";
import { useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const [screenShot, setScreenShot] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleSubmitFeedback(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onFeedbackSent();
  }
  return (
    <>
      <header>
        <CloseButton />
        <span className="text-xl leading-6 flex items-center gap-2">
          <button
            type="button"
            onClick={onFeedbackRestartRequested}
            className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          >
            <ArrowLeft weight="bold" className="w-4 h-4" />
          </button>
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6 "
          />
          {feedbackTypeInfo.title}
        </span>
      </header>
      <form className="my-4 w-full">
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={(event) => setComment(event.target.value)}
        />
        <footer className="flex mt-2 gap-2">
          <ScreenshotButton
            screenshot={screenShot}
            onScreenshotTook={setScreenShot}
          />
          <button
            onClick={handleSubmitFeedback}
            disabled={comment.length === 0}
            type="submit"
            className="p-2 bg-brand-500 rounded-[4px] border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:rings-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            Enviar feedback
          </button>
        </footer>
      </form>
    </>
  );
}
