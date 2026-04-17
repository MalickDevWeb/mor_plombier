import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image_url?: string;
    product_id: number;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    addItem: (product: any) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    getTotal: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            setOpen: (open) => set({ isOpen: open }),
            addItem: (product) => {
                const currentItems = get().items;
                const existingItem = currentItems.find(i => i.product_id === product.id);

                if (existingItem) {
                    set({
                        items: currentItems.map(i =>
                            i.product_id === product.id
                                ? { ...i, quantity: i.quantity + 1 }
                                : i
                        ),
                        isOpen: true // Auto open on add
                    });
                } else {
                    set({
                        items: [...currentItems, {
                            id: Date.now(), // Local unique ID
                            product_id: product.id,
                            name: product.name,
                            price: product.price,
                            quantity: 1,
                            image_url: product.image_url
                        }],
                        isOpen: true // Auto open on add
                    });
                }
            },
            removeItem: (productId) => set({
                items: get().items.filter(i => i.product_id !== productId)
            }),
            updateQuantity: (productId, quantity) => set({
                items: get().items.map(i =>
                    i.product_id === productId ? { ...i, quantity: Math.max(1, quantity) } : i
                )
            }),
            clearCart: () => set({ items: [] }),
            getTotal: () => get().items.reduce((acc, item) => acc + (item.price * item.quantity), 0),
        }),
        {
            name: 'mor-plomberie-cart',
        }
    )
);
