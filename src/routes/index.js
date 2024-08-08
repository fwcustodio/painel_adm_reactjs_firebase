import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {PrivateRoute} from '~/routes/private_route';
import {getUsuarioAutenticado} from '~/servicos/auth';
import 'fontsource-roboto';
import {AuthProvider} from '~/contexts/auth';

import Dashboard from '~/pages/dashboard';
import Login from '~/pages/login';

import Rotas from '~/pages/rotas';
import RotasEditar from '~/pages/rotas/editar';

import Usuarios from '~/pages/usuarios';
import UsuariosEditar from '~/pages/usuarios/editar';

import BlogCategorias from '~/pages/blog_categorias';
import BlogCategoriasEditar from '~/pages/blog_categorias/editar';

import BlogAutores from '~/pages/blog_autores';
import BlogAutoresEditar from '~/pages/blog_autores/editar';

import BlogPosts from '~/pages/blog_posts';
import BlogPostsEditar from '~/pages/blog_posts/editar';

import Configuracoes from '~/pages/configuracoes';
import Relatorios from '~/pages/relatorios';

import PoliticaPrivacidade from '~/pages/politica_privacidade';
import PoliticaPrivacidadeEditar from '~/pages/politica_privacidade/editar';

import ProjetosConcluidos from '~/pages/projetos_concluidos';
import ProjetosConcluidosEditar from '~/pages/projetos_concluidos/editar';

import Projetos from '~/pages/projetos';
import ProjetosEditar from '~/pages/projetos/editar';

import Issues from '~/pages/issues';
import IssuesEditar from '~/pages/issues/editar';

import Prestadores from '~/pages/prestadores';
import PrestadoresEditar from '~/pages/prestadores/editar';

const Producao = false;
const PathAdicional = Producao ? '/admin' : '';

const DefaultPath = getUsuarioAutenticado() ? (
  <Redirect
    to={{
      pathname: `${PathAdicional}/home`,
    }}
  />
) : (
  <Redirect
    to={{
      pathname: `${PathAdicional}/login`,
    }}
  />
);

const Routes = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={`${PathAdicional}/`}
            component={() => DefaultPath}
          />
          <Route path={`${PathAdicional}/login`} component={() => <Login />} />
          <Route
            path={`${PathAdicional}/sem-permissao`}
            component={() => <h1>Sem permissao de acesso para a tela</h1>}
          />
          <PrivateRoute
            exact
            path={`${PathAdicional}/home`}
            component={() => <Dashboard />}
          />
          <PrivateRoute
            exact
            path={`${PathAdicional}/dashboard`}
            component={() => <Dashboard />}
          />

          <PrivateRoute
            exact
            path={`${PathAdicional}/rotas`}
            component={() => <Rotas />}
          />
          <PrivateRoute
            path={`${PathAdicional}/rotas/cad`}
            component={() => <RotasEditar />}
          />
          <PrivateRoute
            path={`${PathAdicional}/rotas/visu/:id`}
            component={() => <RotasEditar />}
          />
          <PrivateRoute
            path={`${PathAdicional}/rotas/editar/:id`}
            component={() => <RotasEditar />}
          />

          <PrivateRoute
            path={`${PathAdicional}/rotas/excluir/:id`}
            component={() => <RotasEditar />}
          />

          <PrivateRoute
            exact
            path={`${PathAdicional}/usuarios`}
            component={() => <Usuarios />}
          />
          <PrivateRoute
            path={`${PathAdicional}/usuarios/cad`}
            component={() => <UsuariosEditar />}
          />
          <PrivateRoute
            path={`${PathAdicional}/usuarios/visu/:id`}
            component={() => <UsuariosEditar />}
          />
          <PrivateRoute
            path={`${PathAdicional}/usuarios/editar/:id`}
            component={() => <UsuariosEditar />}
          />
          <PrivateRoute
            path={`${PathAdicional}/usuarios/excluir/:id`}
            component={() => <UsuariosEditar />}
          />

          <PrivateRoute
            exact
            path={`${PathAdicional}/blog_categorias`}
            component={() => <BlogCategorias />}
          />

          <PrivateRoute
            path={`${PathAdicional}/blog_categorias/cad`}
            component={() => <BlogCategoriasEditar />}
          />

          <PrivateRoute
            path={`${PathAdicional}/blog_categorias/visu/:id`}
            component={() => <BlogCategoriasEditar />}
          />
          <PrivateRoute
            path={`${PathAdicional}/blog_categorias/editar/:id`}
            component={() => <BlogCategoriasEditar />}
          />

          <PrivateRoute
            path={`${PathAdicional}/blog_categorias/excluir/:id`}
            component={() => <BlogCategoriasEditar />}
          />

          <PrivateRoute
            exact
            path={`${PathAdicional}/blog_autores`}
            component={() => <BlogAutores />}
          />

          <PrivateRoute
            path={`${PathAdicional}/blog_autores/cad`}
            component={() => <BlogAutoresEditar />}
          />

          <PrivateRoute
            path={`${PathAdicional}/blog_autores/visu/:id`}
            component={() => <BlogAutoresEditar />}
          />
          <PrivateRoute
            path={`${PathAdicional}/blog_autores/editar/:id`}
            component={() => <BlogAutoresEditar />}
          />

          <PrivateRoute
            path={`${PathAdicional}/blog_autores/excluir/:id`}
            component={() => <BlogAutoresEditar />}
          />

          <PrivateRoute
            exact
            path={`${PathAdicional}/blog_posts`}
            component={() => <BlogPosts />}
          />

          <PrivateRoute
            path={`${PathAdicional}/blog_posts/cad`}
            component={() => <BlogPostsEditar />}
          />

          <PrivateRoute
            path={`${PathAdicional}/blog_posts/visu/:id`}
            component={() => <BlogPostsEditar />}
          />
          <PrivateRoute
            path={`${PathAdicional}/blog_posts/editar/:id`}
            component={() => <BlogPostsEditar />}
          />

          <PrivateRoute
            path={`${PathAdicional}/blog_posts/excluir/:id`}
            component={() => <BlogPostsEditar />}
          />

          <PrivateRoute
            exact
            path={`${PathAdicional}/politica_privacidade`}
            component={() => <PoliticaPrivacidade />}
          />

          <PrivateRoute
            path={`${PathAdicional}/politica_privacidade/cad`}
            component={() => <PoliticaPrivacidadeEditar />}
          />

          <PrivateRoute
            path={`${PathAdicional}/politica_privacidade/visu/:id`}
            component={() => <PoliticaPrivacidadeEditar />}
          />
          <PrivateRoute
            path={`${PathAdicional}/politica_privacidade/editar/:id`}
            component={() => <PoliticaPrivacidadeEditar />}
          />

          <PrivateRoute
            path={`${PathAdicional}/politica_privacidade/excluir/:id`}
            component={() => <PoliticaPrivacidadeEditar />}
          />

          <PrivateRoute
            exact
            path={`${PathAdicional}/projetos_concluidos`}
            component={() => <ProjetosConcluidos />}
          />

          <PrivateRoute
            path={`${PathAdicional}/projetos_concluidos/cad`}
            component={() => <ProjetosConcluidosEditar />}
          />

          <PrivateRoute
            path={`${PathAdicional}/projetos_concluidos/visu/:id`}
            component={() => <ProjetosConcluidosEditar />}
          />
          <PrivateRoute
            path={`${PathAdicional}/projetos_concluidos/editar/:id`}
            component={() => <ProjetosConcluidosEditar />}
          />

          <PrivateRoute
            path={`${PathAdicional}/projetos_concluidos/excluir/:id`}
            component={() => <ProjetosConcluidosEditar />}
          />

          <PrivateRoute
            exact
            path={`${PathAdicional}/projetos`}
            component={() => <Projetos />}
          />

          <PrivateRoute
            path={`${PathAdicional}/projetos/cad`}
            component={() => <ProjetosEditar />}
          />

          <PrivateRoute
            path={`${PathAdicional}/projetos/visu/:id`}
            component={() => <ProjetosEditar />}
          />
          <PrivateRoute
            path={`${PathAdicional}/projetos/editar/:id`}
            component={() => <ProjetosEditar />}
          />

          <PrivateRoute
            path={`${PathAdicional}/projetos/excluir/:id`}
            component={() => <ProjetosEditar />}
          />

          <PrivateRoute
            exact
            path={`${PathAdicional}/issues`}
            component={() => <Issues />}
          />

          <PrivateRoute
            exact
            path={`${PathAdicional}/issues/:id`}
            component={() => <Issues />}
          />

          <PrivateRoute
            path={`${PathAdicional}/issues/:repo/:issue`}
            component={() => <IssuesEditar />}
          />

          <PrivateRoute
            path={`${PathAdicional}/issues/:repo/cad`}
            component={() => <IssuesEditar />}
          />

          <PrivateRoute
            exact
            path={`${PathAdicional}/prestadores`}
            component={() => <Prestadores />}
          />

          <PrivateRoute
            path={`${PathAdicional}/prestadores/cad`}
            component={() => <PrestadoresEditar />}
          />

          <PrivateRoute
            path={`${PathAdicional}/prestadores/visu/:id`}
            component={() => <PrestadoresEditar />}
          />
          <PrivateRoute
            path={`${PathAdicional}/prestadores/editar/:id`}
            component={() => <PrestadoresEditar />}
          />

          <PrivateRoute
            path={`${PathAdicional}/prestadores/excluir/:id`}
            component={() => <PrestadoresEditar />}
          />

          <PrivateRoute
            path={`${PathAdicional}/configuracoes`}
            component={() => <Configuracoes />}
          />
          <PrivateRoute
            exact
            path={`${PathAdicional}/relatorios`}
            component={() => <Relatorios />}
          />

          <PrivateRoute
            exact
            path={`${PathAdicional}/orcamentos`}
            component={() => <Orcamentos />}
          />
          <PrivateRoute
            path={`${PathAdicional}/orcamentos/cad`}
            component={() => <OrcamentosEditar />}
          />
          <PrivateRoute
            path={`${PathAdicional}/orcamentos/visu/:id`}
            component={() => <OrcamentosEditar />}
          />
          <PrivateRoute
            path={`${PathAdicional}/orcamentos/editar/:id`}
            component={() => <OrcamentosEditar />}
          />

          <PrivateRoute
            path={`${PathAdicional}/orcamentos/excluir/:id`}
            component={() => <OrcamentosEditar />}
          />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Routes;
