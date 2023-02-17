import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:groccery_app/models/product_filter.dart';
import 'package:groccery_app/models/pagination.dart';

class ProductsFilterNotifier extends StateNotifier<ProductFilterModel> {
  ProductsFilterNotifier()
      : super(
          ProductFilterModel(
            paginationModel: PaginationModel(
              page: 0,
              pageSize: 10,
            ),
          ),
        );
  void setProductFilter(ProductFilterModel model) {
    state = model;
  }
}
