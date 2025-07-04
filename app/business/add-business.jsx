import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid, ActivityIndicator,StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { Colors } from '../../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { collection, getDocs, query, setDoc, doc } from 'firebase/firestore';
import { db, storage } from './../../configs/FirebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';

export default function AddBusiness() {
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [categoryList, setCategoryList] = useState([]);

    const { user } = useUser();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [website, setWebsite] = useState('');
    const [about, setAbout] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Add New Vehicle',
            headerShown: true,
            headerStyle: {
                backgroundColor: Colors.PRIMARY
            }
        })
        GetCategoryList();
    }, [])

    const onImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result?.assets[0].uri);
        }
    }

    const GetCategoryList = async () => {
        try {
            const q = query(collection(db, 'Add Category Vehicle'));
            const snapShot = await getDocs(q);

            const categories = [];

            snapShot.forEach((doc) => {
                categories.push({
                    label: doc.data().name,
                    value: doc.data().name
                });
            });

            setCategoryList(categories);
        } catch (error) {
            console.error('Error fetching category list:', error);
        }
    };

    const validateFields = () => {
        if (!name.trim()) {
            ToastAndroid.show('Model Name cannot be empty', ToastAndroid.LONG);
            return false;
        }
        if (!address.trim()) {
            ToastAndroid.show('Address cannot be empty', ToastAndroid.LONG);
            return false;
        }
        if (!contact.trim() || !/^\d{1,10}$/.test(contact.trim())) {
            ToastAndroid.show('Invalid Contact number', ToastAndroid.LONG);
            return false;
        }
        if (!website.trim() || !/^\d{1,4}$/.test(website.trim())) {
            ToastAndroid.show('Invalid Year of Purchase', ToastAndroid.LONG);
            return false;
        }
        if (!about.trim()) {
            ToastAndroid.show('About cannot be empty', ToastAndroid.LONG);
            return false;
        }
        return true;
    };

    const onAddNewBusiness = async () => {
        if (!validateFields()) {
            return;
        }

        if (!image) {
            ToastAndroid.show('Please select an image', ToastAndroid.LONG);
            return;
        }

        setLoading(true);
        const fileName = Date.now().toString() + ".jpg";
        const resp = await fetch(image);
        const blob = await resp.blob();
        const imageRef = ref(storage, 'add-vehicles/' + fileName);

        uploadBytes(imageRef, blob).then((snapshot) => {
            console.log("File Uploaded");
        }).then(() => {
            getDownloadURL(imageRef).then(async (downloadUrl) => {
                console.log(downloadUrl);
                await saveBusinessDetail(downloadUrl);
            }).catch(error => {
                console.error("Error getting download URL:", error);
                setLoading(false);
            });
        }).catch(error => {
            console.error("Error uploading image:", error);
            setLoading(false);
        });
    }

    const saveBusinessDetail = async (imageUrl) => {
        try {
            await setDoc(doc(db, 'Added Category Vehicle', Date.now().toString()), {
                name: name,
                address: address,
                contact: contact,
                about: about,
                yearofpurchase: website,
                category: category,
                userName: user?.fullName,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                userImage: user?.imageUrl,
                imageUrl: imageUrl
            });
            setLoading(false);
            ToastAndroid.show('New vehicle added', ToastAndroid.LONG);
        } catch (error) {
            console.error('Error saving business detail:', error);
            setLoading(false);
            ToastAndroid.show('Error adding vehicle', ToastAndroid.LONG);
        }
    }

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 25 }}>Add Vehicle</Text>
            <Text style={{ fontFamily: 'outfit', color: Colors.GRAY }}>
                Fill all details carefully!!
            </Text>
            <TouchableOpacity style={{ marginTop: 20 }} onPress={onImagePick}>
                {!image ? (
                    <Image
                        style={{ height: 100, width: 100 }}
                        source={require('./../../assets/images/gallery.png')}
                    />
                ) : (
                    <Image
                        style={{ height: 100, width: 100, borderRadius: 15 }}
                        source={{ uri: image }}
                    />
                )}
            </TouchableOpacity>

            <View>
                <TextInput
                    placeholder='Model Name'
                    onChangeText={(v) => setName(v)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Address'
                    onChangeText={(v) => setAddress(v)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Contact'
                    onChangeText={(v) => setContact(v)}
                    keyboardType='numeric'
                    maxLength={10}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Year of Purchase'
                    onChangeText={(v) => setWebsite(v)}
                    keyboardType='numeric'
                    maxLength={4}
                    style={styles.input}
                />
                <TextInput
                    placeholder='About'
                    onChangeText={(v) => setAbout(v)}
                    multiline
                    numberOfLines={5}
                    style={[styles.input, { height: 100 }]}
                />
                <View style={styles.input}>
                    <RNPickerSelect
                        onValueChange={(value) => setCategory(value)}
                        items={categoryList}
                    />
                </View>
            </View>
            <TouchableOpacity
                disabled={loading}
                style={styles.addButton}
                onPress={onAddNewBusiness}
            >
                {loading ? (
                    <ActivityIndicator size={'large'} color={'#fff'} />
                ) : (
                    <Text style={styles.buttonText}>
                        Add your EV
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 12,
        borderWidth: 1,
        borderRadius: 6,
        fontSize: 17,
        backgroundColor: '#fff',
        marginTop: 10,
        borderColor: Colors.PRIMARY,
        fontFamily: 'outfit'
    },
    addButton: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'outfit-medium',
        color: '#fff'
    }
});
