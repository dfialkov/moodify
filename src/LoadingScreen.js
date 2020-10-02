import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ToastAndroid } from "react-native";

export function LoadingScreen({navigation}){
    return (
        <View
        style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>Loading your suggestion...</Text>
        </View>
      );
}