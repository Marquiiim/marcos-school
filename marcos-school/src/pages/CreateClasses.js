import { useRef } from 'react'
import axios from 'axios'

import styles from '../sass/CreateClasses.module.css'

function CreateClasses() {

    const formRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(formRef.current)
        const data = Object.fromEntries(formData)
        classCreation(data)
    }

    const classCreation = (dataForm) => {
        try {
            const response = axios.post('http://localhost:5000/api/classmanager', {
                id_professor: dataForm.id_professor,
                nome_disciplina: dataForm.nome_disciplina,
                modalidade: dataForm.modalidade,
                status_turma: dataForm.status_turma
            })
            console.log(response.data)
        } catch (err) {
            console.error(`[ERRO] ${err.message}`)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.title_page}>
                <h2>
                    Área de criação de classe
                </h2>
            </div>

            <form ref={formRef}
                onSubmit={handleSubmit}
                className={styles.content_form}>

                <input type="number"
                    name="id_professor"
                    placeholder="ID do professor"
                    required />

                <input type="text"
                    name="nome_disciplina"
                    placeholder="Nome da disciplina"
                    required />

                <select name="modalidade"
                    required
                    defaultValue="">

                    <option value="" disabled>
                        Modalidade
                    </option>
                    <option value="Presencial">
                        Presencial
                    </option>
                    <option value="Híbrido">
                        Híbrido
                    </option>
                    <option value="EAD">
                        EAD
                    </option>

                </select>

                <select name="status_turma"
                    required
                    defaultValue="">

                    <option value="" disabled>
                        Status da turma
                    </option>
                    <option value="Ativa">
                        Ativa
                    </option>
                    <option value="Inativa">
                        Inativa
                    </option>
                    <option value="Concluída">
                        Concluída
                    </option>

                </select>

                <div className={styles.button_student_add}>
                    <span>ÁREA PARA ADIÇÃO DE ALUNOS</span>
                </div>
                <button type="submit">
                    Criar turma
                </button>

            </form>
        </div>
    )
}

export default CreateClasses