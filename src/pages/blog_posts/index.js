import React, {useState, useEffect} from 'react';
import Container from '~/componentes/container';
import {getBlogPosts} from '~/servicos/firebase_api';
import Grid from '~/componentes/grid';
import {getNLinhasPadraoGrid} from '~/core';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Launch';
import Tooltip from '@material-ui/core/Tooltip';
import ContentCopy from '@material-ui/icons/FileCopy';
import copy from 'copy-to-clipboard';

const BlogPosts = (props) => {
  const [loading, setLoading] = useState(false);
  const [Inicio, setInicio] = useState(true);
  const [Total, setTotal] = useState(0);
  const [Page, setPage] = useState(1);
  const [LinhasPorPagina, setLinhasPorPagina] = useState(
    getNLinhasPadraoGrid(),
  );

  const [BlogPosts, setBlogPosts] = useState([]);

  const CamposHeader = [
    'Título',
    'URL',
    'Data',
    'Exibir no Site',
    'Tempo Leitura',
  ];
  const CamposBody = [
    'titulo',
    'url_post',
    'data',
    'exibir_site',
    'tempo_leitura',
  ];

  const URLBasePost = 'https://fwctecnologia.com/blog/post';

  useEffect(() => {
    carregarDados();
  }, [Inicio]);

  useEffect(() => {
    //console.log('Page : ' + Page);
    carregarDados();
  }, [Page]);

  const carregarDados = async (PageParm = Page) => {
    setLoading(true);

    let BlogPostsAux = await getBlogPosts();
    setTotal(BlogPostsAux.length);

    //console.log('BlogPostsAux : ' + JSON.stringify(BlogPostsAux));

    setBlogPosts(BlogPostsAux);
    setLoading(false);
  };

  const copiarLinkPost = async (URLPost) => {
    copy(`${URLBasePost}/${URLPost}`);
  };

  const abrirLinkPost = async (URLPost) => {
    window.open(`${URLBasePost}/${URLPost}`, '_blank');
  };

  const funcaoCopiarPost = (props) => {
    const {url_post, titulo} = props.row;
    return (
      <Tooltip title={`Copiar - ${titulo}`}>
        <IconButton
          {...props}
          onClick={() => copiarLinkPost(url_post)}
          size="medium">
          <ContentCopy />
        </IconButton>
      </Tooltip>
    );
  };

  const funcaoAbrirLinkPost = (props) => {
    const {url_post, titulo} = props.row;
    return (
      <Tooltip title={`Abir - ${titulo}`}>
        <IconButton
          {...props}
          onClick={() => abrirLinkPost(url_post)}
          size="medium">
          <SendIcon />
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <Container loading={loading} {...props}>
      <Grid
        Rota={'blog_posts'}
        Rows={BlogPosts}
        Total={Total}
        CamposHeader={CamposHeader}
        CamposBody={CamposBody}
        setPage={setPage}
        setLinhasPorPagina={setLinhasPorPagina}
        FuncaoAdicionalArray={[funcaoCopiarPost, funcaoAbrirLinkPost]}
      />
    </Container>
  );
};

export default BlogPosts;
