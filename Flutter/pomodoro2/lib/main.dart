import 'package:flutter/material.dart';
import 'package:pomodoro2/screens/timer_screen.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "pomodoro app",
      home: TimerScreen(),
    );
  }
}