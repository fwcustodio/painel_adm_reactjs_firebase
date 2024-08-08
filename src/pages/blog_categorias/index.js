import React, {useState, useEffect} from 'react';
import Container from '~/componentes/container';
import {getBlogCategorias} from '~/servicos/firebase_api';
import Grid from '~/componentes/grid';
import {getNLinhasPadraoGrid} from '~/core';
import TableCell from '@material-ui/core/TableCell';

const BlogCategorias = (props) => {
  const [loading, setLoading] = useState(false);
  const [Inicio, setInicio] = useState(true);
  const [Total, setTotal] = useState(0);
  const [Page, setPage] = useState(1);
  const [LinhasPorPagina, setLinhasPorPagina] = useState(
    getNLinhasPadraoGrid(),
  );

  const [BlogCategorias, setBlogCategorias] = useState([]);

  const CamposHeader = ['Categoria', 'ID Chave', 'Status'];
  const CamposBody = ['nome', 'id_chave', 'status'];

  useEffect(() => {
    carregarDados();
  }, [Inicio]);

  useEffect(() => {
    //console.log('Page : ' + Page);
    carregarDados();
  }, [Page]);

  const carregarDados = async (PageParm = Page) => {
    setLoading(true);

    let BlogCategoriasAux = await getBlogCategorias();
    setTotal(BlogCategoriasAux.length);

    setBlogCategorias(BlogCategoriasAux);
    setLoading(false);
  };

  return (
    <Container loading={loading} {...props}>
      <Grid
        Rota={'blog_categorias'}
        Rows={BlogCategorias}
        Total={Total}
        CamposHeader={CamposHeader}
        CamposBody={CamposBody}
        setPage={setPage}
        setLinhasPorPagina={setLinhasPorPagina}
      />
    </Container>
  );
};

export default BlogCategorias;
