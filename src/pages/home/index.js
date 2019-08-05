import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Spinner, Text, Button, Container, Content, Card, CardItem, Body, Label, Left, Right, View } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment';

import { createExpense, getExpenses } from '../../requesters/operations';
import Header from '../../components/Header';

const badgeSize = 5;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 10,
  },
  body: { flexDirection: 'row' },
  left: { flex: 0.7 },
  right: { flex: 0.3, alignSelf:  'flex-start', },
  labelValue: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  footer: { marginTop: 0, paddingTop: 0 },
  date: { fontSize: 13, color: '#666' },
  button: {
    marginBottom: 20,
    marginHorizontal: 20,
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
      loading: true,
    };
  }

  componentDidMount() {
    console.log('USER ID: ', this.props.userId, this.props.name);
    getExpenses(this.props.userId).then(expenses => {
      this.setState({ expenses, loading: false });
    }).catch(err => {
      this.setState({ loading: false });
    });
  }

  createDespesa = () => {
    const values = {
      value: 39.83,
      description: 'Burger King - Combo mega stacker',
      date: moment().format('YYYY-MM-DD HH:mm:ss'),
      paid: true,
    };
    createExpense(this.props.userId, values);
  }

  renderItem = (item, key) => {
    const { value, description, date, paid } = item;
    const fixedValue = parseFloat(value).toFixed(2).replace('.', ',');
    const formattedDate = moment(date).format('DD/MM/YYYY');
    const paidLabel = paid ? 'Pago' : 'Não foi pago';
    return (
      <Card key={key}>
        <CardItem>
          <Body style={styles.body}>
            <Left style={styles.left}>
              <Label>{description}</Label>
            </Left>
            <Right style={styles.right}>
              <Label style={styles.labelValue}>R$ {fixedValue}</Label>
            </Right>
          </Body>
        </CardItem>
        <CardItem footer style={styles.footer}>
          <Left>
            <Text style={[styles.date, { marginLeft: 0 }]}>{formattedDate}</Text>
          </Left>
          <Right>
            <Text style={styles.date}>{paidLabel}</Text>
          </Right>
        </CardItem>
      </Card>
    );
  }

  render() {
    const { expenses, loading } = this.state;
    return (
      <Container>
        <Header title={'Home'} onBack={null}/>
        <Content style={styles.content}>
          {loading && <Spinner/>}
          {!loading && expenses.map(this.renderItem)}
        </Content>
        <Button block style={styles.button} onPress={this.createDespesa}>
          <Text uppercase={false}>Criar Despesa</Text>
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = ({auth}) => ({
  userId: auth.userId,
  name: auth.name,
});

export default connect(mapStateToProps)(Home);