const Blog = (props) => {
  const delay = 100

  return (
    <li
      className="flex flex-col gap-[1.7rem] [animation:loaded_1.5s_cubic-bezier(0,-0.34,0,1.33)_forwards]"
      style={{ animationDelay: `${props.myId * delay}ms` }}
    >
      <div className="border-b-[0.1rem] border-ink pb-[0.8rem]">
        <h4 className="font-bold text-ink">{props.title}</h4>
        <h5 className="pt-[0.7rem] text-[0.87rem] font-bold text-muted">{props.author}</h5>
      </div>
      <p className="text-[0.9rem] leading-[1.6em] text-ink text-justify">{props.text}</p>
      <a
        target="_blank"
        rel="noreferrer"
        href={props.link}
        className="mx-auto w-full rounded-[0.3rem] border-[0.1rem] border-ink p-[1rem] text-center transition-all duration-300 ease-in-out active:bg-ink active:text-cream hover:bg-ink hover:text-cream"
      >
        READ FULL ARTICLE
      </a>
    </li>
  )
}

export default Blog
