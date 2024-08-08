import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';
import uuid from 'react-uuid';
import {Octokit} from 'octokit';
import {getUsuarioAutenticado, setUsuarioAutenticado} from '~/servicos/auth';
import {formatarData} from '~/core/index';

const auth = firebase.auth;
const firestore = firebase.firestore;
const functions = firebase.functions;
const storage = firebase.storage;

const getOctokitBase = async () => {
  let UsuarioAuthAux = getUsuarioAutenticado();

  if (UsuarioAuthAux && UsuarioAuthAux.TokenGIT) {
    const OctokitBase = new Octokit({
      auth: UsuarioAuthAux.TokenGIT,
    }).rest;

    return OctokitBase;
  } else {
    return null;
  }
};

export const enviarEmailRecuperacaoSenhaUsuario = async (EmailParm, Uid) => {
  let Email = EmailParm;

  if (!EmailParm) {
    let Usuario = await getAdminUsuario(Uid);
    Email = Usuario.email;
  }

  await auth().sendPasswordResetEmail(Email);
  return true;
};

export const getTextoTraduzido = async (
  Texto,
  Idioma,
  RetirarAcentos = false,
) => {
  const URLBase = 'https://api.deshopnise.com.br';
  //const URLBase = 'http://localhost:3000';
  try {
    let Resp = await fetch(`${URLBase}/tradutor/taduzir-texto`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/html, */*',
        'Content-Type': 'application/json',
      },

      //dataType: 'jsonp',
      body: JSON.stringify({
        texto: Texto,
        idioma: Idioma,
        retirar_acentos: RetirarAcentos,
      }),
    });

    let RespJson = Resp ? await Resp.json() : false;

    //console.log('Resp : ' + Resp);
    //console.log('Resp : ' + JSON.stringify(RespJson));

    if (RespJson && RespJson.texto_traduzido) {
      const {texto_traduzido} = RespJson;
      return texto_traduzido;
    } else {
      return '';
    }
  } catch (error) {
    console.log('Erro : ' + error);
    return '';
  }
};

export const cadastrarUsuarioAdmin = async (DadosParm, DadosAdmin) => {
  let Uid;
  let Sucesso = true;

  try {
    await functions()
      .httpsCallable('cadastrarUsuario')({Dados: DadosParm})
      .then(async (response) => {
        //('response : ' + JSON.stringify(response));

        if (response && response.data) {
          Uid = response.data.uid;

          if (DadosAdmin) {
            if (DadosAdmin.UsuarioAdmin) {
              await firestore()
                .collection('admin_usuarios')
                .doc(Uid)
                .set({
                  paths: DadosAdmin.Paths,
                })
                .then(function () {
                  //console.log('Document successfully written!');
                })
                .catch(function (error) {
                  console.error('Error writing document: ', error);
                });
            }
          } else {
            Sucesso = false;
          }
        }
      });
  } catch (err) {
    console.log(err);
    Sucesso = false;
  }

  return Sucesso;
};

export const excluirUsuarioAdmin = async (UidParm) => {
  try {
    await functions()
      .httpsCallable('excluirUsuario')({Uid: UidParm})
      .then((response) => {
        //console.log('response : ' + JSON.stringify(response));
      });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const alterarUsuarioAdmin = async (UidParm, DadosParm, DadosAdmin) => {
  try {
    await functions()
      .httpsCallable('atualizarUsuario')({Uid: UidParm, Dados: DadosParm})
      .then((response) => {
        //console.log('response : ' + JSON.stringify(response));
      });
  } catch (err) {
    console.log(err);
    return false;
  }

  if (DadosAdmin) {
    if (DadosAdmin.UsuarioAdmin) {
      await firestore()
        .collection('admin_usuarios')
        .doc(UidParm)
        .set({
          paths: DadosAdmin.Paths,
        })
        .then(function () {
          console.log('Document successfully written!');
        })
        .catch(function (error) {
          console.error('Error writing document: ', error);
        });
    } else {
      try {
        await deleteDocCollection('admin_usuarios', UidParm);
      } catch (err) {}
    }
  }

  return true;
};

export const getAdminUsuarios = async () => {
  let Usuarios = [];

  await functions()
    .httpsCallable('getUsuarios')()
    .then((response) => {
      Usuarios = response ? response.data : null;
      //console.log('Usuarios : ' + JSON.stringify(response));
    });

  return Usuarios;
};

export const getAdminUsuario = async (UidParm) => {
  let Usuario;

  await functions()
    .httpsCallable('getUsuario')({Uid: UidParm})
    .then((response) => {
      Usuario = response ? response.data : null;
      //console.log('Usuario : ' + JSON.stringify(response));
    });

  if (Usuario) {
    let DadosUsuario = await getAdminDadosUsuario(UidParm);

    if (DadosUsuario) {
      Usuario.AdminPaths = DadosUsuario.paths;
      //console.log('DadosUsuario.paths : ' + JSON.stringify(DadosUsuario.paths));
    }
  }
  return Usuario;
};

export const getAdminDadosUsuario = async (UidParm) => {
  return await getDocCollection('admin_usuarios', UidParm);
};

// --- ROTAS ---
export const cadastrarAdminRota = async (Dados) => {
  await cadastrarDadosCollection('admin_rotas', Dados);
  return true;
};

export const alterarAdminRota = async (Id, Dados) => {
  //console.log('Dados : ' + JSON.stringify(Dados));
  await updateDocCollection('admin_rotas', Id, Dados);
  return true;
};

export const deletarAdminRota = async (Id) => {
  await deleteDocCollection('admin_rotas', Id);
  return true;
};

export const getAdminRotas = async () => {
  return getDadosCollection('admin_rotas');
};

export const getAdminRota = async (Id) => {
  return getDocCollection('admin_rotas', Id);
};

export const getDataHoraAtual = () => {
  return firestore.FieldValue.serverTimestamp();
};

// ---  Funcionarios ---
const CollectionFuncionarios = 'funcionarios';
export const getFuncionarios = async () => {
  return getDadosCollection(CollectionFuncionarios, null, [
    {Campo: 'status', Direcao: 'asc'},
    {Campo: 'nome', Direcao: 'asc'},
  ]);
};
export const getFuncionario = async (Id) => {
  return getDocCollection(CollectionFuncionarios, Id);
};

export const cadastrarFuncionario = async (Dados) => {
  await cadastrarDadosCollection(CollectionFuncionarios, Dados);
  return true;
};

export const alterarFuncionario = async (Id, Dados) => {
  //console.log('Dados : ' + JSON.stringify(Dados));
  await updateDocCollection(CollectionFuncionarios, Id, Dados);
  return true;
};

export const deletarFuncionario = async (Id) => {
  await deleteDocCollection(CollectionFuncionarios, Id);
  return true;
};

// ---  Politica de privacidade ---
const CollectionPolitica = 'politicas_privacidade';
export const getPoliticasPrivacidade = async () => {
  return getDadosCollection(CollectionPolitica);
};
export const getPoliticaPrivacidade = async (Id) => {
  return getDocCollection(CollectionPolitica, Id);
};

export const cadastrarPoliticaPrivacidade = async (Dados) => {
  await cadastrarDadosCollection(CollectionPolitica, Dados);
  return true;
};

export const alterarPoliticaPrivacidade = async (Id, Dados) => {
  //console.log('Dados : ' + JSON.stringify(Dados));
  await updateDocCollection(CollectionPolitica, Id, Dados);
  return true;
};

export const deletarPoliticaPrivacidade = async (Id) => {
  await deleteDocCollection(CollectionPolitica, Id);
  return true;
};

// ---  Blog Categorias ---
const CollectionCategorias = 'blog_categorias';
export const getBlogCategorias = async () => {
  return getDadosCollection(CollectionCategorias, null, [
    {
      Campo: 'createdAt',
      Direcao: 'desc',
    },
  ]);
};
export const getBlogCategoria = async (Id) => {
  return getDocCollection(CollectionCategorias, Id);
};

export const cadastrarBlogCategoria = async (Dados) => {
  await cadastrarDadosCollection(CollectionCategorias, Dados);
  return true;
};

export const alterarBlogCategoria = async (Id, Dados) => {
  //console.log('Dados : ' + JSON.stringify(Dados));
  await updateDocCollection(CollectionCategorias, Id, Dados);
  return true;
};

export const deletarBlogCategoria = async (Id) => {
  await deleteDocCollection(CollectionCategorias, Id);
  return true;
};

// ---  Blog Autores ---
const CollectionAutores = 'blog_autores';
export const getBlogAutores = async () => {
  return getDadosCollection(CollectionAutores, null, [
    {
      Campo: 'nome',
      Direcao: 'asc',
    },
  ]);
};
export const getBlogAutor = async (Id) => {
  return getDocCollection(CollectionAutores, Id);
};

export const cadastrarBlogAutor = async (Dados) => {
  await cadastrarDadosCollection(CollectionAutores, Dados);
  return true;
};

export const alterarBlogAutor = async (Id, Dados) => {
  //console.log('Dados : ' + JSON.stringify(Dados));
  await updateDocCollection(CollectionAutores, Id, Dados);
  return true;
};

export const deletarBlogAutor = async (Id) => {
  await deleteDocCollection(CollectionAutores, Id);
  return true;
};

// ---  Blog Posts ---
const CollectionBlogPosts = 'blog_posts';
export const getBlogPosts = async () => {
  //await ajustarPosts();

  return getDadosCollection(CollectionBlogPosts, null, [
    {
      Campo: 'createdAt',
      Direcao: 'desc',
    },
  ]);
};

export const getBlogPost = async (Id) => {
  return getDocCollection(CollectionBlogPosts, Id);
};

export const cadastrarBlogPost = async (Dados) => {
  await cadastrarDadosCollection(CollectionBlogPosts, Dados);
  return true;
};

export const alterarBlogPost = async (Id, Dados) => {
  //console.log('Dados : ' + JSON.stringify(Dados));
  await updateDocCollection(CollectionBlogPosts, Id, Dados);
  return true;
};

export const deletarBlogPost = async (Id) => {
  await deleteDocCollection(CollectionBlogPosts, Id);
  return true;
};

// ---  Repositórios ---
export const getRepositorios = async () => {
  const OctokitBase = await getOctokitBase();
  let Repos = await OctokitBase.repos.listForOrg({
    org: 'fwctecnologia',
    type: 'private',
    sort: 'full_name',
    per_page: 1000,
  });

  let RepositoriosAux = Repos && Repos.data ? Repos.data : null;

  let RepositoriosComIssuesAbertas = [];
  let RepositoriosSemIssuesAbertas = [];

  for (
    let index = 0;
    RepositoriosAux && index < RepositoriosAux.length;
    index++
  ) {
    let RepositorioItem = RepositoriosAux[index];

    let DataAux = new Date(RepositoriosAux[index].created_at);
    DataAux.setHours(DataAux.getHours() - 3);
    RepositoriosAux[index].created_at = formatarData(DataAux.getTime());

    //IssuesAux[index] = IssueItem;

    if (RepositorioItem.open_issues_count > 0) {
      RepositoriosComIssuesAbertas.push(RepositorioItem);
    } else {
      RepositoriosSemIssuesAbertas.push(RepositorioItem);
    }
  }

  let RepositoriosOrdenados = [
    ...RepositoriosComIssuesAbertas,
    ...RepositoriosSemIssuesAbertas,
  ];

  return RepositoriosOrdenados;
};

export const favoritarRepositorio = async (
  UsuarioID,
  Repo,
  RepoNome,
  Favoritar = true,
) => {
  let UsuarioAux = getUsuarioAutenticado();
  let Favoritos =
    UsuarioAux && UsuarioAux.Favoritos ? UsuarioAux.Favoritos : [];

  let NovosFavoritos = Favoritos.filter((Item) => {
    return Item.repo != Repo;
  });

  if (Favoritar) {
    NovosFavoritos.push({nome: RepoNome, repo: Repo});
  }

  NovosFavoritos.sort((a, b) => {
    return a.nome > b.nome ? 1 : a.nome < b.nome ? -1 : 0;
  });

  await updateDocCollection('admin_usuarios', UsuarioID, {
    favoritos: NovosFavoritos,
  });

  setUsuarioAutenticado({...UsuarioAux, Favoritos: NovosFavoritos});

  return NovosFavoritos;
};

export const getIssues = async (Repo, Status) => {
  try {
    const OctokitBase = await getOctokitBase();
    let Issues = await OctokitBase.issues.listForRepo({
      owner: 'fwctecnologia',
      repo: Repo,
      state:
        Status == 'abertas' ? 'open' : Status == 'fechadas' ? 'closed' : 'all',
      per_page: 1000,
    });

    console.log('Issues : ' + JSON.stringify(Issues));

    let IssuesAux = Issues && Issues.data ? Issues.data : null;

    let IssueOpen = [];
    let IssueClosed = [];

    let ArrayIssues = [];

    /*
  for (let index = 0; IssuesAux && index < IssuesAux.length; index++) {
    let IssueItem = IssuesAux[index];

    ArrayIssues.push(IssueItem.number);
  }

  let IssuesFirebase = await getVariasIssuesFirebase(Repo, ArrayIssues);
  */

    for (let index = 0; IssuesAux && index < IssuesAux.length; index++) {
      let IssueItem = IssuesAux[index];

      let DataAux = new Date(IssuesAux[index].created_at);
      DataAux.setHours(DataAux.getHours() - 3);
      IssuesAux[index].created_at = formatarData(DataAux.getTime());
      IssuesAux[index].assignee_name =
        IssueItem.assignee && IssueItem.assignee.login
          ? IssueItem.assignee.login
          : null;

      /*
    let IssueFirebase = IssuesFirebase.find((item) => {
      return item.issue_numero == IssueItem.number;
    });
    */

      //console.log('IssueFirebase : ' + JSON.stringify(IssueFirebase));

      let IssueFirebase = await getIssueFirebase(Repo, IssueItem.number);

      if (IssueFirebase) {
        delete IssueFirebase.id;
        delete IssueFirebase.Id;
        delete IssueFirebase.ID;

        IssueItem = {...IssueItem, ...IssueFirebase};

        //IssuesAux[index] = IssueItem;
      }

      //console.log('IssueItem.pull_request : ' + IssueItem.pull_request);

      if (IssueItem.pull_request == undefined) {
        if (IssueItem.state == 'open') {
          IssueOpen.push(IssueItem);
        } else {
          IssueClosed.push(IssueItem);
        }
      }
    }

    //console.log('IssueOpen : ' + IssueOpen.length);
    //console.log('IssueClosed : ' + IssueClosed.length);
    //console.log('IssueClosed : ' + JSON.stringify(IssueClosed));

    let IssuesOrdenadas = [...IssueOpen, ...IssueClosed];
    return IssuesOrdenadas;
  } catch (error) {
    console.log('error : ' + error);
  }
};

export const getIssue = async (Repo, IssueNumber) => {
  const OctokitBase = await getOctokitBase();
  let Issue = await OctokitBase.issues.get({
    owner: 'fwctecnologia',
    repo: Repo,
    issue_number: IssueNumber,
  });

  let IssueEvents = await getIssueEvents(Repo, IssueNumber);
  let IssueComents = await getIssueComentarios(Repo, IssueNumber);
  let IssueFirebase = await getIssueFirebase(Repo, IssueNumber);

  for (let index = 0; index < IssueEvents.length; index++) {
    const ItemAux = IssueEvents[index];
    let DataAux = new Date(ItemAux.created_at);
    DataAux.setHours(DataAux.getHours() - 3);
    IssueEvents[index].created_at = DataAux.getTime();
  }

  for (let index = 0; index < IssueComents.length; index++) {
    const ItemAux = IssueComents[index];
    let DataAux = new Date(ItemAux.created_at);
    DataAux.setHours(DataAux.getHours() - 3);
    IssueComents[index].created_at = DataAux.getTime();
  }

  Issue.data.comentarios = IssueComents;
  Issue.data.events = IssueEvents;
  Issue.data.issue_firebase = IssueFirebase;

  return Issue.data;
};

export const getIssueEvents = async (Repo, IssueNumber) => {
  const OctokitBase = await getOctokitBase();
  let IssueEvents = await OctokitBase.issues.listEvents({
    owner: 'fwctecnologia',
    repo: Repo,
    issue_number: IssueNumber,
  });

  //let Repos = await APIGIT(`orgs/fwctecnologia/repos/&direction=desc`);
  return IssueEvents.data;
};

export const getIssueComentarios = async (Repo, IssueNumber) => {
  const OctokitBase = await getOctokitBase();
  let IssueComents = await OctokitBase.issues.listComments({
    owner: 'fwctecnologia',
    repo: Repo,
    issue_number: IssueNumber,
  });

  //let Repos = await APIGIT(`orgs/fwctecnologia/repos/&direction=desc`);
  return IssueComents.data;
};

export const enviarComentarioIssue = async (
  Repo,
  IssueNumber,
  Comentario,
  Status,
) => {
  const OctokitBase = await getOctokitBase();
  let IssueComent = await OctokitBase.issues.createComment({
    owner: 'fwctecnologia',
    repo: Repo,
    issue_number: IssueNumber,
    body: Comentario,
  });

  if (Status) {
    let IssueEdit = await OctokitBase.issues.update({
      owner: 'fwctecnologia',
      repo: Repo,
      issue_number: IssueNumber,
      state: Status,
    });
  }

  //let Repos = await APIGIT(`orgs/fwctecnologia/repos/&direction=desc`);
  return IssueComent;
};

export const enviarHorasIssue = async (
  Repo,
  IssueNumero,
  Horas,
  TipoHora,
  StatusIssue,
) => {
  let RespIssue = true;
  if (StatusIssue) {
    const OctokitBase = await getOctokitBase();
    RespIssue = await OctokitBase.issues.update({
      owner: 'fwctecnologia',
      repo: Repo,
      issue_number: IssueNumero,
      state: StatusIssue,
    });
  }

  let UsuarioLogado = getUsuarioAutenticado();

  await alterarIssueFirebase(Repo, IssueNumero, {
    repo: Repo,
    issue_numero: IssueNumero,
  });

  let IssueAux = await getIssueFirebase(Repo, IssueNumero);
  let HorasUtilizadas =
    IssueAux && IssueAux.horas_utilizadas ? IssueAux.horas_utilizadas : 0;

  let LogHoras = IssueAux && IssueAux.log_horas ? IssueAux.log_horas : [];

  HorasUtilizadas += parseFloat(Horas);

  //Ajuste de data hora
  let DataAux = new Date();
  DataAux.setHours(DataAux.getHours() - 3);
  DataAux = DataAux.getTime();

  LogHoras.push({
    usuario: UsuarioLogado.Email,
    tipo_hora: TipoHora,
    horas_adicionadas: Horas,
    data: DataAux,
  });

  await alterarIssueFirebase(Repo, IssueNumero, {
    horas_utilizadas: HorasUtilizadas,
    log_horas: LogHoras,
  });

  return true;
};

const CollectionIssues = 'issues';

export const getIssueFirebase = async (Repo, IssueNumero) => {
  let IssueAux = await getDadosCollection(CollectionIssues, [
    {Campo: 'issue_numero', Expressao: '==', Valor: parseInt(IssueNumero)},
    {Campo: 'repo', Expressao: '==', Valor: Repo},
  ]);

  //console.log('IssueAux1 : ' + JSON.stringify(IssueAux));

  return IssueAux && IssueAux.length > 0 ? IssueAux[0] : null;
};

export const getVariasIssuesFirebase = async (Repo, IssuesArray) => {
  let IssuesAux = await getDadosCollection(CollectionIssues, [
    {Campo: 'issue_numero', Expressao: 'in', Valor: IssuesArray},
    {Campo: 'repo', Expressao: '==', Valor: Repo},
  ]);

  //console.log('IssuesAux : ' + JSON.stringify(IssuesAux));

  return IssuesAux ? IssuesAux : null;
};

export const cadastrarIssue = async (Repo, Dados) => {
  const OctokitBase = await getOctokitBase();
  let IssueNova = await OctokitBase.issues.create({
    owner: 'fwctecnologia',
    repo: Repo,
    title: Dados.titulo,
    body: Dados.body,
  });

  if (IssueNova && (IssueNova.status == 200 || IssueNova.status == 201)) {
    //console.log('IssueNova : ' + JSON.stringify(IssueNova));
    IssueNova = IssueNova.data;

    let IssueID = IssueNova.id;
    let IssueNumero = IssueNova.number;

    Dados = {...Dados, issue_id: IssueID, issue_numero: IssueNumero};
    await alterarIssueFirebase(Repo, IssueNumero, Dados);
    return true;
  }
  return false;
};

export const alterarIssue = async (Repo, IssueNumero, Dados) => {
  const OctokitBase = await getOctokitBase();
  let IssueEdit = await OctokitBase.issues.update({
    owner: 'fwctecnologia',
    repo: Repo,
    issue_number: IssueNumero,
    titulo: Dados.titulo,
    state: Dados.status,
    body: Dados.body,
  });

  if (IssueEdit && (IssueEdit.status == 200 || IssueEdit.status == 201)) {
    await alterarIssueFirebase(Repo, IssueNumero, Dados);

    return true;
  }
  return false;
};

export const alterarIssueFirebase = async (Repo, IssueNumero, Dados) => {
  //console.log('Dados : ' + JSON.stringify(Dados));

  let IssueAux = await getDadosCollection(CollectionIssues, [
    {Campo: 'issue_numero', Expressao: '==', Valor: IssueNumero},
    {Campo: 'repo', Expressao: '==', Valor: Repo},
  ]);

  if (IssueAux && IssueAux.length > 0) {
    await updateDocCollection(CollectionIssues, IssueAux[0].Id, Dados);
  } else {
    return await cadastrarDadosCollection(CollectionIssues, Dados);
  }

  return true;
};

export const alterarUsuarioFirestore = async (UsuarioID, Dados) => {
  await updateDocCollection('admin_usuarios', UsuarioID, Dados);
  return true;
};

// ---  Configurações ---
const CollectionConfiguracoes = 'configuracoes';
export const getConfiguracoes = async (UsuarioID) => {
  let Dados = await getDadosCollection(CollectionConfiguracoes, [
    {Campo: 'usuario', Expressao: '==', Valor: UsuarioID},
  ]);

  return Dados && Dados.length > 0 ? Dados[0] : null;
};

export const alterarConfiguracoes = async (
  ConfiguracaoID,
  UsuarioID,
  Dados,
) => {
  //console.log('Dados : ' + JSON.stringify(Dados));

  if (ConfiguracaoID) {
    await updateDocCollection(CollectionConfiguracoes, ConfiguracaoID, Dados);
  } else {
    await cadastrarDadosCollection(CollectionConfiguracoes, Dados);
  }

  return true;
};

// ---  Projetos ---
const CollectionProjetos = 'projetos';
export const getProjetos = async () => {
  return getDadosCollection(CollectionProjetos, null, [
    {Campo: 'ordem', Direcao: 'desc'},
  ]);
};

export const getProjeto = async (Id) => {
  return getDocCollection(CollectionProjetos, Id);
};

export const cadastrarProjeto = async (Dados) => {
  await cadastrarDadosCollection(CollectionProjetos, Dados);
  return true;
};

export const alterarProjeto = async (Id, Dados) => {
  //console.log('Dados : ' + JSON.stringify(Dados));
  await updateDocCollection(CollectionProjetos, Id, Dados);
  return true;
};

export const deletarProjeto = async (Id) => {
  await deleteDocCollection(CollectionProjetos, Id);
  return true;
};

export const getPermissaoAcessoUsuarioFirestore = async (Uid) => {
  if (!Uid) {
    console.log('Uid inválido - getPermissaoAcessoUsuarioFirestore');
    return false;
  }

  //console.log('Uid : ' + Uid);
  let DadosUsuario = await getDocCollection('admin_usuarios', Uid);

  if (DadosUsuario) {
    return DadosUsuario.paths;
  }

  return null;
};

export const getUsuarioFirestore = async (Uid) => {
  if (!Uid) {
    console.log('Uid inválido - getUsuarioFirestore');
    return false;
  }

  //console.log('Uid : ' + Uid);
  let DadosUsuario = await getDocCollection('admin_usuarios', Uid);

  return DadosUsuario ? DadosUsuario : null;
};

export const getUsuariosFirestore = async () => {
  return await getDadosCollection('admin_usuarios');
};

export const alterarSenhaUsuarioAtual = async (NovaSenha) => {
  let user = auth().currentUser;
  user
    .updatePassword(NovaSenha)
    .then(() => {
      console.log('Senha alterada com sucesso');
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getLinkImagemFireCloud = async (NomeImagem) => {
  let Url = '';
  try {
    Url = await storage()
      .ref('imagens/' + NomeImagem)
      .getDownloadURL();

    console.log('Url : ' + Url);
  } catch (erro) {
    console.log('erro : ' + erro);
  }

  return Url;
};

export const gravarImagem = async (URLImagem) => {
  let EnviouComSucesso = false;
  let filename;

  try {
    //console.log('URLImagem : ' + URLImagem);

    const ext = URLImagem.split('.').pop(); // Extract image extension
    filename = `${uuid()}.${ext}`; // Generate unique name

    //console.log('ext : ' + ext);
    //console.log('filename : ' + filename);

    await storage()
      .ref(`imagens/${filename}`)
      .putFile(URLImagem)
      .then(async () => {
        EnviouComSucesso = true;
        console.log('Imagem Enviada com sucesso');
      });

    //console.log(filename);
    //console.log('EnviouComSucesso : ' + EnviouComSucesso);
  } catch (err) {
    console.log(err);
  }

  return EnviouComSucesso ? filename : false;
};

export const enviarNotificacao = async (
  TokenParm,
  TipoNotificacaoParm,
  Dados = {},
) => {
  //console.log('TokenParm : ' + TokenParm);
  await functions()
    .httpsCallable('enviarNotificacaoPush')({
      Token: TokenParm,
      TipoNotificacao: TipoNotificacaoParm,
      ...Dados,
    })
    .then((response) => {
      console.log('Notficação solicitada : ' + response);
    });
};

export const enviarEmail = async (Email, Tipo) => {
  //console.log('Email : ' + Email);
  await functions()
    .httpsCallable('enviarEmail')({
      EmailDestinatario: Email,
      TipoEmail: Tipo,
    })
    .then((response) => {
      console.log('Email solicitado : ' + response);
    });
};

export const getDocCollection = async (Collection, Doc) => {
  let DadosDoc = null;

  try {
    await firestore()
      .collection(Collection)
      .doc(Doc)
      .get()
      .then(async (documentSnapshot) => {
        if (documentSnapshot.exists) {
          DadosDoc = documentSnapshot.data();
          DadosDoc.id = documentSnapshot.id;
          DadosDoc.key = documentSnapshot.id;
        }
      });

    //console.log('DadosDoc : ' + DadosDoc);
    return DadosDoc;
  } catch (err) {
    console.log(err);
    console.log(JSON.stringify(err));

    return null;
  }
};

export const getDadosCollection = async (
  Collection,
  ArrayWhere,
  ArrayOrder,
  LastDoc,
) => {
  let ArrayDados = [];
  let Data;
  let BaseFunctionFirebase = firestore().collection(Collection);

  if (ArrayWhere) {
    ArrayWhere.forEach((Where) => {
      BaseFunctionFirebase = BaseFunctionFirebase.where(
        Where.Campo,
        Where.Expressao,
        Where.Valor,
      );
    });
  }

  if (ArrayOrder) {
    ArrayOrder.forEach((Order) => {
      BaseFunctionFirebase = BaseFunctionFirebase.orderBy(
        Order.Campo,
        Order.Direcao,
      );
    });
  }

  await BaseFunctionFirebase.get().then((querySnapshot) => {
    querySnapshot.forEach(async (documentSnapshot) => {
      Data = documentSnapshot.data();
      Data.Key = documentSnapshot.id;
      Data.key = documentSnapshot.id;
      Data.id = documentSnapshot.id;
      Data.Id = documentSnapshot.id;
      ArrayDados.push(Data);

      //console.log('Data.especialidade.nome ' + Data);
    });
  });

  //console.log('ArrayDados : ' + ArrayDados);
  return ArrayDados;
};

export const cadastrarDadosCollection = async (Collection, Dados) => {
  //console.log('Collection : ' + Collection);
  //console.log('Dados : ' + Dados);

  if (!Collection || !Dados) {
    console.log('Dados inválidos - cadastrarDadosCollection');
    return false;
  }

  Dados.createdAt = firestore.FieldValue.serverTimestamp();

  let Id;
  await firestore()
    .collection(Collection)
    .add(Dados)
    .then((ref) => {
      //console.log('Data added! ' + ref.id);
      Id = ref.id;
    });
  //console.log('Collection ID : ' + Collection + ' ' + Id);
  return Id;
};

export const updateDocCollection = async (Collection, Doc, Dados) => {
  if (!Collection || !Doc || !Dados) {
    console.log('Dados inválidos - updateDocCollection');
    return false;
  }

  Dados.updateAt = firestore.FieldValue.serverTimestamp();

  await firestore().collection(Collection).doc(Doc).update(Dados);
  //console.log('Collection ID : ' + Collection + ' ' + Id);
  return true;
};

export const deleteDocCollection = async (Collection, Doc) => {
  if (!Collection || !Doc) {
    console.log('Dados inválidos - deleteDocCollection');
    return false;
  }

  await firestore()
    .collection(Collection)
    .doc(Doc)
    .delete()
    .then(() => {
      console.log(Collection + ' ' + Doc + ' deleted!');
    });
  //console.log('Collection ID : ' + Collection + ' ' + Id);
  return true;
};

export const firebaseSingOut = async () => {
  try {
    await auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  } catch (erro) {
    console.log(erro);
  }
};

const URLBaseGIT = 'https://api.github.com/';
const TokenGIT = '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';

const APIGIT = async (URL) => {
  try {
    const URLAcesso = URLBaseGIT + URL;
    //console.log('URLAcesso : ' + URLAcesso);

    const requestOptions = {
      method: 'GET',
      headers: {Authorization: 'Bearer ' + TokenGIT},
    };

    let Resposta = await fetch(URLAcesso, requestOptions);
    //console.log(Resposta);

    let Data = await Resposta.json();

    //console.log(Data);

    return Data;
  } catch (err) {
    console.log('ERRO: ' + err);
  }
};
