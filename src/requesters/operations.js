import firestore from '@react-native-firebase/firestore';
const Firestore = firestore();
const expenses = Firestore.collection('user_expenses');
const incomes = Firestore.collection('user_incomes');

export const createExpense = async (userId, values) => {
  return expenses.doc(userId).collection('expenses').add(values).then(res => {
    return res;
  }).catch(err => {
    console.log('Create Expense Error: ', err);
    return { error: err };
  });
};

export const updateExpense = async (docReference, values) => {
  return docReference.set(values, { merge: true }).then(res => {
    return res;
  }).catch(err => {
    console.log('Update Expense Error: ', err);
    return { error: err };
  });
};

export const deleteExpense = async (docReference) => {
  return docReference.delete().then(res => {
    return res;
  }).catch(err => {
    console.log('Delete Expense Error: ', err);
    return { error: err };
  });
};

export const getExpenses = async (userId) => {
  return expenses.doc(userId).collection('expenses').get().then(res => {
    return (res.docs || []).map(d => ({ ...d._data, reference: d.ref }));
  }).catch(err => {
    console.log('Get Expenses Error: ', err);
    return { error: err };
  });
};

export const createIncome = async (userId, values) => {
  return incomes.doc(userId).collection('incomes').add(values).then(res => {
    return res;
  }).catch(err => {
    console.log('Create Income Error: ', err);
    return { error: err };
  });
};

export const updateIncome = async (docReference, values) => {
  return docReference.set(values, { merge: true }).then(res => {
    return res;
  }).catch(err => {
    console.log('Update Income Error: ', err);
    return { error: err };
  });
};

export const deleteIncome = async (docReference) => {
  return docReference.delete().then(res => {
    return res;
  }).catch(err => {
    console.log('Delete Income Error: ', err);
    return { error: err };
  });
};

export const getIncomes = async (userId) => {
  return incomes.doc(userId).collection('incomes').get().then(res => {
    return (res.docs || []).map(d => ({ ...d._data, reference: d.ref }));
  }).catch(err => {
    console.log('Get Incomes Error: ', err);
    return { error: err };
  });
};