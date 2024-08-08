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
  getProjeto,
  cadastrarProjetot,
  alterarProjeto,
  deletarProjeto,
  cadastrarProjeto,
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

  const [Projeto, setProjeto] = useState();
  const [Nome, setNome] = useState(false);

  const [DescricaoCurtaPT, setDescricaoCurtaPT] = useState();
  const [DescricaoCurtaEN, setDescricaoCurtaEN] = useState();
  const [DescricaoCurtaES, setDescricaoCurtaES] = useState();

  const [CasoEstudoDescricao, setCasoEstudoDescricao] = useState();

  const [DescricaoPT, setDescricaoPT] = useState();
  const [DescricaoEN, setDescricaoEN] = useState();
  const [DescricaoES, setDescricaoES] = useState();

  const [CasoEstudo, setCasoEstudo] = useState(false);
  const [ExibirHome, setExibirHome] = useState(true);

  const [KeyWordsPT, setKeyWordsPT] = useState();
  const [KeyWordsEN, setKeyWordsEN] = useState();
  const [KeyWordsES, setKeyWordsES] = useState();

  const [LinkGoogle, setLinkGoogle] = useState();
  const [LinkApple, setLinkApple] = useState();

  const [BannerPequeno, setBannerPequeno] = useState();
  const [Banner, setBanner] = useState();

  const [Ordem, setOrdem] = useState(1);
  const [IDChave, setIDChave] = useState();

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

    if (ModoParm != 'Cadastrar') {
      let ProjetoAux = await getProjeto(id);

      formatar(ProjetoAux);
    }

    setLoading(false);
  };

  const formatar = (ProjetoParm) => {
    setNome(ProjetoParm.nome);
    setDescricaoCurtaPT(ProjetoParm.descricao_curta_pt);
    setDescricaoCurtaEN(ProjetoParm.descricao_curta_en);
    setDescricaoCurtaES(ProjetoParm.descricao_curta_es);

    setDescricaoPT(ProjetoParm.descricao_pt);
    setDescricaoEN(ProjetoParm.descricao_en);
    setDescricaoES(ProjetoParm.descricao_es);

    setCasoEstudoDescricao(ProjetoParm.caso_estudo_descricao);
    setCasoEstudo(ProjetoParm.caso_estudo);
    setExibirHome(ProjetoParm.exibir_home);
    setLinkGoogle(ProjetoParm.link_google);
    setLinkApple(ProjetoParm.link_apple);
    setBannerPequeno(ProjetoParm.banner_pequeno);
    setBanner(ProjetoParm.banner);
    setOrdem(ProjetoParm.ordem);
    setIDChave(ProjetoParm.id_chave);

    let KeyWordsPTAux = getKeyWordsFormatadas(ProjetoParm.keywords_pt);
    setKeyWordsPT(KeyWordsPTAux);

    let KeyWordsENAux = getKeyWordsFormatadas(ProjetoParm.keywords_en);
    setKeyWordsEN(KeyWordsENAux);

    let KeyWordsESAux = getKeyWordsFormatadas(ProjetoParm.keywords_es);
    setKeyWordsES(KeyWordsESAux);

    setStatus(ProjetoParm.status);
    setProjeto(ProjetoParm);
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

    if (!Nome) {
      Validou = false;
    }

    if (!IDChave) {
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
    return {
      nome: Nome ? Nome : null,
      descricao_curta_pt: DescricaoCurtaPT ? DescricaoCurtaPT : null,
      descricao_curta_en: DescricaoCurtaEN ? DescricaoCurtaEN : null,
      descricao_curta_es: DescricaoCurtaES ? DescricaoCurtaES : null,
      descricao_pt: DescricaoPT ? DescricaoPT : null,
      descricao_en: DescricaoEN ? DescricaoEN : null,
      descricao_es: DescricaoES ? DescricaoES : null,
      keywords_pt: KeyWordsPT ? KeyWordsPT.split(',') : null,
      keywords_en: KeyWordsEN ? KeyWordsEN.split(',') : null,
      keywords_es: KeyWordsES ? KeyWordsES.split(',') : null,
      caso_estudo_descricao: CasoEstudoDescricao ? CasoEstudoDescricao : null,
      caso_estudo: CasoEstudo,
      exibir_home: ExibirHome,
      link_google: LinkGoogle ? LinkGoogle : null,
      link_apple: LinkApple ? LinkApple : null,
      banner_pequeno: BannerPequeno ? BannerPequeno : null,
      banner: Banner ? Banner : null,
      ordem: Ordem ? parseInt(Ordem) : null,
      id_chave: IDChave,
      status: Status ? Status : null,
    };
  };

  const cadastrar = async () => {
    setLoading(true);

    let Dados = getDados();

    let Sucesso = await cadastrarProjeto(Dados);
    finalizarAcao(Sucesso, 'CADASTRAR');
  };

  const editar = async () => {
    setLoading(true);

    let Dados = getDados();

    let Sucesso = await alterarProjeto(Projeto.id, Dados);
    finalizarAcao(Sucesso, 'ALTERAR');
  };

  const excluir = async () => {
    setLoading(true);

    let Sucesso = await deletarProjeto(Projeto.id);
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

    if (DescricaoCurtaPT) {
      TextoAux = await getTextoTraduzido(DescricaoCurtaPT, 'en');
      TextoAux = TextoAux.toString();

      setDescricaoCurtaEN(TextoAux);

      TextoAux = await getTextoTraduzido(DescricaoCurtaPT, 'es');
      TextoAux = TextoAux.toString();

      setDescricaoCurtaES(TextoAux);
    }

    if (KeyWordsPT) {
      TextoAux = await getTextoTraduzido(KeyWordsPT, 'en', true);
      TextoAux = TextoAux.toString();

      setKeyWordsEN(TextoAux);

      TextoAux = await getTextoTraduzido(KeyWordsPT, 'es', true);
      TextoAux = TextoAux.toString();

      setKeyWordsES(TextoAux);
    }

    if (DescricaoPT) {
      TextoAux = await getTextoTraduzido(DescricaoPT, 'en');
      TextoAux = TextoAux.toString();

      setDescricaoEN(TextoAux);

      TextoAux = await getTextoTraduzido(DescricaoPT, 'es');
      TextoAux = TextoAux.toString();

      setDescricaoES(TextoAux);
    }

    setLoading(false);
  };

  return (
    <Container loading={loading} {...props}>
      <TableContainer component={Paper}>
        <Title>{Modo}</Title>
        <DivConteudoFormulario>
          {!Projeto && Modo != 'Cadastrar' ? (
            <></>
          ) : (
            <>
              <Formulario
                className={classes.Formulario}
                onSubmit={handleSubmit}>
                <TextInputAdmin
                  label="ID"
                  value={Projeto ? Projeto.id : ''}
                  disabled={true}
                />

                <TextInputAdmin
                  required
                  label="Nome"
                  autoComplete="nome"
                  autoFocus
                  value={Nome}
                  onChange={({target}) => setNome(target.value)}
                  disabled={DisplayMode}
                />

                <TextInputAdmin
                  required
                  label="ID Chave"
                  autoComplete="nome"
                  value={IDChave}
                  onChange={({target}) => setIDChave(target.value)}
                  disabled={DisplayMode}
                />

                <TextInputAdmin
                  required
                  label="Descrição Curta - PT"
                  autoComplete="nome"
                  value={DescricaoCurtaPT}
                  onChange={({target}) => setDescricaoCurtaPT(target.value)}
                  disabled={DisplayMode}
                  multiline
                  rowsMax="4"
                />

                <TextInputAdmin
                  required
                  label="Keywords PT"
                  autoComplete="nome"
                  value={KeyWordsPT}
                  onChange={({target}) => setKeyWordsPT(target.value)}
                  disabled={DisplayMode}
                />

                <TextInputAdmin
                  required
                  label="Banner Pequeno"
                  autoComplete="nome"
                  value={BannerPequeno}
                  onChange={({target}) => setBannerPequeno(target.value)}
                  disabled={DisplayMode}
                />

                <TextInputAdmin
                  required
                  label="Banner Maior"
                  autoComplete="nome"
                  value={Banner}
                  onChange={({target}) => setBanner(target.value)}
                  disabled={DisplayMode}
                />

                <TextInputAdmin
                  required
                  label="Link Google"
                  autoComplete="nome"
                  value={LinkGoogle}
                  onChange={({target}) => setLinkGoogle(target.value)}
                  disabled={DisplayMode}
                />

                <TextInputAdmin
                  required
                  label="Link Apple"
                  autoComplete="nome"
                  value={LinkApple}
                  onChange={({target}) => setLinkApple(target.value)}
                  disabled={DisplayMode}
                />

                <TextInputAdmin
                  required
                  label="Ordem"
                  autoComplete="nome"
                  value={Ordem}
                  onChange={({target}) => setOrdem(target.value)}
                  disabled={DisplayMode}
                />

                <SelectInputAdmin
                  required
                  label="Caso de Estudo"
                  value={CasoEstudo}
                  onChange={({target}) => setCasoEstudo(target.value)}
                  disabled={DisplayMode}>
                  <MenuItem value={true}>Sim</MenuItem>
                  <MenuItem value={false}>Não</MenuItem>
                </SelectInputAdmin>

                <TextInputAdmin
                  required
                  label="Caso de Estudo - Descrição"
                  autoComplete="nome"
                  value={CasoEstudoDescricao}
                  onChange={({target}) => setCasoEstudoDescricao(target.value)}
                  disabled={DisplayMode}
                  multiline
                  rowsMax="4"
                />

                <SelectInputAdmin
                  required
                  label="Exibir na Home"
                  value={ExibirHome}
                  onChange={({target}) => setExibirHome(target.value)}
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

                <CKEditor
                  editor={ClassicEditor}
                  data={DescricaoPT}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDescricaoPT(data);
                  }}
                  onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                  }}
                />
                <p></p>
                <br></br>
                <br></br>

                <br></br>
                <br></br>
                <Button
                  onClick={traduzirTextos}
                  type="submit"
                  variant="contained"
                  color="primary">
                  Traduzir textos
                </Button>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <TextInputAdmin
                  required
                  label="Descrição Curta - EN"
                  autoComplete="nome"
                  value={DescricaoCurtaEN}
                  onChange={({target}) => setDescricaoCurtaEN(target.value)}
                  disabled={DisplayMode}
                  multiline
                  rowsMax="4"
                />

                <TextInputAdmin
                  required
                  label="Keywords EN"
                  autoComplete="nome"
                  value={KeyWordsEN}
                  onChange={({target}) => setKeyWordsEN(target.value)}
                  disabled={DisplayMode}
                />

                <TextInputAdmin
                  required
                  label="Keywords ES"
                  autoComplete="nome"
                  value={KeyWordsES}
                  onChange={({target}) => setKeyWordsES(target.value)}
                  disabled={DisplayMode}
                />

                <TextInputAdmin
                  required
                  label="Descrição Curta - ES"
                  autoComplete="nome"
                  value={DescricaoCurtaES}
                  onChange={({target}) => setDescricaoCurtaES(target.value)}
                  disabled={DisplayMode}
                  multiline
                  rowsMax="4"
                />

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
