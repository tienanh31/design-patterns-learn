import React, { useState, useRef } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, ListRenderItem, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const TestingScreen: React.FC = () => {
  const navigation = useNavigation();

  const data = [
    {
      id: '1',
      title: 'Теst 1',
      description: 'Quizz',
      image: 'https://via.placeholder.com/100',
      screen: 'Quizz'
    },
    {
      id: '2',
      title: 'Теst 2',
      description: 'Name the pattern by its pros and cons',
      image: 'https://via.placeholder.com/100',
      screen: 'Question'
    },
    {
      id: '3',
      title: 'Тест 3',
      description: 'Name the pattern by its pros and cons',
      image: 'https://via.placeholder.com/100',
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

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const onViewRef = useRef(({ viewableItems }: { viewableItems: Array<{ index: number }> }) => {
    setActiveIndex(viewableItems[0]?.index ?? 0);
  });

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  const renderItem: ListRenderItem<Item> = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate(item.screen)}>
      <View style={styles.testBox}>
        <Text style={styles.testTitle}>{item.title}</Text>
        <Text style={styles.testDescription}>{item.description}</Text>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
    </TouchableOpacity>
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
          renderItem={renderItem}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
        />
        <View style={styles.indicatorContainer}>
          {data.map((_, index) => (
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
          <Text style={styles.studiedText}>The studied patterns will appear here</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>Not studied</Text>
        <View style={styles.notStudiedBox}>
          <View style={styles.patternBox}>
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.image} />
            <Text style={styles.patternTitle}>Abstract factory</Text>
          </View>
          <View style={styles.patternBox}>
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.image} />
            <Text style={styles.patternTitle}>Builder</Text>
          </View>
          <View style={styles.patternBox}>
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.image} />
            <Text style={styles.patternTitle}>Factory method</Text>
          </View>
        </View>
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
  time: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
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
    width: width - 32, // To ensure full width of the screen
  },
  testTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    alignItems: 'center',

  },
  testDescription: {
    fontSize: 16,
    marginBottom: 8,
    alignItems: 'center',

  },
  studyBox: {
    padding: 16,
    backgroundColor: '#E0F7FA',
    borderRadius: 8,
    alignItems: 'center',
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
  studiedText: {
    fontSize: 16,
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
    alignItems: 'center',

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
