import { Link } from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import '../style/auth.scss'
import { Button } from '../components/Button'
// import { useAuth } from '../hooks/useAuths'


export function NewRoom() {
  // const {user} = useAuth()

  return(
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie sala de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua aundiência em tempo real</p>
      </aside>


      <main>
        <div className="main-content">
          <img src={logoImg} alt="LetMeAsk" />
       <h2>Criar uma nova sala</h2>
        
          <form >
            <input 
            
              type="text" 
              placeholder='Nome da sala'

              />
                <Button type="submit">Criar sala</Button>
            </form>

            <p>
              Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>

            </p>
        
        </div>
      </main>
    </div>
    
  )
}