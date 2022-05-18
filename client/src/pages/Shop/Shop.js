import React from 'react'

import Container from '../../components/UI/Container/Container'
import TypeBar from '../../components/Shop/TypeBar/TypeBar'
import BrandBar from '../../components/Shop/BrandBar/BrandBar'

import styles from './Shop.module.scss'

const Shop = () => {
    return (
        <Container>
            <div className={styles.container}>
                <aside className={styles.aside}>
                    <TypeBar />
                </aside>
                <main className={styles.main}>
                    <BrandBar />
                </main>
            </div>
        </Container>
    )
}

export default Shop