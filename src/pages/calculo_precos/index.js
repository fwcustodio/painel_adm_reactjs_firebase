import React, {useState, useEffect} from 'react';
import Container from '~/componentes/container';
import {
  getProdutos,
  getMarcas,
  getBases,
  getAcabamentos,
  getIntensidades,
} from '~/servicos/firebase_api';
import Grid from '~/componentes/grid';
import {getNLinhasPadraoGrid, getValorMoedaFormatado} from '~/core';
import TableCell from '@material-ui/core/TableCell';
import {TextInputAdmin, SelectInputAdmin} from '~/componentes/TextInputAdmin';
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

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Title from '~/componentes/title';
import Tooltip from '@material-ui/core/Tooltip';

import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import {TextField} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import {FormatColorResetSharp} from '@material-ui/icons';
import {findAllByDisplayValue} from '@testing-library/dom';
import {getUsuarioAutenticado} from '~/servicos/auth';

const CalculoPrecos = (props) => {
  const classes = ClassesBase();
  const [loading, setLoading] = useState(false);
  const [Inicio, setInicio] = useState(true);
  const [Total, setTotal] = useState(0);
  const [Page, setPage] = useState(1);
  const [LinhasPorPagina, setLinhasPorPagina] = useState(
    getNLinhasPadraoGrid(),
  );

  const [UsuarioAutenticado, setUsuarioAutenticado] = useState();
  const UsuariosMaster = [
    'Ubqctzh71OPanto4L33vzrO4YCk2',
    '5tEol2c0hWQ8gcWt3ZCCbK6i7Ji1',
  ];

  const [ValorCorante, setValorCorante] = useState(0);
  const [VolumeSelecionado, setVolumeSelecionado] = useState('18');
  const [Produtos, setProdutos] = useState([]);

  const [Marcas, setMarcas] = useState();
  const [MarcaSelecionada, setMarcaSelecionada] = useState(0);

  const [Bases, setBases] = useState();
  const [BaseSelecionada, setBaseSelecionada] = useState(0);

  const [Acabamentos, setAcabamentos] = useState();
  const [AcabamentoSelecionado, setAcabamentoSelecionado] = useState(0);

  const [Intensidades, setIntensidades] = useState();
  const [IntensidadeSelecionada, setIntensidadeSelecionada] = useState(0);

  const [CamposHeader, setCamposHeader] = useState([
    'Marca',
    'Base',
    'Acabamento',
    'Intensidade',
    'Minimo',
    'Valor',
    'Desconto',
  ]);

  useEffect(() => {
    carregarDados();
  }, [Inicio]);

  useEffect(() => {
    //console.log('Page : ' + Page);
    carregarProdutos();
  }, [
    MarcaSelecionada,
    BaseSelecionada,
    AcabamentoSelecionado,
    IntensidadeSelecionada,
    ValorCorante,
    VolumeSelecionado,
  ]);

  const carregarDados = async () => {
    setLoading(true);

    let UsuarioAutenticadoAux = await getUsuarioAutenticado();
    setUsuarioAutenticado(UsuarioAutenticadoAux);

    if (UsuariosMaster.includes(UsuarioAutenticadoAux.ID)) {
      setCamposHeader([
        'Marca',
        'Base',
        'Acabamento',
        'Intensidade',
        'Custo',
        'Minimo',
        'Valor',
        'Desconto',
      ]);
    }

    let MarcasAux = await getMarcas();
    setMarcas([{id: 0, nome: 'Selecione...'}, ...MarcasAux]);

    let BasesAux = await getBases();
    setBases([{id: 0, nome: 'Selecione...'}, ...BasesAux]);

    let AcabamentosAux = await getAcabamentos();
    setAcabamentos([{id: 0, nome: 'Selecione...'}, ...AcabamentosAux]);

    let IntensidadesAux = await getIntensidades();
    setIntensidades([{id: 0, nome: 'Selecione...'}, ...IntensidadesAux]);

    await carregarProdutos();

    setLoading(false);
  };

  const carregarProdutos = async (PageParm = Page) => {
    setLoading(true);

    let ProdutosAux = await getProdutos(
      MarcaSelecionada,
      BaseSelecionada,
      AcabamentoSelecionado,
      IntensidadeSelecionada,
    );
    setTotal(ProdutosAux.length);

    //console.log('ProdutosAux : ' + JSON.stringify(ProdutosAux));
    setProdutos(ProdutosAux);

    setLoading(false);
  };

  const handleChangeLinhasPorPagina = (e) => {
    setLinhasPorPagina(e.target.value);
    setPage(1);
  };

  const getValorItem = (Produto) => {
    let ValorBase;

    let PorcentagemBaseNormal09 = Produto.porcentagem_base_normal_09
      ? Produto.porcentagem_base_normal_09
      : 0;
    let PorcentagemCoranteNormal09 = Produto.porcentagem_corante_normal_09
      ? Produto.porcentagem_corante_normal_09
      : 0;
    let PorcentagemBaseNormal36 = Produto.porcentagem_base_normal_36
      ? Produto.porcentagem_base_normal_36
      : 0;
    let PorcentagemCoranteNormal36 = Produto.porcentagem_corante_normal_36
      ? Produto.porcentagem_corante_normal_36
      : 0;
    let PorcentagemBaseNormal18 = Produto.porcentagem_base_normal_18
      ? Produto.porcentagem_base_normal_18
      : 0;
    let PorcentagemCoranteNormal18 = Produto.porcentagem_corante_normal_18
      ? Produto.porcentagem_corante_normal_18
      : 0;

    //console.log('VolumeSelecionado : ' + VolumeSelecionado);
    //console.log('PorcentagemBaseNormal18 : ' + PorcentagemBaseNormal18);
    //console.log('PorcentagemCoranteNormal18 : ' + PorcentagemCoranteNormal18);

    switch (VolumeSelecionado) {
      case '0,9':
        ValorBase = parseFloat(Produto.valor_09);
        return (
          ValorBase +
          (ValorBase * (parseFloat(PorcentagemBaseNormal09) / 100) +
            ValorCorante * (parseFloat(PorcentagemCoranteNormal09) / 100))
        );
      case '3,6':
        ValorBase = parseFloat(Produto.valor_36);
        return (
          ValorBase +
          (ValorBase * (parseFloat(PorcentagemBaseNormal36) / 100) +
            ValorCorante * (parseFloat(PorcentagemCoranteNormal36) / 100))
        );
      case '18':
        ValorBase = parseFloat(Produto.valor_18);
        return (
          ValorBase +
          (ValorBase * (parseFloat(PorcentagemBaseNormal18) / 100) +
            ValorCorante * (parseFloat(PorcentagemCoranteNormal18) / 100))
        );

      default:
        break;
    }
  };

  const getDescontoItem = (Produto) => {
    let ValorBase;

    let PorcentagemBaseDesconto09 = Produto.porcentagem_base_desconto_09
      ? Produto.porcentagem_base_desconto_09
      : 0;
    let PorcentagemCoranteDesconto09 = Produto.porcentagem_corante_desconto_09
      ? Produto.porcentagem_corante_desconto_09
      : 0;
    let PorcentagemBaseDesconto36 = Produto.porcentagem_base_desconto_36
      ? Produto.porcentagem_base_desconto_36
      : 0;
    let PorcentagemCoranteDesconto36 = Produto.porcentagem_corante_desconto_36
      ? Produto.porcentagem_corante_desconto_36
      : 0;
    let PorcentagemBaseDesconto18 = Produto.porcentagem_base_desconto_18
      ? Produto.porcentagem_base_desconto_18
      : 0;
    let PorcentagemCoranteDesconto18 = Produto.porcentagem_corante_desconto_18
      ? Produto.porcentagem_corante_desconto_18
      : 0;

    switch (VolumeSelecionado) {
      case '0,9':
        ValorBase = parseFloat(Produto.valor_09);
        return (
          ValorBase +
          (ValorBase * (parseFloat(PorcentagemBaseDesconto09) / 100) +
            ValorCorante * (parseFloat(PorcentagemCoranteDesconto09) / 100))
        );
      case '3,6':
        ValorBase = parseFloat(Produto.valor_36);
        return (
          ValorBase +
          (ValorBase * (parseFloat(PorcentagemBaseDesconto36) / 100) +
            ValorCorante * (parseFloat(PorcentagemCoranteDesconto36) / 100))
        );
      case '18':
        ValorBase = parseFloat(Produto.valor_18);
        return (
          ValorBase +
          (ValorBase * (parseFloat(PorcentagemBaseDesconto18) / 100) +
            ValorCorante * (parseFloat(PorcentagemCoranteDesconto18) / 100))
        );

      default:
        break;
    }
  };

  return (
    <Container loading={loading} {...props}>
      <TableContainer component={Paper} style={{marginBottom: -70}}>
        <div style={{flexDirection: 'row', padding: 25}}>
          <Label style={{fontSize: 25}}>VOLUME (L)</Label>
          <Select
            style={{width: 100, marginLeft: 25, marginTop: -7, marginRight: 25}}
            variant="outlined"
            margin="normal"
            fullWidth
            size="small"
            value={VolumeSelecionado}
            onChange={({target}) => setVolumeSelecionado(target.value)}>
            {[
              {nome: '0,9', id: '0,9'},
              {nome: '3,6', id: '3,6'},
              {nome: '18', id: '18'},
            ].map((VolumeItem) => {
              return (
                <MenuItem value={VolumeItem.id}>{VolumeItem.nome}</MenuItem>
              );
            })}
          </Select>
          <Label style={{fontSize: 25, width: 150}}>VALOR CORANTE</Label>
          <TextField
            style={{width: 100, fontSize: 30, marginLeft: 25, marginTop: -7}}
            //label="Valor Base"
            variant="outlined"
            margin="normal"
            type="number"
            fullWidth
            size="medium"
            autoFocus
            value={ValorCorante}
            onChange={({target}) => setValorCorante(target.value)}
          />
        </div>

        <Formulario
          className={classes.Formulario}
          style={{
            //maxWidth: 850,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 0,
            marginBottom: 100,
          }}>
          <div style={{flexDirection: 'row'}}>
            <Label style={{fontSize: 20, marginRight: 25}}>Marca:</Label>
            <Select
              style={{
                width: 120,
                marginTop: -7,
                marginRight: 20,
                height: 30,
                marginLeft: -5,
              }}
              value={MarcaSelecionada}
              onChange={({target}) => setMarcaSelecionada(target.value)}>
              {Marcas &&
                Marcas.map((MarcaItem) => (
                  <MenuItem
                    value={MarcaItem.id}
                    style={{
                      height: 30,
                    }}>
                    {MarcaItem.nome}
                  </MenuItem>
                ))}
            </Select>

            <Label style={{fontSize: 20}}>Base:</Label>
            <Select
              style={{
                width: 120,
                marginLeft: 15,
                marginTop: -7,
                marginRight: 20,
                height: 30,
              }}
              value={BaseSelecionada}
              onChange={({target}) => setBaseSelecionada(target.value)}>
              {Bases &&
                Bases.map((BaseItem) => {
                  if (
                    BaseItem.marca_id == MarcaSelecionada ||
                    BaseItem.id == 0 ||
                    !MarcaSelecionada
                  ) {
                    return (
                      <MenuItem
                        value={BaseItem.id}
                        style={{
                          height: 30,
                        }}>
                        {BaseItem.nome}
                      </MenuItem>
                    );
                  }
                })}
            </Select>
            <Label style={{fontSize: 20}}>Acabamento</Label>
            <Select
              style={{
                width: 150,
                marginLeft: 15,
                marginTop: -7,
                marginRight: 20,
                height: 30,
              }}
              value={AcabamentoSelecionado}
              onChange={({target}) => setAcabamentoSelecionado(target.value)}>
              {Acabamentos &&
                Acabamentos.map((AcabamentoItem) => {
                  return (
                    <MenuItem
                      value={AcabamentoItem.id}
                      style={{
                        height: 30,
                      }}>
                      {AcabamentoItem.nome}
                    </MenuItem>
                  );
                })}
            </Select>
            <Label style={{fontSize: 20}}>Intensidade</Label>
            <Select
              style={{
                width: 150,
                marginLeft: 15,
                marginTop: -7,
                marginRight: 20,
                height: 30,
              }}
              value={IntensidadeSelecionada}
              onChange={({target}) => setIntensidadeSelecionada(target.value)}>
              {Intensidades &&
                Intensidades.map((IntensidadeItem) => {
                  return (
                    <MenuItem
                      value={IntensidadeItem.id}
                      style={{
                        height: 30,
                      }}>
                      {IntensidadeItem.nome}
                    </MenuItem>
                  );
                })}
            </Select>
          </div>
        </Formulario>
      </TableContainer>
      <TableContainer component={Paper}>
        <Title>Produtos</Title>

        <Table size="small" aria-label="Table listagem">
          <TableHead>
            <TableRow>
              {CamposHeader.map((Campo) => (
                <TableCell>{Campo}</TableCell>
              ))}
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Produtos.map((ProdutoItem) => (
              <TableRow key={ProdutoItem.id}>
                <TableCell>{ProdutoItem.marca_nome}</TableCell>
                <TableCell>{ProdutoItem.base_nome}</TableCell>
                <TableCell>{ProdutoItem.acabamento_nome}</TableCell>
                <TableCell>{ProdutoItem.intensidade_nome}</TableCell>

                {VolumeSelecionado == '18' && (
                  <>
                    {UsuariosMaster.includes(UsuarioAutenticado.ID) && (
                      <TableCell>
                        {getValorMoedaFormatado(
                          parseFloat(ProdutoItem.valor_18) +
                            (ValorCorante ? parseFloat(ValorCorante) : 0),
                        )}
                      </TableCell>
                    )}
                    <TableCell>
                      {getValorMoedaFormatado(
                        ProdutoItem.valor_minimo_18
                          ? parseFloat(ProdutoItem.valor_minimo_18)
                          : 0,
                      )}
                    </TableCell>
                    <TableCell>
                      {getValorMoedaFormatado(getValorItem(ProdutoItem))}
                    </TableCell>
                    <TableCell>
                      {getValorMoedaFormatado(getDescontoItem(ProdutoItem))}
                    </TableCell>
                  </>
                )}

                {VolumeSelecionado == '3,6' && (
                  <>
                    {UsuariosMaster.includes(UsuarioAutenticado.ID) && (
                      <TableCell>
                        {getValorMoedaFormatado(
                          parseFloat(ProdutoItem.valor_36) +
                            (ValorCorante ? parseFloat(ValorCorante) : 0),
                        )}
                      </TableCell>
                    )}
                    <TableCell>
                      {getValorMoedaFormatado(
                        ProdutoItem.valor_minimo_36
                          ? parseFloat(ProdutoItem.valor_minimo_36)
                          : 0,
                      )}
                    </TableCell>
                    <TableCell>
                      {getValorMoedaFormatado(getValorItem(ProdutoItem))}
                    </TableCell>
                    <TableCell>
                      {getValorMoedaFormatado(getDescontoItem(ProdutoItem))}
                    </TableCell>
                  </>
                )}

                {VolumeSelecionado == '0,9' && (
                  <>
                    {UsuariosMaster.includes(UsuarioAutenticado.ID) && (
                      <TableCell>
                        {getValorMoedaFormatado(
                          parseFloat(ProdutoItem.valor_09) +
                            (ValorCorante ? parseFloat(ValorCorante) : 0),
                        )}
                      </TableCell>
                    )}
                    <TableCell>
                      {getValorMoedaFormatado(
                        ProdutoItem.valor_minimo_09
                          ? parseFloat(ProdutoItem.valor_minimo_09)
                          : 0,
                      )}
                    </TableCell>

                    <TableCell>
                      {getValorMoedaFormatado(getValorItem(ProdutoItem))}
                    </TableCell>
                    <TableCell>
                      {getValorMoedaFormatado(getDescontoItem(ProdutoItem))}
                    </TableCell>
                  </>
                )}
                <TableCell align="right" style={{padding: 30}} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          labelRowsPerPage="Linhas por página"
          rowsPerPageOptions={[10, 25, 50, 1000]}
          component="div"
          count={Produtos ? Produtos.length : 0}
          rowsPerPage={1000}
          page={Page}
          onChangePage={(page) => setPage(page)}
          onChangeRowsPerPage={handleChangeLinhasPorPagina}
        />
      </TableContainer>
    </Container>
  );
};

export default CalculoPrecos;
