import { useState, useEffect } from 'react'
import './App.css'

const ENDPOINT_RANDOM_CAT_FACT = 'https://catfact.ninja/fact'
const CAT_PREFIX_URL = 'https://cataas.com'

export function App() {
	const [fact, setFact] = useState()
	const [imgUrl, setImgUrl] = useState()

	useEffect(() => {
		fetch(ENDPOINT_RANDOM_CAT_FACT)
			.then(response => response.json())
			.then(({ fact }) => setFact(fact))
	}, [])

	useEffect(() => {
		if (!fact) return

		const threeFirstWords = fact.split(' ', 3).join(' ')
		fetch(`${CAT_PREFIX_URL}/cat/says/${threeFirstWords}`).then(({ url }) => setImgUrl(url))
	}, [fact])

	return (
		<main>
			{fact && <p>{fact}</p>}
			{imgUrl && <img src={imgUrl} alt='gatito' />}
		</main>
	)
}
