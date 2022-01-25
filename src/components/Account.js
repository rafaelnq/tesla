import './Account.css';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { useAuth } from '../contexts/AuthContext';
import Car from './Car';
import logoImage from '../assets/logo.png';
import modelSImage from '../assets/models-2x.avif';
import modelXImage from '../assets/modelx-2x.avif';

function Account({ isMenuOpen, setIsMenuOpen }) {
  const { user, logout } = useAuth();
  const history = useHistory();

  const logoutOfApp = (e) => {
    e.preventDefault();

    signOut(auth)
      .then(() => {
        logout();
        history.push('/');
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="teslaAccount">
      <div className="teslaAccount__header">
        <div className="teslaAccount__logo">
          <Link to="/">
            <img src={logoImage} alt="" />
          </Link>
        </div>
        <div className="teslaAccount__links">
          <Link to="/account">Model S</Link>
          <Link to="/account">Model 3</Link>
          <Link to="/account">Model X</Link>
          <Link to="/account">Model Y</Link>
          <Link to="/account">Solar Roof</Link>
          <Link to="/account">Solar Panels</Link>
          <Link to="/account">Shop</Link>
          <Link to="/account">Tesla Account</Link>
          <Link to="#" onClick={logoutOfApp}>
            Log out
          </Link>
          <div
            className="teslaAccount__menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <CloseIcon className="teslaAccount__closeMenu" />
            ) : (
              <MenuIcon />
            )}
          </div>
        </div>
      </div>
      <div className="teslaAccount__info">
        <div className="teslaAccount__person">
          <h4>{user?.displayName + "'s"} Tesla</h4>
        </div>
        <div className="teslaAccount__infoRight">
          <Link to="#">Home</Link>
          <Link to="#">Account</Link>
          <Link to="#">History</Link>
          <Link to="#" onClick={logoutOfApp}>
            Sign out
          </Link>
        </div>
      </div>
      <div className="teslaAccount__car">
        <Car imgSrc={modelSImage} model="model s" testDrive />
        <Car imgSrc={modelXImage} model="model x" />
      </div>
    </div>
  );
}

export default Account;
