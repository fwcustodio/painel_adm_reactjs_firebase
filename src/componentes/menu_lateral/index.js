import React, {useState, useEffect, useContext} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import BeenhereIcon from '@material-ui/icons/BeenhereOutlined';
import DirectionsIcon from '@material-ui/icons/DirectionsOutlined';
import PeopleIcon from '@material-ui/icons/People';
import {getPermissoesAcessoUsuario} from '~/servicos/auth';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import CategoryIcon from '@material-ui/icons/CategoryOutlined';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';

import PessoaIcon from '@material-ui/icons/PersonPinOutlined';
import OrcamentosIcon from '@material-ui/icons/LocalAtmOutlined';
import ConfiguracoesIcon from '@material-ui/icons/SettingsOutlined';
import BlogPostsIcon from '@material-ui/icons/MessageOutlined';
import ProjetosGITIcon from '@material-ui/icons/CodeOutlined';
import ProjetosConcluidosIcon from '@material-ui/icons/CloudDoneOutlined';
import PrestadoresIcon from '@material-ui/icons/PeopleAltOutlined';

//import PetsIcon from '@material-ui/icons/RequestQuoteOutlined';

import AuthContext from '~/contexts/auth';

export const MenuLateral = () => {
  const {User} = useContext(AuthContext);

  //console.log('User : ' + JSON.stringify(User));

  const {
    home,
    rotas,
    usuarios,
    blog_categorias,
    blog_autores,
    blog_posts,
    politica_privacidade,
    projetos,
    projetos_concluidos,
    funcionarios,
    relatorios,
    issues,
    configuracoes,
  } = User.Paths;
  return (
    <div>
      {usuarios && (
        <ListItem button component="a" href="/usuarios">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Usuários" />
        </ListItem>
      )}

      {configuracoes ? (
        <ListItem button component="a" href="/configuracoes">
          <ListItemIcon>
            <ConfiguracoesIcon />
          </ListItemIcon>
          <ListItemText primary="Configurações" />
        </ListItem>
      ) : (
        <></>
      )}

      {rotas && (
        <ListItem button component="a" href="/rotas">
          <ListItemIcon>
            <DirectionsIcon />
          </ListItemIcon>
          <ListItemText primary="Rotas" />
        </ListItem>
      )}

      {politica_privacidade ? (
        <ListItem button component="a" href="/politica_privacidade">
          <ListItemIcon>
            <BeenhereIcon />
          </ListItemIcon>
          <ListItemText primary="Política de privacidade" />
        </ListItem>
      ) : (
        <></>
      )}

      {blog_posts ? (
        <ListItem button component="a" href="/blog_posts">
          <ListItemIcon>
            <BlogPostsIcon />
          </ListItemIcon>
          <ListItemText primary="Blog Posts" />
        </ListItem>
      ) : (
        <></>
      )}

      {blog_categorias && (
        <ListItem button component="a" href="/blog_categorias">
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Blog Categorias" />
        </ListItem>
      )}

      {blog_autores && (
        <ListItem button component="a" href="/blog_autores">
          <ListItemIcon>
            <PessoaIcon />
          </ListItemIcon>
          <ListItemText primary="Blog Autores" />
        </ListItem>
      )}

      {projetos ? (
        <ListItem button component="a" href="/projetos">
          <ListItemIcon>
            <ProjetosGITIcon />
          </ListItemIcon>
          <ListItemText primary="Projetos" />
        </ListItem>
      ) : (
        <></>
      )}

      {projetos_concluidos ? (
        <ListItem button component="a" href="/projetos_concluidos">
          <ListItemIcon>
            <ProjetosConcluidosIcon />
          </ListItemIcon>
          <ListItemText primary="Projetos Concluídos" />
        </ListItem>
      ) : (
        <></>
      )}

      {funcionarios ? (
        <ListItem button component="a" href="/prestadores">
          <ListItemIcon>
            <PrestadoresIcon />
          </ListItemIcon>
          <ListItemText primary="Prestadores" />
        </ListItem>
      ) : (
        <></>
      )}

      {relatorios ? (
        <ListItem button component="a" href="/relatorios">
          <ListItemIcon>
            <AssessmentOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Relatórios" />
        </ListItem>
      ) : (
        <></>
      )}
    </div>
  );
};

const handleClickMenuRepositorios = (Repo, getURLBase) => {
  let URLBase = getURLBase();
  let URL = `${URLBase}/issues/${Repo}`;

  console.log('URL : ' + URL);

  window.open(URL, '_blank');
};

export const MenuLateralInferior = (props) => {
  const {User, getURLBase} = useContext(AuthContext);
  let Favoritos = User.Favoritos;

  return (
    <div>
      {Favoritos &&
        Favoritos.map((FavoritoItem) => {
          return (
            <ListItem
              button
              onClick={() =>
                handleClickMenuRepositorios(FavoritoItem.repo, getURLBase)
              }>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary={FavoritoItem.nome} />
            </ListItem>
          );
        })}
    </div>
  );
};
