import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  const handleVerProyectos = () => {
    // Redirige a la página de login
    router.push('/login');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1></h1>
      <h1 style={{ color: 'black' }}>Bienvenido a Gestor de Proyectos React de la materia DPS</h1>
      <p>Sistema de gestión de proyectos utilizando React y Next.js.</p>
      <button
        onClick={handleVerProyectos}
        style={{
          display: 'inline-block',
          padding: '0.5rem 1rem',
          backgroundColor: '#0070f3',
          color: '#fff',
          textDecoration: 'none',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer',
          marginTop: '1rem',
        }}
      >
        Inicia Sesion
      </button>
    </div>
  );
};

export default Home;
