import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { View, Input, Text, Container, Item, Button } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import validator from 'validator';

import Colors from '../../utils/Colors';
import Loader from '../../components/Loader';
import { login } from '../../requesters/auth';
import { fetchUserSignIn } from '../../redux/actions/auth';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    marginHorizontal: 30,
  },
  title: {
    color: Colors.black,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
  },
  login: { marginTop: 130, },
  password: { marginTop: 30, },
  input: {
    color: Colors.black,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: Colors.lightGrey4,
    backgroundColor: Colors.lightGrey2,
  },
  buttonsView: { flexDirection: 'row', marginTop: 8 },
  loginButtonView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  loginButton: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordView: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  forgotPassword: {
    fontSize: 18,
    color: Colors.black
  },
  button: {
    height: 55,
    marginTop: 30,
    elevation: 2,
    borderRadius: 5,
    backgroundColor: Colors.black,
  },
  noAccount: { fontSize: 18, fontWeight: 'normal', marginTop: 45 },
  register: { fontSize: 18, marginTop: 6 },
  borderTransparent: { borderColor: 'transparent' },
});

class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = { email: '', password: '', loading: false };
  }

  validate = () => {
    const { email, password } = this.state;

    let errorMsg = null;
    if(!email) {
      errorMsg = 'Por favor, preencha seu email de login!';
    } else if(!validator.isEmail(email)) {
      errorMsg = 'O email é inválido!';
    } else if(!password) {
      errorMsg = 'Por favor, preencha sua senha!';
    }
    if(errorMsg) Alert.alert('Atenção', errorMsg);

    return (errorMsg === null);
  }

  login = () => {
    if(!this.validate()) return;

    const { email, password } = this.state;
    this.setState({ loading: true });
    this.props.fetchUserSignIn(email, password).then(res => {
      this.setState({ loading: false });
      this.props.navigation.navigate('Home');
    }).catch(err => {
      this.setState({ loading: false });
      Alert.alert('Erro', err);
    });
  }

  register = () => {
    this.props.navigation.push('Register');
  }

  render() {
    return(
      <Container style={style.container}>
        <Text style={style.title}>Mobills</Text>
        <View style={style.content}>
          <Item style={style.borderTransparent}>
            <Input
              autoCorrect={false}
              placeholder={'Email'}
              placeholderTextColor={Colors.lightGrey3}
              style={[style.input, style.login]}
              value={this.state.email}
              onChangeText={email => this.setState({email})}
              onEndEditing={() => this.refs['pass']._root.focus()}
              returnKeyType={'next'}
              keyboardType={'email-address'}
              />
          </Item>
          <Item style={style.borderTransparent}>
            <Input
              ref={'pass'}
              secureTextEntry={true}
              placeholder={'Senha'}
              placeholderTextColor={Colors.lightGrey3}
              style={[style.input, style.password]}
              value={this.state.password}
              onChangeText={password => this.setState({password})}
              onEndEditing={this.login}
              returnKeyType={'go'}
              />
          </Item>
          <View style={style.buttonsView}>
            <View style={style.loginButtonView}>
              <Button onPress={this.login} block>
                <Text style={style.loginButton} uppercase={false}>Entrar</Text>
              </Button>
            </View>
          </View>
          <Text style={[style.title, style.noAccount]}>Não possui conta?</Text>
          <TouchableOpacity onPress={this.register}>
            <Text style={[style.title, style.register]}>Registrar Agora</Text>
          </TouchableOpacity>
        </View>
        <Loader show={this.state.loading}/>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUserSignIn
}, dispatch);

export default connect(null, mapDispatchToProps)(Login);