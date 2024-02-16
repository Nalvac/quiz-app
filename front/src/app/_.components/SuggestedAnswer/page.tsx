export default function SuggestedAnswerDisplay (){
	const responses = ['Resonse 1','Resonse 2','Resonse 3', 'Resonse 4']
	return (
			<div className="grid grid-cols-2 gap-4">
				{responses.map((option, index) => (
						<button
								key={index}
								className="bg-white	text-black px-4 py-2 rounded hover:bg-primary"
						>
							{option}
						</button>
				))}
			</div>
	)
}