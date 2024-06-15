import React, { Dispatch, DispatchWithoutAction, ReactNode, useEffect } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { Utilities } from "@/utilities/Utilities";
import { Colors } from "@/constants/Colors";

const height = Utilities.getScreenHeight() / 3 + 25;

const SlideUp = ({
  show,
  children,
}: {
  show: boolean;
  children: ReactNode;
}) => {
  const translateY = useSharedValue(height);

  useEffect(() => {
    translateY.value = withTiming(show ? 0 : height, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  }, [show, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[styles.slidingPanel, animatedStyle]}>
      {/* Your content here */}
      <View style={styles.content}>
        {children}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  slidingPanel: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: height,
    backgroundColor: "white",
    elevation: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  content: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default SlideUp;
