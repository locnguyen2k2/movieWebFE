import { Outlet } from 'react-router-dom';
import { Header, Footer } from './../../partials/index';

function DefaultLayout() {
  return (
    <div className="container-fluid App">
      <Outlet />
    </div>
  )
}

export default DefaultLayout;
