import { FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button/index'
import { RoomCode } from '../components/RoomCode/index'
import '../style/room.scss'
import { useAuth } from '../hooks/useAuths'
import { database } from '../services/firebase'
import { Question } from '../components/Question/index'
import { useRoom } from '../hooks/useRoom'



type RoomParams = {
  id: string;
}



export function Room() {
  const {user} = useAuth()
  const params = useParams<RoomParams>()
  const [newQuestion, setNewQuestion] = useState('')
  const roomId = params.id

  const {title, questions} = useRoom(roomId)




  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault()


    if (newQuestion.trim() === ''){
      return
    }

    if (!user){
      throw new Error('You must be logged in')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false,
    }

    await database.ref(`rooms/${roomId}/questions`).push(question)

    setNewQuestion('')


  }


  return (
 <div id="page-room">
   <header>
     <div className="content">
      <img src={logoImg} alt="LetMeAsk" />
      <RoomCode code={roomId}/>
     </div>
   </header>


   <main>
     <div className="room-title">
       <h1>Sala {title}</h1>
       {questions.length> 0 && <span>{questions.length} pergunta(s)</span>}
     </div>

     <form onSubmit={handleSendQuestion} >
       <textarea 
        placeholder="O que você quer perguntar?"
        onChange={event => setNewQuestion(event.target.value)}
        value={newQuestion}
        />

        <div className="form-footer">
          {user ? (
            <div className="user-info">
              <img src={user.avatar} alt={user.name} />
              <span>{user.name}</span>
            </div>
          ) : (
            <span>Para enviar uma pergunta, <button> faça seu login.</button></span>
          )}
          <Button type="submit"disabled={!user}>Enviar pergunta</Button>
        </div>
     </form>
     <div className="question-list">
     {questions.map(questions => {
       return (
         <Question 
         key={questions.id}
         content={questions.content}
         author={questions.author}
         />
         
       )
     })}
     </div>
   </main>
 </div>
  )
}