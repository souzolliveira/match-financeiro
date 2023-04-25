const bindConfirmationIcon = isConfirmed => {
  if (isConfirmed) {
    return 'check';
  }
  return 'close';
};

export default bindConfirmationIcon;
