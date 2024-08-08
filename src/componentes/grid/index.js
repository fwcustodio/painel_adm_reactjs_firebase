import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import BallotIcon from '@material-ui/icons/Ballot';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import Title from '~/componentes/title';
import {getAdminRotas} from '~/servicos/firebase_api';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {getNLinhasPadraoGrid} from '~/core';
import Tooltip from '@material-ui/core/Tooltip';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import {Grid as Grade} from '@material-ui/core';

const SpanAcao = styled.span`
  margin-left: 15px;
`;

const useStyles = makeStyles(() => ({
  table: {
    padding: 0,
  },
  botaoAcao: {
    marginRight: -10,
  },
  cadastrar: {
    float: 'right',
    padding: 22,
    marginRight: 15,
  },
  busca: {
    marginTop: -50,
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectStatus: {
    marginTop: -50,
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: '1000px',
  },
  select: {
    marginTop: 90,
    marginLeft: -85,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '1000px',
  },
  container: {
    marginTop: -100,
  },
}));

export default function Grid(props) {
  const classes = useStyles();
  const History = useHistory();
  const [LinhasPorPagina, setLinhasPorPaginaGrid] = useState(
    getNLinhasPadraoGrid(),
  );
  const [Page, setPageGrid] = useState(0);

  const {
    Rota,
    Rows,
    Total,
    CamposHeader,
    CamposBody,
    setPage,
    setLinhasPorPagina,
    FuncaoAdicional,
    FuncaoCadastrar,
    FuncaoAdicionalArray,
    TituloFuncaoAdicional,
    exibicao,
    CancVisualizar,
    CancEditar,
    CancExcluir,
    CadFunc,
    FiltroIssues,
    handleClickFiltroIssues,
  } = props;

  const handleCadastrar = () => {
    History.push(`/${Rota}/cad`);
  };

  const handleVisualizar = (Id) => {
    History.push(`/${Rota}/visu/${Id}`);
  };

  const handleEditar = (Id) => {
    History.push(`/${Rota}/editar/${Id}`);
  };

  const handleExcluir = (Id) => {
    History.push(`/${Rota}/excluir/${Id}`);
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage + 1);
    setPageGrid(newPage);
  };

  const handleChangeLinhasPorPagina = (e) => {
    setLinhasPorPagina(e.target.value);
    setPage(1);

    setLinhasPorPaginaGrid(e.target.value);
    setPageGrid(0);
  };

  const getCampoTranspilado = (Campo) => {
    return Campo === 'A'
      ? 'Ativo'
      : Campo === 'I'
      ? 'Inativo'
      : Campo === 'F'
      ? 'Finalizado'
      : Campo === true
      ? 'Sim'
      : Campo === false
      ? 'Não'
      : Campo;
  };

  const ajustarCampo = (Campo, Row) => {
    if (Campo && Campo.indexOf('.') > 0) {
      let ArrayCampos = Campo.split('.');
      return Row[ArrayCampos[0]][ArrayCampos[1]];
    } else {
      return Row[Campo];
    }
  };

  return (
    <TableContainer component={Paper} style={{maxWidth: 2000}}>
      <Title>Listagem</Title>
      {!exibicao && (
        <IconButton
          className={classes.cadastrar}
          onClick={FuncaoCadastrar ? FuncaoCadastrar : handleCadastrar}>
          <AddCircleOutlineIcon style={{fontSize: 50}} />
        </IconButton>
      )}

      {handleClickFiltroIssues && (
        <Grade container spacing={6}>
          <Grade item xs={2}>
            <FormControl className={classes.selectStatus}>
              <NativeSelect
                value={FiltroIssues}
                onChange={({target}) => handleClickFiltroIssues(target.value)}>
                <option aria-label="None" value="" />
                <option value={'abertas'}>Abertas</option>
                <option value={'fechadas'}>Fechadas</option>
                <option value={'todas'}>Todas</option>
              </NativeSelect>
            </FormControl>
          </Grade>
        </Grade>
      )}

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
          {Rows.map((row) => (
            <TableRow key={row.id}>
              {CamposBody.map((Campo) => {
                //console.log('row[Campo] : ' + row[Campo]);
                return (
                  <TableCell>
                    {getCampoTranspilado(ajustarCampo(Campo, row))}
                  </TableCell>
                );
              })}

              <TableCell align="right" style={exibicao && {padding: 0}}>
                {!exibicao && (
                  <>
                    {!CancVisualizar && (
                      <Tooltip title="Visualizar">
                        <IconButton
                          size="medium"
                          className={classes.botaoAcao}
                          onClick={() => handleVisualizar(row.id ?? row._id)}>
                          <ImageSearchIcon />
                        </IconButton>
                      </Tooltip>
                    )}

                    {!CancEditar && (
                      <Tooltip title="Editar">
                        <IconButton
                          size="medium"
                          className={classes.botaoAcao}
                          onClick={() => handleEditar(row.id ?? row._id)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {!CancExcluir && (
                      <Tooltip title="Excluir">
                        <IconButton
                          size="medium"
                          className={classes.botaoAcao}
                          onClick={() => handleExcluir(row.id ?? row._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {FuncaoAdicional ? (
                      <FuncaoAdicional
                        className={classes.botaoAcao}
                        row={row}
                      />
                    ) : (
                      <></>
                    )}
                    {FuncaoAdicionalArray &&
                      FuncaoAdicionalArray.length > 0 &&
                      FuncaoAdicionalArray.map((FuncaoItem) => {
                        return (
                          <FuncaoItem className={classes.botaoAcao} row={row} />
                        );
                      })}
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        labelRowsPerPage="Linhas por página"
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={Total}
        rowsPerPage={LinhasPorPagina}
        page={Page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeLinhasPorPagina}
      />
    </TableContainer>
  );
}
