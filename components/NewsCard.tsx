import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";

type Props = {
  news?: any;
};

export const NewsCard = ({ news }: Props) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: news.urlToImage }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{news.title}</Text>
        <Text style={styles.description}>{news.description}</Text>
        <Text style={styles.author}>By {news.author}</Text>
        <Text style={styles.date}>
          {new Date(news.publishedAt).toDateString()}
        </Text>
        <TouchableOpacity
          onPress={() => Linking.openURL(news.url)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Read More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  image: {
    height: 200,
    width: "100%",
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  author: {
    fontSize: 12,
    color: "#888",
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: "#aaa",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#1e90ff",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
