import 'package:flutter/material.dart';
import 'package:spo_flutter/tabs/home_tab.dart';
import 'package:spo_flutter/tabs/news_search_tab.dart';
import 'package:spo_flutter/tabs/chatting_tab.dart';
import 'package:spo_flutter/tabs/setting_tab.dart';

class NaviScreen extends StatefulWidget {
  NaviScreen({super.key});

  @override
  State<NaviScreen> createState() => _NaviScreenState();
}

class _NaviScreenState extends State<NaviScreen> {
  int _currentIndex = 0;
  final List<Widget> _tabs = [
    HomeTab(),
    ChattingTab(),
    NewsSearchTab(),
    SettingTab(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        iconSize: 20,
        backgroundColor: Colors.grey.shade800,
        selectedItemColor: Colors.orange.shade700,
        unselectedItemColor: Colors.white60,
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home_rounded), label: '홈'),
          BottomNavigationBarItem(icon: Icon(Icons.chat_rounded), label: '채팅'),
          BottomNavigationBarItem(
              icon: Icon(Icons.newspaper_rounded), label: '뉴스'),
          BottomNavigationBarItem(
              icon: Icon(Icons.settings_rounded), label: '설정'),
        ],
      ),
      body: _tabs[_currentIndex],
    );
  }
}
