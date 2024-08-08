import React, {useState, useEffect, useContext} from 'react';
import Container from '~/componentes/container';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Title from '~/componentes/title';

import {
  TextInputAdmin,
  TextFieldInputAdmin,
} from '~/componentes/TextInputAdmin';
import {useHistory, useLocation, useParams} from 'react-router-dom';
import {
  DivConteudoFormulario,
  Formulario,
  DivBotao,
  DivBotaoVoltar,
  ClassesBase,
} from '~/styles_base';
import {alterarUsuarioFirestore} from '~/servicos/firebase_api';
import {ContainerBotoes, TextoLabel} from './styles';
import Button from '@material-ui/core/Button';

import {getUsuarioAutenticado, setUsuarioAutenticado} from '~/servicos/auth';
import AuthContext from '~/contexts/auth';

const Configs = (props) => {
  const {User, setUser, signInContext} = useContext(AuthContext);
  const classes = ClassesBase();
  const [loading, setLoading] = useState(false);

  const History = useHistory();

  const [Configuracoes, setConfiguracoes] = useState();
  const [TokenGIT, setTokenGIT] = useState(User.TokenGIT);
  const [UsuarioID, setUsuarioID] = useState(User.ID);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setLoading(true);

    //console.log('User : ' + JSON.stringify(User));
    setLoading(false);
  };

  const formatar = (ConfiguracoesParm) => {
    setTokenGIT(ConfiguracoesParm.token_git);
  };

  const validouDados = () => {
    let Validou = true;

    if (!TokenGIT || TokenGIT.length < 15) {
      alert('Preencha o token GIT corretamente');
      Validou = false;
    }

    return Validou;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validouDados()) return;

    setLoading(true);
    //let Dados = getDados();

    let UserAux = User;
    //console.log('User : ' + JSON.stringify(User));

    await alterarUsuarioFirestore(UsuarioID, {
      token_git: TokenGIT,
    });

    setUsuarioAutenticado({...UserAux, TokenGIT: TokenGIT});
    setUser({...UserAux, TokenGIT: TokenGIT});

    setLoading(false);
    //History.goBack();
  };

  const getDados = () => {
    const Dados = {
      token_git: TokenGIT,
    };

    return Dados;
  };

  return (
    <Container loading={loading} {...props}>
      <TableContainer component={Paper}>
        <Title>Configurações</Title>
        <DivConteudoFormulario>
          {true ? (
            <>
              <Formulario
                className={classes.Formulario}
                onSubmit={handleSubmit}>
                <TextoLabel>GIT</TextoLabel>
                <br></br>
                <br></br>
                <br></br>

                <TextInputAdmin
                  required
                  label="Token GIT"
                  autoFocus
                  value={TokenGIT}
                  onChange={({target}) => setTokenGIT(target.value)}
                />

                <ContainerBotoes>
                  <DivBotaoVoltar>
                    <Button
                      onClick={() => History.goBack()}
                      fullWidth
                      variant="contained"
                      color="primary">
                      Voltar
                    </Button>
                  </DivBotaoVoltar>
                  <DivBotao>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      color="primary">
                      Salvar
                    </Button>
                  </DivBotao>
                </ContainerBotoes>
              </Formulario>
            </>
          ) : null}
        </DivConteudoFormulario>
      </TableContainer>
    </Container>
  );
};

export default Configs;
