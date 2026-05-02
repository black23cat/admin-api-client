import darkModeIcon from '../../images/dark-mode.png';
import lightModeIcon from '../../images/light-mode.png';
import threeDotsIcon from '../../images/three-dots.png';

export default function Header({ handleToggleTheme }) {
  const themeContext = 'dark';
  return (
    <header>
      <div className="theme-toggle-wrapper">
        <button onClick={handleToggleTheme}>
          <img
            src={themeContext === 'dark' ? lightModeIcon : darkModeIcon}
            alt="toggle theme"
          />
        </button>
      </div>
      <div className="navigation-wrapper">
        <nav>
          <div className="dropdown-wrapper">
            <button>
              <img src={threeDotsIcon} alt="dropdown" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
