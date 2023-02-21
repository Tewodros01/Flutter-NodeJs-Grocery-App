import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:groccery_app/pages/dashboard_page.dart';
import 'package:groccery_app/pages/login_page.dart';
import 'package:groccery_app/pages/product_page.dart';
import 'package:groccery_app/pages/register_page.dart';
import 'package:groccery_app/utils/shared_service.dart';

Widget _defoultHome = const LogInPage();

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  bool result = await SharedService.isLoggedIn();
  if (result) {
    _defoultHome = const DashboardPage();
  }
  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      //  home: const RegisterPage(),
      routes: <String, WidgetBuilder>{
        '/': (context) => _defoultHome,
        '/registore': (BuildContext context) => const RegisterPage(),
        '/home': (BuildContext context) => const DashboardPage(),
        '/login': (BuildContext context) => const LogInPage(),
        '/products': (BuildContext context) => const ProducstPage(),
      },
    );
  }
}
