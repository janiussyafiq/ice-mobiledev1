import { useEffect, useState } from "react";
import { Alert, Button, Image, Pressable, Text, View } from "react-native";

import CS571 from "@cs571/mobile-client"

// TODO: Displ>ay the bio data from https://cs571api.cs.wisc.edu/rest/f24/ice/mascot
// TODO: Whenever a button is clicked, display the message from https://cs571api.cs.wisc.edu/rest/f24/ice/mascot-messages
export default function Mascot(props) {

    const [name, setName] = useState("");
    const [slogan, setSlogan] = useState("");
    const [img, setImg] = useState();
    useEffect(() => {
        fetch("https://cs571api.cs.wisc.edu/rest/f24/ice/mascot", {
            headers: {
                "X-CS571-ID": "bid_021c09d7422005a4b1ff28923f3f63e32621d628328fb8492fa5279113ac4c90"
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setName(data.name);
            setSlogan(data.quote);
            setImg(data.imgSrc);
        })
    
    }, [])

    function handlePress() {
        fetch("https://cs571api.cs.wisc.edu/rest/f24/ice/mascot-messages", {
            headers: {
                "X-CS571-ID": "bid_021c09d7422005a4b1ff28923f3f63e32621d628328fb8492fa5279113ac4c90"
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            Alert.alert("Message received!", data.msg)
        })
    }

    return <Pressable onPress={handlePress}>
        <Image style={{width: 200, height: 200}} source={{uri: img}}></Image>
        <Text style={{fontSize: 36}}>Name: {name} </Text>
        <Text style={{fontSize: 18}}>Slogan: {slogan}</Text>
    </Pressable>
}