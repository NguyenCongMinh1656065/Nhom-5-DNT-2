import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { GET_PRODUCT_WITH_PAGE } from "../../API/api";
import { formatNumberWithDot } from "../../Utils/moneyUtil";
import Loading from "../Loading/Loading";
import { Ionicons } from "@expo/vector-icons";

const SearchResult = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setSearchData] = useState([]);
  const { keyword } = route.params;
  useEffect(() => {
    axios
      .get(GET_PRODUCT_WITH_PAGE, {
        params: {
          pageSize: 100,
          pageIndex: 1,
          keyword: keyword,
        },
      })
      .then(function (response) {
        setIsLoading(false);
        setSearchData(response.data.items);
      })
      .catch(function (error) {
        setIsLoading(false);
        console.log(error);
      });
  }, []);
  return (
    <View style={styles.container}>
      {
        isLoading ? <Loading></Loading>
        : (
          <View>
      <View style={styles.cartHeader}>
        <View style={styles.search}>
          <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="black" />
          <Text style={styles.cartText}>Tìm kiếm</Text>
          <View></View>
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
            <Text style={styles.textcollection}>
              Kết quả tìm kiếm: {keyword}
            </Text>
          </View>
          {searchData.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
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
                  <Text style={styles.Productdescription}>
                    {item.productName}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
          </View>
        )
      }

    </View>
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ccc",
    flex: 1,
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
