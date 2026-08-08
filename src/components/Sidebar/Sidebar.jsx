import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './Sidebar.module.css';
import Backdrop from '../Backdrop/Backdrop';
import printerIcon from '../../assets/images/printer.png';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import ShoppingCart from '../../assets/svg/ShoppingCart';
import Receipt from '../../assets/svg/Receipt';
import JobData from '../../assets/svg/JobData';
import Payment from '../../assets/svg/Payment';
import SidebarToggle from '../../assets/svg/SidebarToggle';

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeSidebarButton, setActiveSidebarButton] = useState('');
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const handleSidebarButtonClick = (page) => {
    setActiveSidebarButton(page);
    setShowSidebar(false);
    switch (page) {
      case 'po':
        navigate('/purchase-order');
        break;
      case 'invoice':
        navigate('/invoice');

        break;
      case 'jobData':
        navigate('/job-data');
        break;
      case 'payment':
        navigate('/payment');
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const handleCLoseSidebar = (e) => {
      if (e.key !== 'Escape') {
        return;
      }
      setShowSidebar(false);
    };

    window.addEventListener('keydown', handleCLoseSidebar);
    return () => window.removeEventListener('keydown', handleCLoseSidebar);
  });

  return (
    <>
      <aside className={`${showSidebar ? styles.show : ''}`}>
        <button
          className={`${styles['sidebar-toggle']} ${showSidebar ? styles.open : ''}`}
          onClick={toggleSidebar}
        >
          <SidebarToggle />
        </button>
        <div className={styles['sidebar-header']}>
          <img src={printerIcon} width={'28px'} height={'28px'} alt="" />
          <div>
            <h4>PrintAdmin</h4>
            <p>Polygraphic</p>
          </div>
        </div>
        <div className={styles['sidebar-button']}>
          <button
            className={activeSidebarButton === 'po' ? styles.active : ''}
            data-test-id="sidebar-button"
            onClick={() => handleSidebarButtonClick('po')}
          >
            <ShoppingCart />
            Data PO
          </button>
          <button
            className={activeSidebarButton === 'invoice' ? styles.active : ''}
            data-test-id="sidebar-button"
            onClick={() => handleSidebarButtonClick('invoice')}
          >
            <Receipt />
            Invoice
          </button>
          <button
            className={activeSidebarButton === 'jobData' ? styles.active : ''}
            data-test-id="sidebar-button"
            onClick={() => handleSidebarButtonClick('jobData')}
          >
            <JobData />
            Data Kerja
          </button>
          <button
            className={activeSidebarButton === 'payment' ? styles.active : ''}
            data-test-id="sidebar-button"
            onClick={() => handleSidebarButtonClick('payment')}
          >
            <Payment />
            Kas Mingguan
          </button>
        </div>
        <ThemeToggle sidebar={true} />
      </aside>{' '}
      <Backdrop
        isOpen={showSidebar}
        closeSidebar={() => setShowSidebar(false)}
      />
    </>
  );
}
