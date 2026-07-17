const VINYL_JAZZ_SRC = "/sounds/vinyl-jazz.mp3";
const VINYL_JAZZ_VOLUME = 0.38;
/** Play a short burst once — not the full ~40s track, and never looping. */
const VINYL_JAZZ_PLAY_MS = 5500;

let vinylJazzAudio: HTMLAudioElement | null = null;
let vinylJazzTimeoutId: number | null = null;
let vinylJazzEndedHandler: (() => void) | null = null;
/** Once consumed for this page load, audio never restarts (even after scroll remounts). */
let vinylJazzHasPlayed = false;

function clearVinylJazzTimer(): void {
  if (vinylJazzTimeoutId === null) return;
  window.clearTimeout(vinylJazzTimeoutId);
  vinylJazzTimeoutId = null;
}

/** Pause, detach listeners, release the element, and drop the singleton. */
function disposeVinylJazzAudio(): void {
  clearVinylJazzTimer();

  const audio = vinylJazzAudio;
  vinylJazzAudio = null;
  if (!audio) return;

  if (vinylJazzEndedHandler) {
    audio.removeEventListener("ended", vinylJazzEndedHandler);
    vinylJazzEndedHandler = null;
  }

  audio.pause();
  audio.removeAttribute("src");
  // Force the element to drop its decoded buffer / network resources.
  audio.load();
}

function createVinylJazzAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;

  const audio = new Audio(VINYL_JAZZ_SRC);
  audio.preload = "auto";
  audio.loop = false;
  audio.volume = VINYL_JAZZ_VOLUME;
  return audio;
}

/**
 * Start a one-shot vinyl SFX when the record first spins.
 * Plays only once per page load (~5–6s); later spins or scroll remounts stay silent.
 */
export function playVinylJazz(): void {
  if (vinylJazzHasPlayed) return;

  const audio = createVinylJazzAudio();
  if (!audio) return;

  vinylJazzHasPlayed = true;
  vinylJazzAudio = audio;
  clearVinylJazzTimer();

  const finish = () => {
    disposeVinylJazzAudio();
  };

  vinylJazzEndedHandler = finish;
  audio.addEventListener("ended", finish, { once: true });
  audio.currentTime = 0;

  void audio
    .play()
    .then(() => {
      // Cap playback even if the source file is longer.
      vinylJazzTimeoutId = window.setTimeout(finish, VINYL_JAZZ_PLAY_MS);
    })
    .catch(() => {
      // Autoplay blocked before a gesture — allow a later tap to retry.
      vinylJazzHasPlayed = false;
      disposeVinylJazzAudio();
    });
}

/**
 * Stop vinyl SFX (unmount / scroll away / spin stopped).
 * Does not re-arm playback for this page load once it has started.
 */
export function stopVinylJazz(): void {
  disposeVinylJazzAudio();
}
