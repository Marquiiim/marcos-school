import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import './App.css';
import Logo from './img/LOGO.webp'

function App() {

  const navigate = useNavigate()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState(false)

  const fetchUsers = async () => {
    setError(false)

    try {
      const response = await axios.post(`http://localhost:5000/api/auth`, { email: email, password: password })

      const user = {
        id_professor: response.data.user.id,
        status: response.data.user.status,
        ultimo_login: response.data.user.ultimo_login,
        name: response.data.user.username
      }

      sessionStorage.setItem('currentUser', JSON.stringify(user))

      response.data?.success === true && response.status === 200 && navigate('/home')

    } catch (err) {
      console.error(`[ERRO] ${err.message}`)
      alert("[ERRO] Ocorreu um erro ao tentar logar, tente novamente ou contate um suporte.")
      setError(true)
    }
  }

  return (
    <div className="container">
      <form className="content">

        <label className="info-area">
          Área de Login
        </label>

        <img src={Logo} alt="Logo" />

        {error &&
          <span className='credentials-invalid'>
            Credenciais inválidas
          </span>
        }

        <input type="email" placeholder="Insira seu email" required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input type="password" placeholder="Insira sua senha" required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="login-button"
          onClick={(e) => {
            e.preventDefault()
            fetchUsers(email)
          }}
        >
          Entrar
        </button>

        <span className="warning-login">
          Apenas usuários credenciados podem ter acesso ao sistema.
        </span>

      </form>
    </div >
  );
}

export default App;
