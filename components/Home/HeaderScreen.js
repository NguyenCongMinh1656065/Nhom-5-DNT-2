import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useEffect } from "react";
import axios from "axios";
import React, { useState } from "react";

const HeaderScreen = ({ navigation }) => {
  const [keyword, setKeyword] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          onChangeText={(newText) => setKeyword(newText)}
          style={styles.searchInput}
          placeholder="Nhập từ khóa bạn muốn tìm kiếm..."
        ></TextInput>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SearchResult");
          }}
        >
          <AntDesign name="search1" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
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
});

export default HeaderScreen;
