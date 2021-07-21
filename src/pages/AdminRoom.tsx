import { useHistory, useParams } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button/index'
import { RoomCode } from '../components/RoomCode/index'
import '../style/room.scss'
// import { useAuth } from '../hooks/useAuths'
import deleteImg from '../assets/images/delete.svg'
import { Question } from '../components/Question/index'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'



type RoomParams = {
  id: string;
}



export function AdminRoom() {
  // const {user} = useAuth()
  const params = useParams<RoomParams>()
  const history = useHistory()
  const roomId = params.id

  const {title, questions} = useRoom(roomId)

  async function handleEndRoom() {
  await database.ref(`rooms/${roomId}`).update({
    endedAtt: new Date(),
  })  

  history.push('/')
  }

  async function handleDeleteQuestion(questionId:string) {
  if (window.confirm('Tem certeza que você deseja excluir essa pergunta?')) {
    const questionRef = await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }





  return (
 <div id="page-room">
   <header>
     <div className="content">
      <img src={logoImg} alt="LetMeAsk" />
      <div>
        <RoomCode code={roomId}/>
        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
      </div>
     </div>
   </header>


   <main>
     <div className="room-title">
       <h1>Sala {title}</h1>
       {questions.length> 0 && <span>{questions.length} pergunta(s)</span>}
     </div>


     <div className="question-list">
     {questions.map(questions => {
       return (
         <Question 
         key={questions.id}
         content={questions.content}
         author={questions.author}
         >
           <button
           type="button"
           onClick={() => handleDeleteQuestion(questions.id)}
           >
             <img src={deleteImg} alt="Remover pergunta" />
           </button>
         </Question>
         
       )
     })}
     </div>
   </main>
 </div>
  )
}