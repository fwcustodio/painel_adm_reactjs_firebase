import React, {useState, useEffect, useContext} from 'react';
import {useHistory, useLocation, withRouter} from 'react-router-dom';

import {autenticarUsuario} from '~/servicos/auth';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Loading from '~/componentes/loading';
import Copyright from '~/componentes/copyright';
import AuthContext from '~/contexts/auth';
import {Constantes} from '~/config';

import {
  cadastrarUsuarioAdmin,
  getUsuariosFirestore,
} from '~/servicos/firebase_api';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const [Inicio, setInicio] = useState(true);
  const [loading, setLoading] = useState(false);
  const [MinLoading, setMinLoading] = useState(true);

  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const {signInContext} = useContext(AuthContext);

  let history = useHistory();
  let location = useLocation();
  const classes = useStyles();

  useEffect(() => {
    localStorage.clear();
    return () => {};
  }, [Inicio]);

  useEffect(() => {
    setTimeout(() => {
      setMinLoading(false);
    }, Constantes.MinRefresh);
  }, [Inicio]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!Email || Email.length === 0) {
      alert('Informe o email!');
      return false;
    }

    if (!Password || Password.length === 0) {
      alert('Informe a senha!');
      return false;
    }

    setLoading(true);

    let UsuariosFirestore = await getUsuariosFirestore();

    if (!UsuariosFirestore || !UsuariosFirestore.length > 0) {
      //Criar o primeiro usuário
      setLoading(true);

      let Dados = {
        displayName: 'Usuário Teste',
        email: Email,
        password: Password,
        phoneNumber: '+5511999999999',
        disabled: false,
      };

      let DadosAdmin = {
        UsuarioAdmin: true,
        Paths: {
          blog_autores: true,
          blog_categorias: true,
          blog_posts: true,
          configuracoes: true,
          dados_pessoais: true,
          dashboard: true,
          funcionarios: true,
          home: true,
          issues: true,
          politica_privacidade: true,
          projetos: true,
          projetos_concluidos: true,
          relatorios: true,
          rotas: true,
          usuarios: true,
        },
      };

      let Sucesso = await cadastrarUsuarioAdmin(Dados, DadosAdmin);
      console.log('Sucesso : ' + JSON.stringify(Sucesso));
    }

    let RetornoAuth = await autenticarUsuario(Email, Password);

    if (RetornoAuth === null || RetornoAuth === undefined) {
      alert('Seu usuário não possui permissão para acessar este sistema!');

      setLoading(false);
      return false;
    }

    //console.log('RetornoAuth : ' + JSON.stringify(RetornoAuth));

    if (RetornoAuth.code) {
      if ((RetornoAuth.code = 'auth/wrong-password')) {
        alert('Usuario ou senha inválidos!');
      } else {
        if ((RetornoAuth.code = 'auth/unknown')) {
          alert('Número de tentativas esgotadas. Tente mais tarde.');
        }
      }
      //alert('Usuario ou senha inválidos!');
    } else {
      let User = RetornoAuth;

      //console.log('Usuario autenticado com sucesso.');
      //console.log('Usuario : ' + User.Email);
      //console.log('Usuario : ' + User.Nome);

      signInContext(User);
      setLoading(false);
      history.push('/home');
    }

    setLoading(false);
  };

  return (
    <>
      {loading || MinLoading ? <Loading login={true} /> : <></>}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar>
            <LockOutlinedIcon color="primary" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Entrar
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSignUp}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar-me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              Acessar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
};

export default withRouter(Login);
