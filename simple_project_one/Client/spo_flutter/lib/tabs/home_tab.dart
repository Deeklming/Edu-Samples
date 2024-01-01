import 'package:flutter/material.dart';
import 'package:spo_flutter/models/pexels_model.dart';
import 'package:spo_flutter/services/api_service.dart';

class HomeTab extends StatelessWidget {
  HomeTab({super.key});

  final Future<List<PexelsModel>> pexels = ApiService.getPexelsImg();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FutureBuilder(
        future: pexels,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return ListView.separated(
              itemBuilder: (context, index) {
                var pexelsimg = snapshot.data![index];
                return Column(
                  children: [
                    Stack(
                      children: [
                        GestureDetector(
                          child: Hero(
                            tag: "${pexelsimg.id}",
                            child: Image.network(pexelsimg.photo),
                          ),
                          onTap: () {
                            Navigator.push(context,
                                MaterialPageRoute(builder: (_) {
                              return ExtendedImage(
                                  id: pexelsimg.id, url: pexelsimg.photo);
                            }));
                          },
                        ),
                        Positioned(
                          bottom: 20,
                          right: 20,
                          child: Text(
                            "${pexelsimg.photographer}",
                            style: TextStyle(
                              color: Colors.white70,
                              fontWeight: FontWeight.bold,
                              fontStyle: FontStyle.italic,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                );
              },
              separatorBuilder: (context, index) => const SizedBox(height: 1),
              itemCount: snapshot.data!.length,
            );
          } else if (snapshot.hasError) {
            return Center(
              child: Text("NO IMAGE"),
            );
          }
          return const Center(
            child: CircularProgressIndicator(),
          );
        },
      ),
    );
  }
}

class ExtendedImage extends StatelessWidget {
  int id;
  String url;
  ExtendedImage({required this.id, required this.url});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GestureDetector(
        child: Center(
          child: Hero(
            tag: "${id}",
            child: Image.network(url),
          ),
        ),
        onTap: () {
          Navigator.pop(context);
        },
      ),
    );
  }
}
