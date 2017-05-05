import firebase from 'firebase'
import React, { Component } from 'react'
import { AppRegistry, Text, View, StyleSheet, Button } from 'react-native'

export default class App extends Component {
	constructor(props){
		super(props)
		this.state = {numero: 0}
	}

	componentWillMount() {

		//configuro as opções do firebase e logo depois inicializo ele
		var config = {
		apiKey: "AIzaSyCpkmPRUy_LSON3R-4X8GcJwqJCFmhLG40",
		authDomain: "configuracaofirebasereac-40051.firebaseapp.com",
		databaseURL: "https://configuracaofirebasereac-40051.firebaseio.com",
		projectId: "configuracaofirebasereac-40051",
		storageBucket: "configuracaofirebasereac-40051.appspot.com",
		messagingSenderId: "827566981210"
		}

		firebase.initializeApp(config);

		//verificar quando mudar o numero no db
		let numero = firebase.database().ref("numero")

		numero.on('value', (snapshot) => {
			// alert( snapshot.val() )
			let numero = snapshot.val()
			this.setState( {numero: numero} )
		})

		//verifica quando o usuario esta logado ou não
		const usuario = firebase.auth()

		usuario.onAuthStateChanged(
			(usuarioAtual) => {
				if (usuarioAtual) {
					alert("OK")
				} else {
					alert("NAO LOGADO")
				}
			}
		)
	}


	// salvarDados(){
	//
	// 	// let database = firebase.database()
	//
	// 	//comando para setar dados
	// 	// database.ref("pontuacao").set("100")
	//
	// 	//comando para remover dados
	// 	// database.ref("pontuacao").remove()
	//
	// 	// setar nó direto na variavel
	// 	let funcionarios = firebase.database().ref("funcionarios")
	//
	// 	//define o filho da referencia setada e aplica uma ação
	// 	// funcionarios.child("001").child("nome").set("Vinicius")
	//
	// 	// funcionarios.remove()
	//
	// 	//metodo push() é para adicionar um identificador UNICO
	// 	funcionarios.push().set({
	// 		nome: "Vinícius",
	// 		altura: "1,74",
	// 		peso: "64kg"
	// 	})
	// }
	//
	// listarDados(){
	// 	let pontuacao = firebase.database().ref("pontuacao")
	// 	pontuacao.on('value', (snapshot) => {
	// 		// alert( snapshot.val() )
	// 		let pontos = snapshot.val()
	// 		this.setState( {pontuacao: pontos} )
	// 	})
	// }

	//metodo para cadastrar usuario e exibir erro em um alert (caso haver)
	cadastrarUsuario(){
		let email = "teste@teste.com.br"
		let senha = "senha123"

		let usuario = firebase.auth()

		usuario.createUserWithEmailAndPassword(
			email,
			senha
		).catch((err) => {
			let mensagemErro = "erro"
			if (err.code == "auth/weak-password") {
				mensagemErro = "A senha precisa ter no mínimo 6 caracteres!"
			}
			alert(mensagemErro)
		})
	}

	verificarUsuarioLogado(){
		const usuario = firebase.auth()
		const usuarioAtual = usuario.currentUser

		if (usuarioAtual) {
			alert("OK")
		} else {
			alert("NAO LOGADO")
		}
	}

		// const usuarioAtual = usuario.currentUser
		//
		// if (usuarioAtual) {
		// 	alert("OK")
		// } else {
		// 	alert("NAO LOGADO")
		// }

		deslogarUsuario(){
			const usuario = firebase.auth()
			usuario.signOut()
		}

		logarUsuario(){
			let email = "teste@teste.com.br"
			let senha = "senha123"

			const usuario = firebase.auth()

			usuario.signInWithEmailAndPassword(
				email,
				senha
			).catch((err) => {
				let mensagemErro = ""
				// if (condition) {
				//
				// }
				alert(err.message)
			})
		}

		somarNumero(){
			//defino a variavel que sera meu objeto do db da tabela numero
			//declaro a variavel numeroatual para ser usada depois no listener
			let numero = firebase.database().ref("numero")
			let numeroAtual = 0;

			numero.on('value', (snapshot) => {numeroAtual = snapshot.val()})

			numero.set(numeroAtual += 1)
		}

		subtrairNumero(){
			//defino a variavel que sera meu objeto do db da tabela numero
			//declaro a variavel numeroatual para ser usada depois no listener
			let numero = firebase.database().ref("numero")
			let numeroAtual = 0;

			numero.on('value', (snapshot) => {numeroAtual = snapshot.val()})

			numero.set(numeroAtual -= 1)
		}

		render(){

		// let {pontuacao} = this.state;
		// <Text style={{fontSize: 30, alignSelf: 'center'}}>{pontuacao}</Text>
		return(
			<View>
			<Button
			onPress={() => this.cadastrarUsuario()}
			title="Cadastrar Usuário"
			color="#841584"
			acessibilityLabel="Cadastrar Usuário" />
			<Button
			onPress={() => this.verificarUsuarioLogado()}
			title="Verificar usuário logado"
			color="#841584"
			acessibilityLabel="Verificar usuário logado" />
			<Button
			onPress={() => this.deslogarUsuario()}
			title="Deslogar usuário"
			color="#841584"
			acessibilityLabel="Deslogar usuário" />
			<Button
			onPress={() => this.logarUsuario()}
			title="Logar usuário"
			color="#841584"
			acessibilityLabel="Logar usuário" />
			<Text style={styles.numero}>NÚMERO VISTO PELO LISTENER</Text>
			<Text style={[styles.numero, {fontSize: 40}]}>{this.state.numero}</Text>
			<Button
			onPress={() => this.somarNumero()}
			title="Somar"
			color="#841584"
			acessibilityLabel="Somar" />
			<Button
			onPress={() => this.subtrairNumero()}
			title="Subtrair"
			color="#841584"
			acessibilityLabel="Subtrair" />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	numero: {
		alignSelf: 'center',
		fontSize: 20
	}
})

AppRegistry.registerComponent('firebaseTeste', () => App);
