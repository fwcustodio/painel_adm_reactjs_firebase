import React, {useState, useEffect, useContext} from 'react';
import Container from '~/componentes/container';
import {
  getAdminUsuarios,
  enviarEmailRecuperacaoSenhaUsuario,
} from '~/servicos/firebase_api';
import Grid from '~/componentes/grid';
import {getNLinhasPadraoGrid} from '~/core';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import Tooltip from '@material-ui/core/Tooltip';
import AuthContext from '~/contexts/auth';

export default function Usuarios(props) {
  const [loading, setLoading] = useState(false);
  const [Inicio, setInicio] = useState(true);
  const [Usuarios, setUsuarios] = useState([]);
  const [Total, setTotal] = useState(0);
  const [Page, setPage] = useState(1);
  const [LinhasPorPagina, setLinhasPorPagina] = useState(
    getNLinhasPadraoGrid(),
  );
  const [MostrarMensagemAcao, setMostrarMensagemAcao] = useState(false);
  const {setNovaMensagemDados} = useContext(AuthContext);

  const CamposHeader = ['ID', 'NOME', 'EMAIL', 'TELEFONE', 'STATUS'];
  const CamposBody = ['uid', 'displayName', 'email', 'phoneNumber', 'disabled'];

  useEffect(() => {
    carregarDados();
  }, [Inicio]);

  useEffect(() => {
    //console.log('Page : ' + Page);
    carregarDados();
  }, [Page]);

  const carregarDados = async (PageParm = Page) => {
    setLoading(true);

    let UsuariosAux = await getAdminUsuarios();
    setTotal(UsuariosAux.length);

    setUsuarios(UsuariosAux);
    setLoading(false);
  };

  const TableCellGrid = (props) => (
    <TableCell>
      {props.valor === true
        ? 'Inativo'
        : props.valor === false
        ? 'Ativo'
        : props.valor}
    </TableCell>
  );

  const handleEnviarEmailRecuperacaoSenhaUsuario = async (id) => {
    setLoading(true);

    let EmailEnviado = await enviarEmailRecuperacaoSenhaUsuario(null, id);

    if (EmailEnviado) {
      setNovaMensagemDados(true, 'ENVIAR_EMAIL');
      //alert('Email de recuperação de senha enviado com sucesso');
    }
    setLoading(false);
  };

  const funcaoAdicional = (props) => (
    <Tooltip title="Enviar email de recuperação de senha">
      <IconButton
        {...props}
        onClick={() => handleEnviarEmailRecuperacaoSenhaUsuario(props.id)}>
        <SendIcon />
      </IconButton>
    </Tooltip>
  );

  return (
    <Container loading={loading} {...props}>
      <Grid
        Rota={'usuarios'}
        Rows={Usuarios}
        Total={Total}
        CamposHeader={CamposHeader}
        CamposBody={CamposBody}
        setPage={setPage}
        setLinhasPorPagina={setLinhasPorPagina}
        TableCellGrid={TableCellGrid}
        FuncaoAdicional={funcaoAdicional}
        TituloFuncaoAdicional={'Reenviar Senha'}
      />
    </Container>
  );
}
