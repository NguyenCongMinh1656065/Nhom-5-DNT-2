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
  import { GET_ALL_ORDER, GET_CART_WITH_PAGE } from "../../API/api";
  import { formatNumberWithDot } from "../../Utils/moneyUtil";
  import Loading from "../Loading/Loading";
  const OrderManagerScreen = ({ navigation }) => {
    const [orderData, setOrderData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      axios
        .get(GET_ALL_ORDER)
        .then(function (response) {
          setOrderData(response.data);
          setIsLoading(false);
        })
        .catch(function (error) {
          setIsLoading(false);

          console.log(error);
        });
    }, []);
  
    return (
      <View style={styles.container}>
        {
          isLoading ? <Loading></Loading> : 
          (
            <View style={styles.container}>
              <View style={styles.cartHeader}>
                <View style={styles.search}>
                  <Text style={styles.cartText}>Quản Lý Đơn Hàng</Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                {orderData.length == 0 ? (
                  <Text style={{ fontSize: 16 }}>
                    Chưa có đơn hàng nào 
                  </Text>
                ) : null}
              </View>
              <ScrollView>
                {orderData.map((item, i) => {
                  return (
                      <View style={{paddingBottom: 20}}>
                    <View style={styles.cartBox}>
                      <View style={styles.cartImg}>
                        <Image
                          style={styles.img}
                          source={{ uri: item.productImage }}
                        ></Image>
                      </View>
                      <View style={styles.cartDescription}>
                        <Text style={styles.productName}>{item.productName}</Text>
                        <Text style={styles.productDescription}>
                          {item.productDescription}
                        </Text>
                        <Text style={styles.productPrice}>
                          {formatNumberWithDot(item.price)}
                        </Text>
                        <View style={styles.quantityBox}>
                          <View>
                            <View style={styles.totalPay}>

                              <View>
                                <Text style={styles.quantityItem}>Số lượng: {item.quantity}</Text>
                              </View>

                            </View>
                          </View>
                        </View>



                      </View>
                    </View>
                      <View style={{width: "90%", marginLeft: "5%", borderColor: '#ccc', borderWidth: 1}}>
                          <View style={{ padding: 8}}>
                              <Text>Trạng thái: {item.status}</Text>
                              <Text>Người nhận: {item.customerName}</Text>
                              <Text>Số điện thoại: {item.phoneNumber}</Text>
                              <Text>Địa chỉ giao hàng: {item.address}</Text>
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
  
  export default OrderManagerScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    containerNew: {
      flex: 1,
      paddingBottom: 100
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
      marginTop: 10,
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
  