import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_stripe/flutter_stripe.dart';
import 'package:groccery_app/pages/dashboard_page.dart';
import 'package:groccery_app/pages/login_page.dart';
import 'package:groccery_app/pages/order_success.dart';
import 'package:groccery_app/pages/payment_page.dart';
import 'package:groccery_app/pages/product_details_page.dart';
import 'package:groccery_app/pages/product_page.dart';
import 'package:groccery_app/pages/register_page.dart';
import 'package:groccery_app/utils/shared_service.dart';

Widget _defoultHome = const LogInPage();
final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  bool result = await SharedService.isLoggedIn();
  if (result) {
    _defoultHome = const DashboardPage();
  }
  Stripe.publishableKey =
      "pk_test_51MfrXREloCBQ1gamUUfUqk9SXWlilx6Lm7HE7JPKBkpNsN8YEeNNgJz8DWg5lgY3rtfcM3jWlzjlUOo6LfhhE4k700Fo0HC4vY";
  await Stripe.instance.applySettings();
  //injecting provider inside our app
  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      //  home: const RegisterPage(),
      navigatorKey: navigatorKey,
      routes: <String, WidgetBuilder>{
        '/': (context) => _defoultHome,
        '/registore': (context) => const RegisterPage(),
        '/home': (context) => const DashboardPage(),
        '/login': (context) => const LogInPage(),
        '/products': (context) => const ProducstPage(),
        '/product-detail': (context) => const ProductDetailsPage(),
        '/payment': (context) => const PaymentPage(),
        '/order-success': (context) => const OrderSucces(),
      },
    );
  }
}
