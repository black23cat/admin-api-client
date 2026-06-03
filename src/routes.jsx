import App from './App';
import PoPage from './components/PoPage/PoPage';
import InvoicePage from './components/InvoicePage/InvoicePage';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/purchase-order',
        element: <PoPage />,
      },
      { path: '/invoice', element: <InvoicePage /> },
    ],
  },
];

export default routes;
