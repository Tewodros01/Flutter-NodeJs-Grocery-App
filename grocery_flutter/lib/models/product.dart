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
    required String productId,
    required String productName,
    required Category category,
    required String productShortDescription,
    required String productDescription,
    required double productPrice,
    required double productSalePrice,
    required String productImagePath,
    required String productSKU,
    required String productType,
    required String stackStatus,
  }) = _Product;
  factory Product.fromJson(Map<String, dynamic> json) =>
      _$ProductFromJson(json);
}

extension ProductExt on Product {
  String get fullImagePath => Config.imageURL + productImagePath;
  int get calculateDiscount {
    double disPercent = 0;

    if (!productPrice.isNaN) {
      double regularPrice = productPrice;
      double salePrice = productPrice > 0 ? productSalePrice : regularPrice;
      double discount = regularPrice - salePrice;
      disPercent = (discount / regularPrice) * 100;
    }
    return disPercent.round();
  }
}
