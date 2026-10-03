import { router } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { screen } from "@/components/ui";
import { colors, radius } from "@/constants/theme";
import { orders } from "@/data/mock";
import { money } from "@/utils/money";

export default function Orders() {
  return (
    <SafeAreaView style={screen.page}>
      <ScrollView contentContainerStyle={screen.content}>
        <Text style={screen.h1}>Orders</Text>
        <View style={styles.tabs}><Text style={styles.active}>Active</Text><Text style={styles.tab}>Completed</Text><Text style={styles.tab}>Cancelled</Text></View>
        {orders.map((order) => (
          <Pressable key={order.id} onPress={() => router.push(`/orders/${order.id}`)} style={styles.card}>
            <Image source={{ uri: order.image }} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{order.title}</Text>
              <Text style={screen.body}>{order.id} • {order.date}</Text>
              <Text style={styles.total}>{money(order.total)}</Text>
            </View>
            <Text style={styles.status}>{order.status}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabs: { flexDirection: "row", gap: 10 },
  tab: { paddingHorizontal: 14, paddingVertical: 9, color: colors.muted, fontWeight: "800" },
  active: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: radius.pill, backgroundColor: colors.ink, color: "#fff", fontWeight: "900" },
  card: { flexDirection: "row", gap: 12, backgroundColor: "#fff", borderRadius: radius.md, padding: 12, alignItems: "center" },
  image: { width: 72, height: 72, borderRadius: radius.sm },
  title: { color: colors.ink, fontWeight: "900" },
  total: { marginTop: 6, color: colors.ink, fontWeight: "900" },
  status: { color: colors.live, fontWeight: "900", textTransform: "capitalize" }
});
