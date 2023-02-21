import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:groccery_app/components/product_card.dart';
import 'package:groccery_app/models/pagination.dart';
import 'package:groccery_app/models/product_filter.dart';
import 'package:groccery_app/models/product_sort.dart';
import 'package:groccery_app/providers.dart';

class ProducstPage extends StatefulWidget {
  const ProducstPage({super.key});

  @override
  State<ProducstPage> createState() => _ProducstPageState();
}

class _ProducstPageState extends State<ProducstPage> {
  String? categoryId;
  String? categroyName;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Product"),
      ),
      body: Container(
        color: Colors.grey[300],
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _ProductFilters(
              categoryId: categoryId,
              categoryName: categroyName,
            ),
            Flexible(
              flex: 1,
              child: _ProductList(),
            ),
          ],
        ),
      ),
    );
  }

  @override
  void didChangeDependencies() {
    final Map arguments = ModalRoute.of(context)!.settings.arguments as Map;
    categroyName = arguments['categoryName'];
    categoryId = arguments['categoryId'];
    super.didChangeDependencies();
  }
}

class _ProductFilters extends ConsumerWidget {
  final _sortByOptions = [
    ProductSortModel(value: "createdAt", lable: "Latest"),
    ProductSortModel(value: "-product_price", lable: "Price: High to Low"),
    ProductSortModel(value: "product_price", lable: "Price: Low to High"),
  ];
  final String? categoryName;
  final String? categoryId;
  _ProductFilters({this.categoryName, this.categoryId});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final filterProvider = ref.watch(productFilterProvider);
    return Container(
      height: 51,
      margin: const EdgeInsets.fromLTRB(10, 10, 10, 5),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Padding(
            padding: const EdgeInsets.all(8),
            child: Text(
              categoryName ?? "Not found",
              style: const TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 15,
              ),
            ),
          ),
          Container(
            decoration: BoxDecoration(
              color: Colors.grey[300],
            ),
            child: PopupMenuButton(
              onSelected: (sortBy) {
                ProductFilterModel filterModel = ProductFilterModel(
                  paginationModel: PaginationModel(page: 0, pageSize: 10),
                  categoryId: filterProvider.categoryId,
                  sortBy: sortBy.toString(),
                );
                ref
                    .read(productFilterProvider.notifier)
                    .setProductFilter(filterModel);
                ref.read(productsNotifierProvider.notifier).getProduct();
              },
              initialValue: filterProvider.sortBy,
              itemBuilder: (BuildContext context) {
                return _sortByOptions.map((item) {
                  return PopupMenuItem(
                    value: item.value,
                    child: InkWell(
                      child: Text(item.lable!),
                    ),
                  );
                }).toList();
              },
              icon: const Icon(Icons.filter_list_alt),
            ),
          )
        ],
      ),
    );
  }
}

class _ProductList extends ConsumerWidget {
  final ScrollController _scrollController = ScrollController();
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final productsState = ref.watch(productsNotifierProvider);
    _scrollController.addListener(() {
      if (_scrollController.position.pixels ==
          _scrollController.position.maxScrollExtent) {
        final productsViewModel = ref.read(productsNotifierProvider.notifier);
        final productsState = ref.watch(productsNotifierProvider);
        if (productsState.hasNext) {
          productsViewModel.getProduct();
        }
      }
    });
    if (productsState.products.isEmpty) {
      if (!productsState.hasNext && !productsState.isLoading) {
        return const Center(
          child: Text("No Products"),
        );
      }
      return const LinearProgressIndicator();
    }
    return RefreshIndicator(
      onRefresh: () async {
        ref.read(productsNotifierProvider.notifier).refreshProduct();
      },
      child: Column(
        children: [
          Flexible(
            child: GridView.count(
              crossAxisCount: 2,
              controller: _scrollController,
              children: List.generate(
                productsState.products.length,
                (index) {
                  return ProductCard(
                    model: productsState.products[index],
                  );
                },
              ),
            ),
          ),
          Visibility(
            visible:
                productsState.isLoading && productsState.products.isNotEmpty,
            child: const SizedBox(
              height: 35,
              width: 35,
              child: CircularProgressIndicator(),
            ),
          ),
        ],
      ),
    );
  }
}
