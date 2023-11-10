import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import HeaderScreen from "./HeaderScreen";
import { GET_ALL_PRODUCT } from "../../API/api";
import { formatNumberWithDot } from "../../Utils/moneyUtil";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Loading from "../Loading/Loading";

const Products = ({ navigation }) => {
  const [keyword, setKeyword] = useState([]);
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [filterValue, setFilterValue] = useState();
  useEffect(() => {
    axios
      .get(GET_ALL_PRODUCT)
      .then(function (response) {
        setIsLoading(false);
        setProductData(response.data);
      })
      .catch(function (error) {
        setIsLoading(false);
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.search}>
              <TextInput
                onChangeText={(newText) => setKeyword(newText)}
                style={styles.searchInput}
                placeholder="Nhập từ khóa bạn muốn tìm kiếm..."
              ></TextInput>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SearchResult", {
                    keyword: keyword,
                  });
                }}
              >
                <AntDesign name="search1" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
            <View style={styles.outstanding}>
              <TouchableOpacity style={styles.advelement}>
                <View>
                  <Image
                    style={styles.advimage}
                    source={require("../../assets/images/Christmas.jpg")}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.product}>
              <View style={styles.collection}>
                <Text style={styles.textcollection}>Tất cả sản phẩm</Text>
              </View>
              {productData.map((item, key) => {
                return (
                  <TouchableOpacity
                    key={key}
                    onPress={() => {
                      console.log(item.id);
                      navigation.navigate("ProductDescription", {
                        id: item.id,
                        img: item.productImage,
                        price: item.price,
                        productName: item.productName,
                        productDescription: item.productDescription,
                      });
                    }}
                    style={styles.element}
                  >
                    <View>
                      <Image
                        style={styles.image}
                        source={{ uri: item.productImage }}
                      />
                      <Text style={styles.price}>
                        {formatNumberWithDot(item.price)}
                      </Text>
                      <Text
                        numberOfLines={1}
                        key={item.id}
                        style={styles.Productdescription}
                      >
                        {item.productName}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ccc",
    flex: 1,
  },
  header: {
    backgroundColor: "#48B600",
    height: 120,
    // justifyContent: "center",
    // alignItems: "center",
  },
  search: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 60,
    alignItems: "center",
  },
  searchInput: {
    width: "70%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  // Advertisement
  outstanding: {
    padding: 10,
    height: 210,
    width: "100%",
  },

  advimage: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
  },

  // Types
  types: {
    height: 120,
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 10,
  },
  fixiamge: {
    height: 100,
    width: 100,
    borderRadius: 20,
  },
  // Collection
  collection: {
    width: "100%",
  },
  textcollection: {
    height: 30,
    width: "100%",
    fontWeight: "bold",
    fontSize: 20,
  },
  // Product
  product: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    justifyContent: "space-between",
  },
  element: {
    height: 150,
    width: "48%",
    backgroundColor: "#fff",
    // alignItems: "center",
    marginTop: 10,
    borderRadius: 10,
  },
  image: {
    width: "50%",
    height: "50%",
    marginTop: 10,
    alignItems: "center",
    alignSelf: "center",
  },
  price: {
    marginTop: 20,
    marginLeft: 10,
    fontWeight: "500",
  },
  Productdescription: {
    marginLeft: 10,
  },
});
