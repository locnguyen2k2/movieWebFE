import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './../../partials/index'
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../components/Context';

function AdminLayout() {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const [permission, setPermission] = useState(false);
  useEffect(() => {
    if (user.permission) {
      if (user.permission.admin) {
        setPermission(true);
      }
    }
  }, [user])
  return (
    <>
      {
        permission === true ?
          <div className="admin-layout">
            <div className="sidebar" >
              <Sidebar />
            </div >
            <div className='content'>
              <Outlet />
            </div>
          </div>
          :
          <div className="alert alert-danger d-flex justify-content-center">
            Quyền truy cập không hợp lệ!
          </div>
      }
    </>
  )
}

export default AdminLayout;
