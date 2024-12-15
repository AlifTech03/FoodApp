import { Alert } from 'react-native';
import { supabase } from './supabase';
import { initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native';

const fetchPayment = async (amount: number) => {
  const { data, error } = await supabase.functions.invoke('payment-sheet', {
    body: { amount },
  });
  if (data) {
    return data;
  }
  Alert.alert('There is no payment sheet');
  return {};
};

export const initialPayment = async (amount: number) => {
  const {paymentIntent, publishableKey, ephemeralKey, customer} = await fetchPayment(amount);
  if(!paymentIntent && !publishableKey) return;
  const { error } = await initPaymentSheet({
    merchantDisplayName: 'Example, Inc.',
    customerId: customer,
    customerEphemeralKeySecret: ephemeralKey,
    paymentIntentClientSecret: paymentIntent,
    defaultBillingDetails: {
      name: 'Jane Doe',
    },
  });
};


export const openPaymentSheet = async () => {
  const { error } = await presentPaymentSheet();

  if (error) {
    Alert.alert(`Error code: ${error.code}`, error.message);
		return false;
  } else {
    Alert.alert('Success', 'Your order is confirmed!');
		return true;
  }
};
