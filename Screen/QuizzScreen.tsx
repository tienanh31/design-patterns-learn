import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface QuizQuestion {
  question: string;
  answers: string[];
  correctAnswer: string;
}

const quizData: QuizQuestion[] = [
  {
    question: "Which design pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes?",
    answers: ["Abstract Factory", "Builder", "Prototype", "Singleton"],
    correctAnswer: "Abstract Factory"
  },
  {
    question: "Which design pattern is used to separate the construction of a complex object from its representation so that the same construction process can create different representations?",
    answers: ["Adapter", "Builder", "Factory Method", "Bridge"],
    correctAnswer: "Builder"
  },
  // Add more questions as needed
];

const QuizzScreen: React.FC = () => {
  const navigation = useNavigation();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);

  const question = quizData[currentQuestionIndex];
  const correctAnswer = question.correctAnswer;

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
    setIsChecked(false); // Reset check state if the user changes their selection
  };

  const handleCheckPress = () => {
    if (selectedOption === null) {
      Alert.alert('Please select an option before checking.');
      return;
    }
    setIsChecked(true);
    if (selectedOption === correctAnswer) {
      setCorrectCount(correctCount + 1);
    }
  };

  const handleSkipPress = () => {
    Alert.alert('Question skipped');
    goToNextQuestion();
  };

  const goToNextQuestion = () => {
    setSelectedOption(null);
    setIsChecked(false);
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      Alert.alert("Quiz Completed", `You have completed the quiz. Correct Answers: ${correctCount}`);
      setCurrentQuestionIndex(0); // Restart quiz or handle completion
      setCorrectCount(0); // Reset correct count for the next quiz
    }
  };

  const getOptionStyle = (option: string) => {
    if (!isChecked) {
      return selectedOption === option ? [styles.optionButton, styles.selectedOptionButton] : styles.optionButton;
    }
    if (option === correctAnswer) return [styles.optionButton, styles.correctOptionButton];
    if (option === selectedOption) return [styles.optionButton, styles.incorrectOptionButton];
    return styles.optionButton;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Quiz: pros & cons</Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>Question {currentQuestionIndex + 1} of {quizData.length}</Text>
        <Text style={styles.correctText}>Correct: {correctCount}</Text>
        <View style={styles.questionCard}>
          <Text style={styles.questionTitle}>{question.question}</Text>
        </View>
      </View>
      <View style={styles.answerOptionsContainer}>
        <View style={styles.optionsContainer}>
          {question.answers.map((answer, index) => (
            <TouchableOpacity
              key={index}
              style={getOptionStyle(answer)}
              onPress={() => handleOptionPress(answer)}
            >
              <Text style={styles.optionText}>{answer}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.checkButton} onPress={handleCheckPress}>
            <Text style={styles.checkText}>Check</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkipPress}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isChecked && (
        <TouchableOpacity style={styles.nextButton} onPress={goToNextQuestion}>
          <Text style={styles.nextButtonText}>Next Question</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: '50%',
    transform: [{ translateY: -12 }], // Adjust this value to vertically center the button
    marginTop: 25,

  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginTop: 25,

  },
  questionContainer: {
    padding: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  correctText: {
    fontSize: 16,
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
  selectedOptionButton: {
    backgroundColor: '#ffeb3b', // Yellow color
  },
  answerOptionsContainer: {
    padding: 16,
  },
  optionsContainer: {
    flexDirection: 'column',
    marginTop: 16,
  },
  optionButton: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
  },
  correctOptionButton: {
    backgroundColor: '#2196F3',
  },
  incorrectOptionButton: {
    backgroundColor: '#f44336',
  },
  optionText: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  checkButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  checkText: {
    color: '#fff',
    fontSize: 16,
  },
  skipButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  skipText: {
    color: '#fff',
    fontSize: 16,
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

export default QuizzScreen;