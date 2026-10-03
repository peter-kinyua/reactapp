import { Link, router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton } from "@/components/ui";
import { colors, radius } from "@/constants/theme";
import { useAppStore } from "@/store/appStore";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAppStore((state) => state.login);
  const submit = () => {
    if (name.trim() && email.trim() && password.trim()) {
      login();
      router.replace("/(tabs)");
    }
  };
  return (
    <SafeAreaView style={styles.page}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.wrap}>
        <Text style={styles.logo}>LumaLive</Text>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.body}>Start following live sellers and saving products you love.</Text>
        <TextInput value={name} onChangeText={setName} placeholder="Full name" style={styles.input} />
        <TextInput value={email} onChangeText={setEmail} placeholder="Email" autoCapitalize="none" style={styles.input} />
        <TextInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry style={styles.input} />
        <AppButton title="Sign Up" onPress={submit} icon="person-add-outline" />
        <Text style={styles.footer}>Already have an account? <Link href="/auth/login" style={styles.linkStrong}>Login</Link></Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.page },
  wrap: { flex: 1, padding: 22, justifyContent: "center", gap: 14 },
  logo: { color: colors.live, fontSize: 22, fontWeight: "900" },
  title: { color: colors.ink, fontSize: 34, fontWeight: "900" },
  body: { color: colors.muted, lineHeight: 22, marginBottom: 8 },
  input: { height: 54, borderRadius: radius.md, borderWidth: 1, borderColor: colors.line, backgroundColor: "#fff", paddingHorizontal: 14, fontSize: 15 },
  footer: { textAlign: "center", color: colors.muted },
  linkStrong: { color: colors.live, fontWeight: "900" }
});
