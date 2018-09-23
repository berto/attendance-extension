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
  getStudents: async () => {
    const snapshot = await firebase.database().ref('students').once('value')
    return parseData(snapshot.val())
  },
  updateStudent: async (id, key, total) => {
    const studentRef = await firebase.database().ref(`/students/${id}`)
    const snapshot = await studentRef.once('value')
    const student = snapshot.val()
    student[key] = total
    await studentRef.set(student)
  }
}

function parseData(students) {
  return Object.keys(students).reduce((attendance, id) => {
    const currentCohort = students[id].cohort
    if (typeof students[id] === 'object') {
      students[id].id = id
      delete students[id].dates
      attendance.students.push(students[id])
      if (currentCohort && attendance.cohorts.indexOf(currentCohort) < 0) {
        attendance.cohorts.push(currentCohort)
      }
    }
    return attendance 
  }, { students: [], cohorts: ['all'] })
}

export default db
