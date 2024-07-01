import { Instagram, Twitter, LinkedIn, Mail } from './Icons';

const Footer = () => {
  return (
    <footer aria-label="Social media links">
      <nav class="my-4 flex items-center justify-center space-x-8 bg-slate-50 p-4 lg:space-x-16">
        <a
          aria-label="Link to artist's Instagram"
          href="https://instagram.com/k1ggy"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram />
        </a>
        <a
          aria-label="Link to artist's Twitter"
          href="https://twitter.com/kiggington"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter />
        </a>
        <a
          aria-label="Link to artist's Linkedin"
          href="https://www.linkedin.com/in/kristen-rankin-63923a1a3"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedIn />
        </a>
        <a
          aria-label="Link to artist's email"
          href="mailto:kristen.rankinarts@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Mail />
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
