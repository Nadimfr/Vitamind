import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Popup from '../../components/Popup';
import * as api from '../../controllers/ApiUser';

function Questionary() {
  const [clicked, setClicked] = useState('');
  const [quiz, setQuiz] = useState([]);
  const [question, setQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [popup, setPopup] = useState(false);

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

  return (
    <View style={{ backgroundColor: '#142F21', flex: 1 }}>
      {popup && (
        <Popup
          title="Result"
          description={`You got : ${(
            answers.reduce((acc, curr) => acc + curr, 0) / answers.length
          ).toFixed(2)}`}
          onPress={() => setPopup(false)}
        />
      )}
      <View
        style={{
          width: '100%',
          height: 280,
          backgroundColor: '#B2ECC4',
          borderBottomLeftRadius: 75,
          borderBottomRightRadius: 75,
          paddingHorizontal: 50,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          paddingVertical: 75,
        }}
      >
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
                  setPopup(true);
                }
              }}
              // onPress={() => setClicked(a?.answer)}
            >
              <Text style={styles.titleparagraph2}>{a?.answer}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* <View style={{ width: '100%' }}>
          <TouchableOpacity
            onPress={() => {
              setQuestion(question + 1);
              const array = [...answers];
              array.push(clicked);
              setAnswers(array);
            }}
            style={styles.buttonnext}
          >
            <Text style={{ color: '#142F21', fontSize: 22 }}>
              {quiz.length == quiz[question]?.id ? 'Submit' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View> */}
        {/* <TouchableOpacity
          onPress={() => {
            setQuestion(0);
          }}
          style={styles.buttonnext}
        >
          <Text style={{ color: '#142F21', fontSize: 22 }}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            console.log('AAAAA', answers);
          }}
          style={styles.buttonnext}
        >
          <Text style={{ color: '#142F21', fontSize: 22 }}>Submit</Text>
        </TouchableOpacity> */}
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
