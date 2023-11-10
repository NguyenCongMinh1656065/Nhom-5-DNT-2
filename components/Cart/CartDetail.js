import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { formatNumberWithDot } from "../../Utils/moneyUtil";
import { GET_USER_ORDER, CANCEL_ORDER, USERCONFIRM_ORDER } from "../../API/api";
import Loading from "../Loading/Loading";
function CartDetail({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(true);
  const handler = async (route, id) => {
    setIsLoading(true);
    axios
      .post(route + id)
      .catch((err) => {
        Alert.alert(err.response.data.message || err.message);
      })
      .finally(() => {
        setIsLoading(false);
        setShouldRefresh(!shouldRefresh);
      });
  };
  const getData = async () => {
    try {
      const data = await axios.get(GET_USER_ORDER, {
        params: {
          idKeyWord: window.currentId,
          keyWord: route.params.params.billId,
        },
      });
      return data.data;
    } catch (err) {
      Alert.alert(err.getMessage());
    }

    return {};
  };

  const [product, setProduct] = useState(undefined);
  useEffect(() => {
    getData().then((data) => {
      setProduct(data);
    });
  }, [route.params, shouldRefresh]);
  return product == undefined ? (
    <Loading />
  ) : (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.cartHeader}>
            <View style={styles.search}>
              <Ionicons
                onPress={() => navigation.goBack()}
                name="arrow-back"
                size={24}
                color="black"
              />
              <Text style={styles.cartText}>Chi tiết đơn hàng</Text>
              <Text></Text>
            </View>
          </View>
          <ScrollView>
            <View style={styles.payContent}>
              {/* Thông tin người đặt */}
              <Text style={styles.infoHeader}>THÔNG TIN KHÁCH HÀNG</Text>
              <View style={styles.address}>
                <Text style={styles.label}>Họ và tên người nhận</Text>
                <Text style={styles.searchInput}>{product.customerName}</Text>
                <Text style={styles.label}>Số điện thoại</Text>
                <Text style={styles.searchInput}>{product.phoneNumber}</Text>
                <Text style={styles.label}>Địa chỉ giao hàng</Text>
                <Text style={styles.searchInput}>{product.address}</Text>
              </View>
              {/* Thông tin sản phẩm */}
              <Text style={styles.infoHeader}>THÔNG TIN SẢN PHẨM</Text>
              <View style={styles.productPart}>
                {product.products.length == 0 ? (
                  <View>
                    <Text>Không có sản phẩm nào.</Text>
                  </View>
                ) : (
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "column",
                      gap: 20,
                    }}
                  >
                    {product.products.map((item, index) => {
                      return (
                        <View
                          style={{
                            ...styles.cartDescription,
                            flexDirection: "row",
                            borderBottomColor: "#3D30A2",
                            borderBottomLeftRadius: 5,
                            borderBottomRightRadius: 5,
                            borderBottomWidth: 1,
                            paddingBottom: 10,
                            flex: 1,
                            gap: 10,
                          }}
                          key={index}
                        >
                          <View style={styles.cartImg}>
                            <Image
                              style={styles.img}
                              src={item.productImage}
                            ></Image>
                          </View>
                          <View>
                            <Text style={styles.productName}>
                              {item.productName}
                            </Text>
                            <Text>Số lượng: {item.quantity}</Text>
                            <Text style={styles.productDescription}>
                              {item.productDescription}
                            </Text>
                            <Text style={styles.productPrice}>
                              {formatNumberWithDot(item.price)}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                )}
              </View>
              {/* Tính tiền */}
              <Text style={styles.infoHeader}>TỔNG TIỀN</Text>
              <View style={styles.total}>
                <View style={styles.row}>
                  <Text style={styles.row1}>Tổng tiền</Text>
                  <Text style={styles.row2}>
                    {formatNumberWithDot(product.finalPrice)}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.row1}>Vận chuyển</Text>
                  <Text style={styles.row2}>
                    {formatNumberWithDot(product.deliveryPrice)}
                  </Text>
                </View>
              </View>
              <Text style={styles.infoHeader}>TRẠNG THÁI</Text>
              <View style={styles.total}>
                <View style={styles.row}>
                  <Text
                    style={{
                      ...styles.row2,
                      fontSize: 20,
                      color:
                        product.status == "Chờ xác nhận"
                          ? "#B2533E"
                          : "#01ab9d",
                    }}
                  >
                    {product.status}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
          {product.status != "Đã hủy" && (
            <View style={styles.footer}>
              <TouchableOpacity
                disabled={isLoading}
                style={{
                  ...styles.confirm,
                  backgroundColor:
                    product.status == "Chờ xác nhận"
                      ? "#C70039"
                      : styles.confirm.backgroundColor,
                }}
                onPress={() => {
                  if (product.status == "Chờ xác nhận") {
                    handler(CANCEL_ORDER, product.id);
                  } else {
                    handler(USERCONFIRM_ORDER, product.id);
                  }
                }}
              >
                <Text style={{ fontWeight: "500", color: "#fff" }}>
                  {product.status == "Chờ xác nhận"
                    ? "Hủy Đơn Hàng"
                    : "Đã nhận hàng"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  payContent: {
    padding: 20,
  },
  cartHeader: {
    backgroundColor: "#48B600",
    height: 100,
    justifyContent: "center",
  },
  search: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-around",
  },
  cartText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "500",
  },
  searchInput: {
    backgroundColor: "#B2533E",
    padding: 10,
    borderRadius: 5,
    color: "#fff",
  },
  discountInput: {
    backgroundColor: "#fff",
    width: "70%",
    padding: 10,
    borderRadius: 5,
  },
  infoHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#48B600",
  },
  address: {
    padding: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    color: "#8A1415",
  },

  productPart: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 30,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    marginBottom: 10,
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
  cartDescription: {},
  productPrice: {
    marginTop: 10,
    color: "red",
  },
  productDescription: {
    marginTop: 10,
  },
  button: {
    flex: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
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
  discount: {
    marginBottom: 10,
    padding: 10,
  },
  row: {
    flexDirection: "row",
  },
  row1: {
    flex: 1,
    fontSize: 16,
    opacity: 0.6,
  },
  row2: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  total: {
    padding: 10,
  },
  delivery: {
    padding: 10,
    marginBottom: 10,
  },
  checkDelivery: {
    flexDirection: "row",
    alignItems: "center",
  },
  footer: {
    height: 63,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  totalPay: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: "10%",
    flex: 1,
  },
  confirm: {
    backgroundColor: "#48B600",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: "10%",
    flex: 1,
  },
});

export default CartDetail;
