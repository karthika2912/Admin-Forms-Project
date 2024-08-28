import { doc, setDoc,getDocs,updateDoc,increment,collection, query, where,getDoc ,deleteDoc,arrayUnion} from "firebase/firestore";
import { db } from "./firebase";

export const saveFormStructure = async (formId, formStructure) => {
  await setDoc(
    doc(db, "forms", formId),
    {
      structure: formStructure,
      createdAt: new Date(),
    },
    { merge: true } 
  );
};

export const saveFormSubmission = async (submissionId, submissionStructure, formId) => {
  const username = localStorage.getItem('username');

  await setDoc(doc(db, "submission", submissionId), {
    structure: submissionStructure,
    createdAt: new Date(),
  });

  const formRef = doc(db, "forms", formId);

  await updateDoc(formRef, {
    'structure.submission_count': increment(1),
    'structure.submitted_by': arrayUnion(username) // Add the username to the submitted_by array
  });
};
export const getAllFormStructures = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "forms"));
    const forms = [];
    querySnapshot.forEach((doc) => {
      forms.push({ id: doc.id, ...doc.data() });
    });
    return forms;
  } catch (error) {
    console.error("Error retrieving forms:", error);
    return [];
  }
};

export const getAllFormsSubmissions = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "submission "));
    const forms = [];
    querySnapshot.forEach((doc) => {
      forms.push({ id: doc.id, ...doc.data() });
    });
    return forms;
  } catch (error) {
    console.error("Error retrieving forms:", error);
    return [];
  }
};

export const getFormAndSubmissions = async (formId) => {
    const formRef = doc(db, "forms", formId);
    const formSnap = await getDoc(formRef);

    if (!formSnap.exists()) {
      throw new Error("Form not found");
    }

    const formData = formSnap.data();

    const submissionsRef = collection(db, "submission");
    const q = query(submissionsRef, where("structure.formId", "==", formId)); 
    const submissionSnaps = await getDocs(q);

    const submissions = submissionSnaps.docs.map(doc => doc.data());

    const combinedData = {
      form: formData,
      submissions: submissions,
    };

    return combinedData;
};

export const deleteFormAndSubmissions = async (formId) => {
    const formDocRef = doc(db, "forms", formId);

    await deleteDoc(formDocRef);

    const submissionsQuery = query(
      collection(db, "submissions"),
      where("structure.formId", "==", formId)
    );

    const submissionsSnapshot = await getDocs(submissionsQuery);

    const deletePromises = [];
    submissionsSnapshot.forEach((doc) => {
      deletePromises.push(deleteDoc(doc.ref));
    });

    await Promise.all(deletePromises);

};

export const getMatchingForm = async (currentUrl, currentTime, currentDate) => {
  try {
    const formsCollection = collection(db, "forms");
    const formsSnapshot = await getDocs(formsCollection);

    let matchingForm = null;
    let matchingFormDocRef = null;
    const storedUsername = localStorage.getItem('username');

    formsSnapshot.forEach((docSnapshot) => {
      const formData = docSnapshot.data();
      const { url_condition, time_condition, date_condition, submitted_by } = formData.structure;
      const isSubmittedByUser = submitted_by && submitted_by.includes(storedUsername);

      if (!isSubmittedByUser) {
        const urlConditionMatch = url_condition !== '' && currentUrl.includes(url_condition);
        const timeConditionMatch = time_condition !== '' && time_condition === currentTime;
        const dateConditionMatch = date_condition !== null && date_condition === currentDate;

        // Exact match
        if (urlConditionMatch && timeConditionMatch && dateConditionMatch) {
          matchingForm = formData;
          matchingFormDocRef = docSnapshot.ref;
          matchingForm.formId = docSnapshot.id;
          // No need to return false here; you just need to break the loop
          return;
        }

        // URL and Time match (Date optional)
        if (urlConditionMatch && timeConditionMatch && (date_condition === null || dateConditionMatch === currentDate)) {
          matchingForm = formData;
          matchingFormDocRef = docSnapshot.ref;
          matchingForm.formId = docSnapshot.id;
          return;
        }

        // URL and Date match (Time optional)
        if (urlConditionMatch && (time_condition === '' || time_condition === currentTime) && dateConditionMatch) {
          matchingForm = formData;
          matchingFormDocRef = docSnapshot.ref;
          matchingForm.formId = docSnapshot.id;
          return;
        }

        // URL match (Date and Time optional)
        if (urlConditionMatch && (time_condition === '' || time_condition === currentTime) && (date_condition === null || dateConditionMatch === currentDate)) {
          matchingForm = formData;
          matchingFormDocRef = docSnapshot.ref;
          matchingForm.formId = docSnapshot.id;
          return;
        }

        // Time and Date match (URL optional)
        if ((url_condition === '' || urlConditionMatch) && timeConditionMatch && dateConditionMatch) {
          matchingForm = formData;
          matchingFormDocRef = docSnapshot.ref;
          matchingForm.formId = docSnapshot.id;
          return;
        }

        // Time match (URL and Date optional)
        if ((url_condition === '' || urlConditionMatch) && timeConditionMatch && (date_condition === null || dateConditionMatch === currentDate)) {
          matchingForm = formData;
          matchingFormDocRef = docSnapshot.ref;
          matchingForm.formId = docSnapshot.id;
          return;
        }

        // Date match (URL and Time optional)
        if ((url_condition === '' || urlConditionMatch) && (time_condition === '' || time_condition === currentTime) && dateConditionMatch) {
          matchingForm = formData;
          matchingFormDocRef = docSnapshot.ref;
          matchingForm.formId = docSnapshot.id;
          return;
        }

        // Default case if no conditions match
        if ((url_condition === '' || url_condition === null) && (time_condition === '' || time_condition === null) && (date_condition === null || date_condition === null)) {
          matchingForm = formData;
          matchingFormDocRef = docSnapshot.ref;
          matchingForm.formId = docSnapshot.id;
          return;
        }
      }
    });

    if (matchingForm && matchingFormDocRef) {
      await updateDoc(matchingFormDocRef, {
        'structure.views': (matchingForm.structure.views || 0) + 1
      });
    }
    return matchingForm;
  } catch (error) {
    console.error("Error fetching forms:", error);
    return null;
  }
};




