import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useAuthContext } from "@shared/Auth/AuthProvider";
import { createProfile, getProfile } from "../../../core/modules/profiles/api";
import { logout } from "../../../core/modules/auth/api";
import UserPosts from "../../../components/Page/UserPosts";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import ProfileForm from "@shared/User/ProfileForm";

const ProfileScreen = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["profile", user?.id ?? ""],
    queryFn: () => getProfile(user?.id ?? ""),
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!profile) {
    router.push("/login"); 
    return null; 
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: profile?.avatar ?? undefined }}
          style={styles.avatar}
        />
        <View>
          <View>
            <Text style={styles.userInfo}>
              {profile?.first_name ?? ""} {profile?.last_name ?? ""}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "normal",
                marginRight: "auto",
              }}
            >
              {profile?.username ?? ""}
            </Text>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => logout()}
            >
              <Text style={{ color: "#fff" }}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton}>
              <Text style={{ color: "#fff" }}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.tabs}>
          <TouchableOpacity style={styles.tab}>
            <Text>Posts</Text>
          </TouchableOpacity>
        </View>
        <View>
          <UserPosts />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  buttons:{
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  username: {
    fontSize: 18,
    fontWeight: "light",
    marginRight: "auto",
  },
  userInfo: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: "auto",
  },
  editButton: {
    backgroundColor: "#000",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginRight: 5,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tab: {
    paddingVertical: 10,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  photo: {
    width: "30%",
    aspectRatio: 1,
    marginBottom: 10,
  },
});

export default ProfileScreen;
