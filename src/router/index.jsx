import { createHashRouter, createBrowserRouter } from 'react-router-dom';
import { getRoutes } from './routes';

const basename = document.querySelector("base")?.getAttribute("href") ?? "/";
const router = createHashRouter(getRoutes(), { basename });

export default router;
