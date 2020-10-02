import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ToastAndroid, Linking } from "react-native";
import { Camera } from "expo-camera";

import * as FaceDetector from "expo-face-detector";

export function CameraPage({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [ratio, setRatio] = useState("16:9");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={(ref) => {
          this.camera = ref;
        }}
        ratio={ratio}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: "flex-end",
              alignItems: "center",
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              {" "}
              Flip{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 0.2,
              alignSelf: "flex-end",
              alignItems: "center",
            }}
            onPress={() => {
              navigation.navigate("LoadingScreen");
              this.camera
                .takePictureAsync(
                  (options = {
                    quality: 1,
                    base64: false,
                    exif: false,
                    skipProcessing: false,
                  })
                )
                .then((pic) => {
                  
                  FaceDetector.detectFacesAsync(
                    (uri = pic.uri),
                    (options = {
                      mode: FaceDetector.Constants.Mode.fast,
                      detectLandmarks: FaceDetector.Constants.Landmarks.none,
                      runClassifications:
                        FaceDetector.Constants.Classifications.all,
                    })
                  ).then((imgData) => {
                    if (imgData.faces.length == 0) {
                      ToastAndroid.show(
                        "No face detected. Please try again.",
                        ToastAndroid.SHORT
                      );
                    } else {
                      ToastAndroid.show(imgData.faces[0].smilingProbability.toString(), ToastAndroid.SHORT);
                      if(smilingProbability < 0.1){
                        
                      }
                      else if(smilingProbability > 0.1 && smilingProbability < 0.9){

                      } 
                    }
                    navigation.navigate("CameraPage");
                  });
                });
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              Photo
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
