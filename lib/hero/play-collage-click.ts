const CLICK_SOUND_SRC = "/sounds/click.wav";
const CLICK_VOLUME = 0.5;

let clickTemplate: HTMLAudioElement | null = null;

function getClickTemplate(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;

  if (!clickTemplate) {
    clickTemplate = new Audio(CLICK_SOUND_SRC);
    clickTemplate.preload = "auto";
    clickTemplate.volume = CLICK_VOLUME;
  }

  return clickTemplate;
}

/** Standard UI click for collage taps and micro-interactions. */
export function playCollageClick(): void {
  const template = getClickTemplate();
  if (!template) return;

  const sound = template.cloneNode() as HTMLAudioElement;
  sound.volume = CLICK_VOLUME;
  void sound.play().catch(() => {
    // Ignore autoplay blocks until the user has interacted.
  });
}
