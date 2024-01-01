import 'package:http/http.dart' as http;
import 'package:spo_flutter/models/pexels_model.dart';
import 'dart:convert';

class ApiService {
  static const String baseUrl = "http://localhost:8000";

  static Future<List<PexelsModel>> getPexelsImg() async {
    List<PexelsModel> pexelsInstances = [];
    final url = Uri.parse("$baseUrl/pexels");
    final res = await http.get(url);
    if (res.statusCode == 200) {
      final List<dynamic> pexels = jsonDecode(res.body);
      for (var imgs in pexels) {
        pexelsInstances.add(PexelsModel.fromJson(imgs));
      }
      return pexelsInstances;
    }
    throw Error();
  }
}
