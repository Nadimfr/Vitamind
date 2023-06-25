import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Popup from '../../components/Popup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as api from '../../controllers/ApiUser';

function Questionary({}) {
  const [clicked, setClicked] = useState('');
  const [quiz, setQuiz] = useState([]);
  const [question, setQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [popup, setPopup] = useState(false);
  const today = new Date(Date.now());

  useEffect(() => {
    api.getQuiz().then((res) => {
      setQuiz(res);
    });
  }, []);

  useEffect(() => {
    console.log('ANSWERS []', answers);

    // console.log('AAA', answers);
  }, [answers]);

  const addAnswer = (newId) => {
    setAnswers((prevIds) => [...prevIds, newId]);
  };

  const [userId, setUserId] = useState('');

  useEffect(() => {
    async function fetchData() {
      const userString = await AsyncStorage.getItem('user');
      setUserId(JSON.parse(userString)._id);
      console.log('IDD', userId);
    }

    fetchData();
  }, []);

  const getResult = () => {
    const average =
      answers.reduce((acc, curr) => acc + curr, 0) / answers.length;

    if (average >= 0 && average <= 5) {
      return `Sad`;
    } else if (average >= 6 && average <= 10) {
      return `Anxious`;
    } else if (average >= 11 && average <= 15) {
      return `Neutral`;
    } else if (average >= 16 && average <= 20) {
      return `Happy`;
    }
  };
  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: '#142F21', flex: 1 }}>
      {popup && (
        <Popup
          title="Mood"
          description={`Your are feeling ${getResult()} at the moment!\n Lets give you some recommendations based on your mood!`}
          onPress={async () => {
            setPopup(false);
            await navigation.navigate('Recommender', {
              emotion:
                getResult() == 'Anxious'
                  ? 'surprise'
                  : getResult().toLowerCase(),
            });
          }}
          button_title="Let's go"
        />
      )}
      <View
        style={{
          width: '100%',
          height: 280,
          backgroundColor: '#B2ECC4',
          borderBottomLeftRadius: 75,
          borderBottomRightRadius: 75,
          paddingHorizontal: '8%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          paddingVertical: 75,
        }}
      >
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" color="white" size={40} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            height: 150,
            backgroundColor: 'white',
            borderRadius: 25,
            marginTop: 110,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: 'white',
              borderColor: '#B2ECC4',
              borderWidth: 4,
              zIndex: 100,
              borderRadius: 50,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              alignSelf: 'center',
              marginTop: -90,
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 30,
                fontFamily: 'Poppins_Bold',
                alignSelf: 'center',
                color: '#142F21',
                padding: 20,
              }}
            >
              {quiz[question]?.id}
            </Text>
          </View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 22,
              fontFamily: 'Poppins_Bold',
              alignSelf: 'center',
              color: '#142F21',
              width: '90%',
            }}
          >
            {quiz[question]?.question}
          </Text>
        </View>

        <View
          style={{
            height: '50%',
            width: '100%',
            marginTop: 15,
            flexDirection: 'column',
            // flexWrap: 'wrap',
            // alignItems: 'flex-start',
          }}
        >
          {quiz[question]?.answers.map((a, idx) => (
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.buttons,
                {
                  backgroundColor: a?.answer == clicked ? '#B2ECC4' : 'white',
                },
              ]}
              onPress={async () => {
                if (question + 1 !== quiz.length) {
                  await addAnswer(a?.value);
                  setQuestion(question + 1);
                } else {
                  let data = {
                    user_id: userId,
                    text: `Questions, ${getResult()}`,
                    created_at: today,
                  };
                  await api.historyCreate(data).then((res) => {
                    console.log('API REQ', res);
                  });
                  setQuestion(0);
                  setPopup(true);
                }
              }}
            >
              <Text style={styles.titleparagraph2}>{a?.answer}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

export default Questionary;

const styles = StyleSheet.create({
  titleheading: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Poppins_SemiBold',
    alignSelf: 'center',
    color: '#142F21',
  },
  titleparagraph: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins_Regular',
    alignSelf: 'center',
    color: '#42A45C',
  },
  titleparagraph2: {
    textAlign: 'center',
    fontSize: 16,
    color: '#142f21',
    fontFamily: 'Poppins_Medium',
    alignSelf: 'center',
  },
  buttonnext: {
    display: 'flex',
    marginTop: 40,
    width: 130,
    height: 55,
    backgroundColor: '#B2ECC4',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttons: {
    display: 'flex',
    marginTop: 20,
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderColor: '#B2ECC4',
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
