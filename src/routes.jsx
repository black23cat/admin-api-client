import App from './App';
import PoPage from './components/PoPage/PoPage';
import InvoicePage from './components/InvoicePage/InvoicePage';
import PoForm from './components/PoForm/PoForm';
import JobData from './components/JobData/JobData';
import PaymentData from './components/PaymentData/PaymentData';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/purchase-order',
        element: <PoPage />,
      },
      { path: '/purchase-order/create', element: <PoForm /> },
      { path: '/invoice', element: <InvoicePage /> },
      { path: '/job-data', element: <JobData /> },
      { path: '/payment', element: <PaymentData /> },
    ],
  },
];

export default routes;
