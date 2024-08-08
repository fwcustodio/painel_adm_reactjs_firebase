import React, { useState, useEffect } from 'react';
import Container from '~/componentes/container';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Title from '~/componentes/title';
import MenuItem from '@material-ui/core/MenuItem';


import { TextInputAdmin, SelectInputAdmin } from '~/componentes/TextInputAdmin';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import {
	getAdminRota,
	cadastrarAdminRota,
	alterarAdminRota,
	deletarAdminRota,
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


const RotasEditar = (props) => {
	const classes = ClassesBase();
	const [loading, setLoading] = useState(false);
	const [Inicio, setInicio] = useState(true);
	const [Modo, setModo] = useState('Editar');
	const [DisplayMode, setDisplayMode] = useState(false);
	const [Rota, setRota] = useState();
	const History = useHistory();
	const Location = useLocation();
	const { id } = useParams();

	const [Nome, setNome] = useState();
	const [Path, setPath] = useState();
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

		let RotaAux = await getAdminRota(id);
		setRota(RotaAux);

		formatar(RotaAux);
		setLoading(false);
	};

	const formatar = (RotaParm) => {
		setNome(RotaParm.nome);
		setPath(RotaParm.path);
		setStatus(RotaParm.status);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

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
			nome: Nome,
			path: Path,
			status: Status,
		};
	};

	const cadastrar = async () => {
		setLoading(true);

		let Dados = getDados();

		let Sucesso = await cadastrarAdminRota(Dados);
		finalizarAcao(Sucesso, 'CADASTRAR');
	};

	const editar = async () => {
		setLoading(true);

		let Dados = getDados();

		let Sucesso = await alterarAdminRota(Rota.id, Dados);
		finalizarAcao(Sucesso, 'ALTERAR');
	};

	const excluir = async () => {
		setLoading(true);

		let Sucesso = await deletarAdminRota(Rota.id);
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
					{!Rota && Modo != 'Cadastrar' ? (
						<></>
					) : (
						<>
							<Formulario
								className={classes.Formulario}
								onSubmit={handleSubmit}
							>
								<TextInputAdmin
									label='ID'
									value={Rota ? Rota.id : ''}
									disabled={true}
								/>

								<TextInputAdmin
									required
									label='Nome'
									autoComplete='nome'
									autoFocus
									value={Nome}
									onChange={({ target }) => setNome(target.value)}
									disabled={DisplayMode}
								/>

								<TextInputAdmin
									required
									label='Path'
									autoComplete='nome'
									value={Path}
									onChange={({ target }) => setPath(target.value)}
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

export default RotasEditar;
