import { Children, useState } from 'react'
import './App.css'

import { Square } from './components/Square.jsx'
import { TURNS} from './constants.js'
import { checkWinnerFrom, checkEndGame } from './logic/board.js' 
import { WinnerModal } from './components/WinnerModal.jsx'

function App() {
  const [board, setBoard] = useState(() => {
  return Array(9).fill(null)
  })
  const [turn, setTurn ]= useState(TURNS.X)
  //null es que no hay ganador, flse es que hay empate
  const [winner, setWinner] = useState(null) 

  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }



  const updateBoard = (index) =>{
    //No actualiza la posisción si ya tiene algo
    if (board[index] || winner) return
    //Actualizar tablero
    const newBoard = [... board]
    newBoard[index] = turn 
    setBoard(newBoard)
    //Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // Guardar partida
    // Revisar si hay ganadores
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)){
      setWinner(false) //Empate
    }

  }
  return (
    <main className='board'>
        <h1>Tic Tac Toe</h1>
        <button onClick={resetGame}>Reset del juego</button>
        <section className='game'>
          {
            board.map((_, index) =>{
              return (
                <Square 
                  key={index}  
                  index={index}
                  updateBoard={updateBoard}>

                  {board[index]}
                  </Square>
              )
            })
          }
       </section>

          <section className='turn'>
            <Square isSelected={turn === TURNS.X}>
              {TURNS.X}
            </Square>
            <Square isSelected={turn === TURNS.O}>
              {TURNS.O}
            </Square>
          </section>
          
          <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
