import 'package:freezed_annotation/freezed_annotation.dart';

part 'product_sort.freezed.dart';

@freezed
abstract class ProductSortModel with _$ProductSortModel {
  factory ProductSortModel({
    String? lable,
    String? value,
  }) = _ProductSortModel;
}
