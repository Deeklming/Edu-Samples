import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:provider5/models/cart.dart';
// import 'package:provider5/models/item.dart';
import 'package:provider5/repositories/item_list.dart';
import 'package:provider5/screens/screen_cart.dart';
import 'package:provider5/screens/screen_item.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => Cart()),
        Provider(create: (_)=> ItemList()),
      ],
      builder: (context, child) {
        return MaterialApp(
          title: 'Flutter Provider App',
          initialRoute: '/',
          routes: {
            '/': (context) => ItemScreen(),
            '/cart': (context) => CartScreen(),
          },
        );
      },
    );
  }
}
