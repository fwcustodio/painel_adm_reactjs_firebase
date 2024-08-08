/* eslint-disable prettier/prettier */
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const Aplicativo = 'Calculadora de Óleos Essenciais';

enviarEmail = functions.https.onCall((Parms) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			type: 'OAuth2',
			user: 'bmscare2020@gmail.com',
			clientId:
				'1073671965410-8rma68edeb6rkncdlfacjr0337fmmbek.apps.googleusercontent.com',
			clientSecret: 'tPGD1yeZqZdLUlT7HoyAHaNk',
			refreshToken:
				'1//04FR9MDOg-4evCgYIARAAGAQSNwF-L9Irm8QPekL51IP-F9o3qHdWLVceeIRGXJEexAU6Lm8rKVtdYUX1Tm-PiwkqpqGSXbHEcqI',
			accessToken:
				'ya29.a0AfH6SMAT_5-E5rBZzTeO8fUSnK5gTljceILNuUdyRYDUkAEnjzhC-0Jn9rLV6wT_R4q0a4zo3MY0tzKpqMSz4N_mD1ol2yNFm9J0BLwB0xrUWTE65wZshLtGhlnHZClnSeX11gkNcz_Q9CnZbO3sqUXNJAyMdhPBaEE',
			expires: 1484314697598,
		},
	});

	const Remetente = '"Calculadora de Óleos Essenciais" bmscare2020@gmail.com';
	let { EmailDestinatario } = Parms;
	let { TipoEmail } = Parms;

	console.log('enviarEmail', EmailDestinatario);

	let Assunto;
	let CorpoEmail;
	let CorpoHTML;

	switch (TipoEmail) {
		case 'novo_cadastro_cliente':
			Assunto = `Novo cadastro ${Aplicativo}`;
			CorpoHTML = CorpoEmail = `Bem vindo ao aplicativo ${Aplicativo}. Faça o acesso no seu celular para cadastrar e visualizar suas fórmulas.`;

			break;
		case 'pagamento_confirmado':
			Assunto = 'Seu pagamento foi confirmado';
			CorpoHTML = CorpoEmail =
				'O pagamento da licensa anual foi confirmada. Acesse o aplicativo e utilize a versão completa.';
			break;

		default:
			break;
	}

	let DadosEmail = {
		from: Remetente,
		to: EmailDestinatario,
		subject: Assunto,
		text: CorpoEmail,
		html: CorpoHTML,
	};

	transporter.sendMail(DadosEmail, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log('Mensagem %s enviada: %s', info.messageId, info.response);
		return true;
	});
});

module.exports = enviarEmail;
