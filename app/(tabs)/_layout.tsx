import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { colors } from "@/constants/theme";

const icons = {
  index: "home-outline",
  explore: "compass-outline",
  live: "radio-outline",
  orders: "receipt-outline",
  profile: "person-outline"
} as const;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: route.name === "live" ? colors.live : colors.ink,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { height: 66, paddingTop: 8, paddingBottom: 10 },
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={icons[route.name as keyof typeof icons]}
            size={route.name === "live" ? size + 5 : size}
            color={focused || route.name === "live" ? colors.live : color}
          />
        )
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
      <Tabs.Screen name="live" options={{ title: "Live" }} />
      <Tabs.Screen name="orders" options={{ title: "Orders" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
