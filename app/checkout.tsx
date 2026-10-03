import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton, screen } from "@/components/ui";
import { colors, radius } from "@/constants/theme";
import { cartTotals, useAppStore } from "@/store/appStore";
import { money } from "@/utils/money";

export default function Checkout() {
  const cart = useAppStore((s) => s.cart);
  const totals = cartTotals(cart);
  const clearCart = useAppStore((s) => s.clearCart);
  return (
    <SafeAreaView style={screen.page}>
      <ScrollView contentContainerStyle={screen.content}>
        <View style={screen.rowBetween}><Pressable onPress={() => router.back()}><Ionicons name="chevron-back" size={26} color={colors.ink} /></Pressable><Text style={screen.h2}>Checkout</Text><View style={{ width: 26 }} /></View>
        <Block title="Delivery Address" body="Maya Njeri, Riverside Drive, Nairobi" icon="location-outline" />
        <Block title="Delivery Method" body="Express courier • 1-2 business days" icon="bicycle-outline" />
        <Text style={screen.h3}>Payment Method</Text>
        {["M-Pesa", "Card", "Cash on Delivery"].map((method, index) => <View key={method} style={styles.option}><Ionicons name={index === 0 ? "radio-button-on" : "radio-button-off"} size={22} color={index === 0 ? colors.live : colors.muted} /><Text style={styles.optionText}>{method}</Text></View>)}
        <View style={styles.summary}><Text style={screen.h3}>Order Summary</Text><Text style={screen.body}>{cart.length} item(s)</Text><Text style={styles.total}>{money(totals.total)}</Text><AppButton title="Place Order" onPress={() => { clearCart(); router.replace({ pathname: "/success", params: { total: totals.total.toString() } }); }} icon="checkmark-circle-outline" /></View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Block({ title, body, icon }: { title: string; body: string; icon: keyof typeof Ionicons.glyphMap }) {
  return <View style={styles.block}><Ionicons name={icon} size={23} color={colors.ink} /><View style={{ flex: 1 }}><Text style={styles.blockTitle}>{title}</Text><Text style={screen.body}>{body}</Text></View><Ionicons name="create-outline" size={21} color={colors.muted} /></View>;
}

const styles = StyleSheet.create({
  block: { flexDirection: "row", gap: 12, alignItems: "center", backgroundColor: "#fff", borderRadius: radius.md, padding: 14 },
  blockTitle: { color: colors.ink, fontWeight: "900", marginBottom: 3 },
  option: { height: 54, borderRadius: radius.md, backgroundColor: "#fff", flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 14 },
  optionText: { color: colors.ink, fontWeight: "800" },
  summary: { backgroundColor: "#fff", borderRadius: radius.md, padding: 16, gap: 10 },
  total: { color: colors.ink, fontSize: 26, fontWeight: "900" }
});
