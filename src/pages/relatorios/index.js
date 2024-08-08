import React, { useEffect, useState, useContext } from "react";
import InputMask from "react-input-mask";
import Container from "~/componentes/container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Title from "~/componentes/title";
import AuthContext from '~/contexts/auth';

import {
  DivConteudoFormulario,
  Formulario,
  DivBotao,
  DivBotaoVoltar,
  ClassesBase,
} from "~/styles_base";

import { Impressao } from "./impressao";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { SelectInputAdmin, TextInputAdmin } from "~/componentes/TextInputAdmin";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  container: {
    marginTop: "20px",
    height: 500,
    width: "100%",
  },
  tableContainer: {
    marginTop: 30,
  },
  table: {
    minWidth: 650,
  },
}));

const Relatorios = (props) => {
  const classes = useStyles();
  const [Inicio, setInicio] = useState(true);
  const [Relatorio, setRelatorio] = useState();
  const [DataInicio, setDataInicio] = useState();
  const [DataFim, setDataFim] = useState();
  const {User} = useContext(AuthContext);

  useEffect(() => {
    carregarDados();
  }, [Inicio]);

  const carregarDados = async (EmpresaID) => {
    // let RelatorioAux = await getRelatorios(EmpresaID);
    // console.log("RelatorioAux: " + JSON.stringify(RelatorioAux));
    // let EmpresasAux = await getEmpresas();
    // // console.log("EmpresasAux: " + JSON.stringify(EmpresasAux));
    // setEmpresas(EmpresasAux);
    // setRelatorio(RelatorioAux);
    console.log("User: " + JSON.stringify(User));

  };

  const visualizarImpressao = async () => {
    let Dados = {
      nome: User.Nome,
      data_inicio: DataInicio,
      data_fim: DataFim,
      relatorio: Relatorio,
    }

    console.log("Relatorio: " + JSON.stringify(Dados));
    const classeImpressao = new Impressao(Dados);
    const documento = await classeImpressao.PreparaDocumento();
    pdfMake.createPdf(documento).open({}, window.open("", "_blank"));
  };

  return (
    <Container>
      <Title>Relatório</Title>
      <DivConteudoFormulario>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <InputMask
              label="Data Inicial"
              mask="99/99/9999"
              value={DataInicio}
              onChange={({ target }) => setDataInicio(target.value)}
            >
              <TextInputAdmin />
            </InputMask>
          </Grid>
          <Grid item xs={3}>
            <InputMask
              label="Data Final"
              mask="99/99/9999"
              value={DataFim}
              onChange={({ target }) => setDataFim(target.value)}
            >
              <TextInputAdmin />
            </InputMask>
          </Grid>
        </Grid>

        <TextInputAdmin
          required
          label="Relatorio"
          multiline
          rows={5}
          value={Relatorio}
          onChange={({ target }) => setRelatorio(target.value)}
        />
      </DivConteudoFormulario>

      {/* <TableContainer className={classes.tableContainer} component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Nome Produto</TableCell>
              <TableCell align="right">Valor Cupom </TableCell>
              <TableCell align="right">% Desconto</TableCell>
              <TableCell align="right">Data inicio</TableCell>
              <TableCell align="right">Data fim</TableCell>
              <TableCell align="right">Qtd. Oferecida</TableCell>
              <TableCell align="right">Qtd. Solicitada</TableCell>
              <TableCell align="right">Qtd. Vendido</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Relatorio &&
              Relatorio.cupons.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.produto_nome}
                  </TableCell>
                  <TableCell align="right">{row.preco_cupom}</TableCell>
                  <TableCell align="right">
                    {row.porcentagem_desconto}
                  </TableCell>
                  <TableCell align="right">
                    {row.data_hora_inicio_promocao}
                  </TableCell>
                  <TableCell align="right">{row.data_hora_expiracao}</TableCell>
                  <TableCell align="right">{row.qtd_oferecida}</TableCell>
                  <TableCell align="right">{row.qtd_solicitada}</TableCell>
                  <TableCell align="right">{row.qtd_vendida}</TableCell>
                </TableRow>
              ))}
          </TableBody>
          {Relatorio && (
            <TableFooter>
              <TableRow>
                <TableCell>Qdt. Oferecida Total: </TableCell>
                <TableCell>{Relatorio.quantidade_total_oferecia}</TableCell>
                <TableCell>Qdt. Solicitada Total: </TableCell>
                <TableCell>{Relatorio.quantidade_total_solicitada}</TableCell>
                <TableCell>Qdt. Vendida Total: </TableCell>
                <TableCell>{Relatorio.quantidade_total_vendida}</TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer> */}

      <DivBotao>
        <button className="btn" onClick={visualizarImpressao}>
          Visualizar documento
        </button>
      </DivBotao>
    </Container>
  );
};

export default Relatorios;
