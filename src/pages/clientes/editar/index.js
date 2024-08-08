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
	getAdminOleo,
	cadastrarOleo,
	alterarOleo,
	deletarOleo,
	getAdminCategoriasOleos,
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

const OleosEditar = (props) => {
	const classes = ClassesBase();
	const [loading, setLoading] = useState(false);
	const [Inicio, setInicio] = useState(true);
	const [Modo, setModo] = useState('Editar');
	const [DisplayMode, setDisplayMode] = useState(false);

	const History = useHistory();
	const Location = useLocation();
	const { id } = useParams();

	const [Oleo, setOleo] = useState();
	const [Categorias, setCategorias] = useState();

	const [Nome, setNome] = useState();
	const [Categoria, setCategoria] = useState();
	const [Valor, setValor] = useState();
	const [Status, setStatus] = useState('A');

	useEffect(() => {
		let ModoAux = getMode(Location);
		setModo(ModoAux);

		if (ModoAux != 'Editar' && ModoAux != 'Cadastrar') {
			setDisplayMode(true);
		}

		if (ModoAux == 'Cadastrar') {
			carregarCategorias();
		} else {
			(async () => {
				await carregarCategorias();
				carregarDados();
			})();
		}

		if (ModoAux != 'Cadastrar') {
			carregarDados();
		}
	}, [Inicio]);

	const carregarCategorias = async () => {
		setLoading(true);

		let CategoriasAux = await getAdminCategoriasOleos();
		setCategorias(CategoriasAux);

		setLoading(false);
	};

	const carregarDados = async () => {
		setLoading(true);

		let OleoAux = await getAdminOleo(id);
		setOleo(OleoAux);

		formatar(OleoAux);
		setLoading(false);
	};

	const formatar = (Oleo) => {
		setNome(Oleo.nome);
		setCategoria(Oleo.categoria_id);
		setValor(Oleo.valor);
		setStatus(Oleo.status);
	};

	const validouDados = () => {
		let Validou = true;

		if (!Nome) {
			alert('É necessario inserir um nome');
			Validou = false;
		}

		if (!Categoria) {
			alert('É necessario inserir uma categoria');
			Validou = false;
		}

		if (!Valor) {
			alert('É necessario inserir um valor');
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
		let CategoriaNome = '';

		Categorias.forEach((CategoriaAux) => {
			if (CategoriaAux.Id == Categoria) {
				CategoriaNome = CategoriaAux.nome;
				return;
			}
		});

		return {
			nome: Nome,
			categoria_id: Categoria,
			categoria_nome: CategoriaNome,
			valor: Valor.replace(',', '.').replace(',', '.').replace(',', '.'),
			status: Status,
		};
	};

	const cadastrar = async () => {
		setLoading(true);

		let Dados = getDados();

		let Sucesso = await cadastrarOleo(Dados);
		finalizarAcao(Sucesso, 'CADASTRAR');
	};

	const editar = async () => {
		setLoading(true);

		let Dados = getDados();

		let Sucesso = await alterarOleo(Oleo.id, Dados);
		finalizarAcao(Sucesso, 'ALTERAR');
	};

	const excluir = async () => {
		setLoading(true);

		let Sucesso = await deletarOleo(Oleo.id);
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
					{((!Oleo || !Categoria) && Modo != 'Cadastrar') || !Categorias ? (
						<></>
					) : (
						<>
							<Formulario
								className={classes.Formulario}
								onSubmit={handleSubmit}
							>
								<TextInputAdmin
									label='ID'
									value={Oleo ? Oleo.id : ''}
									disabled={true}
								/>

								<SelectInputAdmin
									required
									label='Categorias'
									value={Categoria}
									onChange={({ target }) => setCategoria(target.value)}
									disabled={DisplayMode}
								>
									{Categorias.map((Cat) => {
										return <MenuItem value={Cat.Id}>{Cat.nome}</MenuItem>;
									})}
								</SelectInputAdmin>

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
									label='Valor'
									autoFocus
									value={Valor}
									onChange={({ target }) => setValor(target.value)}
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

export default OleosEditar;
