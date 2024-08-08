import React, {useState, useEffect} from 'react';
import Container from '~/componentes/container';
import {getIntensidades} from '~/servicos/firebase_api';
import Grid from '~/componentes/grid';
import {getNLinhasPadraoGrid} from '~/core';
import TableCell from '@material-ui/core/TableCell';

const Intensidades = (props) => {
  const [loading, setLoading] = useState(false);
  const [Inicio, setInicio] = useState(true);
  const [Total, setTotal] = useState(0);
  const [Page, setPage] = useState(1);
  const [LinhasPorPagina, setLinhasPorPagina] = useState(
    getNLinhasPadraoGrid(),
  );

  const [Intensidades, setIntensidades] = useState([]);

  const CamposHeader = ['Intensidade', 'Status'];
  const CamposBody = ['nome', 'status'];

  useEffect(() => {
    carregarDados();
  }, [Inicio]);

  useEffect(() => {
    //console.log('Page : ' + Page);
    carregarDados();
  }, [Page]);

  const carregarDados = async (PageParm = Page) => {
    setLoading(true);

    let IntensidadesAux = await getIntensidades();
    setTotal(IntensidadesAux.length);

    setIntensidades(IntensidadesAux);
    setLoading(false);
  };

  return (
    <Container loading={loading} {...props}>
      <Grid
        Rota={'intensidades'}
        Rows={Intensidades}
        Total={Total}
        CamposHeader={CamposHeader}
        CamposBody={CamposBody}
        setPage={setPage}
        setLinhasPorPagina={setLinhasPorPagina}
      />
    </Container>
  );
};

export default Intensidades;
