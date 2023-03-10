import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useUserContext } from '../context/ContextProvider';
import { useEffect } from 'react';
import Sidebar from './Sidebar';
import useToggle from '../hooks/useToggle';

function Layout() {
  const { state } = useUserContext();
  const navigate = useNavigate();
  const [isSidebarShown, toggleSidebar] = useToggle(true);

  useEffect(() => {
    if (!state.user?.token) {
      navigate('/auth/login');
    }
  }, [state.user, navigate]);

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <Sidebar isSidebarShown={isSidebarShown} toggleSidebar={toggleSidebar} />

      <div
        className={`ml-4 h-[calc(100vh-4rem)] flex-1 overflow-y-auto px-6 py-4 duration-500 ${
          isSidebarShown ? 'sm:ml-52' : undefined
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}
export default Layout;
