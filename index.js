module.exports = (function () {
	// Package dependences.
	let axios = require('axios');
	let js2xmlparser = require("js2xmlparser");

	// User related info.
	let user = '';
	let password = '';
	let responseType = '';

	// Xml's root element's names.
	let xmlClienteRoot = 'cliente';
	let xmlServiceRequestRoot = 'service-request';
	let xmlOfertaFiltroRoot = 'oferta-filtro';
	let xmlMateriaRoot = 'materia';
	let xmlFaleConoscoRoot = 'fale-conosco';
	let xmlCliqueRoot = 'clique';

	// Http client.
	var client = axios.create({
	  baseURL: 'http://fattoria-app.com.br/clubeAPIWS',
	  timeout: 30000,
	  headers: {
			'Content-Type': 'application/xml'
		}
	});

	/**
	 * Sets the user using the client.
	 *
	 * @param _user Registered user name.
	 */
	let setUser = function (_user = '') {
		user = _user;
	}

	/**
	 * Sets the user's password.
	 *
	 * @param _password Registered user's password.
	 */
	let setPassword = function (_password = '') {
		password = _password
	}

	/**
	 * Sets the desired response type.
	 *
	 * @param _responseType The disered response type.
	 */
	let setResponseType = function (_responseType) {
		responseType = _responseType;
	}

	/**
	 * Does a post request.
	 *
	 * @param url Url to post to.
	 * @param data Data to be sent.
	 * @param xmlRoot Xml root name.
	 * @private
	 *
	 * @return Promise.
	 */
	let post = function (url = '', data, xmlRoot = '') {
		data = setRequestAuthenticationParameters(data);
		data = setRequestResponseType(data);
		xmlData = js2xmlparser.parse(xmlRoot, data);
		console.log(xmlData);

		return client.post(url, xmlData);
	}

	/**
	 * Appends to the data user authentication parameters.
	 *
	 * @param data Data to have the user authentication parameters appended.
	 * @private
	 *
	 * @return data. The original data plus authentication parameters.
	 */
	let setRequestAuthenticationParameters = function (data) {
		data.autenticacao = {
			senha: password,
			usuario: user
		}

		return data;
	}

	/**
	 * Appends to the data the desired response type.
	 *
	 * @param data Data to have the response type parameter appended.
	 * @private
	 *
	 * @return data. The original data plus the response type parameter.
	 */
	let setRequestResponseType = function (data) {
		data.type = responseType == '' ? 'json' : responseType;

		return data;
	}

	/**
	 * Verifies if the user with the given email and password is registered.
	 *
	 * @param email Email to be authenticated.
	 * @param senha Password to be authenticated.
	 *
	 * @return Promise.
	 */
	let clienteAutenticar = function (
		email = '',
		senha = ''
	) {
		let data = {
			email: email,
			senha: senha
		}

		return post('/cliente/autenticar', data, xmlClienteRoot);
	}

	/**
	 * Register a new user.
	 *
	 * @param nome User's name.
	 * @param email User's email.
	 * @param documento User's cpf.
	 * @param celular User's cellphone.
	 * @param dataNascimento User's birthdate.
	 * @param genero User's gender.
	 * @param uf User's State.
	 * @param cidade User's city.
	 * @param senha User's password.
	 *
	 * @return Promise.
	 */
	let clienteCadastrar = function (
		nome = '',
		email = '',
		documento = '',
		celular = '',
		dataNascimento = '',
		genero = '',
		uf = '',
		cidade = '',
		senha = ''
	) {
		let data = {
			nome: nome,
			email: email,
			documento: documento,
			celular: celular,
			dataNascimento: dataNascimento,
			genero: genero,
			uf: uf,
			cidade: cidade,
			senha: senha
		}

		return post('/cliente/cadastrar', data, xmlClienteRoot);
	}

	let clienteRecuperarSenha = function (
		email = ''
	) {
		let data = {
			email: email
		}

		return post('/cliente/recuperar-senha', data, xmlClienteRoot);
	}

	let clienteRemover = function (
		codigo = ''
	) {
		let data = {
			codigo: codigo
		};

		return post('/cliente/remover', data, xmlClienteRoot);
	}

	/**
	 * Gets the details of an offer.
	 *
	 * @param codigoOferta Offer code.
	 *
	 * @return Promise.
	 */
	let ofertaCodigo = function (
		codigoOferta =  ''
	) {
		let data = {
			codigoOferta: codigoOferta
		}

		return post('/oferta/codigo', data, xmlServiceRequestRoot);
	}

	/**
	 * Lists offers based on a search term.
	 *
	 * @param limit Length of each page.
	 * @param offset Page number.
	 * @param uf State abbreviation.
	 * @param codigoCategoria Category code.
	 * @param urlCategoria Category url.
	 * @param termoDeBusca Search term.
	 *
	 * @return Promise.
	 */
	let ofertaBuscar = function (
		limit = '',
		offset = '',
		uf = '',
		codigoCategoria = '',
		urlCategoria = '',
		termoDeBusca = ''
	) {
		let data = {
			limit: limit,
			offset: offset,
			uf: uf,
			codigoCategoria: codigoCategoria,
			urlCategoria: urlCategoria,
			termoDeBusca: termoDeBusca
		};

		return post('/oferta/buscar', data, xmlOfertaFiltroRoot);
	}

	/**
	 * Lists all the registered banners.
	 *
	 * @return Promise.
	 */
	let bannerListar = function (

	) {
		let data = {};

		return post('/banner/listar', data, xmlServiceRequestRoot);
	}

	/**
	 * Generates a voucher.
	 *
	 * @param documento User's cpf.
	 * @param codigoOferta Offer code.
	 *
	 * @return Promise.
	 */
	let voucherGerar = function (
		documento = '',
		codigoOferta = ''
	) {
		let data = {
			documento: documento,
			codigoOferta: codigoOferta
		}

		return post('/voucher/gerar', data, xmlServiceRequestRoot);
	}

	/**
	 * Lists user's vouchers.
	 *
	 * @param documento User's cpf.
	 *
	 * @return Promise.
	 */
	let voucherListar = function (
		documento = ''
	) {
		let data = {
			documento: documento
		}

		return post('/voucher/listar', data, xmlServiceRequestRoot);
	}

	/**
	 * Lists unknown stuff.
	 *
	 * @param codigo Unknow stuff code.
	 *
	 * @return Promise.
	 */
	let materiaBuscar = function (
		codigo = ''
	) {
		let data = {
			codigo: codigo
		}

		return post('/materia/buscar', data, xmlMateriaRoot);
	}

	/**
	 * Register a "Get in touch" message.
	 *
	 * @param assunto The message subject.
	 * @param cpf User's cpf.
	 * @param email User's email.
	 * @param mensagem User's message.
	 * @param telefone User's cellphone.
	 * @param nome User's name.
	 *
	 * @return Promise.
	 */
	let faleConoscoCadastrar = function (
		assunto = '',
		cpf = '',
		email = '',
		mensagem = '',
		telefone = '',
		nome = ''
	) {
		let data = {
			assunto: assunto,
			cpf: cpf,
			email: email,
			mensagem: mensagem,
			telefone: telefone,
			nome: nome
		}

		return post('/fale-conosco/cadastrar', data, xmlFaleConoscoRoot);
	}

	/**
	 * Lists all the reasons a user may use to get in touch.
	 *
	 * @return Promise.
	 */
	let faleConoscoAssuntos = function () {
		let data = {};

		return post('/fale-conosco/assuntos', data, xmlFaleConoscoRoot);
	}

	/**
	 * Lists all the categories.
	 *
	 * @return Promise.
	 */
	let categoriaListar = function () {
		let data = {};

		return post('/categoria/listar', data, xmlServiceRequestRoot);
	}

	/**
	 * Lists all the states.
	 *
	 * @return Promise.
	 */
	let ufListar = function () {
		let data = {};

		return post('/uf/listar', data, xmlServiceRequestRoot);
	}

	/**
	 * Register that the user clicked on a banner.
	 *
	 * @param codigo Banner code.
	 * @param documento User cpf.
	 *
	 * @return Promise.
	 */
	let cliqueBanner = function (
		codigo = '',
		documento = ''
	) {
		let data = {
			codigo: codigo,
			documento: documento
		}

		return post('/clique/banner', data, xmlCliqueRoot);
	}

	/**
	 * Register that the user clicked on an offer.
	 *
	 * @param codigo Banner code.
	 * @param documento User cpf.
	 *
	 * @return Promise.
	 */
	let cliqueOferta = function (
		codigo = '',
		documento = ''
	) {
		let data = {
			codigo: codigo,
			documento: documento
		}

		return post('/clique/oferta', data, xmlCliqueRoot);
	}

	// The object that is returned when the package is imported.
	return {
		setUser: setUser,
		setPassword: setPassword,
		setResponseType: setResponseType,

		clienteAutenticar: clienteAutenticar,
		clienteCadastrar: clienteCadastrar,
		clienteRecuperarSenha, clienteRecuperarSenha,
		clienteRemover: clienteRemover,

		ofertaCodigo: ofertaCodigo,
		ofertaBuscar: ofertaBuscar,

		bannerListar: bannerListar,

		voucherGerar: voucherGerar,
		voucherListar: voucherListar,

		materiaBuscar: materiaBuscar,

		faleConoscoCadastrar: faleConoscoCadastrar,
		faleConoscoAssuntos: faleConoscoAssuntos,

		categoriaListar: categoriaListar,

		ufListar: ufListar,

		cliqueBanner: cliqueBanner,
		cliqueOferta: cliqueOferta
	}
})();
