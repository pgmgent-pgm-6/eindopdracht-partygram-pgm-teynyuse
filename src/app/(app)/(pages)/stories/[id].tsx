import { getStory } from "../../../../core/modules/stories/api";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { useQuery} from "@tanstack/react-query";
import { useState } from "react";
import { Text, View } from "../../../../components/Themed";
import { Image, StyleSheet } from "react-native";


const StoryDetail = () => {
    const router = useRouter();
    const navigation = useNavigation();
    const [story, setStory] = useState(null);

    const { id } = useLocalSearchParams<{ id: string }>();

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        numColumns: 4,
    },
    item: {
        width: "25%",
        padding: 2,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    });

    useEffect(() => {
        const fetchStory = async () => {
            const storyData = await getStory(id);
            setStory(storyData);
        };
        fetchStory();
    }, []);

    return (
      <View>
        <Image
          style={styles.image}
          source={{ uri: story?.image || undefined }}
        />
      </View>
    );
    };

export default StoryDetail;