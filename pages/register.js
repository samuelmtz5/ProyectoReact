import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Register = () => {
  const router = useRouter();
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que las contraseñas coincidan
    if (registerForm.password !== registerForm.confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }
    // Obtener la lista de usuarios desde localStorage o iniciar un array vacío
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // Verificar si ya existe un usuario con ese correo
    const existingUser = users.find((u) => u.email === registerForm.email);
    if (existingUser) {
      setErrorMessage('El usuario ya está registrado.');
      return;
    }
    // Crear el nuevo usuario
    const newUser = {
      id: Date.now(),
      username: registerForm.username,
      email: registerForm.email,
      password: registerForm.password,
    };
    // Actualizar la lista de usuarios
    const updatedUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    // Redirigir al login luego de un registro exitoso
    router.push('/login');
  };

  // Estilos simples
  const containerStyle = {
    maxWidth: '400px',
    margin: '2rem auto',
    fontFamily: 'Arial, sans-serif',
    padding: '1rem',
    textAlign: 'center',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.8rem',
    margin: '0.5rem 0',
    fontSize: '16px',
  };

  const buttonStyle = {
    padding: '0.8rem',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '16px',
  };

  return (
    <div style={containerStyle}>
      <h1>Registrarse</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={registerForm.username}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={registerForm.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={registerForm.password}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          value={registerForm.confirmPassword}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit" style={buttonStyle}>
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
