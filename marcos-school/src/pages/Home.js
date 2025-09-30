import { Link } from 'react-router-dom'
import styles from '../sass/Home.module.css'

function Home() {

    const userData = JSON.parse(sessionStorage.getItem('currentUser'))

    const formateBr = (data) => {
        if (!data) return 'Primeiro acesso em curso.'

        const dataObj = new Date(data)
        return dataObj.toLocaleDateString('pt-BR')
    }

    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <div className={styles.info_system}>
                    <h1>
                        Bem-vindo {userData.name} ao Aula+
                    </h1>
                    <h3>
                        Sistema de Gestão Acadêmica Inteligente
                    </h3>
                    <p>
                        Otimizando processos, simplificando a educação.
                    </p>
                </div>
                <nav className={styles.nav_system} >
                    <ul>
                        <li>
                            <Link to="/listofclasses">
                                Lista de aulas
                            </Link>
                        </li>
                        <li>
                            <Link to="/classcontrol">
                                Controle de turma
                            </Link>
                        </li>
                        <li>
                            <Link to="/createclass">
                                Cadastro de Turmas
                            </Link>
                        </li>
                    </ul>
                </nav>
                <span className={styles.last_login_text}>
                    Seu último acesso: {formateBr(userData.ultimo_login)}
                </span>
            </div>
        </section>
    )
}

export default Home