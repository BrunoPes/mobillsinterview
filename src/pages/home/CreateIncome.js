import React, { Component } from 'react';
import { Switch, StyleSheet, Alert, DatePickerAndroid } from 'react-native';
import { Container, Content, Form, Item, Label, Input, Button, Text, Right } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/pt-br';
import masker from 'vanilla-masker';

import { createIncome, updateIncome, deleteIncome } from '../../requesters/operations';
import Header from '../../components/Header';
import Loader from '../../components/Loader';

const styles = StyleSheet.create({
  content: { flex: 1 },
  form: { paddingRight: 20 },
  itemSwitch: { paddingTop: 30, paddingBottom: 1 },
  button: { marginHorizontal: 20, marginBottom: 20 },
});

class CreateIncome extends Component {
  constructor(props) {
    super(props);

    const income = props.navigation.getParam('income');
    this.state = {
      reference: income.reference || null,
      value: income && income.value ? masker.toMoney(income.value) : '',
      description: income.description || '',
      date: income && income.date ? moment(income.date).format('DD/MM/YYYY') : null,
      received: income.received || false,
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

  onChangeValue = (value) => {
    const money = masker.toMoney(value);
    this.setState({ value: money });
  }

  onChangeDescription = (value) => {
    this.setState({ description: value });
  }

  onChangeReceived = (received) => {
    this.setState({ received });
  }

  onChangeDate = async () => {
    const momentDate = moment(this.state.date, 'DD/MM/YYYY');
    const date = momentDate.isValid() ? new Date(momentDate) : new Date();
    const dateOptions = { date, mode: 'calendar' };

    return DatePickerAndroid.open(dateOptions).then(data => {
      const { action, year, month, day } = data;
      if(action === 'dateSetAction') {
        const setDate = moment(`${year}-${month + 1}-${day}`, 'YYYY-MM-DD').format('DD/MM/YYYY');
        this.setState({ date: setDate });
      }
    });
  }

  validate = () => {
    const { value, description, date } = this.state;
    let error = null;
    if(!value || !description || !date) {
      error = 'Por favor, preencha todos os campos!';
    } else if(value && parseFloat(value.replace(',', '.')) === 0) {
      error = 'O valor precisa ser maior do quê zero!';
    }

    if(error !== null) {
      Alert.alert('Validação', error);
      return false;
    }

    return true;
  }

  save = async () => {
    if(!this.validate()) return;

    const reload = this.props.navigation.getParam('reload', null);
    const { reference, value, description, date, received } = this.state;
    const values = {
      value: parseFloat(value.replace(/\./g, '').replace(',', '.')),
      description,
      received,
      date: moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
    };

    const operation = reference ? updateIncome(reference, values) : createIncome(this.props.userId, values);

    this.setState({ saving: true });
    operation.then(res => {
      this.setState({ saving: false });

      const { error } = res || {};
      if(error) return Alert.alert('Atenção', error);
      reload();
      return this.goBack();
    });
  }

  delete = () => {
    const { reference } = this.state;
    const reload = this.props.navigation.getParam('reload', null);
    if(reference) {
      this.setState({ saving: true });
      deleteIncome(reference).then(res => {
        this.setState({ saving: false });
  
        const { error } = res || {};
        if(error) return Alert.alert('Atenção', error);
        reload();
        return this.goBack();
      });
    }
  }

  render() {
    const isNew = this.state.reference === null;
    const title = isNew ? 'Nova Receita' : 'Atualizar Receita';
    const buttonTitle = isNew ? 'Registrar' : 'Atualizar';
    return(
      <Container>
        <Header title={title} onBack={this.goBack} icon={'close'}/>
        <Content style={styles.content}>
          <Form style={styles.form}>
            <Item floatingLabel>
              <Label>Valor</Label>
              <Input
                keyboardType={'decimal-pad'}
                value={this.state.value}
                onChangeText={this.onChangeValue}
                onSubmitEditing={this.focusInput('descriptionRef')}
                returnKeyType={'next'}
              />
            </Item>
            <Item floatingLabel>
              <Label>Descrição</Label>
              <Input
                getRef={ref => this.descriptionRef = ref}
                multiline
                value={this.state.description}
                onChangeText={this.onChangeDescription}
                returnKeyType={'next'}
              />
            </Item>
            <Item floatingLabel onPress={this.onChangeDate}>
              <Label>Data</Label>
              <Input disabled value={this.state.date}/>
            </Item>
            <Item onPress={this.onChangeDate} style={styles.itemSwitch}>
              <Label>Recebido</Label>
              <Right>
                <Switch value={this.state.received} onValueChange={this.onChangeReceived}/>
              </Right>
            </Item>
          </Form>
        </Content>
        <Button block onPress={this.save} style={styles.button}>
          <Text uppercase={false}>{buttonTitle}</Text>
        </Button>
        {!isNew &&
          <Button block danger onPress={this.delete} style={styles.button}>
            <Text uppercase={false}>Deletar</Text>
          </Button>
        }
        <Loader show={this.state.saving}/>
      </Container>
    );
  }
}

const mapStateToProps = ({auth}) => ({
  userId: auth.userId
});

export default connect(mapStateToProps)(CreateIncome);