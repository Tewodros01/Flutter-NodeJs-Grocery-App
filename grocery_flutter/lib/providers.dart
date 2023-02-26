import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:groccery_app/api/api_service.dart';
import 'package:groccery_app/application/notifier/cart_notifier.dart';
import 'package:groccery_app/application/notifier/product_filter_notifier.dart';
import 'package:groccery_app/application/notifier/product_notifier.dart';
import 'package:groccery_app/application/state/cart_state.dart';
import 'package:groccery_app/application/state/product_state.dart';
import 'package:groccery_app/models/category.dart';
import 'package:groccery_app/models/pagination.dart';
import 'package:groccery_app/models/product.dart';
import 'package:groccery_app/models/product_filter.dart';
import 'package:groccery_app/models/slider.model.dart';

final categoryProvider =
    FutureProvider.family<List<Category>?, PaginationModel>(
  (ref, paginationModel) {
    final apiRepository = ref.watch(apiService);
    return apiRepository.getCategories(
      paginationModel.page,
      paginationModel.pageSize,
    );
  },
);

final homeProductProvider =
    FutureProvider.family<List<Product>?, ProductFilterModel>(
  (ref, productFilterModel) {
    final apiRepository = ref.watch(apiService);
    return apiRepository.getProducts(productFilterModel);
  },
);
final productFilterProvider =
    StateNotifierProvider<ProductsFilterNotifier, ProductFilterModel>(
  (ref) => ProductsFilterNotifier(),
);

final productsNotifierProvider =
    StateNotifierProvider<ProductsNotfier, ProductsState>(
  (ref) => ProductsNotfier(
    ref.watch(apiService),
    ref.watch(productFilterProvider),
  ),
);

final productDetailsProvider = FutureProvider.family<Product?, String>(
  (ref, productId) {
    final apiRepository = ref.watch(apiService);
    return apiRepository.getProductDetails(productId);
  },
);

final sliderProvider =
    FutureProvider.family<List<SliderModel>?, PaginationModel>(
        (ref, paginationModel) {
  //Returning apiclass
  final sliderRepo = ref.watch(apiService);
  return sliderRepo.getSliders(paginationModel.page, paginationModel.pageSize);
});

final relatedProductsProvider =
    FutureProvider.family<List<Product>?, ProductFilterModel>(
  (ref, productFilterModel) {
    final apiRepository = ref.watch(apiService);
    return apiRepository.getProducts(productFilterModel);
  },
);

final cartItemsProvider = StateNotifierProvider<CartNotifier, CartState>(
  (ref) => CartNotifier(ref.watch(apiService)),
);
