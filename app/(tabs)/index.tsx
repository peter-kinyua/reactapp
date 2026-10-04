import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Image, ImageBackground, Modal, Pressable, StyleSheet, Text, TextInput, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, LiveBadge, PriceDisplay } from "@/components/ui";
import { colors, radius } from "@/constants/theme";
import { chatMessages, liveShows, productById, sellerById } from "@/data/mock";
import { useAppStore } from "@/store/appStore";

export default function Home() {
  const { height } = useWindowDimensions();
  const feedHeight = Math.max(580, height - 66);
  const addToCart = useAppStore((state) => state.addToCart);
  const [customBidFor, setCustomBidFor] = useState<string | null>(null);
  const [customBid, setCustomBid] = useState("");
  const [lastBid, setLastBid] = useState<{ product: string; amount: number } | null>(null);

  const activeProduct = useMemo(() => {
    const show = liveShows.find((item) => item.id === customBidFor);
    return show ? productById(show.productId) : null;
  }, [customBidFor]);

  const placeBid = (productName: string, amount: number) => {
    setLastBid({ product: productName, amount });
    setCustomBidFor(null);
    setCustomBid("");
  };

  return (
    <View style={styles.page}>
      <FlatList
        data={liveShows}
        keyExtractor={(item) => item.id}
        pagingEnabled
        snapToInterval={feedHeight}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const seller = sellerById(item.sellerId);
          const product = productById(item.productId);
          const currentBid = product.price - 400 + index * 250;
          const quickBid = currentBid + 500;
          const messages = chatMessages.slice(index, index + 3).length ? chatMessages.slice(index, index + 3) : chatMessages.slice(0, 3);

          return (
            <ImageBackground source={{ uri: item.thumbnail }} style={[styles.stream, { height: feedHeight }]}>
              <LinearGradient colors={["rgba(0,0,0,0.64)", "rgba(0,0,0,0.08)", "rgba(0,0,0,0.88)"]} style={StyleSheet.absoluteFill} />
              <SafeAreaView style={styles.safe}>
                <View style={styles.topBar}>
                  <Text style={styles.logo}>LumaLive</Text>
                  <Pressable onPress={() => router.push("/notifications")} style={styles.topIcon}>
                    <Ionicons name="notifications-outline" size={22} color="#fff" />
                  </Pressable>
                </View>

                <View style={{ flex: 1 }} />

                <View style={styles.sideActions}>
                  <Pressable style={styles.action}><Ionicons name="heart" size={25} color="#fff" /><Text style={styles.actionText}>24K</Text></Pressable>
                  <Pressable style={styles.action}><Ionicons name="chatbubble-ellipses" size={24} color="#fff" /><Text style={styles.actionText}>318</Text></Pressable>
                  <Pressable onPress={() => router.push(`/live/${item.id}`)} style={styles.action}><Ionicons name="bag-handle" size={24} color="#fff" /><Text style={styles.actionText}>Shop</Text></Pressable>
                  <Pressable style={styles.action}><Ionicons name="share-social" size={24} color="#fff" /><Text style={styles.actionText}>Share</Text></Pressable>
                </View>

                <View style={styles.bottom}>
                  <View style={styles.sellerRow}>
                    <Avatar uri={seller.avatar} size={40} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.seller}>{seller.name} {seller.verified ? "✓" : ""}</Text>
                      <Text style={styles.meta}>{item.live ? `${item.viewers} watching` : item.startsAt}</Text>
                    </View>
                    {item.live ? <LiveBadge /> : <Text style={styles.upcoming}>UPCOMING</Text>}
                  </View>

                  <Pressable onPress={() => router.push(`/live/${item.id}`)}>
                    <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
                    <Text numberOfLines={2} style={styles.caption}>Swipe for more auctions. Tap the stream for full chat, product details, and checkout.</Text>
                  </Pressable>

                  <View style={styles.chatStack}>
                    {messages.map((message) => (
                      <View key={message} style={styles.chatBubble}>
                        <Text numberOfLines={1} style={styles.chatText}>{message}</Text>
                      </View>
                    ))}
                  </View>

                  <Pressable onPress={() => router.push(`/product/${product.id}`)} style={styles.productCard}>
                    <Image source={{ uri: product.image }} style={styles.productImage} />
                    <View style={{ flex: 1 }}>
                      <Text numberOfLines={1} style={styles.productName}>{product.name}</Text>
                      <PriceDisplay price={product.price} oldPrice={product.oldPrice} />
                    </View>
                    <Pressable onPress={() => addToCart(product)} style={styles.addButton}>
                      <Ionicons name="add" size={22} color="#fff" />
                    </Pressable>
                  </Pressable>

                  <View style={styles.bidPanel}>
                    <View>
                      <Text style={styles.bidLabel}>Current bid</Text>
                      <Text style={styles.bidAmount}>KSh {currentBid.toLocaleString("en-KE")}</Text>
                    </View>
                    <View style={styles.bidButtons}>
                      <Pressable onPress={() => placeBid(product.name, quickBid)} style={styles.bidButton}>
                        <Ionicons name="flash" size={18} color="#fff" />
                        <Text style={styles.bidButtonText}>Bid KSh {quickBid.toLocaleString("en-KE")}</Text>
                      </Pressable>
                      <Pressable onPress={() => setCustomBidFor(item.id)} style={styles.customButton}>
                        <Ionicons name="create-outline" size={18} color="#fff" />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </SafeAreaView>
            </ImageBackground>
          );
        }}
      />

      {lastBid ? (
        <View style={styles.toast}>
          <Ionicons name="checkmark-circle" size={18} color={colors.mint} />
          <Text numberOfLines={1} style={styles.toastText}>Bid placed: KSh {lastBid.amount.toLocaleString("en-KE")}</Text>
        </View>
      ) : null}

      <Modal visible={Boolean(customBidFor)} transparent animationType="slide" onRequestClose={() => setCustomBidFor(null)}>
        <Pressable style={styles.modalShade} onPress={() => setCustomBidFor(null)} />
        <View style={styles.sheet}>
          <Text style={styles.sheetTitle}>Set custom bid</Text>
          <Text style={styles.sheetBody}>{activeProduct?.name}</Text>
          <TextInput
            value={customBid}
            onChangeText={setCustomBid}
            keyboardType="number-pad"
            placeholder="Enter amount in KSh"
            placeholderTextColor={colors.muted}
            style={styles.bidInput}
          />
          <Pressable
            onPress={() => activeProduct && placeBid(activeProduct.name, Number(customBid || activeProduct.price))}
            style={styles.sheetBidButton}
          >
            <Text style={styles.sheetBidText}>Place Bid</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.dark },
  stream: { width: "100%", backgroundColor: colors.dark },
  safe: { flex: 1, paddingHorizontal: 14, paddingBottom: 12 },
  topBar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  logo: { color: "#fff", fontSize: 21, fontWeight: "900" },
  topIcon: { width: 42, height: 42, borderRadius: 21, backgroundColor: "rgba(0,0,0,0.28)", alignItems: "center", justifyContent: "center" },
  sideActions: { position: "absolute", right: 14, bottom: 230, alignItems: "center", gap: 16 },
  action: { width: 48, alignItems: "center", gap: 4 },
  actionText: { color: "#fff", fontSize: 11, fontWeight: "900" },
  bottom: { paddingRight: 58, gap: 10 },
  sellerRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  seller: { color: "#fff", fontSize: 15, fontWeight: "900" },
  meta: { color: "rgba(255,255,255,0.78)", fontSize: 12, fontWeight: "700" },
  upcoming: { color: "#fff", backgroundColor: "rgba(255,255,255,0.2)", overflow: "hidden", borderRadius: radius.sm, paddingHorizontal: 8, paddingVertical: 4, fontSize: 11, fontWeight: "900" },
  title: { color: "#fff", fontSize: 22, lineHeight: 27, fontWeight: "900" },
  caption: { marginTop: 3, color: "rgba(255,255,255,0.78)", fontSize: 13, lineHeight: 18, fontWeight: "700" },
  chatStack: { gap: 5 },
  chatBubble: { alignSelf: "flex-start", maxWidth: "92%", borderRadius: radius.pill, backgroundColor: "rgba(0,0,0,0.34)", paddingHorizontal: 11, paddingVertical: 6 },
  chatText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  productCard: { minHeight: 70, flexDirection: "row", alignItems: "center", gap: 10, borderRadius: radius.lg, backgroundColor: "rgba(255,255,255,0.94)", padding: 8 },
  productImage: { width: 54, height: 54, borderRadius: radius.md },
  productName: { color: colors.ink, fontSize: 14, fontWeight: "900" },
  addButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.live, alignItems: "center", justifyContent: "center" },
  bidPanel: { borderRadius: radius.lg, backgroundColor: "rgba(16,17,20,0.86)", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", padding: 10, gap: 10 },
  bidLabel: { color: "rgba(255,255,255,0.68)", fontSize: 12, fontWeight: "800" },
  bidAmount: { color: "#fff", fontSize: 24, fontWeight: "900" },
  bidButtons: { flexDirection: "row", gap: 8 },
  bidButton: { flex: 1, minHeight: 48, borderRadius: radius.md, backgroundColor: colors.live, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingHorizontal: 10 },
  bidButtonText: { color: "#fff", fontSize: 14, fontWeight: "900" },
  customButton: { width: 50, minHeight: 48, borderRadius: radius.md, backgroundColor: "rgba(255,255,255,0.16)", alignItems: "center", justifyContent: "center" },
  toast: { position: "absolute", left: 16, right: 16, top: 56, minHeight: 44, borderRadius: radius.pill, backgroundColor: "rgba(16,17,20,0.92)", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingHorizontal: 14 },
  toastText: { color: "#fff", fontWeight: "900" },
  modalShade: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)" },
  sheet: { backgroundColor: "#fff", borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: 18, gap: 12 },
  sheetTitle: { color: colors.ink, fontSize: 23, fontWeight: "900" },
  sheetBody: { color: colors.muted, fontWeight: "700" },
  bidInput: { height: 54, borderRadius: radius.md, borderWidth: 1, borderColor: colors.line, paddingHorizontal: 14, color: colors.ink, fontSize: 18, fontWeight: "800" },
  sheetBidButton: { height: 52, borderRadius: radius.md, backgroundColor: colors.live, alignItems: "center", justifyContent: "center" },
  sheetBidText: { color: "#fff", fontWeight: "900" }
});
