import 'package:flutter/material.dart';
import 'package:groccery_app/config.dart';
import 'package:groccery_app/models/product.dart';

class ProductCard extends StatelessWidget {
  final Product? model;
  const ProductCard({super.key, this.model});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 150,
      margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: const BoxDecoration(
        color: Colors.white,
      ),
      child: Stack(
        children: [
          Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Visibility(
                visible: model!.calculateDiscount > 0,
                child: Align(
                  alignment: Alignment.topLeft,
                  child: Container(
                    padding: const EdgeInsets.all(5),
                    decoration: const BoxDecoration(
                      color: Colors.green,
                    ),
                    child: Text(
                      "${model!.calculateDiscount}% OFF",
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ),
              ),
              SizedBox(
                height: 100,
                width: MediaQuery.of(context).size.width,
                child: Image.network(
                  model!.fullImagePath,
                  fit: BoxFit.cover,
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 8, left: 10),
                child: Text(
                  model!.product_name,
                  textAlign: TextAlign.left,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontSize: 13,
                    color: Colors.black,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Flexible(
                    child: Row(
                      children: [
                        Text(
                          "${Config.currency}${model!.product_price.toString()}",
                          textAlign: TextAlign.left,
                          style: TextStyle(
                            fontSize: 12,
                            color: model!.calculateDiscount > 0
                                ? Colors.red
                                : Colors.black,
                            fontWeight: FontWeight.bold,
                            decoration: model!.product_sale_price > 0
                                ? TextDecoration.lineThrough
                                : null,
                          ),
                        ),
                        Text(
                          model!.calculateDiscount > 0
                              ? " ${model!.product_sale_price.toString()}"
                              : "",
                          textAlign: TextAlign.left,
                          style: const TextStyle(
                            fontSize: 12,
                            color: Colors.black,
                            fontWeight: FontWeight.bold,
                          ),
                        )
                      ],
                    ),
                  ),
                  GestureDetector(
                    onTap: () {},
                    child: const Icon(
                      Icons.favorite,
                      color: Colors.grey,
                      size: 20,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }
}
