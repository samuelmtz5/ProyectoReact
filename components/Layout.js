import React from 'react';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();

  // Define la función handleLogout dentro del Layout
  const handleLogout = () => {
    localStorage.removeItem('currentUser'); // Elimina el usuario de localStorage
    router.push('/'); // Redirige al índice
  };

  return (
    <div>
      <header style={headerStyle}>
        <h4 style={{ margin: 0 }}>Gestor de Proyectos</h4>
        <nav style={navStyle}>
          <a href="/projects" style={navLinkStyle}>Proyectos</a>
          <a href="/tasks" style={navLinkStyle}>Tareas</a>
          <a href="/menu" style={navLinkStyle}>Menu</a>
          <button onClick={handleLogout} style={logoutButtonStyle}>Cerrar sesión</button>
        </nav>
      </header>
      <main style={mainStyle}>{children}</main>
    </div>
  );
};

// Estilos en línea
const headerStyle = {
  backgroundColor: '#0070f3',
  color: '#fff',
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
};

const navStyle = {
  display: 'flex',
  gap: '1rem',
};

const navLinkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '16px',
};

const logoutButtonStyle = {
  backgroundColor: 'red',
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
};

const mainStyle = {
  padding: '1rem',
};

export default Layout;
