import { useState } from 'react';
import toggleSidebarIcon from '../../images/toggle-sidebar.png';

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <aside className={`sidebar ${showSidebar ? 'show' : ''}`}>
      <div className="sidebar-menu">
        <p>Menu</p>
        <button data-test-id="sidebar-button">Puchase Order (PO)</button>
        <button data-test-id="sidebar-button">Invoice</button>
        <button data-test-id="sidebar-button">Data Kerja</button>
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
