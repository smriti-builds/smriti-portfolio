const VINYL_JAZZ_SRC = "/sounds/vinyl-jazz.mp3";
const VINYL_JAZZ_VOLUME = 0.38;

let vinylJazzAudio: HTMLAudioElement | null = null;

function getVinylJazzAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;

  if (!vinylJazzAudio) {
    vinylJazzAudio = new Audio(VINYL_JAZZ_SRC);
    vinylJazzAudio.preload = "auto";
    vinylJazzAudio.loop = true;
    vinylJazzAudio.volume = VINYL_JAZZ_VOLUME;
  }

  return vinylJazzAudio;
}

/** Start looping jazz when the vinyl record spins. */
export function playVinylJazz(): void {
  const audio = getVinylJazzAudio();
  if (!audio) return;

  audio.currentTime = 0;
  void audio.play().catch(() => {
    // Requires a prior user gesture (vinyl tap).
  });
}

/** Stop jazz when the vinyl record is tapped again. */
export function stopVinylJazz(): void {
  const audio = getVinylJazzAudio();
  if (!audio) return;

  audio.pause();
  audio.currentTime = 0;
}
