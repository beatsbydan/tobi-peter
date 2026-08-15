// Hidden until focused (keyboard tab from page load), then jumps past the nav straight to
// `#main-content` — lets keyboard/screen-reader users skip the header/sidebar on every page.
const SkipToContent = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-[0.3rem] focus:bg-[var(--color-ink)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--color-cream)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-cream)]"
  >
    Skip to content
  </a>
)

export default SkipToContent
