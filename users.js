const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dataFilePath = 'userData.json';

let users = [];

// Function to add a new user
function addUser() {
    rl.question('Enter user name: ', (name) => {
        rl.question('Enter user age: ', (age) => {
            const user = {
                name,
                age: parseInt(age)
            };
            users.push(user);
            saveDataToFile();
            console.log('User added successfully!');
            showMenu();
        });
    });
}

// Function to list all users
function listUsers() {
    console.log('\nList of Users:');
    users.forEach((user, index) => {
        console.log(`${index + 1}. Name: ${user.name}, Age: ${user.age}`);
    });
    showMenu();
}

// Function to search for a user by name
function searchUser() {
    rl.question('Enter user name to search: ', (searchName) => {
        const foundUsers = users.filter((user) => user.name.toLowerCase() === searchName.toLowerCase());
        if (foundUsers.length > 0) {
            console.log('\nFound User(s):');
            foundUsers.forEach((user) => {
                console.log(`Name: ${user.name}, Age: ${user.age}`);
            });
        } else {
            console.log('User not found.');
        }
        showMenu();
    });
}

// Function to update user information
function updateUser() {
    rl.question('Enter user name to update: ', (updateName) => {
        const userIndex = users.findIndex((user) => user.name.toLowerCase() === updateName.toLowerCase());
        if (userIndex !== -1) {
            rl.question('Enter new age: ', (newAge) => {
                users[userIndex].age = parseInt(newAge);
                saveDataToFile();
                console.log('User information updated successfully!');
            });
        } else {
            console.log('User not found.');
        }
        showMenu();
    });
}

// Function to delete a user
function deleteUser() {
    rl.question('Enter user name to delete: ', (deleteName) => {
        const userIndex = users.findIndex((user) => user.name.toLowerCase() === deleteName.toLowerCase());
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
            saveDataToFile();
            console.log('User deleted successfully!');
        } else {
            console.log('User not found.');
        }
        showMenu();
    });
}

// Function to display statistics about user data
function showStatistics() {
    const totalUsers = users.length;
    const averageAge = totalUsers > 0 ? users.reduce((sum, user) => sum + user.age, 0) / totalUsers : 0;

    console.log(`\nStatistics:`);
    console.log(`- Total Users: ${totalUsers}`);
    console.log(`- Average Age: ${averageAge.toFixed(2)}`);
    showMenu();
}

// Function to sort users based on a specified criteria
function sortUsers() {
    console.log('\nSort Users By:');
    console.log('1. Name');
    console.log('2. Age');

    rl.question('Enter your choice (1-2): ', (sortChoice) => {
        switch (sortChoice) {
            case '1':
                users.sort((a, b) => a.name.localeCompare(b.name));
                console.log('Users sorted by name.');
                showMenu();
                break;
            case '2':
                users.sort((a, b) => a.age - b.age);
                console.log('Users sorted by age.');
                showMenu();
                break;
            default:
                console.log('Invalid choice. Please enter 1 or 2.');
                sortUsers();
        }
    });
}

// Function to clear all user data
function clearUserData() {
    rl.question('Are you sure you want to clear all user data? (yes/no): ', (confirmation) => {
        if (confirmation.toLowerCase() === 'yes') {
            users = [];
            saveDataToFile();
            console.log('All user data cleared.');
        } else {
            console.log('Operation canceled.');
        }
        showMenu();
    });
}

// Function to save user data to a file
function saveDataToFile() {
    const dataToSave = JSON.stringify(users, null, 2);
    fs.writeFileSync(dataFilePath, dataToSave);
}

// Function to load user data from a file
function loadDataFromFile() {
    if (fs.existsSync(dataFilePath)) {
        const data = fs.readFileSync(dataFilePath, 'utf-8');
        users = JSON.parse(data);
        console.log('User data loaded successfully.');
    } else {
        console.log('No existing user data found.');
    }
}

// Function to display the main menu
function showMenu() {
    console.log('\nMenu:');
    console.log('1. Add User');
    console.log('2. List Users');
    console.log('3. Search User');
    console.log('4. Update User');
    console.log('5. Delete User');
    console.log('6. Show Statistics');
    console.log('7. Sort Users');
    console.log('8. Clear All User Data');
    console.log('9. Save Data to File');
    console.log('10. Load Data from File');
    console.log('11. Exit');

    rl.question('Enter your choice (1-11): ', (choice) => {
        switch (choice) {
            case '1':
                addUser();
                break;
            case '2':
                listUsers();
                break;
            case '3':
                searchUser();
                break;
            case '4':
                updateUser();
                break;
            case '5':
                deleteUser();
                break;
            case '6':
                showStatistics();
                break;
            case '7':
                sortUsers();
                break;
            case '8':
                clearUserData();
                break;
            case '9':
                saveDataToFile();
                console.log('Data saved to file.');
                showMenu();
                break;
            case '10':
                loadDataFromFile();
                showMenu();
                break;
            case '11':
                rl.close();
                break;
            default:
                console.log('Invalid choice. Please enter a number between 1 and 11.');
                showMenu();
        }
    });
}

// Start the application
loadDataFromFile(); // Load existing user data from the file
console.log('User Information Manager\n');
showMenu();