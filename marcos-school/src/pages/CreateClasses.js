import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import styles from '../sass/CreateClasses.module.css'

function CreateClasses() {

    const navigate = useNavigate()
    const formRef = useRef()
    const userData = JSON.parse(sessionStorage.getItem('currentUser'))
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (isSubmitting) return
        setIsSubmitting(true)

        const formData = new FormData(formRef.current)
        const data = Object.fromEntries(formData)

        try {
            await classCreation(data)
            formRef.current.reset()
            alert('[SISTEMA] Turma criada com sucesso.')
            navigate('/classcontrol')
        } finally {
            setIsSubmitting(false)
        }
    }

    const classCreation = async (dataForm) => {
        try {
            const response = await axios.post('http://localhost:5000/api/enrollclass', {
                nome_disciplina: dataForm.nome_disciplina,
                id_minister: userData.id_minister,
                modalidade: dataForm.modalidade,
            })
            return response.data
        } catch (err) {
            console.error(`[ERRO] ${err.message}`)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>
                    Área de criação de classe
                </h2>
            </div>

            <form ref={formRef}
                onSubmit={handleSubmit}
                className={styles.content_form}>

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
                    <option value="Hibrido">
                        Híbrido
                    </option>
                    <option value="EAD">
                        EAD
                    </option>

                </select>

                <button type="submit">
                    {isSubmitting ? 'Criando...' : 'Criar turma'}
                </button>

            </form>
        </div>
    )
}

export default CreateClasses