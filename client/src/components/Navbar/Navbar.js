import 'normalize.css';
import styles from './Navbar.module.css';
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className={styles.Navbar}>

        <div className={styles.Navbar_navElement}><Link to='/'>Home</Link></div>
        <div className={styles.Navbar_navElement}><Link to='/register'>Register</Link></div>
        <div className={styles.Navbar_navElement}><Link to='/ranking'>Ranking</Link></div>
        <div className={styles.Navbar_navElement}><Link to='/matches'>Matches</Link></div>

    </div>
  );
}

export default Navbar;
