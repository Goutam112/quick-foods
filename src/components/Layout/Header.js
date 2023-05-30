import landingImage from '../../assets/landing-page.jpg'
import HeaderCartButton from './HeaderCartButton';

import Logo from '../../assets/logo.png';

import styles from './Header.module.css';

const Header = (props) => {

  return (<>
    <header className={ styles.header }>

      <h1><img className={ styles.logo } src={ Logo } alt='logo' />QuickFoods.co</h1>
      <HeaderCartButton />
    </header>
    <div className={ styles['main-image'] }>
      <img src={ landingImage } alt="meal plates" />
    </div>
  </>)
}

export default Header;