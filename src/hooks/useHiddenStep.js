import { useEffect, useState } from 'react';

const useHiddenStep = ({ target, step }) => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (target === step) setHidden(false);
    else setHidden(true);
  }, [step, target]);

  return { hidden };
};

export default useHiddenStep;
