'use client';
import styles from './HeaderMenu.module.scss'
export default function HeaderMenu() {
  return (
    (
      <ul className={`card p-20 ${styles.MenuContainer}`}>
        <li>WishList</li>
        <li>Connexion</li>
      </ul>
    )
  )
}
