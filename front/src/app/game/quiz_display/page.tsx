'use client';
import React, { useState } from 'react';
import SuggestedAnswerDisplay from "@/app/_.components/SuggestedAnswer/page";
export default function Quiz() {
	return(
			<>
				<div className={`d-flex justify-content-center align-items-center flex-column flex-fill`}>
					<div className={` w-800 h-50`}>
						<h1 className={`text-center text-2xl text-white p-30`}>
							Affichage de la question
						</h1>
						<SuggestedAnswerDisplay/>
					</div>
				</div>
			</>
	)
}