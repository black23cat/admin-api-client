import { useState } from 'react';
import toggleSidebarIcon from '../../images/toggle-sidebar.png';
import { useNavigate } from 'react-router';

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <aside className={`sidebar ${showSidebar ? 'show' : ''}`}>
      <div className="sidebar-menu">
        <p>Menu</p>
        <button
          data-test-id="sidebar-button"
          onClick={() => navigate('/purchase-order')}
        >
          Puchase Order (PO)
        </button>
        <button
          data-test-id="sidebar-button"
          onClick={() => navigate('/invoice')}
        >
          Invoice
        </button>
        <button
          data-test-id="sidebar-button"
          onClick={() => navigate('/job-data')}
        >
          Data Kerja
        </button>
        <button data-test-id="sidebar-button">Kas Mingguan</button>
      </div>
      <div className="toggle-sidebar-wrapper">
        <button onClick={toggleSidebar}>
          <img src={toggleSidebarIcon} alt="toggle sidebar" />
        </button>
      </div>
    </aside>
  );
}
