import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons,AntDesign } from "@expo/vector-icons";

const Footer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.totalPay}>
        <Text style={{fontWeight: '500'}}>Tổng thanh toán</Text>
        <Text style={{color:'red'}}>200.000 Đ</Text>
      </View>
      <TouchableOpacity style={styles.confirm}>      
        <Text style={{fontWeight: '500', color: '#fff'}}>Đặt hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    height: 63,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  totalPay: {
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
    width: '10%',
    flex: 1
  },
  confirm: {
    backgroundColor: '#48B600',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
    width: '10%',
    flex: 1
  }
 
});
