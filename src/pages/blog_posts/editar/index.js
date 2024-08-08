import React, {useState, useEffect} from 'react';
import Container from '~/componentes/container';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import Title from '~/componentes/title';

import {TextInputAdmin, SelectInputAdmin} from '~/componentes/TextInputAdmin';
import MenuItem from '@material-ui/core/MenuItem';

import {useHistory, useLocation, useParams} from 'react-router-dom';
import {
  getBlogPost,
  cadastrarBlogPost,
  alterarBlogPost,
  deletarBlogPost,
  getBlogCategorias,
  getBlogAutores,
  getTextoTraduzido,
} from '~/servicos/firebase_api';
import {
  DivConteudoFormulario,
  Formulario,
  DivBotao,
  DivBotaoVoltar,
  ClassesBase,
  DivPermissoesAcesso,
  DivLabelPermissoesAcesso,
  Label,
} from '~/styles_base';
import Button from '@material-ui/core/Button';
import {getMode} from '~/core';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import DecoupledEditor from '@ckeditor/ckeditor5-editor-decoupled';

const BlogPostsEditar = (props) => {
  const classes = ClassesBase();
  const [loading, setLoading] = useState(false);
  const [Inicio, setInicio] = useState(true);
  const [Modo, setModo] = useState('Editar');
  const [DisplayMode, setDisplayMode] = useState(false);

  const History = useHistory();
  const Location = useLocation();
  const {id} = useParams();

  const [BlogPost, setBlogPost] = useState();
  const [BlogCategorias, setBlogCategorias] = useState();

  const [BlogCategoriaSelecionada1, setBlogCategoriaSelecionada1] = useState();
  const [BlogCategoriaSelecionada2, setBlogCategoriaSelecionada2] = useState();
  const [BlogCategoriaSelecionada3, setBlogCategoriaSelecionada3] = useState();
  const [BlogCategoriaSelecionada4, setBlogCategoriaSelecionada4] = useState();

  const [Destaque, setDestaque] = useState(false);
  const [DescricaoCurta, setDescricaoCurta] = useState();
  const [DescricaoCurtaEN, setDescricaoCurtaEN] = useState('');
  const [DescricaoCurtaES, setDescricaoCurtaES] = useState('');

  const [Assuntos, setAssuntos] = useState();
  const [AssuntosEN, setAssuntosEN] = useState('');
  const [AssuntosES, setAssuntosES] = useState('');

  const [KeyWords, setKeyWords] = useState();
  const [KeyWordsEN, setKeyWordsEN] = useState('');
  const [KeyWordsES, setKeyWordsES] = useState('');

  const [URLPost, setURLPost] = useState();
  const [URLPostEN, setURLPostEN] = useState('');
  const [URLPostES, setURLPostES] = useState('');

  const [BlogAutores, setBlogAutores] = useState();
  const [AutorSelecionado, setAutorSelecionado] = useState(
    '3rCMFLe58irfCEsb80NH',
  );

  const [Titulo, setTitulo] = useState();
  const [TituloEN, setTituloEN] = useState('');
  const [TituloES, setTituloES] = useState('');

  const [Descricao, setDescricao] = useState();
  const [DescricaoEN, setDescricaoEN] = useState('');
  const [DescricaoES, setDescricaoES] = useState('');

  const [Imagem, setImagem] = useState();

  const [Data, setData] = useState('01/04/2023');
  const [TempoLeitura, setTempoLeitura] = useState('10 min');
  const [ExibirSite, setExibirSite] = useState(true);
  const [Status, setStatus] = useState('A');

  useEffect(() => {
    let ModoAux = getMode(Location);
    setModo(ModoAux);

    if (ModoAux != 'Editar' && ModoAux != 'Cadastrar') {
      setDisplayMode(true);
    }

    carregarDados(ModoAux);
  }, [Inicio]);

  const carregarDados = async (ModoParm) => {
    setLoading(true);

    let BlogCategoriasAux = await getBlogCategorias();
    setBlogCategorias(BlogCategoriasAux);

    let BlogAutoresAux = await getBlogAutores();
    setBlogAutores(BlogAutoresAux);

    if (ModoParm != 'Cadastrar') {
      let BlogPostAux = await getBlogPost(id);

      formatar(BlogPostAux);
    }

    setLoading(false);
  };

  const formatar = (BlogPostParm) => {
    const {tempo_leitura, data, autor_id} = BlogPostParm;
    setTitulo(BlogPostParm.titulo);
    setDescricao(BlogPostParm.descricao);
    setDescricaoCurta(BlogPostParm.descricao_curta);

    setImagem(BlogPostParm.imagem);

    setTempoLeitura(tempo_leitura ?? TempoLeitura);
    setData(data ?? Data);

    setTituloEN(BlogPostParm.titulo_en);
    setDescricaoEN(BlogPostParm.descricao_en);
    setDescricaoCurtaEN(BlogPostParm.descricao_curta_en);

    setTituloES(BlogPostParm.titulo_es);
    setDescricaoES(BlogPostParm.descricao_es);
    setDescricaoCurtaES(BlogPostParm.descricao_curta_es);

    setAutorSelecionado(autor_id ?? AutorSelecionado);
    setDestaque(BlogPostParm.destaque);

    setURLPost(BlogPostParm.url_post);
    setURLPostEN(BlogPostParm.url_post_en);
    setURLPostES(BlogPostParm.url_post_es);

    let KeyWordsAux = getKeyWordsFormatadas(BlogPostParm.keywords);
    setKeyWords(KeyWordsAux);

    KeyWordsAux = getKeyWordsFormatadas(BlogPostParm.keywords_en);
    setKeyWordsEN(KeyWordsAux);

    KeyWordsAux = getKeyWordsFormatadas(BlogPostParm.keywords_es);
    setKeyWordsES(KeyWordsAux);

    let AssuntosAux = getAssuntosFormatados(BlogPostParm.assuntos);
    setAssuntos(AssuntosAux);

    AssuntosAux = getAssuntosFormatados(BlogPostParm.assuntos_en);
    setAssuntosEN(AssuntosAux);

    AssuntosAux = getAssuntosFormatados(BlogPostParm.assuntos_es);
    setAssuntosES(AssuntosAux);

    preencherCategorias(BlogPostParm.categorias);
    setExibirSite(BlogPostParm.exibir_site);
    setStatus(BlogPostParm.status);
    setBlogPost(BlogPostParm);
  };

  const preencherCategorias = (CategoriasParm) => {
    let NCategorias = CategoriasParm ? CategoriasParm.length : 0;
    switch (NCategorias) {
      case 4:
        setBlogCategoriaSelecionada1(CategoriasParm[0]);
        setBlogCategoriaSelecionada2(CategoriasParm[1]);
        setBlogCategoriaSelecionada3(CategoriasParm[2]);
        setBlogCategoriaSelecionada4(CategoriasParm[3]);
        break;
      case 3:
        setBlogCategoriaSelecionada1(CategoriasParm[0]);
        setBlogCategoriaSelecionada2(CategoriasParm[1]);
        setBlogCategoriaSelecionada3(CategoriasParm[2]);
        break;
      case 2:
        setBlogCategoriaSelecionada1(CategoriasParm[0]);
        setBlogCategoriaSelecionada2(CategoriasParm[1]);
        break;
      case 1:
        setBlogCategoriaSelecionada1(CategoriasParm[0]);
        break;

      default:
        break;
    }
  };

  const getAssuntosFormatados = (AssuntosArray) => {
    let AssuntosAux = '';

    for (
      let index = 0;
      AssuntosArray && index < AssuntosArray.length;
      index++
    ) {
      const Assunto = AssuntosArray[index];

      AssuntosAux += `${Assunto},`;
    }

    if (AssuntosAux != '') {
      return AssuntosAux.substr(0, AssuntosAux.length - 1);
    }

    return null;
  };

  const getKeyWordsFormatadas = (KeyWordsArray) => {
    let KeyWordsAux = '';

    for (
      let index = 0;
      KeyWordsArray && index < KeyWordsArray.length;
      index++
    ) {
      const KeyWord = KeyWordsArray[index];

      KeyWordsAux += `${KeyWord},`;
    }

    if (KeyWordsAux != '') {
      return KeyWordsAux.substr(0, KeyWordsAux.length - 1);
    }
    return null;
  };

  const validouDados = () => {
    let Validou = true;

    if (!Titulo) {
      Validou = false;
    }

    if (
      !(
        BlogCategoriaSelecionada1 ||
        BlogCategoriaSelecionada2 ||
        BlogCategoriaSelecionada3 ||
        BlogCategoriaSelecionada4
      )
    ) {
      Validou = false;
    }

    if (!Descricao) {
      Validou = false;
    }

    return Validou;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validouDados()) return;

    switch (Modo) {
      case 'Visualizar':
        History.goBack();
        break;
      case 'Cadastrar':
        cadastrar();
        break;
      case 'Editar':
        editar();
        break;
      case 'Excluir':
        excluir();
        break;

      default:
        console.log('Nenhuma ação escolhida');
        break;
    }
  };

  const getDados = () => {
    let ArrayCategorias = [];

    if (BlogCategoriaSelecionada1) {
      ArrayCategorias.push(BlogCategoriaSelecionada1);
    }

    if (BlogCategoriaSelecionada2) {
      ArrayCategorias.push(BlogCategoriaSelecionada2);
    }

    if (BlogCategoriaSelecionada3) {
      ArrayCategorias.push(BlogCategoriaSelecionada3);
    }

    if (BlogCategoriaSelecionada4) {
      ArrayCategorias.push(BlogCategoriaSelecionada4);
    }
    let CategoriaPrincipal;

    if (ArrayCategorias.length > 0) {
      CategoriaPrincipal = {
        id: ArrayCategorias[0],
        nome: getCategoriaNome(ArrayCategorias[0]),
      };
    }

    return {
      titulo: Titulo ? Titulo : null,
      titulo_en: TituloEN ?? null,
      titulo_es: TituloES ?? null,

      descricao: Descricao ? tratarLinksPost(Descricao) : null,
      descricao_en: DescricaoEN ? tratarLinksPost(DescricaoEN) : null,
      descricao_es: DescricaoES ? tratarLinksPost(DescricaoES) : null,

      descricao_curta: DescricaoCurta ? DescricaoCurta : null,
      descricao_curta_en: DescricaoCurtaEN ?? null,
      descricao_curta_es: DescricaoCurtaES ?? null,

      imagem: Imagem ?? null,

      autor_id: AutorSelecionado,
      destaque: Destaque ? Destaque : null,
      categorias: ArrayCategorias.length > 0 ? ArrayCategorias : null,
      categoria_principal_id: CategoriaPrincipal ? CategoriaPrincipal.id : null,
      categoria_principal_nome: CategoriaPrincipal
        ? CategoriaPrincipal.nome
        : null,

      assuntos: Assuntos ? Assuntos.split(',') : null,
      assuntos_en: AssuntosEN ? AssuntosEN.split(',') : null,
      assuntos_es: AssuntosES ? AssuntosES.split(',') : null,

      keywords: KeyWords ? KeyWords.split(',') : null,
      keywords_en: KeyWordsEN ? KeyWordsEN.split(',') : null,
      keywords_es: KeyWordsES ? KeyWordsES.split(',') : null,

      url_post: URLPost ? URLPost : null,
      url_post_en: URLPostEN ? URLPostEN : null,
      url_post_es: URLPostES ? URLPostES : null,

      tempo_leitura: calcularTempoLeitura(Descricao),
      data: Data ? Data : null,
      exibir_site: ExibirSite,
      status: Status,
    };
  };

  const calcularTempoLeitura = (PostParm) => {
    let TempoLeituraAux = 0;

    if (PostParm && PostParm.length > 0) {
      let Palavras = PostParm.split(' ').length;
      let Minutos = Palavras / 200;

      //console.log('Palavras : ' + Palavras);
      //console.log('Minutos : ' + Minutos);

      TempoLeituraAux = Math.ceil(Minutos);
    } else {
      TempoLeituraAux = 5;
      //console.log('else');
    }

    return `${TempoLeituraAux} min`;
  };

  const tratarLinksPost = (PostParm) => {
    let PostAux = PostParm;

    if (PostParm.indexOf('target="_blank"') < 0) {
      PostAux = PostParm.replaceAll('<a', `<a target="_blank" `);
    }

    //console.log('PostAux teste links : ' + PostAux);
    return PostAux;
  };

  const getCategoriaNome = (CategoriaID) => {
    let BlogCategoriaSelecionadaAux = BlogCategorias.find((Item) => {
      if (Item.id == CategoriaID) return Item;
    });

    return BlogCategoriaSelecionadaAux
      ? BlogCategoriaSelecionadaAux.nome
      : null;
  };

  const getAutor = (AutorID) => {
    return BlogAutores.find((Item) => {
      if (Item.id == AutorID) return Item;
    });
  };

  const cadastrar = async () => {
    setLoading(true);

    let Dados = getDados();

    let Sucesso = await cadastrarBlogPost(Dados);
    finalizarAcao(Sucesso, 'CADASTRAR');
  };

  const editar = async () => {
    setLoading(true);

    let Dados = getDados();

    let Sucesso = await alterarBlogPost(BlogPost.id, Dados);
    finalizarAcao(Sucesso, 'ALTERAR');
  };

  const excluir = async () => {
    setLoading(true);

    let Sucesso = await deletarBlogPost(BlogPost.id);
    finalizarAcao(Sucesso, 'EXCLUIR');
  };

  const finalizarAcao = (MSG_RESULTADO, MSG_TIPO_ACAO) => {
    localStorage.setItem('@MSG_RESULTADO', MSG_RESULTADO.toString());
    localStorage.setItem('@MSG_TIPO_ACAO', MSG_TIPO_ACAO);

    setLoading(false);
    History.goBack();
  };

  const traduzirTextos = async (e) => {
    e.preventDefault();
    let TextoAux = '';

    setLoading(true);

    if (Titulo) {
      TextoAux = await getTextoTraduzido(Titulo, 'en');
      TextoAux = TextoAux.toString();

      setTituloEN(TextoAux);

      TextoAux = await getTextoTraduzido(Titulo, 'es');
      TextoAux = TextoAux.toString();

      setTituloES(TextoAux);
    }

    if (DescricaoCurta) {
      TextoAux = await getTextoTraduzido(DescricaoCurta, 'en');
      TextoAux = TextoAux.toString();

      setDescricaoCurtaEN(TextoAux);

      TextoAux = await getTextoTraduzido(DescricaoCurta, 'es');
      TextoAux = TextoAux.toString();

      setDescricaoCurtaES(TextoAux);
    }

    if (Assuntos) {
      TextoAux = await getTextoTraduzido(Assuntos, 'en');
      TextoAux = TextoAux.toString();

      setAssuntosEN(TextoAux);

      TextoAux = await getTextoTraduzido(Assuntos, 'es');
      TextoAux = TextoAux.toString();

      setAssuntosES(TextoAux);
    }

    if (KeyWords) {
      TextoAux = await getTextoTraduzido(KeyWords, 'en', true);
      TextoAux = TextoAux.toString();

      setKeyWordsEN(TextoAux);

      TextoAux = await getTextoTraduzido(KeyWords, 'es', true);
      TextoAux = TextoAux.toString();

      setKeyWordsES(TextoAux);
    }

    if (URLPost) {
      TextoAux = await getTextoTraduzido(URLPost, 'en', true);
      TextoAux = TextoAux.toString();

      setURLPostEN(TextoAux);

      TextoAux = await getTextoTraduzido(URLPost, 'es', true);
      TextoAux = TextoAux.toString();

      setURLPostES(TextoAux);
    }

    if (Descricao) {
      //console.log('Descricao : ' + Descricao);

      TextoAux = await getTextoTraduzido(Descricao, 'en');
      TextoAux = TextoAux.toString();
      TextoAux = ajustarLinks(TextoAux, 'en');

      setDescricaoEN(TextoAux);

      TextoAux = await getTextoTraduzido(Descricao, 'es');
      TextoAux = TextoAux.toString();
      TextoAux = ajustarLinks(TextoAux, 'es');

      setDescricaoES(TextoAux);
    }

    setLoading(false);
  };

  const traduzirConteudoPost = async (e) => {
    e.preventDefault();
    let TextoAux = '';

    setLoading(true);

    if (Descricao) {
      //console.log('Descricao : ' + Descricao);

      TextoAux = await getTextoTraduzido(Descricao, 'en');
      TextoAux = TextoAux.toString();
      TextoAux = ajustarLinks(TextoAux, 'en');

      setDescricaoEN(TextoAux);

      TextoAux = await getTextoTraduzido(Descricao, 'es');
      TextoAux = TextoAux.toString();
      TextoAux = ajustarLinks(TextoAux, 'es');

      setDescricaoES(TextoAux);
    }

    setLoading(false);
  };

  const ajustarLinks = (Texto, Idioma) => {
    let TextoAux = Texto;

    //if (!(TextoAux.indexOf('blog') > 0)) {   }

    TextoAux = TextoAux.replaceAll(
      'https://fwctecnologia.com/',
      `https://fwctecnologia.com/${Idioma}/`,
    );

    return TextoAux;
  };

  return (
    <Container loading={loading} {...props}>
      <TableContainer component={Paper}>
        <Title>{Modo}</Title>
        <DivConteudoFormulario>
          {!BlogPost && Modo != 'Cadastrar' ? (
            <></>
          ) : (
            <>
              <Formulario
                className={classes.Formulario}
                onSubmit={handleSubmit}>
                <TextInputAdmin
                  label="ID"
                  value={BlogPost ? BlogPost.id : ''}
                  disabled={true}
                />

                <br></br>

                <TextInputAdmin
                  required
                  label="Título"
                  autoComplete="nome"
                  autoFocus
                  value={Titulo}
                  onChange={({target}) => setTitulo(target.value)}
                  disabled={DisplayMode}
                  multiline
                  rowsMax="4"
                />

                <TextInputAdmin
                  required
                  label="Descrição Curta"
                  autoComplete="nome"
                  value={DescricaoCurta}
                  onChange={({target}) => setDescricaoCurta(target.value)}
                  disabled={DisplayMode}
                  multiline
                />

                <TextInputAdmin
                  label="Imagem"
                  autoComplete="nome"
                  value={Imagem}
                  onChange={({target}) => setImagem(target.value)}
                  disabled={DisplayMode}
                />

                <TextInputAdmin
                  required
                  label="Assuntos( Separados por ',')"
                  autoComplete="nome"
                  value={Assuntos}
                  onChange={({target}) => setAssuntos(target.value)}
                  disabled={DisplayMode}
                />

                <TextInputAdmin
                  required
                  label="KeyWords( Separados por ',')"
                  autoComplete="nome"
                  value={KeyWords}
                  onChange={({target}) => setKeyWords(target.value)}
                  disabled={DisplayMode}
                />

                <TextInputAdmin
                  required
                  label="URL Post"
                  //autoComplete="nome"

                  value={URLPost}
                  onChange={({target}) => setURLPost(target.value)}
                  disabled={DisplayMode}
                />

                <br></br>

                <TextInputAdmin
                  required
                  label="Data"
                  //autoComplete="nome"

                  value={Data}
                  onChange={({target}) => setData(target.value)}
                  disabled={DisplayMode}
                />

                <TextInputAdmin
                  required
                  label="Tempo Leitura"
                  //autoComplete="nome"

                  value={TempoLeitura}
                  onChange={({target}) => setTempoLeitura(target.value)}
                  disabled={true}
                />

                {BlogAutores && (
                  <SelectInputAdmin
                    required
                    label="Autor"
                    value={AutorSelecionado}
                    onChange={({target}) => setAutorSelecionado(target.value)}
                    disabled={DisplayMode}>
                    {BlogAutores.map((AutorItem) => (
                      <MenuItem value={AutorItem.id}>{AutorItem.nome}</MenuItem>
                    ))}
                  </SelectInputAdmin>
                )}

                <SelectInputAdmin
                  required
                  label="Destaque"
                  value={Destaque}
                  onChange={({target}) => setDestaque(target.value)}
                  disabled={DisplayMode}>
                  <MenuItem value={true}>Sim</MenuItem>
                  <MenuItem value={false}>Não</MenuItem>
                </SelectInputAdmin>

                {BlogCategorias && (
                  <>
                    <SelectInputAdmin
                      required
                      label="Categoria 1"
                      value={BlogCategoriaSelecionada1}
                      onChange={({target}) =>
                        setBlogCategoriaSelecionada1(target.value)
                      }
                      disabled={DisplayMode}>
                      {BlogCategorias.map((CategoriaItem) => (
                        <MenuItem value={CategoriaItem.id}>
                          {CategoriaItem.nome}
                        </MenuItem>
                      ))}
                    </SelectInputAdmin>
                    <SelectInputAdmin
                      required
                      label="Categoria 2"
                      value={BlogCategoriaSelecionada2}
                      onChange={({target}) =>
                        setBlogCategoriaSelecionada2(target.value)
                      }
                      disabled={DisplayMode}>
                      {BlogCategorias.map((CategoriaItem) => (
                        <MenuItem value={CategoriaItem.id}>
                          {CategoriaItem.nome}
                        </MenuItem>
                      ))}
                    </SelectInputAdmin>
                    <SelectInputAdmin
                      required
                      label="Categoria 3"
                      value={BlogCategoriaSelecionada3}
                      onChange={({target}) =>
                        setBlogCategoriaSelecionada3(target.value)
                      }
                      disabled={DisplayMode}>
                      {BlogCategorias.map((CategoriaItem) => (
                        <MenuItem value={CategoriaItem.id}>
                          {CategoriaItem.nome}
                        </MenuItem>
                      ))}
                    </SelectInputAdmin>
                    <SelectInputAdmin
                      required
                      label="Categoria 4"
                      value={BlogCategoriaSelecionada4}
                      onChange={({target}) =>
                        setBlogCategoriaSelecionada4(target.value)
                      }
                      disabled={DisplayMode}>
                      {BlogCategorias.map((CategoriaItem) => (
                        <MenuItem value={CategoriaItem.id}>
                          {CategoriaItem.nome}
                        </MenuItem>
                      ))}
                    </SelectInputAdmin>
                  </>
                )}
                <br></br>
                <SelectInputAdmin
                  required
                  label="Exibir no Site"
                  value={ExibirSite}
                  onChange={({target}) => setExibirSite(target.value)}
                  disabled={DisplayMode}>
                  <MenuItem value={true}>Sim</MenuItem>
                  <MenuItem value={false}>Não</MenuItem>
                </SelectInputAdmin>

                <SelectInputAdmin
                  required
                  label="Status"
                  value={Status}
                  onChange={({target}) => setStatus(target.value)}
                  disabled={DisplayMode}>
                  <MenuItem value={'A'}>Ativo</MenuItem>
                  <MenuItem value={'I'}>Inativo</MenuItem>
                </SelectInputAdmin>

                <br></br>
                <br></br>

                <CKEditor
                  editor={ClassicEditor}
                  data={Descricao}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDescricao(data);
                  }}
                  onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                  }}
                />
                <br></br>
                <br></br>

                <br></br>
                <br></br>
                <Button
                  onClick={traduzirTextos}
                  type="submit"
                  variant="contained"
                  color="primary">
                  Traduzir Textos (tudo)
                </Button>
                <Button
                  onClick={traduzirConteudoPost}
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{marginLeft: 10}}>
                  Traduzir Conteúdo
                </Button>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <TextInputAdmin
                  required
                  label="Título - EN"
                  autoComplete="nome"
                  value={TituloEN}
                  onChange={({target}) => setTituloEN(target.value)}
                  disabled={DisplayMode}
                  multiline
                  rowsMax="4"
                />

                <TextInputAdmin
                  required
                  label="Título - ES"
                  autoComplete="nome"
                  value={TituloES}
                  onChange={({target}) => setTituloES(target.value)}
                  disabled={DisplayMode}
                  multiline
                  rowsMax="4"
                />

                <br></br>

                <TextInputAdmin
                  required
                  label="Descrição Curta - EN"
                  autoComplete="nome"
                  value={DescricaoCurtaEN}
                  onChange={({target}) => setDescricaoCurtaEN(target.value)}
                  disabled={DisplayMode}
                  multiline
                />

                <TextInputAdmin
                  required
                  label="Descrição Curta - ES"
                  autoComplete="nome"
                  value={DescricaoCurtaES}
                  onChange={({target}) => setDescricaoCurtaES(target.value)}
                  disabled={DisplayMode}
                  multiline
                />
                <br></br>

                <TextInputAdmin
                  required
                  label="Assuntos( Separados por ',') - EN"
                  autoComplete="nome"
                  value={AssuntosEN}
                  onChange={({target}) => setAssuntosEN(target.value)}
                  disabled={DisplayMode}
                />

                <TextInputAdmin
                  required
                  label="Assuntos( Separados por ',') - ES"
                  autoComplete="nome"
                  value={AssuntosES}
                  onChange={({target}) => setAssuntosES(target.value)}
                  disabled={DisplayMode}
                />
                <br></br>

                <TextInputAdmin
                  required
                  label="KeyWords( Separados por ',') - EN"
                  autoComplete="nome"
                  value={KeyWordsEN}
                  onChange={({target}) => setKeyWordsEN(target.value)}
                  disabled={DisplayMode}
                />

                <TextInputAdmin
                  required
                  label="KeyWords( Separados por ',') - ES"
                  autoComplete="nome"
                  value={KeyWordsES}
                  onChange={({target}) => setKeyWordsES(target.value)}
                  disabled={DisplayMode}
                />
                <br></br>

                <TextInputAdmin
                  required
                  label="URL Post - EN"
                  //autoComplete="nome"

                  value={URLPostEN}
                  onChange={({target}) => setURLPostEN(target.value)}
                  disabled={DisplayMode}
                />

                <TextInputAdmin
                  required
                  label="URL Post - ES"
                  //autoComplete="nome"

                  value={URLPostES}
                  onChange={({target}) => setURLPostES(target.value)}
                  disabled={DisplayMode}
                />
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <CKEditor
                  editor={ClassicEditor}
                  data={DescricaoEN}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDescricaoEN(data);
                  }}
                  onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                  }}
                />
                <br></br>
                <br></br>

                <CKEditor
                  editor={ClassicEditor}
                  data={DescricaoES}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDescricaoES(data);
                  }}
                  onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                  }}
                />
                <br></br>

                <DivBotaoVoltar>
                  <Button
                    onClick={() => History.goBack()}
                    fullWidth
                    variant="contained"
                    color="primary">
                    Voltar
                  </Button>
                </DivBotaoVoltar>
                {Modo == 'Visualizar' ? (
                  <></>
                ) : (
                  <DivBotao>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      color="primary">
                      Salvar
                    </Button>
                  </DivBotao>
                )}
              </Formulario>
            </>
          )}
        </DivConteudoFormulario>
      </TableContainer>
    </Container>
  );
};

export default BlogPostsEditar;
