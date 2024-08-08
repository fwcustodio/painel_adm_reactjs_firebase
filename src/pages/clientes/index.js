import React, {useState, useEffect} from 'react';
import Container from '~/componentes/container';
import {getClientes} from '~/servicos/hubspot_api';
import Grid from '~/componentes/grid';
import {getNLinhasPadraoGrid} from '~/core';
import TableCell from '@material-ui/core/TableCell';

export default function Oleos(props) {
  const [loading, setLoading] = useState(false);
  const [Inicio, setInicio] = useState(true);
  const [Total, setTotal] = useState(0);
  const [Page, setPage] = useState(1);
  const [LinhasPorPagina, setLinhasPorPagina] = useState(
    getNLinhasPadraoGrid(),
  );

  const [Clientes, setClientes] = useState([]);

  const CamposHeader = ['Cliente', 'Email', 'Telefone', 'Animal', 'N Animais'];
  const CamposBody = [
    'name',
    'email',
    'telefone',
    'nome_animal',
    'numero_animais',
  ];

  useEffect(() => {
    carregarDados();
  }, [Inicio]);

  useEffect(() => {
    //console.log('Page : ' + Page);
    carregarDados();
  }, [Page]);

  const carregarDados = async (PageParm = Page) => {
    setLoading(true);

    let ClientesAux = await getClientes();
    setTotal(ClientesAux.length);

    setClientes(ClientesAux);
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
        Rota={'clientes'}
        Rows={Clientes}
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
