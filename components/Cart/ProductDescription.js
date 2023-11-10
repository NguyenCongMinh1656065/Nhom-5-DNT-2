import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { CREATE_CART, GET_CART_WITH_PAGE, UPDATE_CART } from "../../API/api";
import { formatNumberWithDot } from "../../Utils/moneyUtil";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
const ProductDescription = ({ route, navigation }) => {
  const isFocused = useIsFocused();

  const { id, img, price, productName, productDescription } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [addToCartText, setAddToCartText] = useState("Thêm vào giỏ hàng");
  const [carts, setCarts] = useState([]);
  const [refresh, setRefresh] = useState(true);
  if (quantity < 1) {
    setQuantity(1);
  }
  useEffect(() => {
    axios
      .get(GET_CART_WITH_PAGE, {
        params: {
          pageSize: 100,
          pageIndex: 1,
          idKeyWord: window.currentId,
        },
      })
      .then(function (response) {
        setCarts(response.data.items);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [refresh, isFocused]);

  const changeQuantity = (cartId) => {
    axios
      .post(UPDATE_CART + `${cartId}?amount=${quantity}&increase=true`)
      .then(function (response) {
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: `${productName} đã được thêm vào giỏ hàng`,
        });
        setAddToCartText("Đã có trong giỏ hàng");
      })
      .catch(function (error) {
        console.log("Thất bại: ", error);
      })
      .finally(() => {
        setRefresh(!refresh);
      });
  };

  const addToCart = () => {
    axios
      .post(CREATE_CART, {
        customerId: window.currentId,
        productImage: img,
        productName: productName,
        price: price,
        productDescription: productDescription,
        quantity: quantity,
        productId: id,
      })
      .then(function (response) {
        console.log("Thành công");
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: `${productName} đã được thêm vào giỏ hàng`,
        });
        setAddToCartText("Đã thêm vào giỏ hàng");
      })
      .catch(function (error) {
        console.log("Thất bại: ", error);
      })
      .finally(() => {
        setRefresh(!refresh);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.cartHeader}>
        <View style={styles.search}>
          <Ionicons
            onPress={() => {
              navigation.goBack();
            }}
            name="arrow-back"
            size={24}
            color="black"
          />
          <View>
            <Text style={styles.cartText}>Chi tiết sản phẩm</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Cart");
              }}
            >
              <AntDesign name="shoppingcart" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.numOfCart}>
              <Text style={styles.numOfCartText}>{carts.length}</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={styles.imageBox}>
          <Image style={styles.image} src={img}></Image>
        </View>
        <View style={styles.productDetail}>
          <Text style={styles.productName}>{productName}</Text>
          <Text style={styles.price}>{formatNumberWithDot(price)}</Text>
          <Text style={styles.productDescription}>{productDescription}</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.totalPay}>
          <TouchableOpacity
            onPress={() => {
              setQuantity(quantity - 1);
            }}
          >
            <Text style={styles.quantityItem}>-</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.quantityItem}>{quantity}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setQuantity(quantity + 1);
            }}
          >
            <Text style={styles.quantityItem}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.confirm}
          onPress={() => {
            const p = carts.filter((e) => e.productId == id);
            if (p.length > 0) {
              changeQuantity(p[0].id);
            } else {
              addToCart();
            }
          }}
        >
          <Text style={{ fontWeight: "500", color: "#fff" }}>
            {addToCartText}
          </Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
};

export default ProductDescription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartHeader: {
    backgroundColor: "#48B600",
    height: 100,
    // alignItems: "center",
    // justifyContent: 'center'
  },
  search: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  cartText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "500",
  },
  numOfCart: {
    position: "absolute",
    top: -12,
    right: -10,
    width: 22,
    height: 22,
    backgroundColor: "red",
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  numOfCartText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  imageBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 350,
    width: "90%",
  },
  productDetail: {
    padding: 10,
    marginTop: 10,
  },
  productName: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontWeight: "500",
    fontSize: 20,
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
  },
  footer: {
    height: 90,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  totalPay: {
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "10%",
    flex: 1,
    flexDirection: "row",
  },
  quantityItem: {
    fontSize: 20,
    fontWeight: "bold",
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
