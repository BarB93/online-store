import React from 'react'

import styles from './NavBar.module.scss'
import Container from '../UI/Container/Container';

const NavBarSkeleton = () => {
    return (
        <header className={`${styles.header} ${styles.skeleton}`}>
            <Container>
                <nav className={styles.nav}>
                    <div className={styles.logo}><div className={styles.skeleton_logo}></div></div>
                    <ul className={styles.nav__menu}>
                        <li className={styles.nav__item}><div className={styles.nav__link}><span className={styles.skeleton_text}></span></div></li>
                        <li className={styles.nav__item}><div className={styles.nav__link}><span className={styles.skeleton_text}></span></div></li>
                        <li className={styles.nav__item}><div className={styles.nav__link}><span className={styles.skeleton_text}></span></div></li>
                        <li className={styles.nav__item}><div className={styles.nav__link}><span className={styles.skeleton_text}></span></div></li>
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default NavBarSkeleton