import Header from "@/app/_.components/Header/Header";
import Footer from "@/app/_.components/Footer/Footer";
import styles from  "../pages.module.scss"
import Quiz from "@/app/game/quiz/display/page";
export default function Game () {
	return (
	<div className={`d-flex flex-column ${styles.appContainer}`}>
		<Header/>
		<div className='d-flex flex-column flex-fill'>
			<Quiz/>
		</div>
		<Footer/>
	</div>
	)
}
