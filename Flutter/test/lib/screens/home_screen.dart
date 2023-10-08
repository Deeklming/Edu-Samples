import 'package:flutter/material.dart';
import 'package:test/models/webtoon_model.dart';
import 'package:test/services/api_service.dart';
import 'package:test/widgets/webtoon_widget.dart';

class HomeScreen extends StatelessWidget {
  HomeScreen({super.key});

  final Future<List<WebtoonModel>> webtons = ApiService.getTodaysToons();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade800,
      appBar: AppBar(
        title: const Text(
          "Today's 툰's",
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.w400,
          ),
        ),
        backgroundColor: Colors.black87,
        foregroundColor: Colors.white,
        elevation: 2,
      ),
      body: FutureBuilder(
        future: webtons,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return Column(
              children: [
                const SizedBox(
                  height: 50,
                ),
                Expanded(child: makeList(snapshot)),
              ],
            );
          }
          return const Center(
            child: CircularProgressIndicator(),
          );
        },
      ),
    );
  }

  ListView makeList(AsyncSnapshot<List<WebtoonModel>> snapshot) {
    return ListView.separated(
      scrollDirection: Axis.horizontal,
      padding: const EdgeInsets.symmetric(
        vertical: 10,
        horizontal: 20,
      ),
      itemCount: snapshot.data!.length,
      itemBuilder: (context, index) {
        // print(index);
        var webtoonn = snapshot.data![index];
        return WebtoonWidget(
            title: webtoonn.title, thumb: webtoonn.thumb, id: webtoonn.id);
      },
      separatorBuilder: (context, index) => const SizedBox(
        width: 20,
      ),
    );
  }
}
