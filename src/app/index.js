import React, {useEffect, useState} from 'react';
import Routes from '~/routes';
import {init} from '~/config/firebase';
import Loading from '~/componentes/loading';

function App() {
  const [AppInicializado, setAppInicializado] = useState(false);

  useEffect(() => {
    init();
    setAppInicializado(true);
  }, []);

  return AppInicializado ? <Routes /> : <Loading tipo={'dots'} />;
}

export default App;
