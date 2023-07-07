import paymentTypes from 'constants/paymentTypes';

const bindPaymentIcon = paymentType => {
  switch (paymentType) {
    case paymentTypes.BILLET:
      return 'bar-code';
    case paymentTypes.CASH:
      return 'cash';
    case paymentTypes.CREDIT:
      return 'credit';
    case paymentTypes.DEBT:
      return 'debt';
    case paymentTypes.PIX:
      return 'pix';
    default:
      return null;
  }
};

export default bindPaymentIcon;
