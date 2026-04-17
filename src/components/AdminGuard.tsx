import { Navigate, Outlet } from 'react-router-dom'

/**
 * AdminGuard — protège toutes les routes /admin/*
 * L'accès est accordé uniquement si la clé de session 'mor_admin_auth' est présente.
 * Cette clé est définie sur la page AdminLogin après vérification du téléphone + PIN.
 * Elle est effacée à la fermeture de l'onglet (sessionStorage).
 */
const AdminGuard = () => {
    const isAuthenticated = sessionStorage.getItem('mor_admin_auth') === 'true'
    return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />
}

export default AdminGuard
