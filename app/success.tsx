import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Animated, { BounceIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton, screen } from "@/components/ui";
import { colors } from "@/constants/theme";
import { money } from "@/utils/money";

export default function Success() {
  const { total } = useLocalSearchParams<{ total: string }>();
  return (
    <SafeAreaView style={[screen.page, styles.page]}>
      <Animated.View entering={BounceIn} style={styles.success}><Ionicons name="checkmark" size={62} color="#fff" /></Animated.View>
      <Text style={screen.h1}>Order successful</Text>
      <Text style={screen.body}>Order LL-{Math.floor(20000 + Math.random() * 999)} has been placed. Estimated delivery is 1-2 business days.</Text>
      <Text style={styles.total}>{money(Number(total ?? 0))}</Text>
      <View style={{ width: "100%", gap: 10 }}><AppButton title="View Order" onPress={() => router.replace("/(tabs)/orders")} /><AppButton title="Continue Shopping" variant="ghost" onPress={() => router.replace("/(tabs)")} /></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { alignItems: "center", justifyContent: "center", padding: 24, gap: 16 },
  success: { width: 112, height: 112, borderRadius: 56, backgroundColor: colors.mint, alignItems: "center", justifyContent: "center" },
  total: { color: colors.ink, fontSize: 28, fontWeight: "900" }
});
