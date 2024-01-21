import { useAuthContext } from "@shared/Auth/AuthProvider";
import { getProfile } from "../../../core/modules/profiles/api";
import React, { useState, useEffect } from "react";
import {
    Text,
    View,
} from "react-native";

const GetProfile = ({ onProfileLoaded }:any) => {
  // Pass onProfileLoaded prop
  const { user } = useAuthContext();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user) {
      getProfile(user.id).then((profile) => {
        setProfile(profile);
        onProfileLoaded(profile);
      });
    }
  }, [user]);

  if (!user || !profile) {
    return null;
  }a

  return (
    <View>
      <Text>{profile.id}</Text>
    </View>
  );
};

export default GetProfile;
