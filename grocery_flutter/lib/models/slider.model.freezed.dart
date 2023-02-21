// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'slider.model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

SliderModel _$SliderModelFromJson(Map<String, dynamic> json) {
  return _Slider.fromJson(json);
}

/// @nodoc
mixin _$SliderModel {
  String get sliderId => throw _privateConstructorUsedError;
  String get sliderName => throw _privateConstructorUsedError;
  String get sliderDescription => throw _privateConstructorUsedError;
  String get sliderURL => throw _privateConstructorUsedError;
  String get sliderImagePath => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $SliderModelCopyWith<SliderModel> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $SliderModelCopyWith<$Res> {
  factory $SliderModelCopyWith(
          SliderModel value, $Res Function(SliderModel) then) =
      _$SliderModelCopyWithImpl<$Res, SliderModel>;
  @useResult
  $Res call(
      {String sliderId,
      String sliderName,
      String sliderDescription,
      String sliderURL,
      String sliderImagePath});
}

/// @nodoc
class _$SliderModelCopyWithImpl<$Res, $Val extends SliderModel>
    implements $SliderModelCopyWith<$Res> {
  _$SliderModelCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? sliderId = null,
    Object? sliderName = null,
    Object? sliderDescription = null,
    Object? sliderURL = null,
    Object? sliderImagePath = null,
  }) {
    return _then(_value.copyWith(
      sliderId: null == sliderId
          ? _value.sliderId
          : sliderId // ignore: cast_nullable_to_non_nullable
              as String,
      sliderName: null == sliderName
          ? _value.sliderName
          : sliderName // ignore: cast_nullable_to_non_nullable
              as String,
      sliderDescription: null == sliderDescription
          ? _value.sliderDescription
          : sliderDescription // ignore: cast_nullable_to_non_nullable
              as String,
      sliderURL: null == sliderURL
          ? _value.sliderURL
          : sliderURL // ignore: cast_nullable_to_non_nullable
              as String,
      sliderImagePath: null == sliderImagePath
          ? _value.sliderImagePath
          : sliderImagePath // ignore: cast_nullable_to_non_nullable
              as String,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_SliderCopyWith<$Res> implements $SliderModelCopyWith<$Res> {
  factory _$$_SliderCopyWith(_$_Slider value, $Res Function(_$_Slider) then) =
      __$$_SliderCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String sliderId,
      String sliderName,
      String sliderDescription,
      String sliderURL,
      String sliderImagePath});
}

/// @nodoc
class __$$_SliderCopyWithImpl<$Res>
    extends _$SliderModelCopyWithImpl<$Res, _$_Slider>
    implements _$$_SliderCopyWith<$Res> {
  __$$_SliderCopyWithImpl(_$_Slider _value, $Res Function(_$_Slider) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? sliderId = null,
    Object? sliderName = null,
    Object? sliderDescription = null,
    Object? sliderURL = null,
    Object? sliderImagePath = null,
  }) {
    return _then(_$_Slider(
      sliderId: null == sliderId
          ? _value.sliderId
          : sliderId // ignore: cast_nullable_to_non_nullable
              as String,
      sliderName: null == sliderName
          ? _value.sliderName
          : sliderName // ignore: cast_nullable_to_non_nullable
              as String,
      sliderDescription: null == sliderDescription
          ? _value.sliderDescription
          : sliderDescription // ignore: cast_nullable_to_non_nullable
              as String,
      sliderURL: null == sliderURL
          ? _value.sliderURL
          : sliderURL // ignore: cast_nullable_to_non_nullable
              as String,
      sliderImagePath: null == sliderImagePath
          ? _value.sliderImagePath
          : sliderImagePath // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_Slider implements _Slider {
  _$_Slider(
      {required this.sliderId,
      required this.sliderName,
      required this.sliderDescription,
      required this.sliderURL,
      required this.sliderImagePath});

  factory _$_Slider.fromJson(Map<String, dynamic> json) =>
      _$$_SliderFromJson(json);

  @override
  final String sliderId;
  @override
  final String sliderName;
  @override
  final String sliderDescription;
  @override
  final String sliderURL;
  @override
  final String sliderImagePath;

  @override
  String toString() {
    return 'SliderModel(sliderId: $sliderId, sliderName: $sliderName, sliderDescription: $sliderDescription, sliderURL: $sliderURL, sliderImagePath: $sliderImagePath)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_Slider &&
            (identical(other.sliderId, sliderId) ||
                other.sliderId == sliderId) &&
            (identical(other.sliderName, sliderName) ||
                other.sliderName == sliderName) &&
            (identical(other.sliderDescription, sliderDescription) ||
                other.sliderDescription == sliderDescription) &&
            (identical(other.sliderURL, sliderURL) ||
                other.sliderURL == sliderURL) &&
            (identical(other.sliderImagePath, sliderImagePath) ||
                other.sliderImagePath == sliderImagePath));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, sliderId, sliderName,
      sliderDescription, sliderURL, sliderImagePath);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_SliderCopyWith<_$_Slider> get copyWith =>
      __$$_SliderCopyWithImpl<_$_Slider>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_SliderToJson(
      this,
    );
  }
}

abstract class _Slider implements SliderModel {
  factory _Slider(
      {required final String sliderId,
      required final String sliderName,
      required final String sliderDescription,
      required final String sliderURL,
      required final String sliderImagePath}) = _$_Slider;

  factory _Slider.fromJson(Map<String, dynamic> json) = _$_Slider.fromJson;

  @override
  String get sliderId;
  @override
  String get sliderName;
  @override
  String get sliderDescription;
  @override
  String get sliderURL;
  @override
  String get sliderImagePath;
  @override
  @JsonKey(ignore: true)
  _$$_SliderCopyWith<_$_Slider> get copyWith =>
      throw _privateConstructorUsedError;
}
