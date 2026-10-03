import { router } from "expo-router";
import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CategoryChip, LiveStreamCard, ProductCard, SearchBar, SellerCard, screen } from "@/components/ui";
import { categories, liveShows, products, sellerById, sellers } from "@/data/mock";
import { useAppStore } from "@/store/appStore";

export default function Explore() {
  const following = useAppStore((s) => s.following);
  const toggleFollow = useAppStore((s) => s.toggleFollow);
  return (
    <SafeAreaView style={screen.page}>
      <ScrollView contentContainerStyle={screen.content}>
        <Text style={screen.h1}>Explore</Text>
        <SearchBar placeholder="Search deals, creators, collections" />
        <FlatList horizontal data={categories} keyExtractor={(i) => i.id} renderItem={({ item }) => <CategoryChip name={item.name} icon={item.icon as never} />} ItemSeparatorComponent={() => <View style={{ width: 9 }} />} />
        <Text style={screen.h2}>Popular sellers</Text>
        <FlatList horizontal data={sellers} keyExtractor={(i) => i.id} renderItem={({ item }) => <SellerCard seller={item} followed={following.includes(item.id)} onToggle={() => toggleFollow(item.id)} onPress={() => router.push(`/seller/${item.id}`)} />} ItemSeparatorComponent={() => <View style={{ width: 12 }} />} />
        <Text style={screen.h2}>Trending products</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>{products.map((p) => <ProductCard key={p.id} product={p} onPress={() => router.push(`/product/${p.id}`)} />)}</View>
        <Text style={screen.h2}>Live shows</Text>
        {liveShows.map((show) => <LiveStreamCard key={show.id} show={show} seller={sellerById(show.sellerId)} wide onPress={() => router.push(`/live/${show.id}`)} />)}
      </ScrollView>
    </SafeAreaView>
  );
}
