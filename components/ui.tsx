import { Ionicons } from "@expo/vector-icons";
import { GestureResponderEvent, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { colors, radius, shadow, spacing } from "@/constants/theme";
import { Product, Seller } from "@/types";
import { money } from "@/utils/money";

export function AppButton({ title, onPress, variant = "primary", icon }: { title: string; onPress?: () => void; variant?: "primary" | "dark" | "ghost"; icon?: keyof typeof Ionicons.glyphMap }) {
  return (
    <Pressable onPress={onPress} style={[styles.button, variant === "dark" && styles.darkButton, variant === "ghost" && styles.ghostButton]}>
      {icon ? <Ionicons name={icon} size={18} color={variant === "ghost" ? colors.ink : "#fff"} /> : null}
      <Text style={[styles.buttonText, variant === "ghost" && styles.ghostText]}>{title}</Text>
    </Pressable>
  );
}

export function Avatar({ uri, size = 44 }: { uri: string; size?: number }) {
  return <Image source={{ uri }} style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: colors.line }} />;
}

export function LiveBadge() {
  return (
    <View style={styles.liveBadge}>
      <Text style={styles.liveBadgeText}>LIVE</Text>
    </View>
  );
}

export function SearchBar({ placeholder = "Search products, sellers, live shows" }: { placeholder?: string }) {
  return (
    <View style={styles.search}>
      <Ionicons name="search-outline" size={20} color={colors.muted} />
      <TextInput placeholder={placeholder} placeholderTextColor={colors.muted} style={styles.searchInput} />
    </View>
  );
}

export function CategoryChip({ name, icon, active }: { name: string; icon: keyof typeof Ionicons.glyphMap; active?: boolean }) {
  return (
    <Pressable style={[styles.chip, active && styles.activeChip]}>
      <Ionicons name={icon} size={17} color={active ? "#fff" : colors.ink} />
      <Text style={[styles.chipText, active && { color: "#fff" }]}>{name}</Text>
    </Pressable>
  );
}

export function Rating({ value, count }: { value: number; count?: number }) {
  return (
    <View style={styles.row}>
      <Ionicons name="star" size={15} color={colors.gold} />
      <Text style={styles.meta}>{value.toFixed(1)}{count ? ` (${count})` : ""}</Text>
    </View>
  );
}

export function PriceDisplay({ price, oldPrice }: { price: number; oldPrice?: number }) {
  return (
    <View style={styles.priceRow}>
      <Text style={styles.price}>{money(price)}</Text>
      {oldPrice ? <Text style={styles.oldPrice}>{money(oldPrice)}</Text> : null}
    </View>
  );
}

export function ProductCard({ product, onPress, onFavorite, favorite }: { product: Product; onPress?: () => void; onFavorite?: () => void; favorite?: boolean }) {
  return (
    <Pressable onPress={onPress} style={styles.productCard}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Pressable onPress={onFavorite} style={styles.fav}>
        <Ionicons name={favorite ? "heart" : "heart-outline"} size={18} color={favorite ? colors.live : colors.ink} />
      </Pressable>
      <Text numberOfLines={2} style={styles.productName}>{product.name}</Text>
      <Rating value={product.rating} />
      <PriceDisplay price={product.price} oldPrice={product.oldPrice} />
    </Pressable>
  );
}

export function LiveStreamCard({ show, seller, onPress, wide }: { show: { title: string; thumbnail: string; viewers: string; live: boolean }; seller: Seller; onPress?: () => void; wide?: boolean }) {
  return (
    <Pressable onPress={onPress} style={[styles.liveCard, wide && styles.liveCardWide]}>
      <Image source={{ uri: show.thumbnail }} style={styles.liveImage} />
      <View style={styles.liveOverlay} />
      <View style={styles.liveTop}>{show.live ? <LiveBadge /> : <Text style={styles.upcoming}>UPCOMING</Text>}<Text style={styles.viewer}>{show.viewers}</Text></View>
      <View style={styles.liveBottom}>
        <Avatar uri={seller.avatar} size={32} />
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={styles.liveTitle}>{show.title}</Text>
          <Text style={styles.liveSeller}>{seller.name}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export function SellerCard({ seller, followed, onToggle, onPress }: { seller: Seller; followed?: boolean; onToggle?: () => void; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.sellerCard}>
      <Avatar uri={seller.avatar} size={56} />
      <Text numberOfLines={1} style={styles.sellerName}>{seller.name}</Text>
      <Rating value={seller.rating} />
      <Pressable
        onPress={(event: GestureResponderEvent) => {
          event.stopPropagation();
          onToggle?.();
        }}
        style={[styles.followMini, followed && { backgroundColor: colors.ink }]}
      >
        <Text style={[styles.followText, followed && { color: "#fff" }]}>{followed ? "Following" : "Follow"}</Text>
      </Pressable>
    </Pressable>
  );
}

export function EmptyState({ title, body, icon = "bag-outline" }: { title: string; body: string; icon?: keyof typeof Ionicons.glyphMap }) {
  return (
    <View style={styles.empty}>
      <Ionicons name={icon} size={42} color={colors.muted} />
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyBody}>{body}</Text>
    </View>
  );
}

export const screen = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.page },
  content: { padding: spacing.md, gap: spacing.md },
  h1: { fontSize: 30, lineHeight: 36, color: colors.ink, fontWeight: "800" },
  h2: { fontSize: 21, color: colors.ink, fontWeight: "800" },
  h3: { fontSize: 17, color: colors.ink, fontWeight: "800" },
  body: { fontSize: 15, lineHeight: 22, color: colors.muted },
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }
});

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 4 },
  button: { minHeight: 50, borderRadius: radius.md, backgroundColor: colors.live, paddingHorizontal: 18, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8 },
  darkButton: { backgroundColor: colors.ink },
  ghostButton: { backgroundColor: "#F0F1F4" },
  buttonText: { color: "#fff", fontSize: 15, fontWeight: "800" },
  ghostText: { color: colors.ink },
  liveBadge: { backgroundColor: colors.live, borderRadius: radius.sm, paddingHorizontal: 8, paddingVertical: 4 },
  liveBadgeText: { color: "#fff", fontSize: 11, fontWeight: "900" },
  search: { height: 52, borderRadius: radius.md, backgroundColor: colors.card, paddingHorizontal: 14, flexDirection: "row", alignItems: "center", gap: 10, borderWidth: 1, borderColor: colors.line },
  searchInput: { flex: 1, color: colors.ink, fontSize: 15 },
  chip: { flexDirection: "row", gap: 7, alignItems: "center", paddingHorizontal: 13, height: 40, borderRadius: radius.pill, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line },
  activeChip: { backgroundColor: colors.ink, borderColor: colors.ink },
  chipText: { color: colors.ink, fontWeight: "700" },
  meta: { color: colors.muted, fontSize: 13, fontWeight: "700" },
  priceRow: { flexDirection: "row", alignItems: "baseline", gap: 7, flexWrap: "wrap" },
  price: { fontSize: 16, fontWeight: "900", color: colors.ink },
  oldPrice: { fontSize: 12, color: colors.muted, textDecorationLine: "line-through" },
  productCard: { width: 166, padding: 10, borderRadius: radius.md, backgroundColor: colors.card, gap: 8, ...shadow },
  productImage: { width: "100%", height: 132, borderRadius: radius.sm, backgroundColor: colors.line },
  fav: { position: "absolute", top: 18, right: 18, width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.88)", alignItems: "center", justifyContent: "center" },
  productName: { minHeight: 39, color: colors.ink, fontWeight: "800", lineHeight: 19 },
  liveCard: { width: 240, height: 210, borderRadius: radius.lg, overflow: "hidden", backgroundColor: colors.dark },
  liveCardWide: { width: "100%" },
  liveImage: { ...StyleSheet.absoluteFill },
  liveOverlay: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(0,0,0,0.28)" },
  liveTop: { padding: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  viewer: { color: "#fff", fontWeight: "800", fontSize: 12 },
  upcoming: { color: "#fff", backgroundColor: "rgba(255,255,255,0.2)", overflow: "hidden", borderRadius: radius.sm, paddingHorizontal: 8, paddingVertical: 4, fontSize: 11, fontWeight: "900" },
  liveBottom: { position: "absolute", left: 12, right: 12, bottom: 12, flexDirection: "row", alignItems: "center", gap: 10 },
  liveTitle: { color: "#fff", fontSize: 15, fontWeight: "900" },
  liveSeller: { color: "rgba(255,255,255,0.82)", fontSize: 12, fontWeight: "700" },
  sellerCard: { width: 136, backgroundColor: colors.card, borderRadius: radius.md, padding: 12, alignItems: "center", gap: 7, ...shadow },
  sellerName: { color: colors.ink, fontWeight: "900" },
  followMini: { borderRadius: radius.pill, backgroundColor: "#F0F1F4", paddingHorizontal: 14, paddingVertical: 7 },
  followText: { color: colors.ink, fontWeight: "800", fontSize: 12 },
  empty: { minHeight: 220, alignItems: "center", justifyContent: "center", gap: 8, padding: spacing.lg },
  emptyTitle: { color: colors.ink, fontSize: 18, fontWeight: "900" },
  emptyBody: { color: colors.muted, textAlign: "center", lineHeight: 21 }
});
