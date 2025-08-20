import { Routes, Route } from 'react-router-dom'
import Login from '../../App'
import Home from '../Home'
import CreateClasses from '../CreateClasses'
import AddStudent from '../AddStudent'

export default function AppRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<CreateClasses />} />
            <Route path="/addstudent" element={<AddStudent />} />
        </Routes>
    )
}