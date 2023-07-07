const types = ['INSTALLMENTS.NO', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'X8', 'X9', 'X10', 'X11', 'X12'];

const bind = {
  'INSTALLMENTS.NO': 'INSTALLMENTS.NO',
  X2: '2x',
  X3: '3x',
  X4: '4x',
  X5: '5x',
  X6: '6x',
  X7: '7x',
  X8: '8x',
  X9: '9x',
  X10: '10x',
  X11: '11x',
  X12: '12x',
};

const toServer = {
  'INSTALLMENTS.NO': 1,
  X2: 2,
  X3: 3,
  X4: 4,
  X5: 5,
  X6: 6,
  X7: 7,
  X8: 8,
  X9: 9,
  X10: 10,
  X11: 11,
  X12: 12,
};

const installments = {
  types,
  bind,
  toServer,
};

export default installments;
