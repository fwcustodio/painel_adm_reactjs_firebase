import React, {useState, useEffect} from 'react';
import InputMask from 'react-input-mask';
import Container from '~/componentes/container';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import Title from '~/componentes/title';
import TitleForm from '~/componentes/titleForm';

import {TextInputAdmin, SelectInputAdmin} from '~/componentes/TextInputAdmin';
import MenuItem from '@material-ui/core/MenuItem';

import {useHistory, useLocation, useParams} from 'react-router-dom';
import {
  getFuncionario,
  cadastrarFuncionario,
  alterarFuncionario,
  deletarFuncionario,
} from '~/servicos/firebase_api';
import {
  DivConteudoFormulario,
  Formulario,
  DivBotao,
  DivBotaoVoltar,
  ClassesBase,
} from '~/styles_base';
import Button from '@material-ui/core/Button';
import {getMode} from '~/core';
import Funcionarios from '..';

const FuncionariosEditar = (props) => {
  const classes = ClassesBase();
  const [loading, setLoading] = useState(false);
  const [Inicio, setInicio] = useState(true);
  const [Modo, setModo] = useState('Editar');
  const [DisplayMode, setDisplayMode] = useState(false);

  const History = useHistory();
  const Location = useLocation();
  const {id} = useParams();

  const [Funcionario, setFuncionario] = useState(null);

  const [Nome, setNome] = useState(null);
  const [Email, setEmail] = useState(null);
  const [EmailGoogle, setEmailGoogle] = useState(null);
  const [Telefone, setTelefone] = useState(null);
  const [dataNascimento, setDataNascimento] = useState(null);
  const [CPF, setCPF] = useState(null);
  const [RG, setRG] = useState(null);
  const [Endereco, setEndereco] = useState(null);
  const [Bairro, setBairro] = useState(null);
  const [CEP, setCEP] = useState(null);
  const [Cidade, setCidade] = useState(null);
  const [Estado, setEstado] = useState(null);
  const [Formacao, setFormacao] = useState(null);
  const [Cargo, setCargo] = useState(null);
  const [CargaHorariaSemanal, setCargaHorariaSemanal] = useState(null);
  const [valorSalario, setValorSalario] = useState(null);
  const [dataAdmissao, setDataAdmissao] = useState(null);
  const [dataDemissao, setDataDemissao] = useState(null);
  const [Banco, setBanco] = useState(null);
  const [Agencia, setAgencia] = useState(null);
  const [Conta, setConta] = useState(null);
  const [PIX, setPIX] = useState(null);
  const [Status, setStatus] = useState('A');

  const [RazaoSocial, setRazaoSocial] = useState(null);
  const [Cnpj, setCnpj] = useState(null);
  const [DataAbertura, setDataAbertura] = useState(null);
  const [EnderecoEmpresa, setEnderecoEmpresa] = useState(null);
  const [Tipo, setTipo] = useState(null);
  const [CidadeAbertura, setCidadeAbertura] = useState(null);

  const [Faculdade, setFaculdade] = useState(null);
  const [Curso, setCurso] = useState(null);
  const [Semestre, setSemestre] = useState(null);
  const [AnoInicio, setAnoInicio] = useState(null);
  const [CidadeCurso, setCidadeCurso] = useState(null);

  const [Linkedin, setLinkedin] = useState(null);
  const [Insta, setInsta] = useState(null);

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

    let funcionariosAux = await getFuncionario(id);
    setFuncionario(funcionariosAux);

    formatar(funcionariosAux);
    setLoading(false);
  };

  const formatar = (Funcionario) => {
    const {
      nome,
      email,
      email_google,
      telefone,
      dataNascimento,
      cpf,
      rg,
      endereco,
      cep,
      cidade,
      estado,
      formacao,
      cargo,
      valorSalario,
      carga_horaria,
      dataAdmissao,
      dataDemissao,
      banco,
      agencia,
      conta,
      pix,
      status,
      razao_social,
      cnpj,
      data_abertura_empresa,
      endereco_empresa,
      tipo_empresa,
      cidade_abertura_empresa,
      faculdade,
      curso,
      semestre,
      ano_inicio_faculdade,
      cidade_curso,
      bairro,
      linkedin,
      insta,
    } = Funcionario;

    setNome(nome ? nome : null);
    setEmail(email ? email : null);
    setEmailGoogle(email_google ? email_google : null);
    setTelefone(telefone ? telefone : null);
    setDataNascimento(dataNascimento ? dataNascimento : null);
    setCPF(cpf ? cpf : null);
    setRG(rg ? rg : null);
    setEndereco(endereco ? endereco : null);
    setCEP(cep ? cep : null);
    setCidade(cidade ? cidade : null);
    setEstado(estado ? estado : null);
    setFormacao(formacao ? formacao : null);
    setCargo(cargo ? cargo : null);
    setValorSalario(valorSalario ? valorSalario : null);
    setCargaHorariaSemanal(carga_horaria ?? null);
    setDataAdmissao(dataAdmissao ? dataAdmissao : null);
    setDataDemissao(dataDemissao ? dataDemissao : null);
    setBanco(banco ? banco : null);
    setAgencia(agencia ? agencia : null);
    setConta(conta ? conta : null);
    setPIX(pix ? pix : null);
    setRazaoSocial(razao_social ? razao_social : null);
    setCnpj(cnpj ? cnpj : null);
    setDataAbertura(data_abertura_empresa ? data_abertura_empresa : null);
    setEnderecoEmpresa(endereco_empresa ? endereco_empresa : null);
    setTipo(tipo_empresa ? tipo_empresa : null);
    setCidadeAbertura(cidade_abertura_empresa ? cidade_abertura_empresa : null);
    setFaculdade(faculdade ? faculdade : null);
    setCurso(curso ? curso : null);
    setSemestre(semestre ? semestre : null);
    setAnoInicio(ano_inicio_faculdade ? ano_inicio_faculdade : null);
    setCidadeCurso(cidade_curso ? cidade_curso : null);
    setBairro(bairro ? bairro : null);

    setLinkedin(linkedin ?? null);
    setInsta(insta ?? null);
  };

  const validouDados = () => {
    let Validou = true;
    if (!Nome) {
      alert('É necessario inserir um nome');
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
      nome: Nome,
      email: Email,
      email_google: EmailGoogle,
      telefone: Telefone,
      dataNascimento: dataNascimento,
      cpf: CPF,
      rg: RG,
      endereco: Endereco,
      cep: CEP,
      cidade: Cidade,
      estado: Estado,
      formacao: Formacao,
      cargo: Cargo,
      valorSalario: valorSalario,
      carga_horaria: CargaHorariaSemanal,
      dataAdmissao: dataAdmissao,
      dataDemissao: dataDemissao,
      banco: Banco,
      agencia: Agencia,
      conta: Conta,
      pix: PIX,
      status: Status,
      razao_social: RazaoSocial,
      cnpj: Cnpj,
      data_abertura_empresa: DataAbertura,
      endereco_empresa: EnderecoEmpresa,
      tipo_empresa: Tipo,
      cidade_abertura_empresa: CidadeAbertura,
      faculdade: Faculdade,
      curso: Curso,
      semestre: Semestre,
      ano_inicio_faculdade: AnoInicio,
      cidade_curso: CidadeCurso,
      bairro: Bairro,
      linkedin: Linkedin,
      insta: Insta,
    };
  };

  const cadastrar = async () => {
    setLoading(true);

    let Dados = getDados();

    let Sucesso = await cadastrarFuncionario(Dados);
    finalizarAcao(Sucesso, 'CADASTRAR');
  };

  const editar = async () => {
    setLoading(true);

    let Dados = getDados();

    let Sucesso = await alterarFuncionario(Funcionario.id, Dados);
    finalizarAcao(Sucesso, 'ALTERAR');
  };

  const excluir = async () => {
    setLoading(true);

    let Sucesso = await deletarFuncionario(Funcionario.id);
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
          {!Funcionario && Modo != 'Cadastrar' ? (
            <></>
          ) : (
            <>
              <Formulario
                className={classes.Formulario}
                onSubmit={handleSubmit}>
                <TitleForm>Dados Básicos</TitleForm>
                <TextInputAdmin
                  label="ID"
                  value={Funcionario ? Funcionario.id : ''}
                  disabled={true}
                />

                <TextInputAdmin
                  label="Nome"
                  autoComplete="nome"
                  autoFocus
                  value={Nome}
                  onChange={({target}) => setNome(target.value)}
                  disabled={DisplayMode}
                />

                <TextInputAdmin
                  label="E-mail"
                  value={Email}
                  onChange={({target}) => setEmail(target.value)}
                  disabled={DisplayMode}
                />

                <TextInputAdmin
                  label="E-mail Google"
                  value={EmailGoogle}
                  onChange={({target}) => setEmailGoogle(target.value)}
                  disabled={DisplayMode}
                />

                <InputMask
                  label="Telefone"
                  mask="(99)99999-9999"
                  value={Telefone}
                  onChange={({target}) => setTelefone(target.value)}
                  disabled={DisplayMode}>
                  <TextInputAdmin />
                </InputMask>

                <InputMask
                  label="Data de Nascimento"
                  mask="99/99/9999"
                  value={dataNascimento}
                  onChange={({target}) => setDataNascimento(target.value)}
                  disabled={DisplayMode}>
                  <TextInputAdmin />
                </InputMask>

                <InputMask
                  label="CPF"
                  mask="999.999.999-99"
                  value={CPF}
                  onChange={({target}) => setCPF(target.value)}
                  disabled={DisplayMode}>
                  <TextInputAdmin />
                </InputMask>

                <TextInputAdmin
                  label="RG"
                  value={RG}
                  onChange={({target}) => setRG(target.value)}
                  disabled={DisplayMode}
                />
                <TextInputAdmin
                  label="Endereço"
                  value={Endereco}
                  onChange={({target}) => setEndereco(target.value)}
                  disabled={DisplayMode}
                />
                <TextInputAdmin
                  label="Bairro"
                  value={Bairro}
                  onChange={({target}) => setBairro(target.value)}
                  disabled={DisplayMode}
                />
                <InputMask
                  label="CEP"
                  mask="99999-999"
                  value={CEP}
                  onChange={({target}) => setCEP(target.value)}
                  disabled={DisplayMode}>
                  <TextInputAdmin />
                </InputMask>
                <TextInputAdmin
                  label="Cidade"
                  value={Cidade}
                  onChange={({target}) => setCidade(target.value)}
                  disabled={DisplayMode}
                />
                <TextInputAdmin
                  label="Estado"
                  value={Estado}
                  onChange={({target}) => setEstado(target.value)}
                  disabled={DisplayMode}
                />

                <TitleForm>Rede Social</TitleForm>
                <TextInputAdmin
                  label="Linkedin"
                  value={Linkedin}
                  onChange={({target}) => setLinkedin(target.value)}
                  disabled={DisplayMode}
                />
                <TextInputAdmin
                  label="Insta"
                  value={Insta}
                  onChange={({target}) => setInsta(target.value)}
                  disabled={DisplayMode}
                />

                <TitleForm>Formação</TitleForm>
                <TextInputAdmin
                  label="Formação"
                  value={Formacao}
                  onChange={({target}) => setFormacao(target.value)}
                  disabled={DisplayMode}
                />
                <TextInputAdmin
                  label="Faculdade"
                  value={Faculdade}
                  onChange={({target}) => setFaculdade(target.value)}
                  disabled={DisplayMode}
                />
                <TextInputAdmin
                  label="Curso"
                  value={Curso}
                  onChange={({target}) => setCurso(target.value)}
                  disabled={DisplayMode}
                />
                <TextInputAdmin
                  label="Semestre"
                  value={Semestre}
                  onChange={({target}) => setSemestre(target.value)}
                  disabled={DisplayMode}
                />
                <TextInputAdmin
                  label="Ano inicio"
                  value={AnoInicio}
                  onChange={({target}) => setAnoInicio(target.value)}
                  disabled={DisplayMode}
                />
                <TextInputAdmin
                  label="Cidade do curso"
                  value={CidadeCurso}
                  onChange={({target}) => setCidadeCurso(target.value)}
                  disabled={DisplayMode}
                />

                <TitleForm>Informações da prestação de serviços</TitleForm>
                <TextInputAdmin
                  label="Cargo"
                  value={Cargo}
                  onChange={({target}) => setCargo(target.value)}
                  disabled={DisplayMode}
                />
                <TextInputAdmin
                  label="Informe o Salário"
                  value={valorSalario}
                  onChange={({target}) => setValorSalario(target.value)}
                  disabled={DisplayMode}
                />
                <TextInputAdmin
                  label="Carga horária semanal"
                  value={CargaHorariaSemanal}
                  onChange={({target}) => setCargaHorariaSemanal(target.value)}
                  disabled={DisplayMode}
                />
                <InputMask
                  label="Data de Inicio"
                  mask="99/99/9999"
                  value={dataAdmissao}
                  onChange={({target}) => setDataAdmissao(target.value)}
                  disabled={DisplayMode}>
                  <TextInputAdmin />
                </InputMask>
                <InputMask
                  label="Data de Saída"
                  mask="99/99/9999"
                  value={dataDemissao}
                  onChange={({target}) => setDataDemissao(target.value)}
                  disabled={DisplayMode}>
                  <TextInputAdmin />
                </InputMask>

                <TitleForm>Dados de Empresa</TitleForm>
                <TextInputAdmin
                  label="Razão social"
                  value={RazaoSocial}
                  onChange={({target}) => setRazaoSocial(target.value)}
                  disabled={DisplayMode}
                />
                <InputMask
                  label="CNPJ"
                  mask="99.999.999/9999-99"
                  value={Cnpj}
                  onChange={({target}) => setCnpj(target.value)}
                  disabled={DisplayMode}>
                  <TextInputAdmin />
                </InputMask>
                <SelectInputAdmin
                  value={Tipo}
                  onChange={({target}) => setTipo(target.value)}
                  disabled={DisplayMode}>
                  <MenuItem value={'MEI'}>MEI</MenuItem>
                  <MenuItem value={'Micro'}>Micro</MenuItem>
                </SelectInputAdmin>
                <InputMask
                  label="Data de abertura"
                  mask="99/99/9999"
                  value={DataAbertura}
                  onChange={({target}) => setDataAbertura(target.value)}
                  disabled={DisplayMode}>
                  <TextInputAdmin />
                </InputMask>
                <TextInputAdmin
                  label="Endereço"
                  value={EnderecoEmpresa}
                  onChange={({target}) => setEnderecoEmpresa(target.value)}
                  disabled={DisplayMode}
                />
                <TextInputAdmin
                  label="Cidade de abertura"
                  value={CidadeAbertura}
                  onChange={({target}) => setCidadeAbertura(target.value)}
                  disabled={DisplayMode}
                />

                <TitleForm>Dados bancários</TitleForm>
                <TextInputAdmin
                  label="Banco"
                  value={Banco}
                  onChange={({target}) => setBanco(target.value)}
                  disabled={DisplayMode}
                />
                <TextInputAdmin
                  label="Agencia"
                  value={Agencia}
                  onChange={({target}) => setAgencia(target.value)}
                  disabled={DisplayMode}
                />
                <TextInputAdmin
                  label="Conta"
                  value={Conta}
                  onChange={({target}) => setConta(target.value)}
                  disabled={DisplayMode}
                />
                <TextInputAdmin
                  label="PIX"
                  value={PIX}
                  onChange={({target}) => setPIX(target.value)}
                  disabled={DisplayMode}
                />

                <TitleForm>Status</TitleForm>
                <SelectInputAdmin
                  value={Status}
                  onChange={({target}) => setStatus(target.value)}
                  disabled={DisplayMode}>
                  <MenuItem value={'A'}>Ativo</MenuItem>
                  <MenuItem value={'I'}>Inativo</MenuItem>
                </SelectInputAdmin>

                <DivBotaoVoltar>
                  <Button
                    onClick={() => History.goBack()}
                    fullWidth
                    variant="contained"
                    color="primary">
                    Voltar
                  </Button>
                </DivBotaoVoltar>
                {Modo == 'Visualizar' ? (
                  <></>
                ) : (
                  <DivBotao>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      color="primary">
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

export default FuncionariosEditar;
