import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { REGISTER } from "../../API/api";

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [isSecurity, setIsSecurity] = useState(true);

  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfpassword, setCfpassword] = useState("");
  const navigationSignIn = () => {
    navigation.navigate("SignIn");
  };
  const clickOnRegister = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const isValid = reg.test(username);

    if (
      fullname == "" ||
      username == "" ||
      password == "" ||
      cfpassword == ""
    ) {
      Alert.alert("Thông báo", "Thông tin đăng kí phải nhập đầy đủ!");
    } else if (fullname.length < 8) {
      Alert.alert("Thông báo", "Họ và tên tối thiểu 8 ký tự");
    } else if (!isValid) {
      Alert.alert("Thông báo", "Email không hợp lệ, hãy nhập lại!");
    } else if (password.length < 8) {
      Alert.alert("Thông báo", "Mật khẩu phải tối thiểu 8 ký tự!");
    } else if (password !== cfpassword) {
      Alert.alert("Thông báo", "Mật khẩu nhập lại không trùng khớp!");
    } else {
      axios({
        url: REGISTER,
        method: "POST",
        data: {
          fullname: fullname,
          userName: username, // tạm thời username đóng vai trò là email
          email: username,
          phone: "",
          password: password,
        },
      })
        .then((result) => {
          Alert.alert("Đăng ký thành công.");
          navigation.navigate("SignIn");
        })
        .catch((err) => {
          Alert.alert("Xin vui lòng thử lại.");
          console.log("Thông báo", err.response.data);
        });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Đăng ký!</Text>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.text_footer, { marginTop: 10 }]}>Họ và tên</Text>
        <View style={styles.action}>
          {/* sau thêm cái biểu tượng ở đây */}
          <TextInput
            value={fullname}
            onChangeText={(value) => {
              setFullname(value);
            }}
            placeholder="Nhập họ và tên của bạn"
            style={styles.textInput}
            autoCapitalize="none"
          ></TextInput>
        </View>
        <Text style={[styles.text_footer, { marginTop: 30 }]}>Email</Text>
        <View style={styles.action}>
          {/* sau thêm cái biểu tượng ở đây */}
          <TextInput
            value={username}
            onChangeText={(value) => {
              setUsername(value);
            }}
            placeholder="Nhập Email của bạn"
            style={styles.textInput}
            autoCapitalize="none"
          ></TextInput>
        </View>
        <Text style={[styles.text_footer, { marginTop: 30 }]}>Mật khẩu</Text>
        <View style={styles.action}>
          {/* sau thêm cái biểu tượng ở đây */}
          <TextInput
            value={password}
            onChangeText={(value) => {
              setPassword(value);
            }}
            placeholder="Nhập mật khẩu"
            secureTextEntry={isSecurity}
            style={styles.textInput}
            autoCapitalize="none"
          ></TextInput>
          <TouchableOpacity
            onPress={() => {
              setIsSecurity((prev) => !prev);
            }}
          >
            <AntDesign name="eyeo" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={[styles.text_footer, { marginTop: 30 }]}>
          Nhập lại mật khẩu
        </Text>
        <View style={styles.action}>
          {/* sau thêm cái biểu tượng ở đây */}
          <TextInput
            value={cfpassword}
            onChangeText={(value) => {
              setCfpassword(value);
            }}
            placeholder="Nhập lại mật khẩu"
            secureTextEntry={isSecurity}
            style={styles.textInput}
            autoCapitalize="none"
          ></TextInput>
          <TouchableOpacity
            onPress={() => {
              setIsSecurity((prev) => !prev);
            }}
          >
            <AntDesign name="eyeo" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} onPress={clickOnRegister}>
            <LinearGradient
              colors={["#08d4c4", "#01ab9d"]}
              style={styles.signIn}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Đăng ký
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={navigationSignIn}
            style={[
              styles.signIn,
              {
                borderColor: "#009387",
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#009387",
                },
              ]}
            >
              Đã có tài khoản? Đăng nhập
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#009387",
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SignUpScreen;
