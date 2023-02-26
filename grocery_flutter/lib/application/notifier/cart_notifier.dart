import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:groccery_app/api/api_service.dart';
import 'package:groccery_app/application/state/cart_state.dart';
import 'package:groccery_app/models/cart_product.dart';

class CartNotifier extends StateNotifier<CartState> {
  final ApiService _apiService;
  CartNotifier(this._apiService) : super(const CartState()) {
    getCartItems();
  }
  Future<void> getCartItems() async {
    state = state.copyWith(isLoading: true);
    final cartData = await _apiService.getCart();
    state = state.copyWith(cartModel: cartData);
    state = state.copyWith(isLoading: false);
  }

  Future<void> addCartItem(productId, qty) async {
    await _apiService.addCartItem(productId, qty);
    await getCartItems();
  }

  Future<void> removeCartItem(productId, qty) async {
    await _apiService.removeCartItem(productId, qty);
    var isCartItemExit = state.cartModel!.products
        .firstWhere((element) => element.product.productId == productId);
    var updatedItem = state.cartModel!;
    updatedItem.products.remove(isCartItemExit);
    state = state.copyWith(cartModel: updatedItem);
  }

  Future<void> updateQty(productId, qty, type) async {
    var cartItem = state.cartModel!.products
        .firstWhere((element) => element.product.productId == productId);
    var updatedItem = state.cartModel!;
    if (type == "-") {
      await _apiService.removeCartItem(productId, 1);
      if (cartItem.qty > 1) {
        CartProduct cartProduct =
            CartProduct(qty: cartItem.qty - 1, product: cartItem.product);
        updatedItem.products.remove(cartItem);
        updatedItem.products.add(cartProduct);
      } else {
        updatedItem.products.remove(cartItem);
      }
    } else {
      await _apiService.addCartItem(productId, 1);
      CartProduct cartProduct =
          CartProduct(product: cartItem.product, qty: cartItem.qty + 1);
      updatedItem.products.remove(cartItem);
      updatedItem.products.add(cartProduct);
    }
    state = state.copyWith(cartModel: updatedItem);
  }
}
