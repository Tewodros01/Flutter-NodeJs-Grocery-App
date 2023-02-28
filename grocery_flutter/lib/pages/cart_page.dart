import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:groccery_app/config.dart';
import 'package:groccery_app/models/cart.dart';
import 'package:groccery_app/models/cart_product.dart';
import 'package:groccery_app/providers.dart';
import 'package:groccery_app/widgets/widget_cart_item.dart';

class CartPage extends ConsumerStatefulWidget {
  const CartPage({super.key});

  @override
  ConsumerState<CartPage> createState() => _CartPageState();
}

class _CartPageState extends ConsumerState<CartPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Cart"),
      ),
      body: Container(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Flexible(
              flex: 1,
              child: _cartList(ref),
            )
          ],
        ),
      ),
      bottomNavigationBar: const _CheckoutBottomNavbar(),
    );
  }

  Widget _buildCartItem(List<CartProduct> cartProduct, WidgetRef ref) {
    return ListView.builder(
      shrinkWrap: true,
      physics: const ClampingScrollPhysics(),
      scrollDirection: Axis.vertical,
      itemCount: cartProduct.length,
      itemBuilder: (context, index) {
        return CartItemWidget(
          model: cartProduct[index],
          onQtyUpdate: (CartProduct model, qty, type) {
            final cartViewModel = ref.read(cartItemsProvider.notifier);
            cartViewModel.updateQty(model.product.productId, qty, type);
          },
          onItemRemove: (CartProduct model) {
            final cartItemView = ref.read(cartItemsProvider.notifier);
            cartItemView.removeCartItem(model.product.productId, model.qty);
          },
        );
      },
    );
  }

  Widget _cartList(WidgetRef ref) {
    //geting data from provider
    final cartState = ref.watch(cartItemsProvider);
    if (cartState.cartModel == null) {
      return const LinearProgressIndicator();
    }
    if (cartState.cartModel!.products.isEmpty) {
      return const Center(
        child: Text(' Empty Cart '),
      );
    }
    return _buildCartItem(cartState.cartModel!.products, ref);
  }
}

class _CheckoutBottomNavbar extends ConsumerWidget {
  const _CheckoutBottomNavbar({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final cartProvieder = ref.watch(cartItemsProvider);
    if (cartProvieder.cartModel != null) {
      return cartProvieder.cartModel!.products.isNotEmpty
          ? Container(
              child: Container(
                height: 50,
                decoration: BoxDecoration(
                  color: Colors.green,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(8),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        "Total: ${Config.currency}${cartProvieder.cartModel!.grandTotal.toString()}",
                        style: const TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      GestureDetector(
                        onTap: () {
                          Navigator.of(context).pushNamed("/payment");
                        },
                        child: const Text(
                          "Proceed to Checkout0",
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 15,
                          ),
                        ),
                      )
                    ],
                  ),
                ),
              ),
            )
          : const SizedBox();
    }
    return Container();
  }
}
