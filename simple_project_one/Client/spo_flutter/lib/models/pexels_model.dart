import 'package:flutter/material.dart';

class PexelsModel extends ChangeNotifier {
  final int id;
  final String photographer, photo;

  PexelsModel.fromJson(Map<String, dynamic> json)
      : id = json['id'],
        photographer = json['photographer'],
        photo = json['photo'];
}
