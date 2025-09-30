import { useEffect, useState } from 'react'
import axios from 'axios'

import styles from '../../sass/ListOfClasses.module.css'

function ListOfClasses() {

    const [dataClasses, setDataClasses] = useState([])

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.post(`http://localhost:5000/api/fetchclass`, {
                    id_minister: 0
                })
                console.log(response.data.data)
                setDataClasses(response.data.data)
            } catch (err) {
                console.error(`[ERRO] ${err.message}`)
            }
        }
        fetchClasses()
    }, [])

    return (
        <div className={styles.container}>
            {dataClasses.map((classes) => (
                <div key={classes.id} className={styles.itemContainer}>
                    <ul className={styles.content}>
                        <li data-label="Disciplina">
                            <span>
                                {classes.discipline_name || 'N/A'} - {classes.id || 'N/A'}
                            </span>
                        </li>
                        <li data-label="Modalidade">
                            <span>{classes.modality || 'N/A'}</span>
                        </li>
                        <li data-label="Status">
                            <span className={classes.status === 'Inativa' ? styles.inactive : ''}>
                                {classes.status || 'N/A'}
                            </span>
                        </li>
                        <li data-label="Criada">
                            <span>{classes.created_at ? new Date(classes.created_at).toLocaleDateString('pt-BR') : 'N/A'}</span>
                        </li>
                        <li data-label="Atualizada">
                            <span>{classes.updated_at || 'N/A'}</span>
                        </li>
                        <li data-label="Professor">
                            <span>{classes.minister || 'N/A'}</span>
                        </li>
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default ListOfClasses