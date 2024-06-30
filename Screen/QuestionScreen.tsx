import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Question {
  question: string;
  pattern: string;
  category: string;
}

const questions: Question[] = [
  {
    question: "A design pattern that composes objects into tree structures to represent part-whole hierarchies. It lets clients treat individual objects and compositions of objects uniformly.",
    pattern: "Composite",
    category: "Structural patterns"
  },
  {
    question: "A design pattern that defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.",
    pattern: "Observer",
    category: "Behavioral patterns"
  },
  {
    question: "A design pattern that reduces communication and dependencies between objects to a mediator object.",
    pattern: "Mediator",
    category: "Behavioral patterns"
  },
  {
    question: "A design pattern that allows objects to be composed into a tree structure to represent part-whole hierarchies. It lets clients treat individual objects and compositions of objects uniformly.",
    pattern: "Composite",
    category: "Structural patterns"
  },
  {
    question: "A design pattern that simplifies the creation of complex objects by providing a way to construct them step-by-step.",
    pattern: "Builder",
    category: "Creational patterns"
  }
  // Add more questions as needed
];

const QuestionScreen = () => {
  const navigation = useNavigation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [hasChecked, setHasChecked] = useState<boolean>(false);

  const question = questions[currentQuestionIndex];

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
    setHasChecked(true); // Mark this question as checked
    if (selectedAnswer === 'Correct' && question.pattern === question.pattern) {
      setCorrectCount(correctCount + 1);
      Alert.alert('Correct', 'You selected the correct answer.');
    } else if (selectedAnswer === 'Incorrect' && question.pattern !== question.pattern) {
      Alert.alert('Correct', 'You selected the correct answer.');
    } else {
      Alert.alert('Incorrect', 'You selected the wrong answer.');
    }
  };

  const handleSkipPress = () => {
    Alert.alert('Question skipped');
    goToNextQuestion();
  };

  const goToNextQuestion = () => {
    setSelectedAnswer(null);
    setIsChecked(false);
    setHasChecked(false); // Reset the check status for the next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      Alert.alert("Quiz Completed", `You have completed the quiz. Correct Answers: ${correctCount}`);
      setCurrentQuestionIndex(0); // Restart quiz or handle completion
      // setCorrectCount(0); // Do not reset correct count to maintain correct answers count
    }
  };

  const getButtonStyle = (answer: string) => {
    if (!isChecked) {
      return selectedAnswer === answer ? [styles.answerButton, styles.selectedAnswerButton] : styles.answerButton;
    }
    if (answer === 'Correct' && question.pattern === question.pattern) {
      return [styles.answerButton, styles.correctAnswerButton];
    }
    if (answer === 'Incorrect' && question.pattern !== question.pattern) {
      return [styles.answerButton, styles.correctAnswerButton];
    }
    if (answer === selectedAnswer) {
      return [styles.answerButton, styles.incorrectAnswerButton];
    }
    return styles.answerButton;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Тest: {question.category}</Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>Question {currentQuestionIndex + 1} of {questions.length}</Text>
        <Text style={styles.score}>Correct: {correctCount}</Text>
        <View style={styles.questionCard}>
          <Text style={styles.questionTitle}>{question.question}</Text>
        </View>
        <Text style={styles.category}>{question.category}</Text>
        <Text style={styles.pattern}>{question.pattern}</Text>
      </View>
      <View style={styles.answerOptionsContainer}>
        <TouchableOpacity style={getButtonStyle('Correct')} onPress={() => handleAnswerPress('Correct')}>
          <Text style={styles.answerText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity style={getButtonStyle('Incorrect')} onPress={() => handleAnswerPress('Incorrect')}>
          <Text style={styles.answerText}>Incorrect</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.checkButton, hasChecked && styles.disabledButton]} onPress={handleCheckPress} disabled={hasChecked}>
          <Text style={styles.checkText}>Check</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkipPress}>
          <Text style={styles.skipText}>Skip</Text>
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
    marginLeft: 50,


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
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#9E9E9E',
  },
});

export default QuestionScreen;
