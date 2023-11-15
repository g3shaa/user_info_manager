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
            rl.question('Enter user role (User/Admin): ', (role) => {
                const user = {
                    name,
                    age: parseInt(age),
                    role: role.toLowerCase() === 'admin' ? 'Admin' : 'User'
                };
                users.push(user);
                saveDataToFile();
                console.log('User added successfully!');
                showMenu();
            });
        });
    });
}

// Function to list all users
function listUsers() {
    console.log('\nList of Users:');
    users.forEach((user, index) => {
        console.log(`${index + 1}. Name: ${user.name}, Age: ${user.age}, Role: ${user.role}`);
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
                console.log(`Name: ${user.name}, Age: ${user.age}, Role: ${user.role}`);
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
                rl.question('Enter new role (User/Admin): ', (newRole) => {
                    users[userIndex].age = parseInt(newAge);
                    users[userIndex].role = newRole.toLowerCase() === 'admin' ? 'Admin' : 'User';
                    saveDataToFile();
                    console.log('User information updated successfully!');
                    showMenu();
                });
            });
        } else {
            console.log('User not found.');
            showMenu();
        }
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

// Function to generate and export a user report
function generateUserReport() {
    const reportContent = users.map((user, index) => `${index + 1}. Name: ${user.name}, Age: ${user.age}, Role: ${user.role}`).join('\n');
    fs.writeFileSync('userReport.txt', reportContent);
    console.log('User report generated and saved to userReport.txt.');
    showMenu();
}

// Function to view the contents of the user report
function viewUserReport() {
    if (fs.existsSync('userReport.txt')) {
        const reportContent = fs.readFileSync('userReport.txt', 'utf-8');
        console.log('\nUser Report:\n', reportContent);
    } else {
        console.log('User report not found. Generate a report first.');
    }
    showMenu();
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
    console.log('9. Generate User Report');
    console.log('10. View User Report');
    console.log('11. Save Data to File');
    console.log('12. Load Data from File');
    console.log('13. Exit');

    rl.question('Enter your choice (1-13): ', (choice) => {
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
                generateUserReport();
                break;
            case '10':
                viewUserReport();
                break;
            case '11':
                saveDataToFile();
                console.log('Data saved to file.');
                showMenu();
                break;
            case '12':
                loadDataFromFile();
                showMenu();
                break;
            case '13':
                rl.close();
                break;
            default:
                console.log('Invalid choice. Please enter a number between 1 and 13.');
                showMenu();
        }
    });
}

// Start the application
loadDataFromFile(); // Load existing user data from the file
console.log('User Information Manager\n');
showMenu();
