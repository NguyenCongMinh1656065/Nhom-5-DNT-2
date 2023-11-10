import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { GET_PRODUCT_WITH_PAGE } from "../../API/api";
import axios from "axios";
import { formatNumberWithDot } from "../../Utils/moneyUtil";
import Loading from "../Loading/Loading";

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(GET_PRODUCT_WITH_PAGE, {
        params: {
          pageSize: 6,
          pageIndex: 1,
          keyword: "",
        },
      })
      .then(function (response) {
        setData(response.data.items);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
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
                    source={require("../../assets/images/tommy_1.jpg")}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.types}>
              <TouchableOpacity style={styles.tyelement}>
                <View>
                  <Image
                    style={styles.fixiamge}
                    source={require("../../assets/images/type_tshirt.jpeg")}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.tyelement}>
                <View>
                  <Image
                    style={styles.fixiamge}
                    source={require("../../assets/images/type_short.jpg")}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.tyelement}>
                <View>
                  <Image
                    style={styles.fixiamge}
                    source={require("../../assets/images/type_shoe.jpg")}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.product}>
              <View style={styles.collection}>
                <Text style={styles.textcollection}>New Collections</Text>
              </View>
              {data.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
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
                      <Image style={styles.image} src={item.productImage} />
                      <Text style={styles.price}>
                        {formatNumberWithDot(item.price)}
                      </Text>
                      <Text style={styles.Productdescription}>
                        {item.productName}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
              <View style={styles.viewAll}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Products")}
                >
                  <Text style={styles.viewAllText}>Xem tất cả</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};
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
  viewAll: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    paddingBottom: 10,
  },
  viewAllText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default HomeScreen;
