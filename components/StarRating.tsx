import { useTheme } from "../theme/ThemeContext";
import { View, Pressable } from "react-native";
import Svg, { Polygon } from "react-native-svg";



interface Props {
  rating: number;
  size?: number;
  interactive?: boolean;
  onChange?: (r: number) => void;
}

export default function StarRating({ rating, size = 14, interactive = false, onChange }: Props) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: "row", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Pressable
          key={i}
          disabled={!interactive}
          onPress={() => onChange?.(i)}
          style={({ pressed }) => ({
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={i <= rating ? colors.accent : "none"}
            stroke={i <= rating ? colors.accent : "#D4C5B0"}
            strokeWidth={1.5}
          >
            <Polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </Svg>
        </Pressable>
      ))}
    </View>
  );
}
