import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Login.module.css';

const Login = () => {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  // Si ya hay un usuario logueado, redirige al menú del usuario
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        router.push('/menu'); // Redirigir al menú si ya está logueado
      }
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (u) => u.email === loginForm.email && u.password === loginForm.password
    );
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      router.push('/menu'); // Redirigir al menú del usuario después de login exitoso
    } else {
      setErrorMessage('Credenciales inválidas. Intenta de nuevo.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={loginForm.email}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={loginForm.password}
          onChange={handleChange}
          className={styles.input}
          required
        />
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <button type="submit" className={styles.button}>
          Iniciar Sesión
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        ¿Eres nuevo?{' '}
        <Link href="/register" className={styles.link}>
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
};

export default Login;
