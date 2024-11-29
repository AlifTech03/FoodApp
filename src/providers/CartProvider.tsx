import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { CartItem, PizzaSize, Product } from '../constants/types';
import { randomUUID } from 'expo-crypto';
import { useCreateOrderItem, userCreateOrder } from '../hooks/useOrders';
import { router } from 'expo-router';
import { Tables } from '../database.types';

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product, size: PizzaSize) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  checkOrder: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { mutate: insertOrder } = userCreateOrder();
  const { mutate: insertOrderItem } = useCreateOrderItem();

  const addToCart = (product: Product, size: PizzaSize) => {
    const exsitingItems = items.find((item) => item.product === product && item.size === size);

    if (exsitingItems) {
      updateQuantity(exsitingItems.id, 1);
      return;
    }
    const newItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };
    setItems([newItem, ...items]);
  };

  const total = items.reduce((sum, item) => (sum += item.quantity * item.product.price), 0);
  total.toFixed(2)
  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    setItems(
      items
        .map((item) =>
          item.id !== itemId
            ? item
            : {
                ...item,
                quantity: item.quantity + amount,
              }
        )
        .filter((item) => item.quantity > 0)
    );
  };
  const checkOrder = () => {
    insertOrder(
      {
        total,
      },
      {
        onSuccess: savedOrderItems,
      }
    );
  };

  const savedOrderItems = (order: Tables<'orders'>) => {
    const updateItems = items.map((cartItem) => ({
      order_id: order.id,
      product_id: cartItem.product_id,
      quantity: cartItem.quantity,
      size: cartItem.size,
    }));

    insertOrderItem(updateItems, {
      onSuccess: () => {
        setItems([]);
        router.push(`/(user)/orders/${order.id}`);
      },
    });
  };

  return (
    <CartContext.Provider value={{ items, addToCart, updateQuantity, checkOrder, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useAuth must be used within an CartProvider');
  return context;
};
