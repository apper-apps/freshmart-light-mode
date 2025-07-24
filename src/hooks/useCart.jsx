import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { 
  addToCart as addToCartAction, 
  removeFromCart as removeFromCartAction, 
  updateQuantity as updateQuantityAction, 
  clearCart as clearCartAction,
  setLoading,
  selectCartItems,
  selectCartTotal,
  selectCartItemCount,
  selectCartLoading,
  selectIsProductInCart,
  selectProductQuantityInCart
} from '@/store/cartSlice';
export const useCart = () => {
  const dispatch = useDispatch();
  
  // Selectors
  const cart = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const cartCount = useSelector(selectCartItemCount);
  const isLoading = useSelector(selectCartLoading);

  // Actions with loading states
  const addToCart = (product) => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(addToCartAction(product));
      dispatch(setLoading(false));
    }, 200);
  };

  const removeFromCart = (productId) => {
    dispatch(removeFromCartAction(productId));
  };

  const updateQuantity = (productId, quantity) => {
    dispatch(updateQuantityAction({ productId, quantity }));
  };

  const clearCart = () => {
    dispatch(clearCartAction());
  };

  // Helper functions that use selectors
  const getCartTotal = () => cartTotal;
  const getCartCount = () => cartCount;
  const getCartItems = () => cart;
  
// Hook-based functions that must be called within React components
  const useIsProductInCart = (productId) => {
    return useSelector(selectIsProductInCart(productId));
  };
  
  const useProductQuantityInCart = (productId) => {
    return useSelector(selectProductQuantityInCart(productId));
  };

return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    getCartItems,
    useIsProductInCart,
    useProductQuantityInCart,
    isLoading
  };
};