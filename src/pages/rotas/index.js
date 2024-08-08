import React, {useState, useEffect} from 'react';
import Container from '~/componentes/container';
import {getAdminRotas} from '~/servicos/firebase_api';
import Grid from '~/componentes/grid';
import {getNLinhasPadraoGrid} from '~/core';

export default function Rotas(props) {
  const [loading, setLoading] = useState(false);
  const [Inicio, setInicio] = useState(true);
  const [Rotas, setRotas] = useState([]);
  const [Total, setTotal] = useState(0);
  const [Page, setPage] = useState(1);
  const [LinhasPorPagina, setLinhasPorPagina] = useState(
    getNLinhasPadraoGrid(),
  );
  
    

  const CamposHeader = ['NOME', 'PATH'];
  const CamposBody = ['nome', 'path'];

  useEffect(() => {
    carregarDados();
  }, [Inicio]); 

   useEffect(() => {
    //console.log('Page : ' + Page);
    carregarDados();
  }, [Page]); 

  const carregarDados = async (PageParm = Page) => {
    setLoading(true);

    let RotasAux = await getAdminRotas();
    setTotal(RotasAux.length);

    setRotas(RotasAux);
    setLoading(false);
  };

  return (
    <Container loading={loading} {...props}>
      <Grid
        Rota={'rotas'}
        Rows={Rotas}
        Total={Total}
        CamposHeader={CamposHeader}
        CamposBody={CamposBody}
        setPage={setPage}
        setLinhasPorPagina={setLinhasPorPagina}
      />
    </Container>
  );
}
