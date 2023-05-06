import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FlatGrid } from "react-native-super-grid";

function Recommender() {
  const [items, setItems] = React.useState([
    { name: "TURQUOISE", code: "#142F21" },
    { name: "EMERALD", code: "#B2ECC4" },
    { name: "PETER RIVER", code: "#42A45C" },
    { name: "TURQUOISE", code: "#142F21" },
    { name: "EMERALD", code: "#B2ECC4" },
    { name: "PETER RIVER", code: "#42A45C" },
    { name: "TURQUOISE", code: "#142F21" },
    { name: "EMERALD", code: "#B2ECC4" },
    { name: "PETER RIVER", code: "#42A45C" },
  ]);

  return (
    <View
      style={{
        paddingTop: 90,
        paddingHorizontal: 15,
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <Text style={styles.titleheading}>Vitamind,</Text>
      <Text style={styles.titleheading2}>recommends</Text>
      <Text style={styles.titleheading3}>you to:</Text>
      <FlatGrid
        itemDimension={130}
        data={items}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.itemContainer, { backgroundColor: item.code }]}
          >
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCode}>{item.code}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default Recommender;

const styles = StyleSheet.create({
  titleheading: {
    textAlign: "Left",
    fontSize: 40,
    fontFamily: "Poppins_Regular",
    alignSelf: "left",
    color: "#142F21",
    marginLeft: 10,
  },
  titleheading2: {
    textAlign: "Left",
    fontSize: 30,
    fontFamily: "Poppins_Bold",
    alignSelf: "left",
    color: "#42A45C",
    marginLeft: 10,
  },
  titleheading3: {
    textAlign: "Left",
    fontSize: 30,
    fontFamily: "Poppins_Bold",
    alignSelf: "left",
    color: "#42A45C",
    marginLeft: 10,
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },
});
