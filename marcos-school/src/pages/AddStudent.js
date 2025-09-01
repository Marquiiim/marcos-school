import { useEffect, useState } from 'react'
import axios from 'axios'

import styles from '../sass/AddStudent.module.css'

function AddStudent() {

    const [studentsData, setStudentsData] = useState([])
    const [searchStudentApi, setSearchStudentApi] = useState('')

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await axios.post('http://localhost:5000/api/fetchstudents', {
                name_student: ''
            })
            setStudentsData(response.data)
        }
        fetchStudents()
    }, [])

    const searchStudents = async (name_student = '') => {
        setStudentsData([])
        try {
            const response = await axios.post('http://  localhost:5000/api/fetchstudents', {
                name_student: searchStudentApi
            })
            setStudentsData(response.data)
        } catch (err) {
            console.error(`[ERRO] ${err.message}`)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            searchStudents()
        }
    }

    const formatDate = (datestring) => {
        return new Date(datestring).toLocaleDateString('pt-BR')
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2>
                    Área de adição de alunos na classe
                </h2>

                <div className={styles.search_area}>
                    <input
                        type='text'
                        placeholder='Procure pelo ID ou Nome do aluno'
                        value={searchStudentApi}
                        onChange={(e) => setSearchStudentApi(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <section className={styles.content_students}>
                    <ul>
                        {studentsData.map((student) => (
                            <li key={student.id}>
                                <h3>
                                    {student.name}
                                    <span>
                                        #{student.id}
                                    </span>
                                </h3>
                                <div>
                                    <div>
                                        {formatDate(student.created_at)}
                                    </div>
                                    <span>
                                        {student.status}
                                    </span>
                                    <button>
                                        Adicionar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default AddStudent