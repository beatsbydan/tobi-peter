import './Blog.css'

const Blog = (props) => {
    const delay = 100;
    return (
        <li className="blog" style={{ animationDelay: `${props.myId * delay}ms` }}>
            <div className="head">
                <h4>{props.title}</h4>
                <h5>{props.author}</h5>
            </div>
            <p>{props.text}</p>
            <a target='_blank' rel="noreferrer" href={props.link}>READ FULL ARTICLE</a>
        </li>
    )
}

export default Blog