import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { ScrollView } from "react-native-gesture-handler";
  import { AntDesign } from "@expo/vector-icons";
  import { LinearGradient } from "expo-linear-gradient";
  import axios from "axios";
  import { GET_ALL_USER } from "../../API/api";
  import { formatNumberWithDot } from "../../Utils/moneyUtil";
  import Loading from "../Loading/Loading";
  
  const UserManagerScreen = ({ navigation }) => {
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
          .get(GET_ALL_USER)
          .then(function (response) {
            setIsLoading(false);
            console.log("!!! ", response.data);
            setUserData(response.data);
          })
          .catch(function (error) {
            setIsLoading(false);
            console.log(error);
          });
      }, []);
  
    return (
      <View style={styles.container}>
        {isLoading ? <Loading></Loading> : 
        (
          <View>
                    <View style={styles.cartHeader}>
          <View style={styles.search}>
            <Text style={styles.cartText}>Quản Lý Người Dùng</Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          {userData.length == 0 ? (
            <Text style={{ fontSize: 16 }}>
              Chưa có đơn hàng nào 
            </Text>
          ) : null}
        </View>
        <ScrollView>
          {userData.map((item, i) => {
            return (
              <View>
                <View style={{width: "90%", marginLeft: "5%", borderColor: '#ccc', borderWidth: 1}}>
                    <View style={{ padding: 8}}>
                        <Text>Họ và tên: {item.fullName}</Text>
                        <Text>Vai trò: {item.userType == 1 ? 'Quản lý' : 'Khách hàng'}</Text>
                        <Text>Email: {item.email}</Text>
                        <Text>Số điện thoại: {item.phone}</Text>
                        <Text>Số tiền đã mua: {formatNumberWithDot(item.totalPrice)}</Text>
                    </View>
                </View>
            </View>

            );
          })}
        </ScrollView>
          </View>
        )
        }
      </View>
    );
  };
  
  export default UserManagerScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    cartHeader: {
      backgroundColor: "#48B600",
      height: 100,
      justifyContent: "center",
      alignItems: "center",
    },
    search: {
      flexDirection: "row",
      marginTop: 30,
    },
    cartText: {
      fontSize: 20,
      color: "#fff",
      fontWeight: "500",
    },
    cartBox: {
      borderWidth: 1,
      borderColor: "#ccc",
      width: "90%",
      marginLeft: "5%",
      marginTop: 30,
      padding: 20,
      flexDirection: "row",
    },
    cartImg: {
      width: "40%",
    },
    img: {
      width: 100,
      height: 100,
    },
    productName: {
      fontWeight: "bold",
      fontSize: 18,
    },
    cartDescription: {
      width: "55%",
    },
    productPrice: {
      marginTop: 10,
      color: "red",
    },
    productDescription: {
      marginTop: 10,
    },
    totalPay: {
      height: "100%",
      width: "60%",
      flex: 1,
      flexDirection: "row",
    },
    quantityItem: {
      fontSize: 16,
    //   fontWeight: "bold",
      // padding: 10
    },
    deleteCart: {
      justifyContent: "center",
      alignItems: "center",
    },
    goToPay: {
      borderTopColor: "#ccc",
      marginTop: 20,
      marginBottom: 20,
    },
    button: {
      borderRadius: 50,
      marginHorizontal: 25,
      alignItems: "center",
      justifyContent: "center",
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
    totalPrice: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 20,
    },
    totalPriceText: {
      fontSize: 18,
      fontWeight: "500",
    },
  });
  