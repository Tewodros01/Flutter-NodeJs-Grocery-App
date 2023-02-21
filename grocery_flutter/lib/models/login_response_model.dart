import 'dart:convert';

LoginResponseModel loginResponseModelJson(String str) =>
    LoginResponseModel.fromJson(json.decode(str));

class LoginResponseModel {
  late final String message;
  late final Data data;
  LoginResponseModel.fromJson(Map<String, dynamic> json) {
    message = json["message"];
    data = Data.fromJson(json["data"]);
  }
  Map<String, dynamic> toJson() {
    final datas = <String, dynamic>{};
    datas["message"] = message;
    datas["data"] = data.toJson();
    return datas;
  }
}

class Data {
  late final String full_name;
  late final String email;
  late final String user_id;
  late final String token;
  Data({
    required this.full_name,
    required this.email,
    required this.user_id,
    required this.token,
  });
  Data.fromJson(Map<String, dynamic> json) {
    full_name = json["full_name"];
    email = json["email"];
    user_id = json["user_id"];
    token = json["token"];
  }
  Map<String, dynamic> toJson() {
    final data = <String, dynamic>{};
    data["full_name"] = full_name;
    data["email"] = email;
    data["user_id"] = user_id;
    data["token"] = token;
    return data;
  }
}
