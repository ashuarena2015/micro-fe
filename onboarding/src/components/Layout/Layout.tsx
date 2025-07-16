import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Layout.css"; // Assuming you have a CSS file for styling

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] =
    React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const authentication = async () => {
    setIsLoading(true);
    await dispatch({
      type: "apiOnboardingRequest",
      payload: {
        url: `/api/account/user-info`,
        method: "GET",
        onError: (getError: any) => {
          if (getError?.status === 403) {
            // navigate("/");
          }
        },
        onSuccess: (getSuccessResponse: any) => {
          console.log('getSuccessResponse?.data', getSuccessResponse?.data);
          if (getSuccessResponse?.data?.isProfileFetched) {
            setIsLoading(false);
            setIsLoggedIn(true);
          } else {
            navigate("/");
          }
        },
        dispatchType: "accountDetails",
      },
    });
    setIsLoading(false);
  };
  useEffect(() => {
    authentication();
  }, []);

  return (
    <div className="child-container">
      <Outlet />
    </div>
  );
};

export default Layout;
