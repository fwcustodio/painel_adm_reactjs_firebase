import React from 'react';
import {getPathBase} from '~/servicos/auth';

const Telas = {
  home: 'Dashboard',
  dashboard: 'Dashboard',
  rotas: 'Rotas',
  usuarios: 'Usuários',
  clientes: 'Clientes',
  pets: 'Pets',
  hospedagens: 'Hospedagens',
  servicos: 'Serviços',
};

export function getPaginaAtual(location) {
  return Telas[getPathBase(location.pathname)];
}

export function getMode(location) {
  let Path = location.pathname;

  return Path.indexOf('cad') > 0
    ? 'Cadastrar'
    : Path.indexOf('editar') > 0
    ? 'Editar'
    : Path.indexOf('visu') > 0
    ? 'Visualizar'
    : Path.indexOf('excluir') > 0
    ? 'Excluir'
    : 'erro';
}

export function getNLinhasPadraoGrid() {
  return 100;
}

export function getMensagemAcao(MSGTipoAcao, MSGResultado) {
  console.log('MSGTipoAcao : ' + MSGTipoAcao);

  let MensagemRetorno;
  let MensagemSucesso =
    MSGResultado === 'true' || MSGResultado === true ? true : false;
  switch (MSGTipoAcao) {
    case 'CADASTRAR':
      MensagemRetorno = MensagemSucesso
        ? 'Dados cadastrados com sucesso'
        : 'Não foi possível cadastrar os dados';
      break;
    case 'ALTERAR':
      MensagemRetorno = MensagemSucesso
        ? 'Dados alterados com sucesso'
        : 'Não foi possível alterar os dados';
      break;
    case 'EXCLUIR':
      MensagemRetorno = MensagemSucesso
        ? 'Dados excluídos com sucesso'
        : 'Não foi possível excluir os dados';
      break;
    case 'ENVIAR_EMAIL':
      MensagemRetorno = MensagemSucesso
        ? 'Email enviado com sucesso'
        : 'Não foi possível enviar o email';
      break;

    default:
      MensagemRetorno = 'Solicitação concluída com observações';
      break;
  }

  return MensagemRetorno;
}
export const getWindowDimensions = () => {
  const {innerWidth: width, innerHeight: height} = window;
  return {
    width,
    height,
  };
};

export const getValorMoedaFormatado = (Valor, UsarPontoSeparacao = false) => {
  if (!Valor) return '0,00';
  let CaracterSeparacao = UsarPontoSeparacao ? '.' : ',';

  let ValorString = Valor.toString();
  //console.log(ValorString);

  let PosPonto = ValorString.indexOf('.');

  if (PosPonto < 0) {
    return ValorString + `${CaracterSeparacao}00`;
  } else {
    let PartesString = ValorString.split('.');
    let Parte1 = PartesString[0];
    let Parte2 = PartesString[1];

    if (!Parte2) {
      console.log(JSON.stringify(PartesString));
      return `0${CaracterSeparacao}00`;
    }
    if (Parte2.length == 1) {
      return Parte1 + CaracterSeparacao + Parte2 + '0';
    } else {
      if (Parte2.length > 2) {
        return Parte1 + CaracterSeparacao + Parte2.substring(0, 2);
      } else {
        return Parte1 + CaracterSeparacao + Parte2;
      }
    }
  }
};

export const getPorcentagemFormatada = (
  Valor,
  UsarPontoSeparacao = false,
  DuasCasasAposVirgula = false,
) => {
  if (!Valor) return '0';
  let CaracterSeparacao = UsarPontoSeparacao ? '.' : ',';

  let ValorString = Valor.toString();
  //console.log(ValorString);

  let PosPonto = ValorString.indexOf('.');

  if (PosPonto < 0) {
    return ValorString;
  } else {
    let PartesString = ValorString.split('.');
    let Parte1 = PartesString[0];
    let Parte2 = PartesString[1];

    if (!Parte2) {
      console.log(JSON.stringify(PartesString));
      return `0`;
    }
    if (Parte2.length == 1) {
      return Parte1 + CaracterSeparacao + Parte2;
    } else {
      if (DuasCasasAposVirgula) {
        if (Parte2.length > 2) {
          return Parte1 + CaracterSeparacao + Parte2.substring(0, 2);
        } else {
          return Parte1 + CaracterSeparacao + Parte2;
        }
      } else {
        if (Parte2.length > 1) {
          return Parte1 + CaracterSeparacao + Parte2.substring(0, 1);
        } else {
          return Parte1 + CaracterSeparacao + Parte2;
        }
      }
    }
  }
};

export const formatarData = function (Data) {
  if (Data) {
    if (Number.isInteger(Data)) {
      Data = new Date(Data);
      Data = Data.toISOString();
    } else {
    }

    //console.log('Data : ' + Data);
    //console.log('Data : ' + JSON.stringify(Data));

    let Hora;
    let Minuto;

    if (Data.length > 10) {
      Hora = Data.substr(11, 2);
      Minuto = Data.substr(14, 2);

      Data = Data.substr(0, 10);
    }

    let Ano = Data.substr(0, Data.indexOf('-'));
    let Mes = Data.substr(
      Data.indexOf('-') + 1,
      Data.indexOf('-', Data.indexOf('-')) - 2,
    );
    let Dia = Data.substr(
      Data.indexOf('-', Data.indexOf('-') + 1) + 1,
      Data.length,
    );

    //return Data;
    if (Hora) {
      return Dia + '/' + Mes + '/' + Ano + ` ${Hora}:${Minuto}`;
    } else {
      return Dia + '/' + Mes + '/' + Ano;
    }
  }

  return '  / / ';
};
