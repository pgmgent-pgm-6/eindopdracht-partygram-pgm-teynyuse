import { Tabs, useRouter } from "expo-router";
import { DefaultNavigatorOptions, Variables } from "@style";
import Icons from "@expo/vector-icons/MaterialCommunityIcons";

const getTabIcon = (name: string, focused: boolean) => {
  let icon = "";
  switch (name) {
    case "index":
      icon = "home";
      break;
    case "profile":
      icon = "account";
      break;
    case "search":
      icon = "magnify";
      break;
    case "chat":
      icon = "message";
      break;
    case "create":
      icon = "plus";
      break;
  }
  return icon;
};

const TabLayout = () => {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <Icons
            name={getTabIcon(route.name, focused)}
            size={size}
            color={color}
          />
        ),
        tabBarInactiveTintColor: Variables.colors.gray,
        ...DefaultNavigatorOptions.screenOptions,
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Add Post",
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chats",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
