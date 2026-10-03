import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton, ProductCard, PriceDisplay, Rating, screen } from "@/components/ui";
import { colors, radius } from "@/constants/theme";
import { productById, products, sellerById } from "@/data/mock";
import { useAppStore } from "@/store/appStore";

export default function ProductDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = productById(id ?? "");
  const seller = sellerById(product.sellerId);
  const addToCart = useAppStore((s) => s.addToCart);
  return (
    <SafeAreaView style={screen.page}>
      <ScrollView contentContainerStyle={screen.content}>
        <View style={screen.rowBetween}><Pressable onPress={() => router.back()}><Ionicons name="chevron-back" size={26} color={colors.ink} /></Pressable><Pressable onPress={() => router.push("/cart")}><Ionicons name="bag-handle-outline" size={24} color={colors.ink} /></Pressable></View>
        <Image source={{ uri: product.image }} style={styles.hero} />
        <Text style={screen.h1}>{product.name}</Text>
        <Text style={screen.body}>Sold by {seller.name} {seller.verified ? "✓" : ""}</Text>
        <Rating value={product.rating} count={product.reviews} />
        <PriceDisplay price={product.price} oldPrice={product.oldPrice} />
        <Text style={screen.body}>{product.description}</Text>
        <Text style={screen.h3}>Colors</Text><View style={styles.pills}>{product.colors.map((c) => <Text key={c} style={styles.pill}>{c}</Text>)}</View>
        <Text style={screen.h3}>Sizes</Text><View style={styles.pills}>{product.sizes.map((s) => <Text key={s} style={styles.pill}>{s}</Text>)}</View>
        <View style={styles.delivery}><Ionicons name="bicycle-outline" size={22} color={colors.mint} /><Text style={styles.deliveryText}>Delivery in Nairobi from tomorrow • Easy returns available</Text></View>
        <View style={{ flexDirection: "row", gap: 10 }}><View style={{ flex: 1 }}><AppButton title="Add to Cart" onPress={() => addToCart(product)} /></View><View style={{ flex: 1 }}><AppButton title="Buy Now" variant="dark" onPress={() => { addToCart(product); router.push("/checkout"); }} /></View></View>
        <Text style={screen.h2}>Related products</Text>
        <View style={{ flexDirection: "row", gap: 12 }}>{products.filter((p) => p.id !== product.id).map((p) => <ProductCard key={p.id} product={p} onPress={() => router.push(`/product/${p.id}`)} />)}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  hero: { width: "100%", height: 360, borderRadius: radius.lg, backgroundColor: colors.line },
  pills: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  pill: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: radius.pill, backgroundColor: "#fff", color: colors.ink, fontWeight: "800", borderWidth: 1, borderColor: colors.line },
  delivery: { flexDirection: "row", gap: 10, padding: 14, backgroundColor: "#EFFFF8", borderRadius: radius.md },
  deliveryText: { flex: 1, color: colors.ink, fontWeight: "700", lineHeight: 20 }
});
