import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

initializeApp({
  credential: applicationDefault(),
});

// verify idToken and return user data
export const verifyIdToken = async ({ idToken }: { idToken: string }) => {
  try {
    // gets uid from idToken
    const uid = (await getAuth().verifyIdToken(idToken)).uid;
    // gets userData from uid and return it
    return await getAuth().getUser(uid);
  } catch (error) {
    // error handling
    throw error;
  }
};
