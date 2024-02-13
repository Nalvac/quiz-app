'use client';
import styles from  "../pages.module.scss"
export default function RoomChoice() {
	return(
		<div className={`d-flex flex-column justify-content-center align-items-center ${styles.appContainer}`}>
			<form  className={`d-flex flex-column card p-30 w-500 ${styles.recipeForm}`}>
				<h2 className='mb-20'>Création d'une nouvelle salle</h2>
				<div className='d-flex flex-column mb-20'>
					<label htmlFor=''>Nom de la salle</label>
					<input type='text'/>
				</div>

				<div className="d-flex flex-column align-items-center justify-content-center">
					<button className='btn btn-primary'>Sauvegarder</button>
					<span className='mt-15'>
						<span style={{fontSize: `small`}}> Voulez vous rejoindre une salle
							<a href='../roomChoice/joinRoom' style={{color: `blue`}}> Cliquez ici</a>
						</span>
					</span>
				</div>
			</form>
		</div>
	)
}