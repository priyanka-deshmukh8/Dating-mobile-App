// App.tsx
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Swiper from 'react-native-swiper';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Match: undefined;
};

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeScreenProps = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

const Stack = createStackNavigator();

const profiles = [
  { id: 1, name: 'John', age: 28, gender: 'Male', location: 'New York', bio: 'Looking for someone special', photo: require('./assets/john.jpeg') },
  { id: 2, name: 'Jane', age: 25, gender: 'Female', location: 'Los Angeles', bio: 'Adventurous soul', photo: require('./assets/jane.jpeg') },
  // Add more profiles as needed
];


const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swipeAnim = new Animated.Value(0);

  const handleSwipe = (index: number, isRight: boolean) => {
    // Handle left or right swipe logic here
    // You can implement liking, disliking, and matching logic
    // For simplicity, let's just update the currentIndex
    setCurrentIndex(index + 1);

    // Animate the card
    Animated.timing(swipeAnim, {
      toValue: isRight ? 1 : -1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      swipeAnim.setValue(0);
    });
  };

  const cardStyle = {
    transform: [
      {
        translateX: swipeAnim.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [-300, 0, 300],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Swiper
  loop={false}
  showsButtons={false}
  showsPagination={false}
  onIndexChanged={(index) => setCurrentIndex(index)}
  style={styles.swiper}
>
  {profiles.map((profile, index) => (
    <Animated.View key={profile.id} style={[styles.card, cardStyle]}>
      <Image
        source={profile.photo} // Use the profile's photo property
        style={styles.image}
      />
      <Text style={styles.name}>{`${profile.name}, ${profile.age}`}</Text>
      <Text style={styles.details}>{`${profile.gender}, ${profile.location}`}</Text>
      <Text style={styles.bio}>{profile.bio}</Text>
    </Animated.View>
  ))}
</Swiper>


      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.dislikeButton]} onPress={() => handleSwipe(currentIndex, false)}>
          <Text style={styles.buttonText}>Dislike</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.likeButton]} onPress={() => handleSwipe(currentIndex, true)}>
          <Text style={styles.buttonText}>Like</Text>
        </TouchableOpacity>
        {/* Add Super Like button */}
      </View>

      {/* Display match animation if there is a match */}
      <TouchableOpacity style={styles.matchButton} onPress={() => navigation.navigate('Match')}>
        <Text style={styles.matchButtonText}>It's a Match!</Text>
      </TouchableOpacity>
    </View>
  );
};

const MatchScreen: React.FC = () => (
  <View style={styles.matchContainer}>
    <Text style={styles.matchText}>Congratulations! You have a match!</Text>
    {/* Add additional match screen UI */}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  swiper: {
    flex: 1,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  details: {
    fontSize: 16,
    marginBottom: 10,
  },
  bio: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },
  dislikeButton: {
    backgroundColor: '#e74c3c',
  },
  likeButton: {
    backgroundColor: '#2ecc71',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  matchButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#3498db',
  },
  matchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  matchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
  },
  matchText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Match" component={MatchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
