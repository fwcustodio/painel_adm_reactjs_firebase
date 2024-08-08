import React, {useState, useEffect} from 'react';
import Container from '~/componentes/container';
import {getPoliticasPrivacidade} from '~/servicos/firebase_api';
import Grid from '~/componentes/grid';
import {getNLinhasPadraoGrid} from '~/core';
import TableCell from '@material-ui/core/TableCell';

const PoliticasPrivacidade = (props) => {
  const [loading, setLoading] = useState(false);
  const [Inicio, setInicio] = useState(true);
  const [Total, setTotal] = useState(0);
  const [Page, setPage] = useState(1);
  const [LinhasPorPagina, setLinhasPorPagina] = useState(
    getNLinhasPadraoGrid(),
  );

  const [Politicas, setPoliticas] = useState([]);

  const CamposHeader = ['ID', 'Status'];
  const CamposBody = ['id', 'status'];

  useEffect(() => {
    carregarDados();
  }, [Inicio]);

  useEffect(() => {
    //console.log('Page : ' + Page);
    carregarDados();
  }, [Page]);

  const carregarDados = async (PageParm = Page) => {
    setLoading(true);

    let PoliticasAux = await getPoliticasPrivacidade();
    setTotal(PoliticasAux.length);

    setPoliticas(PoliticasAux);
    setLoading(false);
  };

  return (
    <Container loading={loading} {...props}>
      <Grid
        Rota={'politica_privacidade'}
        Rows={Politicas}
        Total={Total}
        CamposHeader={CamposHeader}
        CamposBody={CamposBody}
        setPage={setPage}
        setLinhasPorPagina={setLinhasPorPagina}
      />
    </Container>
  );
};

export default PoliticasPrivacidade;
