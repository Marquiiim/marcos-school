import { useState } from 'react'
import axios from 'axios'

import './App.css';
import Logo from './img/LOGO.webp'

function App() {

  const [email, setEmail] = useState()

  const fetchUsers = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/login/${email}`)
      console.log(response.data)
    } catch (err) {
      console.error(`[Erro] ${err.response?.data || err.message}`)
    }
  }

  return (
    <div className="container">
      <form className="content">

        <label className="info-area">
          Área de Login
        </label>

        <img src={Logo} alt="Logo" />

        <input type="email" placeholder="Insira seu email" required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input type="password" placeholder="Insira sua senha" required />

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
    </div>
  );
}

export default App;
