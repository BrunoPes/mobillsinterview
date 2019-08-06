import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Card, CardItem, Label, Spinner, Content, Left, Right, Text } from 'native-base';

import _ from 'lodash';
import moment from 'moment';
import masker from 'vanilla-masker';

const styles = StyleSheet.create({
  pageView: {
    flex: 1
  },
  content: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 19,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  income: { color: 'green' },
  expense: { color: 'red' },
});

class GeneralInfo extends Component {
  getSumIncomes = (incomes) => {
    const now = moment();
    const monthIncomes = incomes.filter(i => {
      return now.isSame(i.dateMoment, 'months');
    });
    return _.sumBy(monthIncomes, 'floatValue');
  }

  getSumExpenses = (expenses) => {
    const now = moment();
    const monthExpenses = expenses.filter(e => {
      return now.isSame(e.dateMoment, 'months');
    });
    return _.sumBy(monthExpenses, 'floatValue');
  }

  getBalance = (sumIncomes, sumExpenses) => {
    return sumIncomes - sumExpenses;
  }

  render() {
    const { incomes, expenses, loading } = this.props;
    const sumIncomes = this.getSumIncomes(incomes);
    const sumExpenses = this.getSumExpenses(expenses);
    const balance = this.getBalance(sumIncomes, sumExpenses);
    
    const showSumIncomes = masker.toMoney(sumIncomes.toFixed(2).replace('.', ''));
    const showSumExpenses = masker.toMoney(sumExpenses.toFixed(2).replace('.', ''));
    const showBalance = masker.toMoney(balance.toFixed(2).replace('.', ''));
    const colorBalance = styles[balance > 0 ? 'income' : 'expense'];
    const currentMonth = moment().format('MMMM/YYYY');
    return(
      <View style={styles.pageView}>
        {loading && <Spinner/>}
        {!loading &&
          <Content style={styles.content}>
            <Card>
              <CardItem header>
                <Left>
                  <Label style={styles.title}>Receitas</Label>
                </Left>
                <Right>
                  <Label style={styles.title}>{currentMonth}</Label>
                </Right>
              </CardItem>
              <CardItem>
                <Label style={[styles.label, styles.income]}>R$ {showSumIncomes}</Label>
              </CardItem>
            </Card>
            <Card>
              <CardItem header>
                <Left>
                  <Label style={styles.title}>Despesas</Label>
                </Left>
                <Right>
                  <Label style={styles.title}>{currentMonth}</Label>
                </Right>
              </CardItem>
              <CardItem>
                <Label style={[styles.label, styles.expense]}>R$ {showSumExpenses}</Label>
              </CardItem>
            </Card>
            <Card>
              <CardItem header>
                <Left>
                  <Label style={styles.title}>Saldo</Label>
                </Left>
                <Right>
                  <Label style={styles.title}>{currentMonth}</Label>
                </Right>
              </CardItem>
              <CardItem>
                <Label style={[styles.label, colorBalance]}>R$ {showBalance}</Label>
              </CardItem>
            </Card>
          </Content>
        }
      </View>
    );
  }
}

export default GeneralInfo;