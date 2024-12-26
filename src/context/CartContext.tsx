"use client"

import { createContext, useContext, useReducer, ReactNode } from "react";

// Definisikan tipe item yang akan masuk ke keranjang
type CartItem = {
	id: string;
	name: string;
	price: number;
	quantity: number;
};

// Definisikan tipe state dan action untuk reducer
type CartState = {
	items: CartItem[];
};

type CartAction =
	| { type: "ADD_ITEM"; item: CartItem }
	| { type: "REMOVE_ITEM"; id: string }
	| { type: "CLEAR_CART" };

// Buat fungsi reducer untuk menangani state cart
const cartReducer = (state: CartState, action: CartAction): CartState => {
	switch (action.type) {
		case "ADD_ITEM":
			const existingItem = state.items.find((item) => item.id === action.item.id);
			if (existingItem) {
				return {
					...state,
					items: state.items.map((item) =>
						item.id === action.item.id
							? { ...item, quantity: item.quantity + action.item.quantity }
							: item
					),
				};
			}
			return { ...state, items: [...state.items, action.item] };

		case "REMOVE_ITEM":
			return { ...state, items: state.items.filter((item) => item.id !== action.id) };

		case "CLEAR_CART":
			return { ...state, items: [] };

		default:
			return state;
	}
};

// Buat context
const CartContext = createContext<{
	state: CartState;
	dispatch: React.Dispatch<CartAction>;
}>({
	state: { items: [] },
	dispatch: () => null,
});

// Buat provider untuk membungkus aplikasi
export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(cartReducer, { items: [] });

	return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

// Buat custom hook untuk menggunakan context
export const useCart = () => useContext(CartContext);
