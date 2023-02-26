// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'product.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

Product _$ProductFromJson(Map<String, dynamic> json) {
  return _Product.fromJson(json);
}

/// @nodoc
mixin _$Product {
  String get productId => throw _privateConstructorUsedError;
  String get productName => throw _privateConstructorUsedError;
  Category get category => throw _privateConstructorUsedError;
  String? get productShortDescription => throw _privateConstructorUsedError;
  String? get productDescription => throw _privateConstructorUsedError;
  double get productPrice => throw _privateConstructorUsedError;
  double get productSalePrice => throw _privateConstructorUsedError;
  String get productImagePath => throw _privateConstructorUsedError;
  String? get productSKU => throw _privateConstructorUsedError;
  String? get productType => throw _privateConstructorUsedError;
  String? get stackStatus => throw _privateConstructorUsedError;
  List<String>? get relatedProducts => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $ProductCopyWith<Product> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ProductCopyWith<$Res> {
  factory $ProductCopyWith(Product value, $Res Function(Product) then) =
      _$ProductCopyWithImpl<$Res, Product>;
  @useResult
  $Res call(
      {String productId,
      String productName,
      Category category,
      String? productShortDescription,
      String? productDescription,
      double productPrice,
      double productSalePrice,
      String productImagePath,
      String? productSKU,
      String? productType,
      String? stackStatus,
      List<String>? relatedProducts});

  $CategoryCopyWith<$Res> get category;
}

/// @nodoc
class _$ProductCopyWithImpl<$Res, $Val extends Product>
    implements $ProductCopyWith<$Res> {
  _$ProductCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? productId = null,
    Object? productName = null,
    Object? category = null,
    Object? productShortDescription = freezed,
    Object? productDescription = freezed,
    Object? productPrice = null,
    Object? productSalePrice = null,
    Object? productImagePath = null,
    Object? productSKU = freezed,
    Object? productType = freezed,
    Object? stackStatus = freezed,
    Object? relatedProducts = freezed,
  }) {
    return _then(_value.copyWith(
      productId: null == productId
          ? _value.productId
          : productId // ignore: cast_nullable_to_non_nullable
              as String,
      productName: null == productName
          ? _value.productName
          : productName // ignore: cast_nullable_to_non_nullable
              as String,
      category: null == category
          ? _value.category
          : category // ignore: cast_nullable_to_non_nullable
              as Category,
      productShortDescription: freezed == productShortDescription
          ? _value.productShortDescription
          : productShortDescription // ignore: cast_nullable_to_non_nullable
              as String?,
      productDescription: freezed == productDescription
          ? _value.productDescription
          : productDescription // ignore: cast_nullable_to_non_nullable
              as String?,
      productPrice: null == productPrice
          ? _value.productPrice
          : productPrice // ignore: cast_nullable_to_non_nullable
              as double,
      productSalePrice: null == productSalePrice
          ? _value.productSalePrice
          : productSalePrice // ignore: cast_nullable_to_non_nullable
              as double,
      productImagePath: null == productImagePath
          ? _value.productImagePath
          : productImagePath // ignore: cast_nullable_to_non_nullable
              as String,
      productSKU: freezed == productSKU
          ? _value.productSKU
          : productSKU // ignore: cast_nullable_to_non_nullable
              as String?,
      productType: freezed == productType
          ? _value.productType
          : productType // ignore: cast_nullable_to_non_nullable
              as String?,
      stackStatus: freezed == stackStatus
          ? _value.stackStatus
          : stackStatus // ignore: cast_nullable_to_non_nullable
              as String?,
      relatedProducts: freezed == relatedProducts
          ? _value.relatedProducts
          : relatedProducts // ignore: cast_nullable_to_non_nullable
              as List<String>?,
    ) as $Val);
  }

  @override
  @pragma('vm:prefer-inline')
  $CategoryCopyWith<$Res> get category {
    return $CategoryCopyWith<$Res>(_value.category, (value) {
      return _then(_value.copyWith(category: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$_ProductCopyWith<$Res> implements $ProductCopyWith<$Res> {
  factory _$$_ProductCopyWith(
          _$_Product value, $Res Function(_$_Product) then) =
      __$$_ProductCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String productId,
      String productName,
      Category category,
      String? productShortDescription,
      String? productDescription,
      double productPrice,
      double productSalePrice,
      String productImagePath,
      String? productSKU,
      String? productType,
      String? stackStatus,
      List<String>? relatedProducts});

  @override
  $CategoryCopyWith<$Res> get category;
}

/// @nodoc
class __$$_ProductCopyWithImpl<$Res>
    extends _$ProductCopyWithImpl<$Res, _$_Product>
    implements _$$_ProductCopyWith<$Res> {
  __$$_ProductCopyWithImpl(_$_Product _value, $Res Function(_$_Product) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? productId = null,
    Object? productName = null,
    Object? category = null,
    Object? productShortDescription = freezed,
    Object? productDescription = freezed,
    Object? productPrice = null,
    Object? productSalePrice = null,
    Object? productImagePath = null,
    Object? productSKU = freezed,
    Object? productType = freezed,
    Object? stackStatus = freezed,
    Object? relatedProducts = freezed,
  }) {
    return _then(_$_Product(
      productId: null == productId
          ? _value.productId
          : productId // ignore: cast_nullable_to_non_nullable
              as String,
      productName: null == productName
          ? _value.productName
          : productName // ignore: cast_nullable_to_non_nullable
              as String,
      category: null == category
          ? _value.category
          : category // ignore: cast_nullable_to_non_nullable
              as Category,
      productShortDescription: freezed == productShortDescription
          ? _value.productShortDescription
          : productShortDescription // ignore: cast_nullable_to_non_nullable
              as String?,
      productDescription: freezed == productDescription
          ? _value.productDescription
          : productDescription // ignore: cast_nullable_to_non_nullable
              as String?,
      productPrice: null == productPrice
          ? _value.productPrice
          : productPrice // ignore: cast_nullable_to_non_nullable
              as double,
      productSalePrice: null == productSalePrice
          ? _value.productSalePrice
          : productSalePrice // ignore: cast_nullable_to_non_nullable
              as double,
      productImagePath: null == productImagePath
          ? _value.productImagePath
          : productImagePath // ignore: cast_nullable_to_non_nullable
              as String,
      productSKU: freezed == productSKU
          ? _value.productSKU
          : productSKU // ignore: cast_nullable_to_non_nullable
              as String?,
      productType: freezed == productType
          ? _value.productType
          : productType // ignore: cast_nullable_to_non_nullable
              as String?,
      stackStatus: freezed == stackStatus
          ? _value.stackStatus
          : stackStatus // ignore: cast_nullable_to_non_nullable
              as String?,
      relatedProducts: freezed == relatedProducts
          ? _value._relatedProducts
          : relatedProducts // ignore: cast_nullable_to_non_nullable
              as List<String>?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_Product implements _Product {
  _$_Product(
      {required this.productId,
      required this.productName,
      required this.category,
      required this.productShortDescription,
      required this.productDescription,
      required this.productPrice,
      required this.productSalePrice,
      required this.productImagePath,
      required this.productSKU,
      required this.productType,
      required this.stackStatus,
      final List<String>? relatedProducts})
      : _relatedProducts = relatedProducts;

  factory _$_Product.fromJson(Map<String, dynamic> json) =>
      _$$_ProductFromJson(json);

  @override
  final String productId;
  @override
  final String productName;
  @override
  final Category category;
  @override
  final String? productShortDescription;
  @override
  final String? productDescription;
  @override
  final double productPrice;
  @override
  final double productSalePrice;
  @override
  final String productImagePath;
  @override
  final String? productSKU;
  @override
  final String? productType;
  @override
  final String? stackStatus;
  final List<String>? _relatedProducts;
  @override
  List<String>? get relatedProducts {
    final value = _relatedProducts;
    if (value == null) return null;
    if (_relatedProducts is EqualUnmodifiableListView) return _relatedProducts;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(value);
  }

  @override
  String toString() {
    return 'Product(productId: $productId, productName: $productName, category: $category, productShortDescription: $productShortDescription, productDescription: $productDescription, productPrice: $productPrice, productSalePrice: $productSalePrice, productImagePath: $productImagePath, productSKU: $productSKU, productType: $productType, stackStatus: $stackStatus, relatedProducts: $relatedProducts)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_Product &&
            (identical(other.productId, productId) ||
                other.productId == productId) &&
            (identical(other.productName, productName) ||
                other.productName == productName) &&
            (identical(other.category, category) ||
                other.category == category) &&
            (identical(
                    other.productShortDescription, productShortDescription) ||
                other.productShortDescription == productShortDescription) &&
            (identical(other.productDescription, productDescription) ||
                other.productDescription == productDescription) &&
            (identical(other.productPrice, productPrice) ||
                other.productPrice == productPrice) &&
            (identical(other.productSalePrice, productSalePrice) ||
                other.productSalePrice == productSalePrice) &&
            (identical(other.productImagePath, productImagePath) ||
                other.productImagePath == productImagePath) &&
            (identical(other.productSKU, productSKU) ||
                other.productSKU == productSKU) &&
            (identical(other.productType, productType) ||
                other.productType == productType) &&
            (identical(other.stackStatus, stackStatus) ||
                other.stackStatus == stackStatus) &&
            const DeepCollectionEquality()
                .equals(other._relatedProducts, _relatedProducts));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      productId,
      productName,
      category,
      productShortDescription,
      productDescription,
      productPrice,
      productSalePrice,
      productImagePath,
      productSKU,
      productType,
      stackStatus,
      const DeepCollectionEquality().hash(_relatedProducts));

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_ProductCopyWith<_$_Product> get copyWith =>
      __$$_ProductCopyWithImpl<_$_Product>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_ProductToJson(
      this,
    );
  }
}

abstract class _Product implements Product {
  factory _Product(
      {required final String productId,
      required final String productName,
      required final Category category,
      required final String? productShortDescription,
      required final String? productDescription,
      required final double productPrice,
      required final double productSalePrice,
      required final String productImagePath,
      required final String? productSKU,
      required final String? productType,
      required final String? stackStatus,
      final List<String>? relatedProducts}) = _$_Product;

  factory _Product.fromJson(Map<String, dynamic> json) = _$_Product.fromJson;

  @override
  String get productId;
  @override
  String get productName;
  @override
  Category get category;
  @override
  String? get productShortDescription;
  @override
  String? get productDescription;
  @override
  double get productPrice;
  @override
  double get productSalePrice;
  @override
  String get productImagePath;
  @override
  String? get productSKU;
  @override
  String? get productType;
  @override
  String? get stackStatus;
  @override
  List<String>? get relatedProducts;
  @override
  @JsonKey(ignore: true)
  _$$_ProductCopyWith<_$_Product> get copyWith =>
      throw _privateConstructorUsedError;
}
