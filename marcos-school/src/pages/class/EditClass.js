import { useRef, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import styles from '../../sass/EditClass.module.css'

function EditClass() {

    const navigate = useNavigate()
    const formRef = useRef()
    const { class_id } = useParams()

    const [dataClass, setDataClass] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        const fetchInfoClass = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/fetchinfoclass', {
                    class_id: class_id
                })
                setDataClass(response.data[0])
            } catch (err) {
                console.error(`[ERRO] ${err.message}`)
            }
        }
        fetchInfoClass()
    }, [class_id])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(formRef.current)
        const data = Object.fromEntries(formData)

        try {
            editClass(data)
            formRef.current.reset()
            alert('[SISTEMA] Turma editada com sucesso.')
            navigate('/classcontrol')
        } finally {
            setIsSubmitting(false)
        }
    }

    const editClass = async (data) => {
        try {
            await axios.post(`http://localhost:5000/api/editclass/${class_id}`, {
                changes: data
            })

        } catch (err) {
            console.error(`[ERRO] ${err.message}`)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>
                    Disciplina: {dataClass.discipline_name} - #{dataClass.id}
                </h2>
            </div>

            <form ref={formRef}
                onSubmit={handleSubmit}
                className={styles.content_form}>

                <div className={styles.info_section}>
                    <h3>Informações da turma:</h3>
                    <ul>
                        <li data-label="ID da turma">
                            {dataClass.id}
                        </li>
                        <li data-label="Nome da disciplina">
                            {dataClass.discipline_name}
                        </li>
                        <li data-label="Professor">
                            {dataClass.minister}
                        </li>
                        <li data-label="Modalidade">
                            {dataClass.modality}
                        </li>
                        <li data-label="Status">
                            {dataClass.class_status}
                        </li>
                    </ul>
                </div>

                <input type="text"
                    name="discipline_name"
                    placeholder="Nome da disciplina"
                    defaultValue={dataClass.discipline_name}
                    required />

                <select name="modality"
                    required
                    defaultValue={dataClass.modality}>

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
                    {isSubmitting ? 'Editando...' : 'Editar'}
                </button>

            </form>
        </div>
    )
}

export default EditClass