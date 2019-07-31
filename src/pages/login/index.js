import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { View, Input, Text, Container, Item, Footer, Icon, Button } from 'native-base';
import Colors from '../../utils/Colors';

export default class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = { login: '', password: '' };
  }

  login = () => {
    let { login, password } = this.state;
    // Alert.alert('Logando!', `Seu email é: ${login} \nE sua senha é: ${password}`);
  }

  forgotPassword = () => {
    this.props.navigation.push('ForgotPasswordEmail');
  }

  loginGoogle = () => {

  }

  loginFacebook = () => {

  }

  register = () => {
    this.props.navigation.push('RegisterLocation');
  }

  policy = () => {

  }

  render() {
    return(
      <Container style={style.container}>
        <Text style={style.cleanup}>CLEANUP</Text>
        <View style={style.content}>
          <Item style={style.borderTransparent}>
            <Input
              autoCorrect={false}
              selectionColor={Colors.white}
              placeholder={'E-mail'}
              placeholderTextColor={'#DADADA'}
              style={[style.input, style.login]}
              onChangeText={login => this.setState({login})}
              onEndEditing={() => this.refs['pass']._root.focus()}
              returnKeyType={'next'}
              />
          </Item>
          <Item style={style.borderTransparent}>
            <Input
              ref={'pass'}
              selectionColor={Colors.white}
              secureTextEntry={true}
              placeholder={'Senha'}
              placeholderTextColor={'#DADADA'}
              style={[style.input, style.password]}
              onChangeText={password => this.setState({password})}
              onEndEditing={this.onSingIn}
              returnKeyType={'go'}
              />
          </Item>
          <View style={style.buttonsView}>
            <View style={style.loginButtonView}>
              <TouchableOpacity onPress={this.login}>
                <Text style={style.loginButton}>Entrar</Text>
              </TouchableOpacity>
            </View>
            <View style={style.forgotPasswordView}>
              <TouchableOpacity onPress={this.forgotPassword}>
                <Text style={style.forgotPassword}>Esqueci a Senha</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button full iconLeft style={style.buttonGoogle} onPress={this.loginGoogle}>
            <Icon name='logo-google'/>
            <Text uppercase={false} style={style.buttonText}>Entrar com Google</Text>
          </Button>
          <Button full iconLeft style={style.buttonFB} onPress={this.loginFacebook}>
            <Icon name='logo-facebook'/>
            <Text uppercase={false} style={style.buttonText}>Entrar com Facebook</Text>
          </Button>
          <Text style={[style.cleanup, style.noAccount]}>Não possui conta?</Text>
          <TouchableOpacity onPress={this.register}>
            <Text style={[style.cleanup, style.register]}>Registrar Agora</Text>
          </TouchableOpacity>
          <Footer style={style.footer}>
            <TouchableOpacity onPress={this.policy}>
              <Text style={style.policy}>Política de Privacidade e Termos de Uso</Text>
            </TouchableOpacity>
          </Footer>
        </View>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGreen,
  },
  content: {
    flex: 1,
    marginHorizontal: 30,
  },
  cleanup: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
  },
  login: { marginTop: 130, },
  password: { marginTop: 10, },
  input: {
    color: Colors.white,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#2EAFB0',
    backgroundColor: '#34C3C5',
  },
  buttonsView: { flexDirection: 'row', marginTop: 8 },
  loginButtonView: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 3
  },
  loginButton: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.white
  },
  forgotPasswordView: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  forgotPassword: {
    fontSize: 18,
    color: Colors.white
  },
  button: {
    height: 55,
    marginTop: 30,
    elevation: 2,
    borderRadius: 5,
    backgroundColor: Colors.white,
  },
  buttonGoogle: {
    height: 55,
    marginTop: 30,
    elevation: 2,
    borderRadius: 5,
    backgroundColor: Colors.googleRed,
  },
  buttonFB: {
    height: 55,
    marginTop: 10,
    elevation: 2,
    borderRadius: 5,
    backgroundColor: Colors.fbBlue,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: 'bold',
    fontStyle: 'normal',
  },
  noAccount: { fontSize: 18, fontWeight: 'normal', marginTop: 45 },
  register: { fontSize: 18, marginTop: 6 },
  policy: { fontSize: 17, color: Colors.white, textAlign: 'center', justifyContent: 'flex-end' },
  footer: { backgroundColor: 'transparent', alignItems: 'flex-end' },
  borderTransparent: { borderColor: 'transparent' },
});