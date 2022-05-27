// get total weight
export const getTotalPackagesWeight = packagesArr => {
  if (Array.isArray(packagesArr) && packagesArr.length > 0) {
    return packagesArr.reduce(
      (initialVal, packageItem) => initialVal + parseInt(packageItem?.weight?.replace('kg', '')),
      0
    );
  }
};

// get Total Price
export const getTotalPrice = packagesArr => {
  if (Array.isArray(packagesArr) && packagesArr.length > 0) {
    return packagesArr.reduce((initialVal, packageItem) => initialVal + packageItem.price, 0);
  }
};

// get Customer name by id
export const getCustomerNameById = (id, customersArr) => {
  if (id !== undefined && id !== null) {
    const idNumber = parseInt(id);
    return customersArr?.find(customer => customer?.id === idNumber)?.name;
  }
};
