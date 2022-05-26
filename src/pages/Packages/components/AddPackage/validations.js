export const required = {
  value: true,
  message: 'This field is required',
};
export const weightOrPriceValidation = {
  required,
  pattern: {
    value: /^\d+$/,
    message: 'This field Accepts numbers only',
  },
  custom: {
    isValid: value => value >= 0,
    message: 'This field accepts positive numbers only',
  },
};
