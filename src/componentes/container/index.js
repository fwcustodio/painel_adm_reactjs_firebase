import React, {useEffect, useState, useContext} from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {Menu, MenuItem, Button} from '@material-ui/core';
import {MenuLateral, MenuLateralInferior} from '~/componentes/menu_lateral';
import Copyright from '~/componentes/copyright';
import {Constantes} from '~/config';
import Loading from '~/componentes/loading';
import AuthContext from '~/contexts/auth';
import {styles} from './styles';
import {getPaginaAtual} from '~/core';
import {useHistory, useLocation, withRouter} from 'react-router-dom';
import MensagemAcao from '~/componentes/MensagemAcao';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from 'react-device-detect';

export default function ContainerPrincipal(props) {
  const [Inicio, setInicio] = useState(true);
  const [MinLoading, setMinLoading] = useState(true);
  const {User, signOutContext} = useContext(AuthContext);

  const classes = styles();
  const [open, setOpen] = useState(true);
  const [MenuHeaderAberto, setMenuHeaderAberto] = useState(false);
  const [MenuPosicao, setMenuPosicao] = useState(null);
  const [MenuNotificacoesAberto, setMenuNotificacoesAberto] = useState(false);
  const [MenuNotificacoesPosicao, setMenuNotificacoesPosicao] = useState(null);
  const [Notificacoes, setNotificacoes] = useState(false);
  const [NumeroNotificacoes, setNumeroNotificacoes] = useState(0);
  const location = useLocation();
  const PaginaAtual = getPaginaAtual(location);

  const {MinRefresh} = Constantes;

  useEffect(() => {
    let DrawerOpen = localStorage.getItem('DrawerOpen');
    if (DrawerOpen) {
      setOpen(DrawerOpen == 'S');
    } else {
      let Open = isMobile ? 'N' : 'S';
      setOpen(Open);
      localStorage.setItem('DrawerOpen', Open);
    }

    setTimeout(() => {
      setMinLoading(false);
    }, MinRefresh);
  }, [Inicio]);

  const handleMenuNotificacoes = (e) => {
    if (!MenuNotificacoesPosicao) setMenuNotificacoesPosicao(e.currentTarget);
    setMenuNotificacoesAberto(!MenuHeaderAberto);
  };

  const onCloseNotificacoesHandle = (e) => {
    setMenuNotificacoesAberto(false);
  };

  const handleMenuProfile = (e) => {
    if (!MenuPosicao) setMenuPosicao(e.currentTarget);
    setMenuHeaderAberto(!MenuHeaderAberto);
  };

  const onCloseHandle = (e) => {
    setMenuHeaderAberto(false);
  };

  const handleDrawerOpen = () => {
    localStorage.setItem('DrawerOpen', 'S');
    setOpen(true);
  };
  const handleDrawerClose = () => {
    localStorage.setItem('DrawerOpen', 'N');
    setOpen(false);
  };

  return (
    <>
      {props.loading || MinLoading ? <Loading /> : <></>}
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden,
              )}>
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}>
              {PaginaAtual}
            </Typography>

            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.UsuarioNome}>
              {User.Nome}
            </Typography>
            <IconButton
              onClick={handleMenuProfile}
              aria-controls="menu_header"
              aria-haspopup="true"
              color="inherit">
              <PersonIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleMenuNotificacoes}>
              {Notificacoes ? (
                <Badge badgeContent={NumeroNotificacoes} color="secondary">
                  <NotificationsIcon />
                </Badge>
              ) : (
                <NotificationsIcon />
              )}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}>
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <MenuLateral />
          </List>
          <Divider />
          <List>
            <MenuLateralInferior />
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container className={classes.container} style={{maxWidth: '99%'}}>
            {props.children}
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
      <Menu
        anchorEl={MenuPosicao}
        className={classes.menu}
        keepMounted
        open={MenuHeaderAberto}
        onClose={onCloseHandle}>
        <MenuItem onClick={() => {}}>Perfil de acesso</MenuItem>
        <MenuItem onClick={signOutContext}>Sair</MenuItem>
      </Menu>
      <Menu
        anchorEl={MenuNotificacoesPosicao}
        className={classes.menu}
        keepMounted
        open={MenuNotificacoesAberto}
        onClose={onCloseNotificacoesHandle}>
        <MenuItem onClick={() => {}}>Sem notificações</MenuItem>
      </Menu>
      <MensagemAcao Carregando={props.loading} />
    </>
  );
}
