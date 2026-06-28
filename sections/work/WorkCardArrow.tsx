/** Figma card corner link — diagonal arrow in 64px circle */
export default function WorkCardArrow() {
  return (
    <div
      className="absolute right-0 bottom-0 flex size-16 items-center justify-center rounded-full bg-white"
      aria-hidden
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-text-primary"
      >
        <path
          d="M7 17L17 7M17 7H8M17 7V16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
