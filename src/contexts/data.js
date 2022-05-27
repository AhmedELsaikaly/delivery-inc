import { createContext, useState, useEffect } from 'react';
import Loader from './../components/common/Loader';
import { useApi } from '../hooks';
import { getTotalPackagesWeight, getTotalPrice } from '../helpers';

export const DataContext = createContext({
  data: { customers: [], packages: [] },
  invoices: [],
  createInvoice: () => {},
  deleteCustomer: () => {},
  changePackageOrder: () => {},
  createPackage: () => {},
  deletePackage: () => {},
  sortPackages: () => {},
  getPackagesByCustomerId: () => {},
  getInvoices: () => {},
});

const DataProvider = ({ children }) => {
  const [data, setData] = useState({ customers: [], packages: [] });
  const [invoices, setInvoices] = useState([]);

  const { loading, data: newData } = useApi('/data.json');

  useEffect(() => {
    if (newData !== null) {
      const newPackages = sortPackages(newData?.packages);
      setData({ customers: newData?.customers, packages: newPackages });
    }
  }, [newData]);

  const createInvoice = item => setData(items => [...items, item]);

  // assign the index to shipping order
  const assignIndexToShippingOrder = arr => {
    arr.forEach((_, index) => {
      arr[index].shippingOrder = index + 1;
    });
  };

  // change the order of package based on index
  const changePackageOrder = (packageOrder, type) => {
    const { packages } = data;
    let newPackages = packages;
    const element = packages[packageOrder];
    if (element) {
      switch (type) {
        case 'up':
          newPackages.splice(packageOrder, 1);
          newPackages.splice(packageOrder - 1, 0, element);
          assignIndexToShippingOrder(newPackages);
          setData({ ...data, packages: newPackages });
          break;
        case 'down':
          newPackages.splice(packageOrder, 1);
          newPackages.splice(packageOrder + 1, 0, element);
          assignIndexToShippingOrder(newPackages);
          setData({ ...data, packages: newPackages });
          break;
        default:
          return;
      }
    }
  };

  // create new package
  const createNewPackage = packageItem => {
    const { packages } = data;
    // increase the shipping order count after adding new package
    packages.forEach((item, _) => {
      item.shippingOrder += 1;
    });
    setData({ ...data, packages: [packageItem, ...packages] });
  };

  // delete customer form customers list
  const deleteCustomer = id => {
    const { customers, packages } = data;
    const newCustomers = customers?.filter(customer => customer.id !== id);
    const newPackages = packages?.filter(
      packageItem => packageItem.customerid !== id
    );
    setData({ packages: newPackages, customers: newCustomers });
  };

  // delete package by id
  const deletePackage = id => {
    const { packages } = data;
    const newPackages = packages?.filter(item => item.id !== id);
    // decrease the shipping order count for the packages that after the package
    assignIndexToShippingOrder(newPackages);
    setData({ ...data, packages: newPackages });
  };

  // get Sorted Packages
  const sortPackages = packagesArr => {
    return packagesArr.sort(
      (a, b) => parseFloat(a?.shippingOrder) - parseFloat(b?.shippingOrder)
    );
  };

  //getPackages By user Id
  const getPackagesByCustomerId = id => {
    const { packages } = data;
    if (
      Array.isArray(packages) &&
      packages.length &&
      id !== undefined &&
      id !== null
    ) {
      const idNumber = parseInt(id);
      return packages?.filter(item => item.customerid === idNumber);
    }
  };

  // get Customer name by id
  const getInvoices = () => {
    const { customers } = data;
    const invoicesArr = [];
    customers?.forEach(customer => {
      const packages = getPackagesByCustomerId(customer?.id);
      invoicesArr.push({
        customerName: customer?.name,
        totalWeight: getTotalPackagesWeight(packages),
        totalPrice: getTotalPrice(packages),
        packagesCount: packages.length,
        customerId: customer?.id,
      });
    });
    setInvoices(invoicesArr);
  };
  const value = {
    data,
    createInvoice,
    deleteCustomer,
    changePackageOrder,
    createNewPackage,
    deletePackage,
    sortPackages,
    getPackagesByCustomerId,
    getInvoices,
    invoices,
  };
  if (loading) {
    return <Loader />;
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
