import { } from 'react';
import Navbar from './Components/Shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Components/Shared/Footer/Footer';

const App = () => {
  return (
    <>
      <Navbar />
      <div className='min-h-screen'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default App;