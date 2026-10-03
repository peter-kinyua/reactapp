import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton, EmptyState, screen } from "@/components/ui";
import { colors, radius } from "@/constants/theme";
import { cartTotals, useAppStore } from "@/store/appStore";
import { money } from "@/utils/money";

export default function Cart() {
  const cart = useAppStore((s) => s.cart);
  const updateQuantity = useAppStore((s) => s.updateQuantity);
  const removeFromCart = useAppStore((s) => s.removeFromCart);
  const totals = cartTotals(cart);
  return (
    <SafeAreaView style={screen.page}>
      <ScrollView contentContainerStyle={screen.content}>
        <View style={screen.rowBetween}><Pressable onPress={() => router.back()}><Ionicons name="chevron-back" size={26} color={colors.ink} /></Pressable><Text style={screen.h2}>Cart</Text><View style={{ width: 26 }} /></View>
        {!cart.length ? <EmptyState title="Your cart is empty" body="Add products from a live show or product page to start checkout." /> : null}
        {cart.map((line) => (
          <View key={line.product.id} style={styles.line}>
            <Image source={{ uri: line.product.image }} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{line.product.name}</Text>
              <Text style={screen.body}>{line.color} • {line.size}</Text>
              <Text style={styles.price}>{money(line.product.price)}</Text>
              <View style={styles.qty}><Pressable onPress={() => updateQuantity(line.product.id, line.quantity - 1)}><Ionicons name="remove-circle-outline" size={27} color={colors.ink} /></Pressable><Text style={styles.qtyText}>{line.quantity}</Text><Pressable onPress={() => updateQuantity(line.product.id, line.quantity + 1)}><Ionicons name="add-circle-outline" size={27} color={colors.ink} /></Pressable><Pressable onPress={() => removeFromCart(line.product.id)}><Ionicons name="trash-outline" size={22} color={colors.live} /></Pressable></View>
            </View>
          </View>
        ))}
        {cart.length ? <View style={styles.summary}><Row label="Subtotal" value={money(totals.subtotal)} /><Row label="Delivery" value={money(totals.delivery)} /><Row label="Discount" value={`-${money(totals.discount)}`} /><Row label="Total" value={money(totals.total)} strong /><AppButton title="Checkout" onPress={() => router.push("/checkout")} icon="card-outline" /></View> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return <View style={styles.row}><Text style={[styles.rowLabel, strong && styles.strong]}>{label}</Text><Text style={[styles.rowValue, strong && styles.strong]}>{value}</Text></View>;
}

const styles = StyleSheet.create({
  line: { flexDirection: "row", gap: 12, backgroundColor: "#fff", padding: 12, borderRadius: radius.md },
  image: { width: 86, height: 98, borderRadius: radius.sm },
  name: { color: colors.ink, fontWeight: "900" },
  price: { color: colors.ink, fontWeight: "900", marginTop: 5 },
  qty: { marginTop: 8, flexDirection: "row", gap: 10, alignItems: "center" },
  qtyText: { fontWeight: "900", minWidth: 20, textAlign: "center" },
  summary: { gap: 12, backgroundColor: "#fff", padding: 16, borderRadius: radius.md },
  row: { flexDirection: "row", justifyContent: "space-between" },
  rowLabel: { color: colors.muted, fontWeight: "700" },
  rowValue: { color: colors.ink, fontWeight: "800" },
  strong: { fontSize: 18, color: colors.ink, fontWeight: "900" }
});
