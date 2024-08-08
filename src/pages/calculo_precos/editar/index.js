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
  getProduto,
  cadastrarProduto,
  alterarProduto,
  deletarProduto,
  getMarcas,
  getBases,
  getAcabamentos,
  getIntensidades,
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

const ProdutosEditar = (props) => {
  const classes = ClassesBase();
  const [loading, setLoading] = useState(false);
  const [Inicio, setInicio] = useState(true);
  const [Modo, setModo] = useState('Editar');
  const [DisplayMode, setDisplayMode] = useState(false);

  const History = useHistory();
  const Location = useLocation();
  const {id} = useParams();

  const [Produto, setProduto] = useState();

  const [Marcas, setMarcas] = useState();
  const [MarcaSelecionada, setMarcaSelecionada] = useState();

  const [Bases, setBases] = useState();
  const [BaseSelecionada, setBaseSelecionada] = useState();

  const [Acabamentos, setAcabamentos] = useState();
  const [AcabamentoSelecionado, setAcabamentoSelecionado] = useState();

  const [Intensidades, setIntensidades] = useState();
  const [IntensidadeSelecionada, setIntensidadeSelecionada] = useState();

  const [ValorMinimo09, setValorMinimo09] = useState();
  const [Valor09, setValor09] = useState();
  const [Desconto09, setDesconto09] = useState();

  const [ValorMinimo36, setValorMinimo36] = useState();
  const [Valor36, setValor36] = useState();
  const [Desconto36, setDesconto36] = useState();

  const [ValorMinimo18, setValorMinimo18] = useState();
  const [Valor18, setValor18] = useState();
  const [Desconto18, setDesconto18] = useState();

  const [Nome, setNome] = useState();
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

    let MarcasAux = await getMarcas();
    setMarcas(MarcasAux);

    let BasesAux = await getBases();
    setBases(BasesAux);

    let AcabamentosAux = await getAcabamentos();
    setAcabamentos(AcabamentosAux);

    let IntensidadesAux = await getIntensidades();
    setIntensidades(IntensidadesAux);

    if (ModoParm != 'Cadastrar') {
      let ProdutoAux = await getProduto(id);

      setProduto(ProdutoAux);
      formatar(ProdutoAux);
    }

    setLoading(false);
  };

  const formatar = (ProdutoAux) => {
    setNome(ProdutoAux.nome);

    setMarcaSelecionada(ProdutoAux.marca_id);
    setBaseSelecionada(ProdutoAux.base_id);
    setAcabamentoSelecionado(ProdutoAux.acabamento_id);
    setIntensidadeSelecionada(ProdutoAux.intensidade_id);

    setValorMinimo09(ProdutoAux.valor_minimo_09);
    setValor09(ProdutoAux.valor_09);
    setDesconto09(ProdutoAux.desconto_09);

    setValorMinimo36(ProdutoAux.valor_minimo_36);
    setValor36(ProdutoAux.valor_36);
    setDesconto36(ProdutoAux.desconto_36);

    setValorMinimo18(ProdutoAux.valor_minimo_18);
    setValor18(ProdutoAux.valor_18);
    setDesconto18(ProdutoAux.desconto_18);

    setStatus(ProdutoAux.status);
  };

  const validouDados = () => {
    let Validou = true;

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
    let MarcaSelecionadaAux = Marcas.find((Item) => {
      if (Item.id == MarcaSelecionada) return Item;
    });

    let BaseSelecionadaAux = Bases.find((Item) => {
      if (Item.id == BaseSelecionada) return Item;
    });

    let AcabamentoSelecionadaAux = Acabamentos.find((Item) => {
      if (Item.id == AcabamentoSelecionado) return Item;
    });

    let IntensidadeSelecionadaAux = Intensidades.find((Item) => {
      if (Item.id == IntensidadeSelecionada) return Item;
    });

    return {
      valor_minimo_09: ValorMinimo09 ? ValorMinimo09 : null,
      valor_09: Valor09 ? Valor09 : null,
      desconto_09: Desconto09 ? Desconto09 : null,

      valor_minimo_36: ValorMinimo36 ? ValorMinimo36 : null,
      valor_36: Valor36 ? Valor36 : null,
      desconto_36: Desconto36 ? Desconto36 : null,

      valor_minimo_18: ValorMinimo18 ? ValorMinimo18 : null,
      valor_18: Valor18 ? Valor18 : null,
      desconto_18: Desconto18 ? Desconto18 : null,

      marca_id: MarcaSelecionada ? MarcaSelecionada : null,
      marca_nome: MarcaSelecionadaAux ? MarcaSelecionadaAux.nome : null,

      base_id: BaseSelecionada ? BaseSelecionada : null,
      base_nome: BaseSelecionadaAux ? BaseSelecionadaAux.nome : null,

      acabamento_id: AcabamentoSelecionado ? AcabamentoSelecionado : null,
      acabamento_nome: AcabamentoSelecionadaAux
        ? AcabamentoSelecionadaAux.nome
        : null,

      intensidade_id: IntensidadeSelecionada ? IntensidadeSelecionada : null,
      intensidade_nome: IntensidadeSelecionadaAux
        ? IntensidadeSelecionadaAux.nome
        : null,

      status: Status,
    };
  };

  const cadastrar = async () => {
    setLoading(true);

    let Dados = getDados();

    let Sucesso = await cadastrarProduto(Dados);
    finalizarAcao(Sucesso, 'CADASTRAR');
  };

  const editar = async () => {
    setLoading(true);

    let Dados = getDados();

    let Sucesso = await alterarProduto(Produto.id, Dados);
    finalizarAcao(Sucesso, 'ALTERAR');
  };

  const excluir = async () => {
    setLoading(true);

    let Sucesso = await deletarProduto(Produto.id);
    finalizarAcao(Sucesso, 'EXCLUIR');
  };

  const finalizarAcao = (MSG_RESULTADO, MSG_TIPO_ACAO) => {
    localStorage.setItem('@MSG_RESULTADO', MSG_RESULTADO.toString());
    localStorage.setItem('@MSG_TIPO_ACAO', MSG_TIPO_ACAO);

    setLoading(false);
    History.goBack();
  };

  return (
    <Container loading={loading} {...props}>
      <TableContainer component={Paper}>
        <Title>{Modo}</Title>
        <DivConteudoFormulario>
          {(!Produto && Modo != 'Cadastrar') || loading ? (
            <></>
          ) : (
            <>
              <Formulario
                className={classes.Formulario}
                onSubmit={handleSubmit}>
                <TextInputAdmin
                  label="ID"
                  value={Produto ? Produto.id : ''}
                  disabled={true}
                />

                <SelectInputAdmin
                  required
                  label="Marca"
                  value={MarcaSelecionada}
                  onChange={({target}) => setMarcaSelecionada(target.value)}
                  disabled={DisplayMode}>
                  {Marcas &&
                    Marcas.map((MarcaItem) => (
                      <MenuItem value={MarcaItem.id}>{MarcaItem.nome}</MenuItem>
                    ))}
                </SelectInputAdmin>

                <SelectInputAdmin
                  required
                  label="Base"
                  value={BaseSelecionada}
                  onChange={({target}) => setBaseSelecionada(target.value)}
                  disabled={DisplayMode}>
                  {Bases &&
                    Bases.map((BaseItem) => {
                      if (
                        !MarcaSelecionada ||
                        BaseItem.marca_id == MarcaSelecionada
                      ) {
                        return (
                          <MenuItem value={BaseItem.id}>
                            {BaseItem.nome}
                          </MenuItem>
                        );
                      }
                    })}
                </SelectInputAdmin>
                <SelectInputAdmin
                  required
                  label="Acabamento"
                  value={AcabamentoSelecionado}
                  onChange={({target}) =>
                    setAcabamentoSelecionado(target.value)
                  }
                  disabled={DisplayMode}>
                  {Acabamentos &&
                    Acabamentos.map((AcabamentoItem) => {
                      if (
                        !BaseSelecionada ||
                        AcabamentoItem.base_id == BaseSelecionada
                      ) {
                        return (
                          <MenuItem value={AcabamentoItem.id}>
                            {AcabamentoItem.nome}
                          </MenuItem>
                        );
                      }
                    })}
                </SelectInputAdmin>

                <SelectInputAdmin
                  required
                  label="Intensidade"
                  value={IntensidadeSelecionada}
                  onChange={({target}) =>
                    setIntensidadeSelecionada(target.value)
                  }
                  disabled={DisplayMode}>
                  {Intensidades &&
                    Intensidades.map((IntensidadeItem) => {
                      if (
                        !AcabamentoSelecionado ||
                        IntensidadeItem.acabamento_id == AcabamentoSelecionado
                      ) {
                        return (
                          <MenuItem value={IntensidadeItem.id}>
                            {IntensidadeItem.nome}
                          </MenuItem>
                        );
                      }
                    })}
                </SelectInputAdmin>

                <DivPermissoesAcesso>
                  <DivLabelPermissoesAcesso>
                    <Label style={{fontWeight: 'bold'}}>0,9 L</Label>
                    <TextInputAdmin
                      required
                      label="Minimo"
                      autoComplete="nome"
                      autoFocus
                      value={ValorMinimo09}
                      onChange={({target}) => setValorMinimo09(target.value)}
                      disabled={DisplayMode}
                    />

                    <TextInputAdmin
                      required
                      label="Valor"
                      autoComplete="nome"
                      autoFocus
                      value={Valor09}
                      onChange={({target}) => setValor09(target.value)}
                      disabled={DisplayMode}
                    />

                    <TextInputAdmin
                      required
                      label="Desconto"
                      autoComplete="nome"
                      autoFocus
                      value={Desconto09}
                      onChange={({target}) => setDesconto09(target.value)}
                      disabled={DisplayMode}
                    />
                  </DivLabelPermissoesAcesso>
                </DivPermissoesAcesso>

                <DivPermissoesAcesso>
                  <DivLabelPermissoesAcesso>
                    <Label style={{fontWeight: 'bold'}}>3,6 L</Label>
                    <TextInputAdmin
                      required
                      label="Minimo"
                      autoComplete="nome"
                      autoFocus
                      value={ValorMinimo36}
                      onChange={({target}) => setValorMinimo36(target.value)}
                      disabled={DisplayMode}
                    />

                    <TextInputAdmin
                      required
                      label="Valor"
                      autoComplete="nome"
                      autoFocus
                      value={Valor36}
                      onChange={({target}) => setValor36(target.value)}
                      disabled={DisplayMode}
                    />

                    <TextInputAdmin
                      required
                      label="Desconto"
                      autoComplete="nome"
                      autoFocus
                      value={Desconto36}
                      onChange={({target}) => setDesconto36(target.value)}
                      disabled={DisplayMode}
                    />
                  </DivLabelPermissoesAcesso>
                </DivPermissoesAcesso>

                <DivPermissoesAcesso>
                  <DivLabelPermissoesAcesso>
                    <Label style={{fontWeight: 'bold'}}>18 L</Label>
                    <TextInputAdmin
                      required
                      label="Minimo"
                      autoComplete="nome"
                      autoFocus
                      value={ValorMinimo18}
                      onChange={({target}) => setValorMinimo18(target.value)}
                      disabled={DisplayMode}
                    />

                    <TextInputAdmin
                      required
                      label="Valor"
                      autoComplete="nome"
                      autoFocus
                      value={Valor18}
                      onChange={({target}) => setValor18(target.value)}
                      disabled={DisplayMode}
                    />

                    <TextInputAdmin
                      required
                      label="Desconto"
                      autoComplete="nome"
                      autoFocus
                      value={Desconto18}
                      onChange={({target}) => setDesconto18(target.value)}
                      disabled={DisplayMode}
                    />
                  </DivLabelPermissoesAcesso>
                </DivPermissoesAcesso>

                <SelectInputAdmin
                  required
                  label="Status"
                  value={Status}
                  onChange={({target}) => setStatus(target.value)}
                  disabled={DisplayMode}>
                  <MenuItem value={'A'}>Ativo</MenuItem>
                  <MenuItem value={'I'}>Inativo</MenuItem>
                </SelectInputAdmin>

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

export default ProdutosEditar;
