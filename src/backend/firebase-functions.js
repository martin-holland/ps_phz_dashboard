import { db } from "../backend/firebase-config";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const firebaseUpload = async (results) => {
  console.log("Results from firebaseUpload:");
  console.log(results);
  const isEmpty = Object.keys(results).length === 0;

  console.log("object is empty? :", isEmpty);
  if (!isEmpty) {
    const docRef = collection(db, "survey_results");
    try {
      await addDoc(docRef, results);
      console.log("data sent to firebase");
    } catch (error) {
      console.log("error: ", error);
    }
  }
};
// export const getFirebaseData = async () => {
//   const docRef = collection(db, "survey_results");
//   let surveyResult = [];
//   try {
//     const data = await getDocs(docRef);
//     console.log("data get from firebase");
//     console.log(data);
//     data.docs.forEach((doc) => {
//       surveyResult.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(surveyResult);
//   } catch (error) {
//     console.log("error: ", error);
//   }
// };
