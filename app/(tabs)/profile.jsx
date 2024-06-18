import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import { router } from "expo-router";

import { signOut } from "../../lib/appwrite";

import { useGlobalContext } from "../../context/GlobalProvider";
import InfoBox from "../../components/InfoBox";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/sign-in"); //replace vs push. can go back with push
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full justify-center items-center mt-6 mb-12 px-4">
        <TouchableOpacity className="w-full items-end mb-10" onPress={logout}>
          <FontAwesomeIcon icon={faRightFromBracket} color="red" size={30} />
        </TouchableOpacity>
        <View className="w-16 h-16 border border-secondary-200 rounded-lg justify-center items-center">
          <Image
            source={{ uri: user?.avatar }}
            className="w-[90%] h-[90%] rounded-lg"
            resizeMode="cover"
          />
        </View>
        <InfoBox
          title={user?.username}
          containerStyles="mt-5"
          titleStyles="text-lg"
        />
        <View className="mt-5 flex-row">
          <InfoBox
            // title={posts.length || 0}
            title="0"
            subtitle="Posts"
            containerStyles="mr-10"
            titleStyles="text-xl"
          />
          <InfoBox title="1.2K" subtitle="Followers" titleStyles="text-xl" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
