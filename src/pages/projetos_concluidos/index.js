import React, {useState, useEffect} from 'react';
import Container from '~/componentes/container';
import {getProjetos} from '~/servicos/firebase_api';
import Grid from '~/componentes/grid';
import {getNLinhasPadraoGrid} from '~/core';
import TableCell from '@material-ui/core/TableCell';

const BlogPosts = (props) => {
  const [loading, setLoading] = useState(false);
  const [Inicio, setInicio] = useState(true);
  const [Total, setTotal] = useState(0);
  const [Page, setPage] = useState(1);
  const [LinhasPorPagina, setLinhasPorPagina] = useState(
    getNLinhasPadraoGrid(),
  );

  const [Projetos, setProjetos] = useState([]);

  const CamposHeader = [
    'Nome',
    'ID Chave',
    'Ordem',
    'Caso de Estudo',
    'Exibir na Home',
  ];
  const CamposBody = [
    'nome',
    'id_chave',
    'ordem',
    'caso_estudo',
    'exibir_home',
  ];

  useEffect(() => {
    carregarDados();
  }, [Inicio]);

  useEffect(() => {
    //console.log('Page : ' + Page);
    carregarDados();
  }, [Page]);

  const carregarDados = async (PageParm = Page) => {
    setLoading(true);

    let Projetosux = await getProjetos();
    setTotal(Projetosux.length);

    //console.log('Projetosux : ' + JSON.stringify(Projetosux));

    setProjetos(Projetosux);
    setLoading(false);
  };

  return (
    <Container loading={loading} {...props}>
      <Grid
        Rota={'projetos_concluidos'}
        Rows={Projetos}
        Total={Total}
        CamposHeader={CamposHeader}
        CamposBody={CamposBody}
        setPage={setPage}
        setLinhasPorPagina={setLinhasPorPagina}
      />
    </Container>
  );
};

export default BlogPosts;
