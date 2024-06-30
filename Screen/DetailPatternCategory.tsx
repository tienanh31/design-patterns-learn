import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useStudiedPatterns } from '../StudiedPatternsContext';

type RootStackParamList = {
  DetailPatternCategory: { pattern: { id: number; preTitle: string; title: string; image: any; imageDetail: any; proscons: any; task: any, result: any, code: any, description: any } };
};

type DetailPatternCategoryRouteProp = RouteProp<RootStackParamList, 'DetailPatternCategory'>;

type DetailPatternCategoryProps = {
  route: DetailPatternCategoryRouteProp;
};

const DetailPatternCategory: React.FC<DetailPatternCategoryProps> = ({ route }) => {
  const { pattern } = route.params;
  const { addStudiedPattern } = useStudiedPatterns();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('description');
  const [activeSubTab, setActiveSubTab] = useState('code');
  const [viewedTabs, setViewedTabs] = useState({
    description: false,
    proscons: false,
    case: false,
  });
  const [viewedSubTabs, setViewedSubTabs] = useState({
    code: false,
    task: false,
    result: false,
  });

  useEffect(() => {
    loadViewedStatus();
  }, []);

  useEffect(() => {
    saveViewedStatus();
  }, [viewedTabs, viewedSubTabs]);

  const saveViewedStatus = async () => {
    try {
      await AsyncStorage.setItem(`viewedTabs_${pattern.id}`, JSON.stringify(viewedTabs));
      await AsyncStorage.setItem(`viewedSubTabs_${pattern.id}`, JSON.stringify(viewedSubTabs));
      if (Object.values(viewedTabs).every(Boolean) && Object.values(viewedSubTabs).every(Boolean)) {
        addStudiedPattern(pattern);
      }
    } catch (error) {
      console.error('Error saving viewed status', error);
    }
  };

  const loadViewedStatus = async () => {
    try {
      const viewedTabsValue = await AsyncStorage.getItem(`viewedTabs_${pattern.id}`);
      const viewedSubTabsValue = await AsyncStorage.getItem(`viewedSubTabs_${pattern.id}`);
      if (viewedTabsValue) {
        setViewedTabs(JSON.parse(viewedTabsValue));
      }
      if (viewedSubTabsValue) {
        setViewedSubTabs(JSON.parse(viewedSubTabsValue));
      }
    } catch (error) {
      console.error('Error loading viewed status', error);
    }
  };

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    setViewedTabs(prev => ({ ...prev, [tab]: true }));
  };

  const handleSubTabPress = (subTab: string) => {
    setActiveSubTab(subTab);
    setViewedSubTabs(prev => ({ ...prev, [subTab]: true }));
  };

  const renderContent = () => {
    if (activeTab === 'description') {
      return (
        <Text style={styles.description}>
          {pattern.description}
        </Text>
      );
    } else if (activeTab === 'proscons') {
      return (
        <Text style={styles.description}>
          {pattern.proscons}
        </Text>
      );
    } else if (activeTab === 'case') {
      return renderCaseContent();
    }
  };

  const renderCaseContent = () => {
    if (activeSubTab === 'code') {
      return (
        <View style={styles.codeContainer}>
          <Text style={styles.code}>
            {pattern.code}
          </Text>
        </View>
      );
    } else if (activeSubTab === 'task') {
      return (
        <Text style={styles.description}>
          {pattern.task}
        </Text>
      );
    } else if (activeSubTab === 'result') {
      return (
        <Text style={styles.description}>
          {pattern.result}
        </Text>
      );
    }
  };

  const allTabsViewed = Object.values(viewedTabs).every(Boolean) && Object.values(viewedSubTabs).every(Boolean);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>&lt;</Text>
        </TouchableOpacity>
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkbox}>{allTabsViewed ? '✔' : '⬜'}</Text>
        </View>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>{pattern.preTitle}</Text>
        <Text style={styles.subtitle}>{pattern.title}</Text>
        <Image
          style={styles.image}
          source={pattern.imageDetail}
        />
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'description' && styles.activeTab]}
            onPress={() => handleTabPress('description')}
          >
            <Text style={styles.tabText}>description</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'proscons' && styles.activeTab]}
            onPress={() => handleTabPress('proscons')}
          >
            <Text style={styles.tabText}>pros & cons</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'case' && styles.activeTab]}
            onPress={() => handleTabPress('case')}
          >
            <Text style={styles.tabText}>case</Text>
          </TouchableOpacity>
        </View>
        {activeTab === 'case' && (
          <View style={styles.subTabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeSubTab === 'code' && styles.activeTab]}
              onPress={() => handleSubTabPress('code')}
            >
              <Text style={styles.tabText}>code</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeSubTab === 'task' && styles.activeTab]}
              onPress={() => handleSubTabPress('task')}
            >
              <Text style={styles.tabText}>task</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeSubTab === 'result' && styles.activeTab]}
              onPress={() => handleSubTabPress('result')}
            >
              <Text style={styles.tabText}>result</Text>
            </TouchableOpacity>
          </View>
        )}
        {renderContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: '#333',
  },
  checkboxContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#d1e7dd',
  },
  checkbox: {
    fontSize: 16,
    color: '#333',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 20,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center'
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  subTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
  },
  activeTab: {
    backgroundColor: '#d1e7dd',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
  codeContainer: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  code: {
    fontSize: 14,
    fontFamily: 'Courier',
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginTop: 'auto',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#333',
  },
});

export default DetailPatternCategory;
