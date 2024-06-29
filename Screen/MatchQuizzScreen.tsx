import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const designPatternCategories = [
  { id: 1, label: 'Creational', value: 'creational' },
  { id: 2, label: 'Structural', value: 'structural' },
  { id: 3, label: 'Behavioral', value: 'behavioral' },
];

const designPatterns = {
  creational: [
    { id: 1, label: 'Abstract Factory', value: 'Abstract Factory' },
    { id: 2, label: 'Builder', value: 'Builder' },
    { id: 3, label: 'Factory Method', value: 'Factory Method' },
    { id: 4, label: 'Prototype', value: 'Prototype' },
    { id: 5, label: 'Singleton', value: 'Singleton' },
  ],
  structural: [
    { id: 6, label: 'Adapter', value: 'Adapter' },
    { id: 7, label: 'Bridge', value: 'Bridge' },
    { id: 8, label: 'Composite', value: 'Composite' },
    { id: 9, label: 'Decorator', value: 'Decorator' },
    { id: 10, label: 'Facade', value: 'Facade' },
    { id: 11, label: 'Flyweight', value: 'Flyweight' },
    { id: 12, label: 'Proxy', value: 'Proxy' },
  ],
  behavioral: [
    { id: 13, label: 'Chain of Responsibility', value: 'Chain of Responsibility' },
    { id: 14, label: 'Command', value: 'Command' },
    { id: 15, label: 'Interpreter', value: 'Interpreter' },
    { id: 16, label: 'Iterator', value: 'Iterator' },
    { id: 17, label: 'Mediator', value: 'Mediator' },
    { id: 18, label: 'Memento', value: 'Memento' },
    { id: 19, label: 'Observer', value: 'Observer' },
    { id: 20, label: 'State', value: 'State' },
    { id: 21, label: 'Strategy', value: 'Strategy' },
    { id: 22, label: 'Template Method', value: 'Template Method' },
    { id: 23, label: 'Visitor', value: 'Visitor' },
  ],
};

const questions = [
  {
    question: "Which pattern composes objects into tree structures to represent part-whole hierarchies?",
    category: 'structural',
    pattern: 'Composite',
  },
  {
    question: "Which pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified?",
    category: 'behavioral',
    pattern: 'Observer',
  },
  {
    question: "Which pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes?",
    category: 'creational',
    pattern: 'Abstract Factory',
  },
  // Add more questions as needed
];

const MatchQuizzScreen = () => {
  const navigation = useNavigation();

  const [selectedCategory, setSelectedCategory] = useState<string>('creational');
  const [selectedPattern, setSelectedPattern] = useState<string>(designPatterns[selectedCategory][0].value);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const question = questions[currentQuestionIndex];

  const handleCheckPress = () => {
    if (isChecked) return; // Prevent multiple checks
    setIsChecked(true);
    if (selectedCategory === question.category && selectedPattern === question.pattern) {
      Alert.alert('Correct', 'You selected the correct answer.');
      setScore(score + 1);
    } else {
      Alert.alert('Incorrect', 'You selected the wrong answer.');
    }
  };

  const goToNextQuestion = () => {
    setIsChecked(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      Alert.alert("Quiz Completed", `You have completed the quiz with a score of ${score}.`);
      setCurrentQuestionIndex(0); // Restart quiz or handle completion
      setScore(0); // Reset score
    }
  };

  const handleSkipPress = () => {
    goToNextQuestion();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Test: Match Answer</Text>
      </View>
      <View style={styles.questionContainer}>
        <View style={styles.questionHeader}>
          <Text style={styles.questionText}>Question {currentQuestionIndex + 1} of {questions.length}</Text>
          <Text style={styles.score}>Score: {score}</Text>
        </View>
        <View style={styles.questionCard}>
          <Text style={styles.questionTitle}>{question.question}</Text>
        </View>
        <View style={styles.pickerContainer}>
          <View style={styles.pickerWrapper}>
            <Text style={styles.label}>Design Pattern Category:</Text>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(value) => {
                setSelectedCategory(value);
                setSelectedPattern(designPatterns[value][0].value); // Update selectedPattern when category changes
              }}
              style={styles.picker}
            >
              {designPatternCategories.map((category) => (
                <Picker.Item key={category.id} label={category.label} value={category.value} />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerWrapper}>
            <Text style={styles.label}>Design Pattern:</Text>
            <Picker
              selectedValue={selectedPattern}
              onValueChange={(value) => setSelectedPattern(value)}
              style={styles.picker}
            >
              {designPatterns[selectedCategory].map((pattern) => (
                <Picker.Item key={pattern.id} label={pattern.label} value={pattern.value} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
      <View style={styles.answerOptionsContainer}>
        <Text style={styles.category}>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</Text>
        <Text style={styles.pattern}>{selectedPattern}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.checkButton} onPress={handleCheckPress}>
          <Text style={styles.checkButtonText}>Check</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkipPress}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>
      {isChecked && (
        <TouchableOpacity style={styles.nextButton} onPress={goToNextQuestion}>
          <Text style={styles.nextButtonText}>Next Question</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center',

  },
  questionContainer: {
    padding: 16,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 18,
    color: 'green',
  },
  questionCard: {
    padding: 16,
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
    marginTop: 16,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  pickerWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    height: 150,
    width: '100%',
  },
  category: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pattern: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  answerOptionsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  checkButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  skipButton: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  skipButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  nextButton: {
    backgroundColor: '#FF5722',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: 16,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MatchQuizzScreen;
