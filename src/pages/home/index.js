import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import {
  Spinner, Text, Container, Content, Fab, Card, CardItem, Body, Label, Left, Right, View, Icon, Button
} from 'native-base';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import masker from 'vanilla-masker';

import { fetchUserSignOut } from '../../redux/actions/auth';
import { getExpenses, getIncomes } from '../../requesters/operations';
import Loader from '../../components/Loader';
import Header from '../../components/Header';
import HomeTabs from '../../components/HomeTabs';
import GeneralInfo from './GeneralInfo';

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
      incomes: [],
      loadingExpenses: true,
      loadingIncomes: true,
      loadingLogout: false,
    };
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
    this.loadExpenses();
    this.loadIncomes();
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  logout = () => {
    this.setState({ loadingLogout: true });
    this.props.fetchUserSignOut().then(_ => {
      this.setState({ loadingLogout: false });
      this.props.navigation.navigate('Auth');
    }).catch(err => {
      console.log('Logout error: ', err);
      this.setState({ loadingLogout: false });
    });
  }

  loadExpenses = () => {
    this.setState({ loadingExpenses: true });
    getExpenses(this.props.userId).then(expenses => {
      const expensesWithMoment = expenses.map(e => ({
        ...e,
        value: e.value.toFixed(2).replace('.', ''),
        floatValue: e.value,
        dateMoment: moment(e.date)
      }));
      const expensesOrdered = _.orderBy(expensesWithMoment, 'dateMoment', 'desc');
      this.setState({
        expenses: expensesOrdered,
        loadingExpenses: false
      });
    }).catch(err => {
      this.setState({ loadingExpenses: false });
    });
  }

  loadIncomes = () => {
    this.setState({ loadingIncomes: true });
    getIncomes(this.props.userId).then(incomes => {
      const incomesWithMoment = incomes.map(e => ({
        ...e,
        value: e.value.toFixed(2).replace('.', ''),
        floatValue: e.value,
        dateMoment: moment(e.date)
      }));
      const incomesOrdered = _.orderBy(incomesWithMoment, 'dateMoment', 'desc');
      this.setState({
        incomes: incomesOrdered,
        loadingIncomes: false
      });
    }).catch(err => {
      this.setState({ loadingIncomes: false });
    });
  }

  createIncome = (item = null) => {
    this.props.navigation.push('CreateIncome', {
      reload: this.loadIncomes,
      income: item ? {...item, dateMoment: null} : {},
    });
  }

  createDespesa = (item = null) => {
    this.props.navigation.push('CreateExpense', {
      reload: this.loadExpenses,
      expense: item ? {...item, dateMoment: null} : {},
    });
  }

  renderItem = (isReceita = false) => (item, key) => {
    const { value, description, date, paid, received } = item;
    const fixedValue =  masker.toMoney(parseFloat(value));
    const formattedDate = moment(date).format('DD/MM/YYYY');
    const paidLabel = paid ? 'Pago' : 'Não foi pago';
    const receivedLabel = received ? 'Recebido' : 'Não recebido';
    const paymentLabel = isReceita ? receivedLabel : paidLabel;
    const update = () => {
      return isReceita ? this.createIncome(item) : this.createDespesa(item);
    };

    return (
      <TouchableOpacity key={key} onPress={update}>
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
              <Text style={styles.date}>{paymentLabel}</Text>
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }

  renderDespesasTab = () => {
    const { expenses, loadingExpenses } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Content style={styles.content}>
          {loadingExpenses && <Spinner/>}
          {!loadingExpenses && expenses.map(this.renderItem())}
        </Content>
        <Fab direction="up" position="bottomRight" onPress={this.createDespesa}>
          <Icon name="md-add" />
        </Fab>
      </View>
    );
  }

  renderReceitasTab = () => {
    const { incomes, loadingIncomes } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Content style={styles.content}>
          {loadingIncomes && <Spinner/>}
          {!loadingIncomes && incomes.map(this.renderItem(true))}
        </Content>
        <Fab direction="up" position="bottomRight" onPress={this.createIncome}>
          <Icon name="md-add" />
        </Fab>
      </View>
    );
  }

  renderGenerailInfoTab = () => {
    const { incomes, expenses, loadingIncomes, loadingExpenses } = this.state;
    return (
      <GeneralInfo
        incomes={incomes}
        expenses={expenses}
        loading={loadingIncomes || loadingExpenses}
      />
    )
  }

  renderLogoutButton = () => {
    return (
      <Button transparent onPress={this.logout}>
        <Icon name={'md-exit'}/>
      </Button>
    );
  }

  render() {
    return (
      <Container>
        <Header
          title={'Home'}
          right={this.renderLogoutButton()}
          onBack={null}
          hasTabs
        />
        <HomeTabs
          generalInfoTab={this.renderGenerailInfoTab()}
          despesasTab={this.renderDespesasTab()}
          receitasTab={this.renderReceitasTab()}
        />
        <Loader show={this.state.loadingLogout}/>
      </Container>
    );
  }
}

const mapStateToProps = ({auth}) => ({
  userId: auth.userId,
  name: auth.name,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchUserSignOut
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);