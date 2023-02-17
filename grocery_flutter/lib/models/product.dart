import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:groccery_app/config.dart';
import 'package:groccery_app/models/category.dart';

part 'product.freezed.dart';
part 'product.g.dart';

List<Product> productsFromJson(dynamic str) =>
    List<Product>.from((str).map((x) => Product.fromJson(x)));

@freezed
abstract class Product with _$Product {
  factory Product({
    required String product_id,
    required String product_name,
    required Category category,
    required String product_short_description,
    required String product_description,
    required double product_price,
    required double product_sale_price,
    required String product_image_path,
    required String product_SKU,
    required String product_type,
    required String stack_status,
  }) = _Product;
  factory Product.fromJson(Map<String, dynamic> json) =>
      _$ProductFromJson(json);
}

extension ProductExt on Product {
  String get fullImagePath => Config.imageURL + product_image_path;
  int get calculateDiscount {
    double disPercent = 0;

    if (!product_price.isNaN) {
      double regular_price = product_price;
      double sale_price =
          product_sale_price > 0 ? product_sale_price : regular_price;
      double discount = regular_price - sale_price;
      disPercent = (discount / regular_price) * 100;
    }
    return disPercent.round();
  }
}
