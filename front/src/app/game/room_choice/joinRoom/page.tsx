'use client';
import styles from "../../../pages.module.scss"
export default function JoinRoom() {
	return(
			<div className={`d-flex flex-column justify-content-center align-items-center ${styles.appContainer}`}>
				<form  className={`d-flex flex-column card p-30 w-500 ${styles.recipeForm}`}>
					<h2 className='mb-2'>Rejoindre une salle</h2>
					<div className='d-flex flex-column mt-2'>
						<label  className={"block mb-2"} htmlFor=''>Nom de la salle:</label>
						<input type='text'/>
					</div>


					<div className='d-flex flex-column mt-2'>
						<label  className={"block mb-2"} htmlFor=''>Mot de passe:</label>
						<input type='text'/>
					</div>

					<div className="d-flex align-items-center justify-content-center">
						<button className='btn btn-primary mt-2'><a href='/game/quiz_settings'>Rejoindre</a></button>
					</div>
				</form>
			</div>
	)
}
