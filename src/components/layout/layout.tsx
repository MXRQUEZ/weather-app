import React, { FC, useEffect } from "react";
import { fetchLocationByIPAction } from "../../store/actions/geolocationActions";
import { useAppDispatch, useTypedSelector } from "../../hooks/redux/redux";

interface ILayoutProps {
  children: JSX.Element;
}
const Layout: FC<ILayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  const { isLoading, error } = useTypedSelector(
    (state) => state.geolocationReducer
  );

  useEffect(() => {
    dispatch(fetchLocationByIPAction());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return <main>{isLoading ? <h1>Loading...</h1> : children}</main>;
};

export default Layout;
