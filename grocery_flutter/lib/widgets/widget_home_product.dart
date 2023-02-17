import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:groccery_app/components/product_card.dart';
import 'package:groccery_app/models/pagination.dart';
import 'package:groccery_app/models/product.dart';
import 'package:groccery_app/models/product_filter.dart';
import 'package:groccery_app/providers.dart';

class HomeProductWidget extends ConsumerWidget {
  const HomeProductWidget({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
      color: const Color(0XffF4F7FA),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              Text(
                "Top 10 Products",
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
            ],
          ),
          Padding(
            padding: const EdgeInsets.all(5.0),
            child: _productList(ref),
          ),
        ],
      ),
    );
  }

  Widget _productList(WidgetRef ref) {
    final product = ref.watch(
      homeProductProvider(
        ProductFilterModel(
          paginationModel: PaginationModel(page: 1, pageSize: 10),
        ),
      ),
    );
    return product.when(
        data: (list) {
          return _buildProductList(list!);
        },
        error: (_, __) {
          return const Center(
            child: Text("Error"),
          );
        },
        loading: () => const Center(child: CircularProgressIndicator()));
  }

  Widget _buildProductList(List<Product> products) {
    return Container(
      height: 200,
      alignment: Alignment.centerLeft,
      child: ListView.builder(
        physics: const ClampingScrollPhysics(),
        scrollDirection: Axis.horizontal,
        itemCount: products.length,
        itemBuilder: (context, index) {
          var data = products[index];
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
