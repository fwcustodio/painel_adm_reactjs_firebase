import React, { useState, useEffect } from 'react';
import Container from '~/componentes/container';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import Title from '~/componentes/title';

import { TextInputAdmin, SelectInputAdmin } from '~/componentes/TextInputAdmin';
import MenuItem from '@material-ui/core/MenuItem';

import { useHistory, useLocation, useParams } from 'react-router-dom';
import {
    getTelefone, cadastrarTelefone, alterarTelefone, deletarTelefone
} from '~/servicos/firebase_api';
import {
    DivConteudoFormulario,
    Formulario,
    DivBotao,
    DivBotaoVoltar,
    ClassesBase,
} from '~/styles_base';
import Button from '@material-ui/core/Button';
import { getMode } from '~/core';

const TelefonesEditar = (props) => {
    const classes = ClassesBase();
    const [loading, setLoading] = useState(false);
    const [Inicio, setInicio] = useState(true);
    const [Modo, setModo] = useState('Editar');
    const [DisplayMode, setDisplayMode] = useState(false);

    const History = useHistory();
    const Location = useLocation();
    const { id } = useParams();

    const [Telefone, setTelefone] = useState();

    const [Numero, setNumero] = useState();
    const [Operadora, setOperadora] = useState();
    const [DataPagamento, setDataPagamento] = useState();
    const [Status, setStatus] = useState('A');

    useEffect(() => {
        let ModoAux = getMode(Location);
        setModo(ModoAux);

        if (ModoAux != 'Editar' && ModoAux != 'Cadastrar') {
            setDisplayMode(true);
        }

        if (ModoAux != 'Cadastrar') {
            carregarDados();
        }
    }, [Inicio]);

    const carregarDados = async () => {
        setLoading(true);

        let TelefoneAux = await getTelefone(id);
        setTelefone(TelefoneAux);

        formatar(TelefoneAux);
        setLoading(false);
    };

    const formatar = (Telefone) => {
        setNumero(Telefone.numero);
        setOperadora(Telefone.operadora);
        setDataPagamento(Telefone.data_pagamento);
        setStatus(Telefone.status);
    };

    const validouDados = () => {
        let Validou = true;

        if (!Numero) {
            alert('É necessario inserir um número');
            Validou = false;
        }

        if (!Operadora) {
            alert('É necessario inserir umaa operadora');
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
            numero: Numero,
            operadora: Operadora,
            data_pagamento: DataPagamento,
            status: Status,
        };
    };

    const cadastrar = async () => {
        setLoading(true);

        let Dados = getDados();

        let Sucesso = await cadastrarTelefone(Dados);
        finalizarAcao(Sucesso, 'CADASTRAR');
    };

    const editar = async () => {
        setLoading(true);

        let Dados = getDados();

        let Sucesso = await alterarTelefone(Telefone.id, Dados);
        finalizarAcao(Sucesso, 'ALTERAR');
    };

    const excluir = async () => {
        setLoading(true);

        let Sucesso = await deletarTelefone(Telefone.id);
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
                    {!Telefone && (Modo != 'Cadastrar')? (
                        <></>
                    ) : (
                            <>
                                <Formulario
                                    className={classes.Formulario}
                                    onSubmit={handleSubmit}
                                >
                                    <TextInputAdmin
                                        label='ID'
                                        value={Telefone ? Telefone.id : ''}
                                        disabled={true}
                                    />

                                    <TextInputAdmin
                                        required
                                        label='Número'
                                        autoComplete='nome'
                                        autoFocus
                                        value={Numero}
                                        onChange={({ target }) => setNumero(target.value)}
                                        disabled={DisplayMode}
                                    />

                                    <TextInputAdmin
                                        required
                                        label='Operadora'
                                        autoFocus
                                        value={Operadora}
                                        onChange={({ target }) => setOperadora(target.value)}
                                        disabled={DisplayMode}
                                    />

                                    <TextInputAdmin
                                        required
                                        label='Data de Pagamento'
                                        autoFocus
                                        value={DataPagamento}
                                        onChange={({ target }) => setDataPagamento(target.value)}
                                        disabled={DisplayMode}
                                    />

                                    <SelectInputAdmin
                                        required
                                        label='Status'
                                        value={Status}
                                        onChange={({ target }) => setStatus(target.value)}
                                        disabled={DisplayMode}
                                    >
                                        <MenuItem value={'A'}>Ativo</MenuItem>
                                        <MenuItem value={'I'}>Inativo</MenuItem>
                                    </SelectInputAdmin>

                                    <DivBotaoVoltar>
                                        <Button
                                            onClick={() => History.goBack()}
                                            fullWidth
                                            variant='contained'
                                            color='primary'
                                        >
                                            Voltar
									</Button>
                                    </DivBotaoVoltar>
                                    {Modo == 'Visualizar' ? (
                                        <></>
                                    ) : (
                                            <DivBotao>
                                                <Button
                                                    fullWidth
                                                    type='submit'
                                                    variant='contained'
                                                    color='primary'
                                                >
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

export default TelefonesEditar;
