import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Image, ImageBackground, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Animated, { FadeInUp, useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton, Avatar, LiveBadge, PriceDisplay, Rating } from "@/components/ui";
import { colors, radius } from "@/constants/theme";
import { chatMessages, liveShows, productById, sellerById } from "@/data/mock";
import { useAppStore } from "@/store/appStore";

export default function LiveShopping() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const show = liveShows.find((item) => item.id === id) ?? liveShows[0];
  const product = productById(show.productId);
  const seller = sellerById(show.sellerId);
  const addToCart = useAppStore((s) => s.addToCart);
  const following = useAppStore((s) => s.following);
  const toggleFollow = useAppStore((s) => s.toggleFollow);
  const [sheet, setSheet] = useState(false);
  const [qty, setQty] = useState(1);
  const pulse = useSharedValue(1);
  const hearts = useMemo(() => [24, 62, 42, 78], []);
  const heartStyle = useAnimatedStyle(() => ({ transform: [{ scale: pulse.value }] }));
  const react = () => { pulse.value = withSequence(withTiming(1.25, { duration: 120 }), withTiming(1, { duration: 140 })); };

  return (
    <ImageBackground source={{ uri: show.thumbnail }} style={{ flex: 1 }}>
      <LinearGradient colors={["rgba(0,0,0,0.62)", "rgba(0,0,0,0.12)", "rgba(0,0,0,0.72)"]} style={StyleSheet.absoluteFill} />
      <SafeAreaView style={styles.page}>
        <View style={styles.top}>
          <Pressable onPress={() => router.back()} style={styles.icon}><Ionicons name="chevron-back" size={24} color="#fff" /></Pressable>
          <Avatar uri={seller.avatar} size={38} />
          <View style={{ flex: 1 }}><Text style={styles.seller}>{seller.name} {seller.verified ? "✓" : ""}</Text><Text style={styles.liveMeta}>{show.viewers} watching</Text></View>
          <Pressable onPress={() => toggleFollow(seller.id)} style={styles.follow}><Text style={styles.followText}>{following.includes(seller.id) ? "Following" : "Follow"}</Text></Pressable>
          <LiveBadge />
          <Pressable style={styles.icon}><Ionicons name="share-social-outline" size={21} color="#fff" /></Pressable>
        </View>

        <View style={{ flex: 1 }} />
        <View pointerEvents="none" style={styles.hearts}>{hearts.map((right, index) => <Animated.Text entering={FadeInUp.delay(index * 200).duration(1600)} key={right} style={[styles.heart, { right, bottom: 90 + index * 50 }, heartStyle]}>♥</Animated.Text>)}</View>

        <Pressable onPress={() => setSheet(true)} style={styles.productCard}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <View style={{ flex: 1 }}>
            <Text numberOfLines={1} style={styles.productName}>{product.name}</Text>
            <PriceDisplay price={product.price} oldPrice={product.oldPrice} />
            <Text style={styles.stock}>{product.discount} • {product.stock} left</Text>
          </View>
          <AppButton title="Add" onPress={() => addToCart(product)} />
        </Pressable>

        <View style={styles.chat}>{chatMessages.map((message) => <BlurView key={message} intensity={18} style={styles.bubble}><Text style={styles.chatText}>{message}</Text></BlurView>)}</View>
        <View style={styles.composer}>
          <TextInput placeholder="Comment" placeholderTextColor="rgba(255,255,255,0.75)" style={styles.input} />
          <Pressable onPress={react} style={styles.round}><Ionicons name="heart" size={22} color={colors.live} /></Pressable>
          <Pressable style={styles.round}><Ionicons name="share-social-outline" size={22} color="#fff" /></Pressable>
          <Pressable onPress={() => router.push("/cart")} style={styles.round}><Ionicons name="bag-handle-outline" size={22} color="#fff" /></Pressable>
        </View>
      </SafeAreaView>
      <Modal visible={sheet} animationType="slide" transparent onRequestClose={() => setSheet(false)}>
        <Pressable style={styles.modalShade} onPress={() => setSheet(false)} />
        <View style={styles.sheet}>
          <View style={styles.grabber} />
          <ScrollView contentContainerStyle={{ gap: 14 }}>
            <Image source={{ uri: product.image }} style={styles.sheetImage} />
            <Text style={styles.sheetTitle}>{product.name}</Text>
            <Rating value={product.rating} count={product.reviews} />
            <PriceDisplay price={product.price} oldPrice={product.oldPrice} />
            <Text style={styles.desc}>{product.description}</Text>
            <Text style={styles.label}>Colors</Text><View style={styles.pills}>{product.colors.map((c) => <Text key={c} style={styles.pill}>{c}</Text>)}</View>
            <Text style={styles.label}>Variants</Text><View style={styles.pills}>{product.sizes.map((s) => <Text key={s} style={styles.pill}>{s}</Text>)}</View>
            <View style={styles.qty}><Pressable onPress={() => setQty(Math.max(1, qty - 1))}><Ionicons name="remove-circle-outline" size={30} color={colors.ink} /></Pressable><Text style={styles.qtyText}>{qty}</Text><Pressable onPress={() => setQty(qty + 1)}><Ionicons name="add-circle-outline" size={30} color={colors.ink} /></Pressable></View>
            <View style={{ flexDirection: "row", gap: 10 }}><View style={{ flex: 1 }}><AppButton title="Add to Cart" onPress={() => addToCart(product, { quantity: qty })} /></View><View style={{ flex: 1 }}><AppButton title="Buy Now" variant="dark" onPress={() => { addToCart(product, { quantity: qty }); router.push("/checkout"); }} /></View></View>
          </ScrollView>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, padding: 14 },
  top: { flexDirection: "row", alignItems: "center", gap: 9 },
  icon: { width: 38, height: 38, borderRadius: 19, backgroundColor: "rgba(0,0,0,0.28)", alignItems: "center", justifyContent: "center" },
  seller: { color: "#fff", fontWeight: "900" },
  liveMeta: { color: "rgba(255,255,255,0.78)", fontSize: 12 },
  follow: { backgroundColor: "#fff", borderRadius: radius.pill, paddingHorizontal: 13, paddingVertical: 8 },
  followText: { color: colors.ink, fontWeight: "900", fontSize: 12 },
  hearts: { ...StyleSheet.absoluteFill },
  heart: { position: "absolute", color: colors.live, fontSize: 30 },
  productCard: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "rgba(255,255,255,0.94)", borderRadius: radius.lg, padding: 10 },
  productImage: { width: 68, height: 68, borderRadius: radius.md },
  productName: { color: colors.ink, fontWeight: "900" },
  stock: { color: colors.muted, fontSize: 12, fontWeight: "700" },
  chat: { gap: 7, marginTop: 12 },
  bubble: { alignSelf: "flex-start", overflow: "hidden", borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 8 },
  chatText: { color: "#fff", fontWeight: "700" },
  composer: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 12 },
  input: { flex: 1, height: 46, borderRadius: radius.pill, backgroundColor: "rgba(255,255,255,0.18)", paddingHorizontal: 16, color: "#fff" },
  round: { width: 46, height: 46, borderRadius: 23, backgroundColor: "rgba(255,255,255,0.18)", alignItems: "center", justifyContent: "center" },
  modalShade: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)" },
  sheet: { maxHeight: "82%", backgroundColor: "#fff", borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: 18 },
  grabber: { width: 44, height: 5, borderRadius: 3, backgroundColor: "#D7D9DF", alignSelf: "center", marginBottom: 12 },
  sheetImage: { width: "100%", height: 220, borderRadius: radius.lg },
  sheetTitle: { color: colors.ink, fontSize: 22, fontWeight: "900" },
  desc: { color: colors.muted, lineHeight: 22 },
  label: { color: colors.ink, fontWeight: "900" },
  pills: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  pill: { paddingHorizontal: 13, paddingVertical: 8, borderRadius: radius.pill, backgroundColor: "#F0F1F4", color: colors.ink, fontWeight: "800" },
  qty: { flexDirection: "row", alignItems: "center", gap: 15 },
  qtyText: { fontSize: 18, fontWeight: "900" }
});
