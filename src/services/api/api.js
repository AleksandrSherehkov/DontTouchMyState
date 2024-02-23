import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://wallet.b.goit.study/api',
});

// Set token
export const setAuthHeader = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const clearAuthHeader = () => {
  instance.defaults.headers.common.Authorization = '';
};

// Get current user info
export const fetchCurrentUser = async () => {
  const { data } = await instance.get('/users/current');
  return data;
};

// Create new transaction for logged in user
export const addNewTransaction = async transaction => {
  const { data } = await instance.post('/transactions', transaction);
  return data;
};

// Get all transactions for logged in user
export const getTransaction = async () => {
  const { data } = await instance.get('/transactions');
  return data;
};

// Update transaction
export const updateTransaction = async ({ transactionId, transaction }) => {
  const { data } = await instance.patch(
    `/transactions/${transactionId}`,
    transaction
  );
  return data;
};

// Delete Transaction
export const deleteTransaction = async transactionId => {
  const { data } = await instance.delete(`/transactions/${transactionId}`);
  return data;
};

// Transaction Categories
export const fetchCategories = async () => {
  const { data } = await instance.get('/transaction-categories');
  return data;
};

// Auth Controller
// Sign up new user
export const signUp = async user => {
  const { data } = await instance.post('/auth/sign-up', user);
  setAuthHeader(data.token);
  return data;
};

// Sign in existing user
export const signIn = async user => {
  const { data } = await instance.post(`/auth/sign-in`, user);
  setAuthHeader(data.token);
  return data;
};

// Sign out existing user
export const signOut = () => {
  instance.delete('/auth/sign-out/');
  clearAuthHeader();
};

// Get transactions summary for period

export const fetchTransactionsSummary = async ({ year, month }) => {
  const { data } = await instance.get('/transactions-summary', {
    params: {
      year,
      month,
    },
  });
  return data;
};

export const fetchCurrencyRates = async () => {
  const lastRequestTime = localStorage.getItem('lastRequestTime');
  const currentTime = Date.now();

  if (lastRequestTime && currentTime - lastRequestTime < 3600000) {
    const dataFromStorage = localStorage.getItem('currencyData');
    if (dataFromStorage) {
      return JSON.parse(dataFromStorage);
    }
  }

  try {
    const response = await axios.get('https://api.monobank.ua/bank/currency');
    const data = response.data;

    localStorage.setItem('currencyData', JSON.stringify(data));
    localStorage.setItem('lastRequestTime', currentTime);

    return data;
  } catch (error) {
    return null;
  }
};
