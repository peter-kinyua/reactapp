import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, CategoryChip, LiveStreamCard, ProductCard, SearchBar, SellerCard, screen } from "@/components/ui";
import { colors } from "@/constants/theme";
import { categories, currentUser, liveShows, products, sellerById, sellers } from "@/data/mock";
import { useAppStore } from "@/store/appStore";

export default function Discover() {
  const favorites = useAppStore((s) => s.favorites);
  const following = useAppStore((s) => s.following);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const toggleFollow = useAppStore((s) => s.toggleFollow);

  return (
    <SafeAreaView style={screen.page}>
      <ScrollView contentContainerStyle={screen.content} showsVerticalScrollIndicator={false}>
        <View style={screen.rowBetween}>
          <View>
            <Text style={screen.body}>Good evening</Text>
            <Text style={screen.h1}>{currentUser.name.split(" ")[0]}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Pressable onPress={() => router.push("/notifications")}>
              <Ionicons name="notifications-outline" size={25} color={colors.ink} />
            </Pressable>
            <Avatar uri={currentUser.avatar} />
          </View>
        </View>
        <SearchBar />
        <FlatList horizontal data={categories} keyExtractor={(i) => i.id} renderItem={({ item, index }) => <CategoryChip name={item.name} icon={item.icon as never} active={index === 0} />} ItemSeparatorComponent={() => <View style={{ width: 9 }} />} showsHorizontalScrollIndicator={false} />
        <View style={screen.rowBetween}><Text style={screen.h2}>Live Now</Text><Text style={screen.body}>See all</Text></View>
        <FlatList horizontal data={liveShows.filter((s) => s.live)} keyExtractor={(i) => i.id} renderItem={({ item }) => <LiveStreamCard show={item} seller={sellerById(item.sellerId)} onPress={() => router.push(`/live/${item.id}`)} />} ItemSeparatorComponent={() => <View style={{ width: 14 }} />} showsHorizontalScrollIndicator={false} />
        <Text style={screen.h2}>Featured sellers</Text>
        <FlatList horizontal data={sellers} keyExtractor={(i) => i.id} renderItem={({ item }) => <SellerCard seller={item} followed={following.includes(item.id)} onToggle={() => toggleFollow(item.id)} onPress={() => router.push(`/seller/${item.id}`)} />} ItemSeparatorComponent={() => <View style={{ width: 12 }} />} showsHorizontalScrollIndicator={false} />
        <Text style={screen.h2}>Trending products</Text>
        <FlatList horizontal data={products} keyExtractor={(i) => i.id} renderItem={({ item }) => <ProductCard product={item} favorite={favorites.includes(item.id)} onFavorite={() => toggleFavorite(item.id)} onPress={() => router.push(`/product/${item.id}`)} />} ItemSeparatorComponent={() => <View style={{ width: 12 }} />} showsHorizontalScrollIndicator={false} />
        <Text style={screen.h2}>Upcoming live shows</Text>
        {liveShows.filter((s) => !s.live).map((show) => <LiveStreamCard key={show.id} show={show} seller={sellerById(show.sellerId)} wide onPress={() => router.push(`/live/${show.id}`)} />)}
      </ScrollView>
    </SafeAreaView>
  );
}
