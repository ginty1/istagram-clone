import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import validator from "email-validator";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  Alert,
} from "react-native";
import { firebase } from "../../firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

// login form schema
const LoginFormSchema = Yup.object().shape({
  email: Yup.string().email().required("An email is required"),
  password: Yup.string()
    .required()
    .min(8, "You password has to have at least 8 characters"),
});
const LoginForm = ({ navigation }) => {
  const onLogin = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("Your logined in Succefully", email, password);
    } catch (error) {
      Alert.alert(
        "My Lord...",
        error.message +
          "\n\n....what do you like to do next..?"[
            ({
              text: "OK",
              onPress: () => console.log("OK"),
              style: "cancel",
            },
            {
              text: "Sign Up",
              onPress: () => navigation.push("SignUpScreen"),
            })
          ]
      );
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          onLogin(values.email, values.password);
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
      >
        {({ handleBlur, handleChange, handleSubmit, values, isValid }) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || validator.validate(values.email)
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="Phone number, username or email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>
            <View style={styles.inputField}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="Password"
                secureTextEntry={true}
                textContentType="password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>
            <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
              <Text style={{ color: "#6BB0F5" }}>Forgot password</Text>
            </View>

            <Pressable
              onPress={handleSubmit}
              style={styles.button(isValid)}
              titleSize={20}
            >
              <Text style={{ color: "#FFF", fontWeight: "600", fontSize: 20 }}>
                Log In
              </Text>
            </Pressable>
            <View style={styles.signUpContainer}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.push("SignUpScreen")}>
                <Text style={{ color: "#6BB0F5" }}> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  inputField: {
    borderRadius: 4,
    padding: 6,
    backgroundColor: "#FAFAFA",
    marginBottom: 10,
    borderWidth: 1,
  },
  wrapper: {
    marginTop: 80,
  },
  button: (isValid) => ({
    backgroundColor: isValid ? "#0096F6" : "#9ACAF7",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
  }),
  signUpContainer: {
    marginTop: 50,
    width: "100%",
    flexDirection: "row",
  },
});
