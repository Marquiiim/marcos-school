import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import styles from '../../sass/AddStudent.module.css'

function AddStudent() {

    const [studentsData, setStudentsData] = useState([])
    const [refresh, setRefresh] = useState(0)
    const [searchStudentApi, setSearchStudentApi] = useState('')
    const [filterStudents, setFilterStudents] = useState(false)
    const userData = JSON.parse(sessionStorage.getItem('currentUser'))
    const { class_id } = useParams()

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/fetchstudents', {
                    name_student: '',
                    class_id: class_id
                })
                setStudentsData(response.data)
            } catch (err) {
                console.error(`[ERRO] ${err.message}`)
            }
        }
        fetchStudents()
    }, [class_id, refresh])

    const fetchStudentsInClass = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/studentsinclass', {
                class_id: class_id
            })
            setStudentsData(response.data)
        } catch (err) {
            console.error(`[ERRO] ${err.message}`)
        }
    }

    const searchStudents = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/searchstudents', {
                name_student: searchStudentApi,
                class_id: class_id,
                filter: filterStudents
            })
            setStudentsData(response.data)
        } catch (err) {
            console.error(`[ERRO] ${err.message}`)
        }
    }


    const addStudentClass = async (id_student) => {
        try {
            await axios.post(`http://localhost:5000/api/addstudentclass`, {
                minister_id: userData.id_minister,
                student_id: id_student,
                class_id: class_id
            })
            await searchStudents(filterStudents)
        } catch (err) {
            console.error(`[ERRO] ${err.message}`)
        }
    }

    const removeStudentInClass = async (id_student) => {
        try {
            await axios.post(`http://localhost:5000/api/removestudentclass`, {
                student_id: id_student
            })
            await searchStudents(filterStudents)
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

    const toggleFilter = async (e) => {
        e.preventDefault()
        const newFilterState = !filterStudents
        setFilterStudents(newFilterState)

        if (newFilterState) {
            await fetchStudentsInClass()
        } else {
            setRefresh(prev => prev + 1)
        }
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
                        placeholder='Procure pelo Nome do aluno'
                        value={searchStudentApi}
                        onChange={(e) => setSearchStudentApi(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={toggleFilter}>
                        {filterStudents ? "Ver todos os alunos" : "Alunos em classe"}
                    </button>
                </div>

                <section className={styles.content_students}>
                    <ul>
                        {studentsData.map((student) => (
                            <li key={student.id}>
                                <h3>
                                    {student.name}
                                    <span>
                                        #{student.student_id}
                                    </span>
                                </h3>
                                <div>
                                    <span
                                        className={`${styles.status} ${styles[student.status]}`}>
                                        {student.status}
                                    </span>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            filterStudents ? removeStudentInClass(student.student_id) : addStudentClass(student.student_id)
                                        }}
                                        disabled={student.status === 'Inativo'}
                                    >
                                        {filterStudents ? "Remover" : "Adicionar"}
                                    </button>
                                </div>
                            </li>
                        ))
                        }
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default AddStudent