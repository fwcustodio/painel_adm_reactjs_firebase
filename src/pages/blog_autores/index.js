import React, {useState, useEffect} from 'react';
import Container from '~/componentes/container';
import {getBlogAutores} from '~/servicos/firebase_api';
import Grid from '~/componentes/grid';
import {getNLinhasPadraoGrid} from '~/core';
import TableCell from '@material-ui/core/TableCell';

const BlogAutores = (props) => {
  const [loading, setLoading] = useState(false);
  const [Inicio, setInicio] = useState(true);
  const [Total, setTotal] = useState(0);
  const [Page, setPage] = useState(1);
  const [LinhasPorPagina, setLinhasPorPagina] = useState(
    getNLinhasPadraoGrid(),
  );

  const [BlogAutores, setBlogAutores] = useState([]);

  const CamposHeader = ['Autor', 'Status'];
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

    let BlogAutoresAux = await getBlogAutores();
    setTotal(BlogAutoresAux.length);

    setBlogAutores(BlogAutoresAux);
    setLoading(false);
  };

  return (
    <Container loading={loading} {...props}>
      <Grid
        Rota={'blog_autores'}
        Rows={BlogAutores}
        Total={Total}
        CamposHeader={CamposHeader}
        CamposBody={CamposBody}
        setPage={setPage}
        setLinhasPorPagina={setLinhasPorPagina}
      />
    </Container>
  );
};

export default BlogAutores;
