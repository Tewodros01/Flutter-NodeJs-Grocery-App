import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:groccery_app/api/api_service.dart';
import 'package:groccery_app/application/state/product_state.dart';
import 'package:groccery_app/models/product_filter.dart';
import 'package:groccery_app/models/pagination.dart';

class ProductsNotfier extends StateNotifier<ProductsState> {
  final ApiService _apiService;
  final ProductFilterModel _filterModel;
  //ProductsNotifier that extends the ProductsState
  ProductsNotfier(this._apiService, this._filterModel)
      : super(const ProductsState());

  int _page = 1;

  Future<void> getProduct() async {
    if (state.isLoading || !state.hasNext) {
      return;
    }
    state = state.copyWith(isLoading: true);
    var filterModel = _filterModel.copyWith(
      paginationModel: PaginationModel(page: _page, pageSize: 10),
    );
    final product = await _apiService.getProducts(filterModel);
    final newProduct = [...state.products, ...product!];
    if (product.length % 10 != 0 || product.isEmpty) {
      state = state.copyWith(hasNext: false);
    }
    Future.delayed(const Duration(microseconds: 1500), () {
      state = state.copyWith(products: newProduct);
      _page++;
      state = state.copyWith(isLoading: false);
    });
  }

  Future<void> refreshProduct() async {
    state = state.copyWith(products: [], hasNext: true);
    _page = 1;
    await getProduct();
  }
}
