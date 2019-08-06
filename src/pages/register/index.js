import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Container, Content, Form, Item, Label, Input, Button, Text } from 'native-base';
import Validator from 'validator';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchUserSignIn } from '../../redux/actions/auth';
import { register, updateUser } from '../../requesters/auth';
import Header from '../../components/Header';
import Loader from '../../components/Loader';

const styles = StyleSheet.create({
  content: { flex: 1 },
  form: { paddingRight: 20 },
  button: { marginHorizontal: 20, marginBottom: 20 },
});

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      saving: false,
    };
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  focusInput = (inputField) => () => {
    if(this[inputField]) {
      return this[inputField]._root.focus();
    }
  }

  onChangeText = (field) => (value) => {
    this.setState({ [field]: value });
  }

  validate = () => {
    const { name, email, password, confirmPassword } = this.state;
    let error = null;
    if(!name || !email || !password || !confirmPassword) {
      error = 'Por favor, preencha todos os campos!';
    } else if(!Validator.isEmail(email)) {
      error = 'O Email é inválido.';
    } else if(password.length < 6) {
      error = 'A Senha precisa ter no mínimo 6 caracteres.';
    } else if(confirmPassword.length < 6) {
      error = 'A Confirmação de Senha precisa ter no mínimo 6 caracteres.';
    } else if(password !== confirmPassword) {
      error = 'A Senha e a Confirmação devem ser iguais.';
    }

    if(error !== null) {
      Alert.alert('Validação', error);
      return false;
    }

    return true;
  }

  register = async () => {
    if(!this.validate()) return;

    const { name, email, password } = this.state;

    this.setState({ saving: true });
    register(email, password).then(res => {
      const { error } = res || {};
      if(error) {
        this.setState({ saving: false });
        return Alert.alert('Atenção', error);
      }

      updateUser({ displayName: name });
      return this.props.fetchUserSignIn(email, password).then(_ => {
        this.setState({ saving: false });
        this.props.navigation.navigate('Home');
      });
    });
  }

  render() {
    return(
      <Container>
        <Header title={'Cadastro'} onBack={this.goBack} icon={'close'}/>
        <Content style={styles.content}>
          <Form style={styles.form}>
            <Item floatingLabel>
              <Label>Nome</Label>
              <Input
                value={this.state.name}
                onChangeText={this.onChangeText('name')}
                onSubmitEditing={this.focusInput('emailRef')}
                returnKeyType={'next'}
              />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                getRef={ref => this.emailRef = ref}
                value={this.state.email}
                keyboardType={'email-address'}
                onChangeText={this.onChangeText('email')}
                onSubmitEditing={this.focusInput('passRef')}
                returnKeyType={'next'}
              />
            </Item>
            <Item floatingLabel>
              <Label>Senha</Label>
              <Input
                getRef={ref => this.passRef = ref}
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={this.onChangeText('password')}
                onSubmitEditing={this.focusInput('passConfirmRef')}
                returnKeyType={'next'}
              />
            </Item>
            <Item floatingLabel>
              <Label>Confirmação da Senha</Label>
              <Input
                getRef={ref => this.passConfirmRef = ref}
                secureTextEntry={true}
                value={this.state.confirmPassword}
                onChangeText={this.onChangeText('confirmPassword')}
                onSubmitEditing={this.register}
                returnKeyType={'done'}
              />
            </Item>
          </Form>
        </Content>
        <Button block onPress={this.register} style={styles.button}>
          <Text uppercase={false}>Cadastrar</Text>
        </Button>
        <Loader show={this.state.saving}/>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchUserSignIn
}, dispatch);

export default connect(null, mapDispatchToProps)(Register);