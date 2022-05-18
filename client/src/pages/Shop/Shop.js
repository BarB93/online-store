import React from 'react'
import Container from '../../components/UI/Container/Container'

import styles from './Shop.module.scss'

const Shop = () => {
    return (
        <Container>
            <div className={styles.container}>
                <aside className={styles.aside}>Aside</aside>
                <main className={styles.main}>Main</main>
            </div>
        </Container>
    )
}

export default Shop