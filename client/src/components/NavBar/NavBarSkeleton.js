import React from 'react'

import styles from './NavBar.module.scss'
import Container from '../UI/Container/Container';

const NavBarSkeleton = () => {
    return (
        <header className={`${styles.header} ${styles.skeleton}`}>
            <Container>
                <nav className={styles.nav}>
                    <div className={styles.logo}><div className={styles.skeleton_logo}></div></div>
                    <div className={styles.nav__menu}>
                        <div className={styles.nav__item}><div className={styles.nav__link}><span className={styles.skeleton_item}></span></div></div>
                    </div>
                </nav>
            </Container>
        </header>
    )
}

export default NavBarSkeleton