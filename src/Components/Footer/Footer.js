import './Footer.css'
const Footer = () => {
    const year = new Date().getFullYear();
    return ( 
        <footer>
            {year} TOBI PETER
        </footer>
    );
}
export default Footer;