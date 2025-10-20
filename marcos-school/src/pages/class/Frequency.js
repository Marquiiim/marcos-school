import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BiCheckDouble } from "react-icons/bi";
import axios from "axios"

import styles from '../../sass/Frequency.module.css'

function Frequency() {

    const [studentsData, setStudentsData] = useState([])
    const [refresh, setRefresh] = useState(0)
    const { class_id } = useParams()
    const currentDate = new Date().toISOString().split('T')[0]

    useEffect(() => {
        const fetchStudentsInClass = async () => {
            try {
                const response = await axios.post(`http://localhost:5000/api/studentsinclass`, {
                    class_id: class_id
                })
                setStudentsData(response.data)
            } catch (err) {
                console.error(`[ERRO] ${err.message}`)
            }
        }

        const fetchStudentsFrequency = async () => {
            try {
                const response = await axios.post(`http://localhost:5000/api/getfrequency`, {
                    currentDay: currentDate,
                    class_id: class_id
                })

                setStudentsData(prev =>
                    prev.map(student => {
                        const studentData = response.data.data.find(s => s.student_id === student.student_id)

                        if (!studentData) return student

                        return {
                            ...student,
                            attendance_record: true,
                            present: studentData.present === 'true'
                        }
                    }
                    ))
            } catch (err) {
                console.error(`[ERRO] ${err.message}`)
            }
        }

        fetchStudentsInClass()
        fetchStudentsFrequency()

    }, [class_id, currentDate, refresh])

    const markFrequency = async (student_id, present, arrival_time = null, notes = "") => {

        setRefresh(prev => prev + 1)

        try {
            const response = await axios.post(`http://localhost:5000/api/frequency`, {
                student_id: student_id,
                class_id: class_id,
                present: present,
                arrival_time: present ? arrival_time : null,
                notes: notes
            })
            if (response.data?.success) {
                setStudentsData(prev =>
                    prev.map(s => s.student_id === student_id ? {
                        ...s,
                        attendance_record: true,
                        present: present
                    } : s
                    ))
            }
        } catch (err) {
            console.error(`[ERRO] ${err.message}`)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2>
                    Frequência turma: {new Date().toLocaleDateString('pt-BR')}
                </h2>

                <section className={styles.content_students}>
                    <ul>
                        {studentsData.map((student) => (
                            <li key={student.student_id}>
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
                                    <span
                                        className={
                                            `${styles.status} ${styles[!student.attendance_record ? 'Pendente' : student.present ? 'Presente' : 'Ausente']}`}>

                                        Situação: {!student.attendance_record ? 'Pendente' : student.present ? 'Presente' : 'Ausente'}
                                    </span>



                                    {student.attendance_record !== undefined ? (
                                        <span className={styles.checked_frequency}>
                                            Registrado <BiCheckDouble />
                                        </span>
                                    )
                                        :
                                        (
                                            <>
                                                <button
                                                    disabled={student.status === "Inativo"}
                                                    onClick={() => markFrequency(
                                                        student.student_id,
                                                        true,
                                                        new Date().toLocaleTimeString().slice(0, 8)
                                                    )}>
                                                    Presente
                                                </button>

                                                <button
                                                    disabled={student.status === "Inativo"}
                                                    onClick={() => markFrequency(
                                                        student.student_id,
                                                        false
                                                    )}>
                                                    Ausente
                                                </button>
                                            </>
                                        )
                                    }
                                </div>
                            </li>
                        ))
                        }
                    </ul>
                </section>
            </div>
        </div >
    )
}

export default Frequency