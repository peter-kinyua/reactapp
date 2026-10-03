import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton, Avatar, LiveStreamCard, ProductCard, Rating, screen } from "@/components/ui";
import { colors, radius } from "@/constants/theme";
import { liveShows, products, sellerById } from "@/data/mock";
import { useAppStore } from "@/store/appStore";

export default function SellerProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const seller = sellerById(id ?? "");
  const following = useAppStore((s) => s.following);
  const toggleFollow = useAppStore((s) => s.toggleFollow);
  const sellerProducts = products.filter((p) => p.sellerId === seller.id);
  return (
    <SafeAreaView style={screen.page}>
      <ScrollView>
        <ImageBackground source={{ uri: seller.cover }} style={styles.cover}><Pressable onPress={() => router.back()} style={styles.back}><Ionicons name="chevron-back" size={25} color="#fff" /></Pressable></ImageBackground>
        <View style={styles.content}>
          <Avatar uri={seller.avatar} size={86} />
          <Text style={screen.h1}>{seller.name} {seller.verified ? "✓" : ""}</Text>
          <Text style={screen.body}>{seller.bio}</Text>
          <View style={styles.stats}><Text style={styles.stat}>{seller.followers} followers</Text><Rating value={seller.rating} /></View>
          <AppButton title={following.includes(seller.id) ? "Following" : "Follow"} onPress={() => toggleFollow(seller.id)} />
          <Text style={screen.h2}>Products</Text>
          <View style={{ flexDirection: "row", gap: 12 }}>{sellerProducts.map((p) => <ProductCard key={p.id} product={p} onPress={() => router.push(`/product/${p.id}`)} />)}</View>
          <Text style={screen.h2}>Live Now</Text>
          {liveShows.filter((s) => s.sellerId === seller.id).map((show) => <LiveStreamCard key={show.id} show={show} seller={seller} wide onPress={() => router.push(`/live/${show.id}`)} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cover: { height: 210, padding: 14 },
  back: { width: 42, height: 42, borderRadius: 21, backgroundColor: "rgba(0,0,0,0.28)", alignItems: "center", justifyContent: "center" },
  content: { padding: 16, gap: 14 },
  stats: { flexDirection: "row", gap: 16, alignItems: "center" },
  stat: { color: colors.ink, fontWeight: "900", backgroundColor: "#fff", borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 8 }
});
