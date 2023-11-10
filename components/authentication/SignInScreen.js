import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { LOGIN } from "../../API/api";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
const SignInScreen = ({ navigation }) => {
  const [isSecurity, setIsSecurity] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef();
  const validateLogin = () => {
    if (username == "" || password == "") {
      Alert.alert("Thông báo", "Thông tin đăng nhập phải nhập đầy đủ!");
    } else if (isLoading == false) {
      setIsLoading(true);
      axios({
        url: LOGIN,
        method: "POST",
        data: {
          userName: username,
          password: password,
        },
      })
        .then((result) => {
          console.log("thành công");
          window.currentId = result.data.currentId;
          window.currentPassword = password;
          window.type;
          navigation.navigate("MainScreen");
        })
        .catch((err) => {
          Alert.alert("Thông báo", "Thông tin tài khoản không chính xác");
          console.log("Thông báo", err);
        })
        .finally(() => {
          setIsLoading(false);
          setPassword("");
        });
    }
  };
  return isLoading ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome</Text>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.text_footer]}>Email</Text>
        <View style={styles.action}>
          <TextInput
            value={username}
            onChangeText={(value) => {
              setUsername(value);
            }}
            placeholder="Email"
            style={styles.textInput}
            autoCapitalize="none"
          ></TextInput>
        </View>
        <Text style={[styles.text_footer, { marginTop: 30 }]}>Mật khẩu</Text>
        <View style={styles.action}>
          <TextInput
            value={password}
            onChangeText={(value) => {
              setPassword(value);
            }}
            placeholder="Mật khẩu"
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
          <TouchableOpacity style={styles.signIn} onPress={validateLogin}>
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
                Đăng nhập
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.signIn,
              {
                borderColor: "#009387",
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#009387",
                },
              ]}
            >
              Đăng ký
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

export default SignInScreen;
