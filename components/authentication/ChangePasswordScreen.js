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
import { CHANGE_PASSWORD } from "../../API/api";

const ChangePasswordScreen = ({navigation, route}) => {
  const [currentPass, setCurrentPass] = useState("");
  const [isSecurity, setIsSecurity] = useState(true);
  const [newPass, setNewPass] = useState("");
  const [cfNewPass, setCfNewPass] = useState("");
  const cfChangePass = () => {
    if (currentPass == "" || newPass == "" || cfNewPass == "") {
      Alert.alert("Thông báo", "Thông tin đăng kí phải nhập đầy đủ!");
    } else if (newPass.length < 8) {
      Alert.alert("Thông báo", "Mật khẩu tối thiểu 8 ký tự");
    } else if (newPass !== cfNewPass) {
      Alert.alert("Thông báo", "Mật khẩu nhập lại không trùng khớp!");
    } else if (currentPass != window.currentPassword) {
      Alert.alert("Thông báo", "Mật khẩu hiện tại không chính xác!");
    } else {
      axios({
        url: CHANGE_PASSWORD,
        method: "POST",
        data: {
          id: window.currentId,          
          password: newPass,
        },
      })
        .then((result) => {
          console.log("bạn đã thay đổi mật khẩu thành công");
          navigation.navigate("SignIn")
        })
        .catch((err) => {
          console.log("Thông báo", err.response.data);
        });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Đổi mật khẩu!</Text>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.text_footer, { marginTop: 30 }]}>
          Mật khẩu hiện tại
        </Text>
        <View style={styles.action}>
          {/* sau thêm cái biểu tượng ở đây */}
          <TextInput
            value={currentPass}
            onChangeText={(value) => {
              setCurrentPass(value);
            }}
            placeholder="Nhập mật khẩu hiện tại"
            style={styles.textInput}
            autoCapitalize="none"
          ></TextInput>
        </View>
        <Text style={[styles.text_footer, { marginTop: 30 }]}>
          Mật khẩu mới
        </Text>
        <View style={styles.action}>
          {/* sau thêm cái biểu tượng ở đây */}
          <TextInput
            value={newPass}
            onChangeText={(value) => {
              setNewPass(value);
            }}
            placeholder="Nhập mật khẩu mới"
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
          Xác nhận mật khẩu mới
        </Text>
        <View style={styles.action}>
          {/* sau thêm cái biểu tượng ở đây */}
          <TextInput
            value={cfNewPass}
            onChangeText={(value) => {
              setCfNewPass(value);
            }}
            placeholder="Xác nhận mật khẩu mới"
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
          <TouchableOpacity onPress={cfChangePass} style={styles.signIn}>
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
                Xác nhận
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChangePasswordScreen;
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
