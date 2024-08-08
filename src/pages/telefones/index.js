import React, { useState, useEffect } from 'react';
import Container from '~/componentes/container';
import { getTelefones } from '~/servicos/firebase_api';
import Grid from '~/componentes/grid';
import { getNLinhasPadraoGrid } from '~/core';
import TableCell from '@material-ui/core/TableCell';


export default function Telefones(props) {
    const [loading, setLoading] = useState(false);
    const [Inicio, setInicio] = useState(true);
    const [Total, setTotal] = useState(0);
    const [Page, setPage] = useState(1);
    const [LinhasPorPagina, setLinhasPorPagina] = useState(
        getNLinhasPadraoGrid()
    );

    const [Telefones, setTelefones] = useState([]);

    const CamposHeader = ['Número', 'Operadora', , 'Status'];
    const CamposBody = ['numero', 'operadora', , 'status'];

    useEffect(() => {
        carregarDados();
    }, [Inicio]);

    useEffect(() => {
        //console.log('Page : ' + Page);
        carregarDados();
    }, [Page]);

    const carregarDados = async (PageParm = Page) => {
        setLoading(true);

        let TelefonesAux = await getTelefones();
        console.log("TelefonesAux : " + JSON.stringify(TelefonesAux));
        setTotal(TelefonesAux.length);

        setTelefones(TelefonesAux);
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
                Rota={'telefones'}
                Rows={Telefones}
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
