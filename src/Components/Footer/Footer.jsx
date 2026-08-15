const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="absolute bottom-0 left-1/2 w-[95%] max-w-[1050px] -translate-x-1/2 border-t-[0.1rem] border-[var(--color-muted)] p-6 text-center text-[0.85rem] font-medium text-[var(--color-muted)]">
      {year} TOBI PETER
    </footer>
  )
}
export default Footer
