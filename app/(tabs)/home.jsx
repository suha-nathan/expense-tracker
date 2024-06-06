import React from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView>
      <FlatList
        data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={(item) => <Text>{item.$id}</Text>}
      />
    </SafeAreaView>
  );
};

export default Home;
