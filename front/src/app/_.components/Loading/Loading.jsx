import styles from './Loading.module.scss'
export function Loading() {
  return (
    <div className='d-flex align-items-center justify-content-center flex-fill flex-row'>
      <i className={`fa-solid fa-spinner ${styles.spinner}`}></i>
    </div>
  )
}
