import React, {useState, useEffect} from 'react';
import Container from '~/componentes/container';
import {getFuncionarios} from '~/servicos/firebase_api';
import Grid from '~/componentes/grid';
import {getNLinhasPadraoGrid} from '~/core';
import TableCell from '@material-ui/core/TableCell';
import {getUsuarioAutenticado} from '~/servicos/auth';

export default function Funcionarios(props) {
  const [loading, setLoading] = useState(false);
  const [Inicio, setInicio] = useState(true);
  const [Total, setTotal] = useState(0);
  const [Page, setPage] = useState(1);
  const [LinhasPorPagina, setLinhasPorPagina] = useState(
    getNLinhasPadraoGrid(),
  );

  const [Funcionarios, setFuncionario] = useState([]);

  const CamposHeader = [
    'Nome',
    'Email',
    'Telefone',
    'Data de Nascimento',
    'Status',
  ];
  const CamposBody = ['nome', 'email', 'telefone', 'dataNascimento', 'status'];

  useEffect(() => {
    carregarDados();
  }, [Inicio]);

  useEffect(() => {
    //console.log('Page : ' + Page);
    carregarDados();
  }, [Page]);

  const carregarDados = async (PageParm = Page) => {
    setLoading(true);
    let UsuarioLogado = await getUsuarioAutenticado();
    console.log('UsuarioLogado : ' + JSON.stringify(UsuarioLogado));
    const {Email} = UsuarioLogado;

    let funcionariosAux = await getFuncionarios();
    //console.log('Email : ' + Email);

    if (
      Email != 'fernando@fwctecnologia.com' &&
      Email != 'lucassabio@fwctecnologia.com'
    ) {
      funcionariosAux = funcionariosAux.filter((Item) => {
        return Item.email == Email;
      });

      //console.log('funcionariosAux : ' + JSON.stringify(funcionariosAux));
    }

    setTotal(funcionariosAux.length);

    setFuncionario(funcionariosAux);
    setLoading(false);
  };

  const TableCellGrid = (props) => (
    <TableCell>
      {props.valor === 'A'
        ? 'Ativo'
        : props.valor === 'I'
        ? 'Inativo'
        : props.valor}
    </TableCell>
  );

  return (
    <Container loading={loading} {...props}>
      <Grid
        Rota={'prestadores'}
        Rows={Funcionarios}
        Total={Total}
        CamposHeader={CamposHeader}
        CamposBody={CamposBody}
        setPage={setPage}
        setLinhasPorPagina={setLinhasPorPagina}
        TableCellGrid={TableCellGrid}
      />
    </Container>
  );
}
