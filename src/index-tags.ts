import { SentenceDisplay } from './components/sentence-display';

export const congratsTag = document.querySelector<HTMLElement>('.congrats')!;
export const newSentenceButton = document.querySelector('button.new-sentence');
export const resetButton = document.querySelector<HTMLButtonElement>('button.reset')!;
export const sentenceTag = document.querySelector<SentenceDisplay>(SentenceDisplay.tag)!;
