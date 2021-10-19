import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';
// import { selectUserDetail } from 'admin_desktop/selectors/auth/account.selector';

const AdminContext = React.createContext({});

const useAdminContext = (): any => React.useContext(AdminContext);

const AdminProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  //   const userDetail = useSelector(selectUserDetail);

  const value = {
    user: {},
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

AdminProvider.propTypes = {
  children: PropTypes.node,
};

export default memo(AdminProvider);
export { AdminContext, useAdminContext };
