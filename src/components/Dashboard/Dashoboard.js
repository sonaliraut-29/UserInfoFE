import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../features/actions/authActions";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import * as routes from "../constant";

const Dashboard = ({ history }) => {
  const [addresses, setAddresses] = useState([]);
  const [userId, setUserId] = useState();

  const { userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo?.data?.user?.Addresses) {
      setAddresses(userInfo?.data?.user?.Addresses);
    }

    if (userInfo?.data?.user?.id) {
      setUserId(userInfo?.data?.user?.id);
    }
  }, [userInfo]);

  const handleLogout = async () => {
    const res = await dispatch(userLogout({ userId: userId ? userId : null }));
    console.log(res);
    if (res.payload.success) {
      history.push({ pathname: routes.ROOT_ROUTE });
    }
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Addresses</span>
    </div>
  );
  const footer = `In total there are ${
    userInfo ? userInfo?.user?.data?.user?.Addresses?.length : 0
  } products.`;

  return (
    <div className="card">
      <div>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <DataTable
        value={addresses}
        footer={footer}
        header={header}
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column field="streetAddress" header="Street Address"></Column>
        <Column field="city" header="City"></Column>
        <Column field="state" header="State"></Column>
        <Column field="zipcode" header="Zip code"></Column>
        <Column field="country" header="Country"></Column>
      </DataTable>
    </div>
  );
};

export default Dashboard;
