import { Routes, Route } from 'react-router-dom'
import Login from '../../App'
import Home from '../Home'
import CreateClasses from '../CreateClasses'

export default function AppRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<CreateClasses />} />
        </Routes>
    )
}