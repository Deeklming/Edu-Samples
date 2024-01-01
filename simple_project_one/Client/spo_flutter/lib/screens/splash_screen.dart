import 'dart:async';

import 'package:flutter/material.dart';

class SplashScreen extends StatefulWidget {
  SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  void moveScreen() {
    Navigator.of(context).pushReplacementNamed('/navi');
  }

  @override
  void initState() {
    super.initState();
    Timer(Duration(seconds: 2), () {
      moveScreen();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text("splash!!!"),
      ),
    );
  }
}
