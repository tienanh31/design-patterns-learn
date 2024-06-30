import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useStudiedPatterns } from '../StudiedPatternsContext';

const { width } = Dimensions.get('window');

const TestingScreen: React.FC = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { studiedPatterns } = useStudiedPatterns();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const onViewRef = useRef(({ viewableItems }: { viewableItems: Array<{ index: number }> }) => {
    setActiveIndex(viewableItems[0]?.index ?? 0);
  });

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  useEffect(() => {
    if (isFocused) {
      console.log('Studied Patterns Titles:', studiedPatterns.map((pattern: any) => pattern.title)); // Log titles of studied patterns
    }
  }, [isFocused, studiedPatterns]);

  const data = [
    {
      id: '1',
      title: 'Test 1',
      description: 'Practice with Quiz Multiple-choice',
      image: 'https://cdn-icons-png.flaticon.com/128/5182/5182538.png',
      screen: 'Quizz'
    },
    {
      id: '2',
      title: 'Test 2',
      description: 'Correct or Incorrect Quiz',
      image: 'https://cdn-icons-png.flaticon.com/128/6193/6193558.png',
      screen: 'Question'
    },
    {
      id: '3',
      title: 'Test 3',
      description: 'Match the correct answers Quiz',
      image: 'https://cdn-icons-png.flaticon.com/128/5691/5691719.png',
      screen: 'MatchQuestion'
    },
  ];

  interface Item {
    id: string;
    title: string;
    description: string;
    image: string;
    screen: string;
  }

  const [activeTestIndex, setActiveTestIndex] = useState<number>(0);

  const onTestViewRef = useRef(({ viewableItems }: { viewableItems: Array<{ index: number }> }) => {
    setActiveTestIndex(viewableItems[0]?.index ?? 0);
  });

  const viewTestConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  const renderTestItem: ListRenderItem<Item> = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate(item.screen)}>
      <View style={styles.studyBox}>
        <Text style={styles.testTitle}>{item.title}</Text>
        <Text style={styles.testDescription}>{item.description}</Text>
        <Image source={{ uri: item.image }} style={styles.image} onError={(error) => console.log('Error loading image:', error.nativeEvent.error)} />
      </View>
    </TouchableOpacity>
  );

  const renderStudiedItem = ({ item }: any) => (
    <View style={styles.testBox}>
      <Text style={styles.testTitle}>{item.title}</Text>
      <Image source={ item.image } style={styles.image} onError={(error) => console.log('Error loading image:', error.nativeEvent.error)} />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.heading}>Testing</Text>
        <FlatList
          data={data}
          horizontal
          pagingEnabled
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={renderTestItem}
          onViewableItemsChanged={onTestViewRef.current}
          viewabilityConfig={viewTestConfigRef.current}
          contentContainerStyle={styles.flatListContainer}
        />
        <View style={styles.indicatorContainer}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                { opacity: index === activeTestIndex ? 1 : 0.3 },
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>Study it right now</Text>
        <View style={styles.studyBox}>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.image} />
          <Text style={styles.studyTitle}>Pattern of the day!</Text>
          <Text style={styles.studyDescription}>Random new pattern - learn now</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>Studied</Text>
        <View style={styles.studiedBox}>
          <FlatList
            data={studiedPatterns}
            horizontal
            pagingEnabled
            snapToAlignment="center"
            snapToInterval={width * 0.6} // Adjust to the desired width
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            renderItem={renderStudiedItem}
            keyExtractor={(item) => item.id.toString()}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
            contentContainerStyle={styles.flatListContainer}
          />
          <View style={styles.indicatorContainer}>
            {studiedPatterns.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  { opacity: index === activeIndex ? 1 : 0.3 },
                ]}
              />
            ))}
          </View>
        </View>
      </View>

      <View style={styles.section}>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>Favourite</Text>
        <View style={styles.favoriteBox}>
          <Text style={styles.favoriteText}>Your favorite patterns will appear here</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  section: {
    marginBottom: 24,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    marginTop: 20,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  testBox: {
    padding: 16,
    backgroundColor: '#E0F7FA',
    borderRadius: 8,
    alignItems: 'center',
    width: width * 0.6, // Adjust to the desired width
    marginHorizontal: 8, // Adjust for spacing
  },
  flatListContainer: {
    alignItems: 'center',
  },
  testTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  testDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  studyBox: {
    padding: 16,
    backgroundColor: '#E0F7FA',
    borderRadius: 8,
    alignItems: 'center',
    width: width - 32, // Ensure consistent width
  },
  studyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  studyDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  studiedBox: {
    padding: 16,
    backgroundColor: '#FFF9C4',
    borderRadius: 8,
    alignItems: 'center',
  },
  notStudiedBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  patternBox: {
    padding: 16,
    backgroundColor: '#E0F7FA',
    borderRadius: 8,
    alignItems: 'center',
    width: '30%',
  },
  patternTitle: {
    fontSize: 16,
    marginTop: 8,
  },
  favoriteBox: {
    padding: 16,
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    alignItems: 'center',
  },
  favoriteText: {
    fontSize: 16,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
    marginHorizontal: 4,
  },
});

export default TestingScreen;
