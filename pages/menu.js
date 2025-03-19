import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Menu.module.css';

const Menu = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Verifica si el usuario está autenticado
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        router.push('/login'); // Redirige si no hay usuario autenticado
      }
    }
  }, [router]);

  // Manejo del cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('currentUser'); // Elimina al usuario
    router.push('/'); // Redirige al índice
  };

  return (
    <div className={styles.container}>
    
      <main className={styles.main}>
        <h2>Bienvenido {user ? user.username : 'Usuario'}</h2>
        <p>Organiza tus proyectos y tareas de manera sencilla y eficiente.</p>
      </main>
      <footer className={styles.footer}>
        © 2025 Project Manager. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Menu;
