import {
  LogIn,
  Register,
  ForgotPassword,
  ForgotEmail,
  CheckCode,
  Verification,
  splashScreen,
  Onbording,
} from "../index";

export default function (Stack) {
  return (
    <>
      <Stack.Screen name="splashScreen" component={splashScreen} />
      <Stack.Screen name="Onbording" component={Onbording} />
      <Stack.Screen name="Login" component={LogIn} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotEmail" component={ForgotEmail} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="CheckCode" component={CheckCode} />
      {/* <Stack.Screen name="ForgotPassword" component={ForgotPassword} /> */}
    </>
  );
}
