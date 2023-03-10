import 'package:flutter/material.dart';
import 'package:groccery_app/components/widget_custom_stepper.dart';
import 'package:groccery_app/config.dart';
import 'package:groccery_app/models/cart_product.dart';
import 'package:groccery_app/models/product.dart';

class CartItemWidget extends StatelessWidget {
  final CartProduct model;
  final Function? onQtyUpdate;
  final Function? onItemRemove;

  const CartItemWidget({
    super.key,
    required this.model,
    this.onQtyUpdate,
    this.onItemRemove,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      margin: const EdgeInsets.all(10),
      child: Container(
        height: 140,
        padding: const EdgeInsets.all(10),
        decoration: const BoxDecoration(
          color: Colors.white,
        ),
        child: cartItemUI(context),
      ),
    );
  }

  Widget cartItemUI(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(0, 10, 10, 5),
          child: Container(
            width: 100,
            alignment: Alignment.center,
            child: Image.network(
              model.product.productImagePath != ""
                  ? model.product.fullImagePath
                  : "",
              height: 100,
              fit: BoxFit.fill,
            ),
          ),
        ),
        SizedBox(
          width: 230,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                model.product.productName,
                style: const TextStyle(
                  color: Colors.black,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                "${Config.currency}${model.product.productPrice}",
                style: const TextStyle(
                  color: Colors.red,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  CustomStepper(
                    lowerLimit: 1,
                    upperLimit: 20,
                    stepValue: 1,
                    iconSize: 15.0,
                    value: model.qty.toInt(),
                    onChenged: (value) {
                      onQtyUpdate!(model, value["qty"], value["type"]);
                    },
                  ),
                  const SizedBox(height: 10),
                  Padding(
                    padding: const EdgeInsets.only(top: 8.0),
                    child: GestureDetector(
                      onTap: () {
                        onItemRemove!(model);
                      },
                      child: const Icon(
                        Icons.delete,
                        color: Colors.red,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }
}
