import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:groccery_app/config.dart';

part 'category.freezed.dart';
part 'category.g.dart';

List<Category> categoriesFromJson(dynamic str) =>
    List<Category>.from((str).map((e) => Category.fromJson(e)));

@freezed
abstract class Category with _$Category {
  factory Category({
    required String categoryName,
    required String? categoryImagePath,
    required String categoryId,
  }) = _Category;

  factory Category.fromJson(Map<String, dynamic> json) =>
      _$CategoryFromJson(json);
}

extension CategoryExt on Category {
  String get fullImagePath => Config.imageURL + categoryImagePath!;
}
