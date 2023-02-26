import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:groccery_app/models/pagination.dart';

part 'product_filter.freezed.dart';

@freezed
abstract class ProductFilterModel with _$ProductFilterModel {
  factory ProductFilterModel({
    required PaginationModel paginationModel,
    String? categoryId,
    String? sortBy,
    List<String>? productIds,
  }) = _ProductFilterModel;
}
