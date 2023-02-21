import 'package:flutter/material.dart';
import 'package:groccery_app/widgets/widget_home_categories.dart';
import 'package:groccery_app/widgets/widget_home_product.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        child: ListView(
          children: const [
            HomeCategoryWidget(),
            HomeProductWidget(),
          ],
        ),
      ),
    );
  }
}
