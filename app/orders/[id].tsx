import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { screen } from "@/components/ui";
import { colors, radius } from "@/constants/theme";
import { orders } from "@/data/mock";
import { money } from "@/utils/money";

const steps = ["Order Placed", "Confirmed", "Preparing", "Shipped", "Delivered"];

export default function OrderDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const order = orders.find((item) => item.id === id) ?? orders[0];
  return (
    <SafeAreaView style={screen.page}>
      <ScrollView contentContainerStyle={screen.content}>
        <View style={screen.rowBetween}><Pressable onPress={() => router.back()}><Ionicons name="chevron-back" size={26} color={colors.ink} /></Pressable><Text style={screen.h2}>{order.id}</Text><View style={{ width: 26 }} /></View>
        <View style={styles.card}><Image source={{ uri: order.image }} style={styles.image} /><View><Text style={styles.title}>{order.title}</Text><Text style={screen.body}>{order.date}</Text><Text style={styles.total}>{money(order.total)}</Text></View></View>
        <Text style={screen.h2}>Status timeline</Text>
        <View style={styles.timeline}>{steps.map((step, index) => <View key={step} style={styles.step}><View style={[styles.dot, index <= order.step && styles.done]} /><Text style={[styles.stepText, index <= order.step && styles.doneText]}>{step}</Text></View>)}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", gap: 12, backgroundColor: "#fff", padding: 14, borderRadius: radius.md },
  image: { width: 86, height: 86, borderRadius: radius.sm },
  title: { color: colors.ink, fontWeight: "900", maxWidth: 220 },
  total: { marginTop: 7, color: colors.ink, fontWeight: "900" },
  timeline: { backgroundColor: "#fff", borderRadius: radius.md, padding: 16, gap: 16 },
  step: { flexDirection: "row", alignItems: "center", gap: 12 },
  dot: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: colors.line },
  done: { backgroundColor: colors.mint, borderColor: colors.mint },
  stepText: { color: colors.muted, fontWeight: "800" },
  doneText: { color: colors.ink }
});
