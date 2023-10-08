import 'package:flutter/material.dart';
import 'package:book_list1/screens/list_screen.dart';
import 'package:book_list1/screens/detail_screen.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Book List APP',
      home: ListScreen(),
    );
  }
}
