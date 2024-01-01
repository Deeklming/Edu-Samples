import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:spo_flutter/models/counter_model.dart';
import 'package:spo_flutter/screens/navi_screen.dart';
import 'package:spo_flutter/screens/splash_screen.dart';
// import 'package:spms_flutter/screens/chatting_screen.dart';
// import 'package:spms_flutter/screens/setting_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        Provider(create: (context) => Counter(1)), //임시
      ],
      child: MaterialApp(
        theme: ThemeData(
          useMaterial3: true,
          brightness: Brightness.dark,
        ),
        initialRoute: '/',
        routes: {
          '/': (context) => SplashScreen(),
          '/navi': (context) => NaviScreen(),
          // '/chat': (context) => ChattingScreen(),
          // '/set': (context) => SettingScreen(),
        },
      ),
    );
  }
}
