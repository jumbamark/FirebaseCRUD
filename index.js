// Function that creates a firebase app that stores fb config for your project
const {initializeApp} = require("firebase/app");
const {getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc} = require("firebase/firestore");


// initializes firebase
// Function returns a firebase app instance
// This instance is how the firebase STK knows how to connect to your specific firebase backend
const firebaseApp = initializeApp({
    // Configuration object that you pass to the imported function
    apiKey: "AIzaSyD2hiUHw6PfI8qBzk71oy7pfY85UO7OefQ",
    authDomain: "fir-crud-d09dc.firebaseapp.com",
    projectId: "fir-crud-d09dc",
    storageBucket: "fir-crud-d09dc.appspot.com",
    messagingSenderId: "26895883793",
    appId: "1:26895883793:web:915b6d174237eb72171bb0",
    measurementId: "G-MWFBMRPCJY",
});


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp);


/*
    This function uses the Firebase SDK to add a new document to the 'inventory' collection.
    The implementation is based on the official Firebase documentation:
    https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
*/
// CREATE
// Function to create inventory item using async/await
async function createInventory(itemData) {
    try {
        const docRef = await addDoc(collection(db, "inventory"), itemData);
        // console.log("Document written with ID: ", docRef.id);
        return {success: true, message: "Inventory item created successfully"};
    } catch (error) {
        console.error("Error adding inventory item: ", error);
        throw new Error("Failed to create inventory item");
    }
}

// Example usage:
const exampleItemData = {
    name: "Stephanies",
    quantity: 60,
    price: 65.99
};

// Call the createInventory function with example data
// createInventory(exampleItemData)
//     .then(result => console.log(result))
//     .catch(error => console.error(error));


// READ
// Function to get all inventory items
async function getInventory() {
    try {
        const querySnapshot = await getDocs(collection(db, "inventory"));
        const inventoryData = [];

        querySnapshot.forEach((doc) => {
            inventoryData.push({
                id: doc.id,
                data: doc.data()
            });
        });

        // console.log("Inventory items:", inventoryData);
        return inventoryData;
    } catch (error) {
        console.error("Error getting inventory items: ", error);
        throw new Error("Failed to get inventory items");
    }
}

// Call the getInventory function
// getInventory()
//     .then(result => console.log(result))
//     .catch(error => console.error(error));


// UPDATE
// Function to update an inventory item
async function updateInventory(itemId, updatedData) {
    try {
        const inventoryRef = doc(collection(db, "inventory"), itemId);
        await updateDoc(inventoryRef, updatedData);

        // console.log("Inventory item updated successfully");
        return {success: true, message: "Inventory item updated successfully"};
    } catch (error) {
        console.error("Error updating inventory item: ", error);
        throw new Error("Failed to update inventory item");
    }
}

// Example usage:
const itemIdToUpdate = "6ZWTplB1EdwTXBV3YtFX"; 
const updatedItemData = {
    name: "Stephanies",
    quantity: 1,
    price: 10099
};

// Call the updateInventory function with item ID and updated data
// updateInventory(itemIdToUpdate, updatedItemData)
//     .then(result => console.log(result))
//     .catch(error => console.error(error));


// DELETE
// Function to delete an inventory item
async function deleteInventory(itemId) {
    try {
        const inventoryRef = doc(collection(db, "inventory"), itemId);
        await deleteDoc(inventoryRef);

        // console.log("Inventory item deleted successfully");
        return {success: true, message: "Inventory item deleted successfully"};
    } catch (error) {
        console.error("Error deleting inventory item: ", error);
        throw new Error("Failed to delete inventory item");
    }
}

// Example usage:
const itemIdToDelete = "6ZWTplB1EdwTXBV3YtFX";

// Call the deleteInventory function with item ID
deleteInventory(itemIdToDelete)
    .then(result => console.log(result))
    .catch(error => console.error(error));


