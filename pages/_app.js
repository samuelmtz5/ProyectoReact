import '../styles/globals.css'; // Estilos globales
import Layout from '../components/Layout'; // Layout general para las páginas protegidas
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Definir rutas públicas (rutas donde el layout no debe aplicarse)
  const noLayoutRoutes = ['/', '/login', '/register'];

  // Determinar si la página actual está dentro de las rutas públicas
  const isPublicRoute = noLayoutRoutes.includes(router.pathname);

  return isPublicRoute ? (
    // Si es una página pública, renderiza sin layout
    <Component {...pageProps} />
  ) : (
    // Si no es una página pública, aplica el layout
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
