import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated, Text } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import CustomText from "./CustomText";
import { gs } from "@/constants/Styles";

type CircularProgressProps = {
  size: number;
  strokeWidth: number;
  percentage: number;
  duration: number;
  color: string;
  value: number;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress: React.FC<CircularProgressProps> = ({ size, strokeWidth, percentage, duration, color, value }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const halfCircle = radius + strokeWidth / 2;

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: percentage,
      duration: duration,
      useNativeDriver: false, // useNativeDriver: false for non-UI components
    }).start();
  }, [percentage, duration]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View style={[gs.ic, gs.jc, { width: size + 20, height: size + 20, backgroundColor: "#FFF", borderRadius: 9999 }]}>
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <G
          rotation="-90"
          origin={`${halfCircle}, ${halfCircle}`}
        >
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeOpacity={0.2}
          />
          <AnimatedCircle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <View style={[StyleSheet.absoluteFillObject, gs.ic, gs.jc]}>
        <CustomText
          weight={700}
          style={[{ fontSize: 43, color, lineHeight: 1.1 * 43 }]}
        >{`${value}`}</CustomText>
        <CustomText
          weight={400}
          style={[{ fontSize: 28, color: "rgba(233,148,92,.53)", lineHeight: 1.1 * 28 }]}
        >
          points
        </CustomText>
      </View>
    </View>
  );
};

export default CircularProgress;
