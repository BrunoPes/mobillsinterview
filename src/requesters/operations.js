import firestore from '@react-native-firebase/firestore';
const Firestore = firestore();
const expenses = Firestore.collection('user_expenses');
// const incomes = Firestore.collection('incomes');

export const createExpense = (userId, values) => {
  expenses.doc(userId).collection('expenses').add(values).then(res => {
    console.log('CreateExpense Response: ', res);
  }).catch(err => {
    console.log('CreateExpense Error: ', err);
  });
};

export const updateExpense = (userId, expenseId, values) => {
  expenses.doc(userId).collection('expenses').doc(expenseId).set(values, { merge: true }).then(res => {
    console.log('UpdateExpense Response: ', res);
  }).catch(err => {
    console.log('UpdateExpense Error: ', err);
  });
};

export const getExpenses = async (userId) => {
  return expenses.doc(userId).collection('expenses').get().then(res => {
    return (res.docs || []).map(d => d._data);
  }).catch(err => {
    console.log('GetExpense Error: ', err);
    return err;
  });
};