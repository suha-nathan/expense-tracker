import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons/faEllipsisVertical";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons/faCirclePlay";
import { Video, ResizeMode } from "expo-av";

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false);

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View
            className="w-[46px] h-[46px] rounded-lg border border-secondary 
          justify-center items-center p-0.5"
          >
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-sm text-white font-psemibold"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <FontAwesomeIcon icon={faEllipsisVertical} size={25} color="white" />
        </View>
      </View>
      {play ? (
        <Video
          source={{
            uri: video, //video link has to have .mp4 or other extension
          }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="w-full h-60 rounded-xl mt-6 relative 
        justify-center items-center"
          activeOpacity={0.7}
          onPress={() => {
            setPlay(true);
          }}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3 "
            resizeMode="cover"
          />
          <FontAwesomeIcon icon={faCirclePlay} size={80} style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -40 }, { translateY: -40 }],
    color: "#CDCDE0",
  },
});
