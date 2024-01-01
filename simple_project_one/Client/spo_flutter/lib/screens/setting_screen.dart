import 'package:flutter/material.dart';

class SettingScreen extends StatelessWidget {
  SettingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // backgroundColor: Colors.grey.shade800,
      body: Column(
        children: [
          SizedBox(
            height: 30,
          ),
          Text("setting"),
        ],
      ),
    );
  }
}
