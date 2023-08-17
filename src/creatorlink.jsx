import gitHubLogo from './github-logo.png';
import './creatorlink.css';

export default function CreatorLink() {
  return (
    <a
      className="creator-link"
      href="https://github.com/mgporter/top11_memory-cards"
      target="_blank"
      rel="noreferrer"
    >
      <span>created by mgporter</span>
      <img src={gitHubLogo} alt="Github source" />
    </a>
  );
}
