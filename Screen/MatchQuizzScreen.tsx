import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const MatchQuizzScreen = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const correctAnswer = 'Composite';

  const handleAnswerPress = (answer: string) => {
    setSelectedAnswer(answer);
    setIsChecked(false);
  };

  const handleCheckPress = () => {
    if (selectedAnswer === null) {
      Alert.alert('Please select an answer before checking.');
      return;
    }
    setIsChecked(true);
  };

  const getButtonStyle = (answer: string) => {
    if (!isChecked) {
      return selectedAnswer === answer ? [styles.answerButton, styles.selectedAnswerButton] : styles.answerButton;
    }
    if (answer === correctAnswer) return [styles.answerButton, styles.correctAnswerButton];
    if (answer === selectedAnswer) return [styles.answerButton, styles.incorrectAnswerButton];
    return styles.answerButton;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Тест: pros & cons</Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>Question 1 of 23</Text>
        <Text style={styles.score}>0</Text>
        <View style={styles.questionCard}>
          <Text style={styles.questionTitle}>
            plus:
            reduces the dependence between the client and the handlers,
            implements the principle of sole responsibility,
            implements the principle of openness/closeness.
            minus:
            the request may remain unprocessed by anyone.
          </Text>
        </View>
        <Text style={styles.category}>Structural</Text>
        <Text style={styles.pattern}>Composite</Text>
      </View>
      <View style={styles.answerOptionsContainer}>
        <TouchableOpacity style={getButtonStyle('Creational')} onPress={() => handleAnswerPress('Creational')}>
          <Text style={styles.answerText}>Creational</Text>
        </TouchableOpacity>
        <TouchableOpacity style={getButtonStyle('Structural')} onPress={() => handleAnswerPress('Structural')}>
          <Text style={styles.answerText}>Structural</Text>
        </TouchableOpacity>
        <TouchableOpacity style={getButtonStyle('Behavioral')} onPress={() => handleAnswerPress('Behavioral')}>
          <Text style={styles.answerText}>Behavioral</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.checkButton} onPress={handleCheckPress}>
        <Text style={styles.checkButtonText}>Check</Text>
      </TouchableOpacity>
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
  },
  questionContainer: {
    padding: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 18,
    color: 'green',
    textAlign: 'right',
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
  answerOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  answerButton: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    padding: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedAnswerButton: {
    backgroundColor: '#ffeb3b',
  },
  correctAnswerButton: {
    backgroundColor: '#4CAF50',
  },
  incorrectAnswerButton: {
    backgroundColor: '#f44336',
  },
  answerText: {
    fontSize: 16,
    color: '#fff',
  },
  checkButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default MatchQuizzScreen;
