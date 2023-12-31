import React, { useState, useEffect } from "react";
import { Platform, View, Image, Text } from "react-native";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { getFileObjectAsync, uuid } from "../../../Utils";

// See https://github.com/mmazzarolo/react-native-modal-datetime-picker
// Most of the date picker code is directly sourced from the example.
import DateTimePickerModal from "react-native-modal-datetime-picker";

// See https://docs.expo.io/versions/latest/sdk/imagepicker/
// Most of the image picker code is directly sourced from the example.
import * as ImagePicker from "expo-image-picker";
import { styles } from "./NewSocialScreen.styles";

import firebase from "firebase/app";
import "firebase/firestore";
import { SocialModel } from "../../../models/social";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackScreen";
import DateTimePicker from "react-native-modal-datetime-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { collection, getFirestore, setDoc } from "firebase/firestore";
import { getApp } from "firebase/app";



interface Props {
  navigation: StackNavigationProp<RootStackParamList, "NewSocialScreen">;
}

export default function NewSocialScreen({ navigation }: Props) {
  /* TODO: Declare state variables for all of the attributes 
           that you need to keep track of on this screen.
  
     HINTS:

      1. There are five core attributes that are related to the social object.
      2. There are two attributes from the Date Picker.
      3. There is one attribute from the Snackbar.
      4. There is one attribute for the loading indicator in the submit button.
  
  */
  const [eventName, setEventName] = useState<string>("");
  const [eventLocation, setEventLocation] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");
  const [eventImage, setEventImage] = useState<string>("");
  const [eventDate, setEventDate] = useState<Date>();

  //attr from date pciker
  const [datePicker, setDatePicker] = useState(new Date());

  //snackbar
  const [visible, setVisible] = React.useState(false);

  //loading indicator
  const [loading, setLoading] = useState<boolean>(false);

  // TODO: Follow the Expo Docs to implement the ImagePicker component.
  // https://docs.expo.io/versions/latest/sdk/imagepicker/
  const [image, setImage] = useState(null);

  
  const pickImage = async () => {
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setEventImage(result.assets[0].uri);
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={pickImage}>Pick an image from camera roll</Button>
        {eventImage && <Image source={{ uri: eventImage }} style={{ width: 200, height: 200 }} />}
      </View>
    );
    
  }
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // TODO: Follow the GitHub Docs to implement the react-native-modal-datetime-picker component.
  // https://github.com/mmazzarolo/react-native-modal-datetime-picker

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setEventDate(date)
    console.warn("A date has been picked: ", eventDate);
    hideDatePicker();
  };
  

  // TODO: Follow the SnackBar Docs to implement the Snackbar component.
  // https://callstack.github.io/react-native-paper/snackbar.html
  const MissingInfo = () => {
  
    const onToggleSnackBar = () => setVisible(!visible);
  
    const onDismissSnackBar = () => setVisible(false);
  
    return (
      <View style={styles.container}>
        <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button>
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Undo',
            onPress: () => {
              // Do something
            },
          }}>
          Missing Information!
        </Snackbar>
      </View>
    );
  };
  
  const saveEvent = async () => {
    // TODO: Validate all fields (hint: field values should be stored in state variables).
    // If there's a field that is missing data, then return and show an error
    // using the Snackbars

    //validate fields
    if (!eventName || !eventDate || !eventDescription || !eventImage || !eventLocation) {
      setVisible(true);
      MissingInfo();

    }

    // Otherwise, proceed onwards with uploading the image, and then the object.

    try {

      // NOTE: THE BULK OF THIS FUNCTION IS ALREADY IMPLEMENTED FOR YOU IN HINTS.TSX.
      // READ THIS TO GET A HIGH-LEVEL OVERVIEW OF WHAT YOU NEED TO DO, THEN GO READ THAT FILE!

      // (0) Firebase Cloud Storage wants a Blob, so we first convert the file path
      // saved in our eventImage state variable to a Blob.
      
        //convert image to blob
        const asyncAwaitNetworkRequests = async () => {
          //fetch file data have to make as blob for stupid ts
          const object = (await getFileObjectAsync(eventImage)) as Blob;
          //init Firestore data connection
          const db = getFirestore();
          //init firebase cloud storage connection
          const storage = getStorage(getApp());
          //makes reference to where exactly the image file will be stored
          const storageRef = ref(storage, uuid() + ".jpg");
          //upload the image to location specified by storageRef
          const result = await uploadBytes(storageRef, object);
          //grabs the downloaded url for uploaded image
          const downloadURL = await getDownloadURL(result.ref);
          //social data
          const socialDoc: SocialModel = {
            eventName: eventName,
            eventDate: eventDate !== undefined ? eventDate.getDate() : new Date().getDate(), // Convert to timestamp
            eventLocation: eventLocation,
            eventDescription: eventDescription,
            eventImage: downloadURL,
          };
          const socialRef = collection(db, "socials")
        //await setDoc(socialRef, socialDoc);
      };

      console.log("Finished writing social.")
    } catch (e) {
      console.log("Error while writing social:", e);
    }

    navigation.goBack();
  };

  const Bar = () => {
    return (
      <Appbar.Header>
        <Appbar.Action onPress={navigation.goBack} icon="close" />
        <Appbar.Content title="Socials" />
      </Appbar.Header>
    );
  };

  return (
    <>
      <Bar />
      <View style={{ ...styles.container, padding: 20 }}>
        {/* TextInput */}
        <TextInput
         label='eventName'
         value = {eventName}
         onChangeText={eventName => setEventName(eventName)}
         ></TextInput>
        

        {<Text>{"\n\n"}</Text>}
        
        {/* TextInput */}
        <TextInput
        label='eventLocation'
        value = {eventLocation}
        onChangeText={eventLocation => setEventLocation(eventLocation)}
        ></TextInput>
        

        {<Text>{"\n\n"}</Text>}

        {/* TextInput */}
        <TextInput
        label='eventDescription' 
        value = {eventDescription} 
        onChangeText={eventDescription => setEventDescription(eventDescription)}
        ></TextInput>
        
        <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        />
        {/* Button */}
        <Button onPress={showDatePicker}>Choose a Date</Button>

        
      
        {/* Button */}
        <Button onPress={pickImage}>Pick an Image</Button>

        {/* Button */}
        <Button onPress={saveEvent}>Save Event</Button>

        {/* DateTimePickerModal */}
        {/* Snackbar */}
      </View>
    </>
  );
}
