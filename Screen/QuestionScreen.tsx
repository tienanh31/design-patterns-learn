import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Question {
  question: string;
  pattern: string;
  category: string;
}

const questions: Question[] = [
  {
    question: "A design pattern that allows you to add new operations to the program without changing the classes of objects on which these operations can be performed.",
    pattern: "Visitor",
    category: "Behavioral patterns"
  },
  {
    question: "A design pattern that ensures a class has only one instance and provides a global point of access to it.",
    pattern: "Singleton",
    category: "Creational patterns"
  },
  // Add more questions as needed
];

const mainCategories = {
  "Behavioral patterns": ["Visitor", "Observer", "Strategy", "Mediator"],
  "Creational patterns": ["Singleton", "Factory Method", "Abstract Factory", "Builder"],
  "Structural patterns": ["Adapter", "Decorator", "Facade", "Proxy"]
};

const QuestionScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const question = questions[currentQuestionIndex];

  const handleCheckPress = () => {
    if (selectedMainCategory === null || selectedSubCategory === null) {
      Alert.alert('Please select both main category and subcategory before checking.');
      return;
    }
    setIsChecked(true);
    if (selectedMainCategory === question.category && selectedSubCategory === question.pattern) {
      Alert.alert('Correct', 'You selected the correct pattern.');
    } else {
      Alert.alert('Incorrect', 'You selected the wrong pattern.');
    }
  };

  const handleSkipPress = () => {
    Alert.alert('Question skipped');
    goToNextQuestion();
  };

  const goToNextQuestion = () => {
    setSelectedMainCategory(null);
    setSelectedSubCategory(null);
    setIsChecked(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      Alert.alert("Quiz Completed", "You have completed the quiz.");
      setCurrentQuestionIndex(0); // Restart quiz or handle completion
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Тест: {question.category}</Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>Question {currentQuestionIndex + 1} of {questions.length}</Text>
        <Text style={styles.score}>0</Text>
        <View style={styles.questionCard}>
          <Text style={styles.questionTitle}>{question.question}</Text>
        </View>
        <Text style={styles.category}>{question.category}</Text>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select the main category:</Text>
        <Picker
          selectedValue={selectedMainCategory}
          onValueChange={(itemValue) => {
            setSelectedMainCategory(itemValue);
            setSelectedSubCategory(null); // Reset subcategory when main category changes
          }}
          style={styles.picker}
        >
          <Picker.Item label="Select a main category" value={null} />
          {Object.keys(mainCategories).map((category, index) => (
            <Picker.Item key={index} label={category} value={category} />
          ))}
        </Picker>
      </View>
      {selectedMainCategory && (
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Select the subcategory:</Text>
          <Picker
            selectedValue={selectedSubCategory}
            onValueChange={(itemValue) => setSelectedSubCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a subcategory" value={null} />
            {mainCategories[selectedMainCategory].map((subcategory, index) => (
              <Picker.Item key={index} label={subcategory} value={subcategory} />
            ))}
          </Picker>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.checkButton} onPress={handleCheckPress}>
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
  pickerContainer: {
    marginTop: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: '100%',
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
});

export default QuestionScreen;
