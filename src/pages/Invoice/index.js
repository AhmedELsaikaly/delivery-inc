import { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDocTitle } from '../../hooks';
import { DataContext } from '../../contexts/data';
import { EmptyState } from '../../components/common';
import { ROUTES } from '../../constants';
import {
  getTotalPackagesWeight,
  getTotalPrice,
  getCustomerNameById,
} from '../../helpers';

import s from './index.module.css';

const Invoices = () => {
  const [rowData, setRawData] = useState([]);
  const [customerName, setCustomerName] = useState();

  const params = useParams();
  useDocTitle('Invoice delivery Inc');
  // context data
  const {
    getPackagesByCustomerId,
    data: { customers },
  } = useContext(DataContext);

  // get packages that related with user based on customer id
  useEffect(() => {
    const { customerId } = params;
    if (customerId !== null && customerId !== undefined) {
      setRawData(getPackagesByCustomerId(customerId));
      setCustomerName(getCustomerNameById(customerId, customers));
    }
  }, [params]);

  const columnsData = ['id', 'weight', 'price'];

  const tableBody = rowData?.map(function (row) {
    return (
      <tr key={row.id}>
        {columnsData.map(function (column) {
          return <td key={column}>{row[column]}</td>;
        })}
      </tr>
    );
  });
  return (
    <>
      {rowData?.length > 0 ? (
        <div className={s.invoice}>
          <div className={s.invoiceWrap}>
            <div className={s.invoiceHead}>
              <div className={s.dateNameWrap}>
                <p>
                  <time datetime={new Date().toISOString().slice(0, 10)}>
                    {new Date().toISOString().slice(0, 10)}
                  </time>
                </p>
                <h3>{customerName}</h3>
              </div>
              <div className={s.invoiceNameWrap}>
                <h2>Invoice</h2>
                <p>{`No.${new Date().getTime() * Math.random() * 100000}`}</p>
              </div>
            </div>
            <table className={s.invoiceTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Weight</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {tableBody}
                <tr className={s.totalRow}>
                  <td></td>
                  <td>
                    Total Weight:
                    {getTotalPackagesWeight(rowData)} kg
                  </td>
                  <td>Total Price: ${getTotalPrice(rowData)}</td>
                </tr>
              </tbody>
              <tfoot></tfoot>
            </table>
            <div className={s.invoiceFooter}>
              <p>You received {rowData?.length} packages</p>
              <p>Thank you for using our services</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <EmptyState
            message="This User doesn't have any packages to create an invoice"
            buttonText='Return to Customers Page'
            ButtonLink={ROUTES.CUSTOMER}
          />
        </>
      )}
    </>
  );
};

export default Invoices;