const variants = {
  primary:
    'bg-[var(--color-ink)] text-[var(--color-cream)] border-[0.1rem] border-[var(--color-ink)] hover:opacity-90',
  secondary:
    'bg-transparent text-[var(--color-ink)] border-[0.1rem] border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)]',
  danger:
    'bg-transparent text-[rgba(255,0,0,0.779)] border-[0.1rem] border-[rgba(255,0,0,0.779)] hover:bg-[rgba(255,0,0,0.779)] hover:text-white',
  ghost: 'bg-transparent text-[var(--color-muted)] border-0 hover:text-[var(--color-ink)]',
}

// Exposed so non-<button> elements (e.g. a react-router <Link> styled as a button) can share the
// exact same visual treatment — see LinkButton.jsx. Lives in its own file (not Button.jsx) because
// co-exporting a non-component const from a component file breaks React Fast Refresh.
export const buttonClasses = (variant = 'primary', className = '') =>
  `flex cursor-pointer flex-row items-center justify-center gap-2 rounded-[0.3rem] px-5 py-3 text-sm font-medium transition-colors duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`
