import { useState } from "react" 
import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

export function App() {
  const [name, setName] = useState('Tattoarco')
  return (
    <section className='App'>

      <TwitterFollowCard username="Tattoarco">
        Tatiana Mosquera
      </TwitterFollowCard> 
    
      <TwitterFollowCard username="Ilestar">
        Juan Guillermo Gomez
      </TwitterFollowCard>

    </section>
      
  )
}


