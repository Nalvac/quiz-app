'use client';
import React, { useState } from 'react';
import styles from "./page.module.scss"
export default function QuizSettings()  {
	const [selectedTheme, setSelectedTheme] = useState('Science');
	const [difficulty, setDifficulty] = useState('facile');


	const getRandomTheme = (themes: string[]) => {
		const randomIndex = Math.floor(Math.random() * themes.length);
		return themes[randomIndex];
	};



	const themes = ['Science', 'Culture générale', 'Sport', 'Histoire', 'Technologie'];


	const handleThemeChange = (theme: string) => {
		setSelectedTheme(theme);
	};

	const handleDifficultyChange = (level: string) => {
		setDifficulty(level);
	};


	const handleRandomTheme = () => {
		const randomTheme = getRandomTheme(themes);
		setSelectedTheme(randomTheme);
	};

	return (
		<div className={`d-flex flex-column justify-content-center align-items-center  ${styles.appContainer}`}>
			<div className={`p-4 bg-white w-800 rounded`} >
				<h2 className="text-2xl font-bold mb-4">Paramètres du Quiz</h2>

				{/* Sélection de Thèmes */}
				<div className="mb-4">
					<label className="block mb-2">Sélectionner un thème :</label>
					<select
							className="w-full p-2 border border-gray-300 rounded"
							value={selectedTheme}
							onChange={(e) => handleThemeChange(e.target.value)}
					>
						{themes.map((theme) => (
								<option key={theme} value={theme}>
									{theme}
								</option>
						))}
					</select>
				</div>

				{/* Niveaux de Difficulté */}
				<div className="mb-4">
					<label className="block mb-2">Sélectionner le niveau de difficulté :</label>
					<select
							className="w-full p-2 border border-gray-300 rounded"
							value={difficulty}
							onChange={(e) => handleDifficultyChange(e.target.value)}
					>
						<option value="facile">Facile</option>
						<option value="moyen">Moyen</option>
						<option value="difficile">Difficile</option>
					</select>
				</div>

				{/* Option de Mélange de Thèmes Aléatoires */}
				<div>
					<button
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
						onClick={handleRandomTheme}
					>
						Thème Aléatoire
					</button>
				</div>

				<div className={`p-2 d-flex justify-center align-items-center`}>
					<button
							className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-700"
							onClick={handleRandomTheme}
					>
						Sauvegarder
					</button>
				</div>
			</div>
		</div>
	);
};
