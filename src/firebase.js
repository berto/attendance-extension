import * as firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: 'students',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

const db = {
  getStudents() {
    return firebase.database().ref('students')
      .once('value')
      .then(snapshot => snapshot.val())
      .then(parseData)
      .catch(error => error)
  }
}

function parseData(students) {
  return Object.keys(students).reduce((attendance, id) => {
    const currentCohort = students[id].cohort
    const student = { name: students[id].name, total: students[id].total}
    attendance.all.push(student)
    if (currentCohort) {
      attendance[currentCohort] = attendance[currentCohort] || []
      attendance[currentCohort].push(student)
    }
    return attendance 
  }, { all: [] })
}

export default db
