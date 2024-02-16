'use client';
import styles from "./Footer.module.scss"

export default function Footer() {
  return (
    <footer
      className={`${styles.footer} d-flex flex-row align-items-center justify-content-center p-20`}
    >
      <p>Copyright © 2024 Quiz Challenge, Inc.</p>
    </footer>
  )
}
