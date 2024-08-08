import React, {useState, useEffect, useContext} from 'react';
import Container from '~/componentes/container';
import {getRepositorios, favoritarRepositorio} from '~/servicos/firebase_api';
import Grid from '~/componentes/grid';
import {getNLinhasPadraoGrid} from '~/core';
import BallotIcon from '@material-ui/icons/Ballot';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import AuthContext from '~/contexts/auth';

const BlogPosts = (props) => {
  const {User, setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [Inicio, setInicio] = useState(true);
  const [Total, setTotal] = useState(0);
  const [Page, setPage] = useState(1);
  const [LinhasPorPagina, setLinhasPorPagina] = useState(
    getNLinhasPadraoGrid(),
  );

  const [Repositorios, setRepositorios] = useState([]);

  const CamposHeader = ['Nome', 'Repositório', 'Clone URL', 'Data de Criação'];
  const CamposBody = ['description', 'name', 'clone_url', 'created_at'];

  useEffect(() => {
    //console.log('Page : ' + Page);
    carregarDados();
  }, [Page]);

  const carregarDados = async (PageParm = Page) => {
    setLoading(true);
    //console.log('carregarDados');

    let Repositorios = await getRepositorios();
    let UsuarioFavoritos = User.Favoritos ? User.Favoritos : [];

    if (
      Repositorios &&
      Repositorios.length > 0 &&
      UsuarioFavoritos &&
      UsuarioFavoritos.length > 0
    ) {
      for (let index = 0; index < Repositorios.length; index++) {
        const RepoItem = Repositorios[index];

        let RepositorioFavorito = UsuarioFavoritos.find((Item) => {
          return Item.repo == RepoItem.name;
        });

        if (RepositorioFavorito) {
          Repositorios[index].favorito = true;
        }
        //console.log('RepositorioFavorito : ' + RepositorioFavorito);
        //console.log('RepositorioFavorito : ' + JSON.stringify(RepositorioFavorito),);
      }
    }

    //console.log('Repositorios : ' + JSON.stringify(Repositorios));

    setTotal(Repositorios.length);
    setRepositorios(Repositorios);
    setLoading(false);
  };

  const visualizarIssues = (ProjetoID) => {
    let Location = window.location.toString();
    let LocationAjustada = Location.substr(0, Location.lastIndexOf('/'));
    window.open(`${LocationAjustada}/issues/${ProjetoID}`, '_blank');
  };

  const funcaoAdicional = ({row}) => {
    return (
      <Tooltip title="Visualizar Issues">
        <IconButton onClick={() => visualizarIssues(row.name)}>
          <BallotIcon />
        </IconButton>
      </Tooltip>
    );
  };

  const handleFavoritarRepositorio = async (Row) => {
    let NovosFavoritos = await favoritarRepositorio(
      User.ID,
      Row.name,
      Row.description,
      !Row.favorito,
    );
    let UsuarioAux = User;

    let RepositoriosAux = Repositorios;
    for (let index = 0; index < RepositoriosAux.length; index++) {
      const RepoItem = RepositoriosAux[index];
      if (RepoItem.name == Row.name) {
        RepositoriosAux[index].favorito = !Row.favorito;
        setRepositorios(RepositoriosAux);
        break;
      }
    }

    setUser({...UsuarioAux, Favoritos: NovosFavoritos});
  };

  const funcaoAdicionalFavoritos = ({row}) => {
    //console.log('row.favorito : ' + row.favorito);
    return (
      <Tooltip
        title={
          row.favorito === true
            ? 'Desfavoritar Repositório'
            : 'Favoritar Repositório'
        }>
        <IconButton onClick={() => handleFavoritarRepositorio(row)}>
          {row.favorito === true ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <Container loading={loading} {...props}>
      <Grid
        Rota={'projetos'}
        Rows={Repositorios}
        Total={Total}
        CamposHeader={CamposHeader}
        CamposBody={CamposBody}
        setPage={setPage}
        setLinhasPorPagina={setLinhasPorPagina}
        FuncaoAdicionalArray={[funcaoAdicional, funcaoAdicionalFavoritos]}
        CancVisualizar={true}
        CancEditar={true}
        CancExcluir={true}
      />
    </Container>
  );
};

export default BlogPosts;
