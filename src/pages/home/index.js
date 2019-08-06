import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Spinner, Text, Container, Content, Fab, Card, CardItem, Body, Label, Left, Right, View, Icon } from 'native-base';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import masker from 'vanilla-masker';

import { createExpense, getExpenses } from '../../requesters/operations';
import Header from '../../components/Header';
import HomeTabs from '../../components/HomeTabs';

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 10,
  },
  body: { flexDirection: 'row' },
  left: { flex: 0.60 },
  right: { flex: 0.40, alignSelf:  'flex-start', },
  labelValue: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  footer: { marginTop: 0, paddingTop: 0 },
  date: { fontSize: 13, color: '#666' },
  button: {
    marginTop: 10,
    marginBottom: 20,
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
    this.loadExpenses();
  }

  loadExpenses = () => {
    this.setState({ loading: true });
    getExpenses(this.props.userId).then(expenses => {
      const expensesWithMoment = expenses.map(e => ({ ...e, dateMoment: moment(e.date) }));
      const expensesOrdered = _.orderBy(expensesWithMoment, 'dateMoment', 'desc');
      this.setState({
        expenses: expensesOrdered,
        loading: false
      });
    }).catch(err => {
      this.setState({ loading: false });
    });
  }

  createDespesa = (item = null) => {
    this.props.navigation.push('CreateExpense', {
      reload: this.loadExpenses,
      expense: item ? {...item, dateMoment: null} : {},
    });
  }

  renderItem = (item, key) => {
    const { value, description, date, paid } = item;
    const fixedValue =  masker.toMoney(parseFloat(value));
    const formattedDate = moment(date).format('DD/MM/YYYY');
    const paidLabel = paid ? 'Pago' : 'Não foi pago';
    return (
      <TouchableOpacity key={key} onPress={() => this.createDespesa(item)}>
        <Card>
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
      </TouchableOpacity>
    );
  }

  renderDespesasTab = () => {
    const { expenses, loading } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Content style={styles.content}>
          {loading && <Spinner/>}
          {!loading && expenses.map(this.renderItem)}
        </Content>
        <Fab direction="up" position="bottomRight" onPress={this.createDespesa}>
          <Icon name="md-add" />
        </Fab>
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Header title={'Home'} onBack={null} hasTabs={true}/>
        <HomeTabs despesasTab={this.renderDespesasTab()}/>
      </Container>
    );
  }
}

const mapStateToProps = ({auth}) => ({
  userId: auth.userId,
  name: auth.name,
});

export default connect(mapStateToProps)(Home);