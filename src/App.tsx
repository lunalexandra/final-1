import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, /*Form*/ } from 'react-router-dom';
import { HomePage, TrainPage} from './pages';
import { Layout } from './components/layout';

import "./App.css";

export default function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" index element={<HomePage />} />
        <Route path="/trains" element={<TrainPage />} />
        {/*
        
        <Route path="/timeattack" element={<TimeAttackPage />} />
        <Route path="/forza" element={<ForzaPage />} />
        <Route path="*" element={<NotFound />} /> */}
      </Route>
    ),
    { basename: '/final-1' }
  );

  return (
    <RouterProvider router={routes} />
  );
}
