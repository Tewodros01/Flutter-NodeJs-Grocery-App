import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:groccery_app/components/product_card.dart';
import 'package:groccery_app/models/pagination.dart';
import 'package:groccery_app/models/product.dart';
import 'package:groccery_app/models/product_filter.dart';
import 'package:groccery_app/providers.dart';

class RelatedProductWidget extends ConsumerWidget {
  final List<String> relatedProducts;
  const RelatedProductWidget(this.relatedProducts, {Key? key})
      : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
      child: Column(
        children: [
          const Text(
            "Related Product",
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          Visibility(
            visible: relatedProducts.isNotEmpty,
            child: _productList(ref),
          )
        ],
      ),
    );
  }

  Widget _productList(WidgetRef ref) {
    print("relatedProducts =  ${relatedProducts}");
    final products = ref.watch(
      relatedProductsProvider(
        ProductFilterModel(
          paginationModel: PaginationModel(
            page: 1,
            pageSize: 10,
          ),
          productIds: relatedProducts,
        ),
      ),
    );
    return products.when(
      data: (list) {
        return _buildProductList(list!);
      },
      error: (_, __) => const Center(
        child: Text("Error"),
      ),
      loading: () => const Center(
        child: CircularProgressIndicator(),
      ),
    );
  }

  Widget _buildProductList(List<Product> product) {
    return Container(
      height: 200,
      alignment: Alignment.centerLeft,
      child: ListView.builder(
        shrinkWrap: true,
        physics: const ClampingScrollPhysics(),
        scrollDirection: Axis.horizontal,
        itemCount: product.length,
        itemBuilder: (context, index) {
          var data = product[index];
          return GestureDetector(
            onTap: () {},
            child: ProductCard(
              model: data,
            ),
          );
        },
      ),
    );
  }
}
