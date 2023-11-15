 <h1>User Information Manager Documentation</h1>
  <h2>Overview</h2>
        <p>
            This Node.js script is a user information manager that operates in the console. It allows users to perform
            operations such as adding, listing, searching, updating, and deleting user information.
        </p>
 <h2>Dependencies</h2>
        <p>The script utilizes the following Node.js modules:</p>
        <ul>
            <li><code>readline</code>: Provides an interface for reading input from the console.</li>
            <li><code>fs</code>: Allows interaction with the file system for reading and writing data.</li>
        </ul>
 <h2>Script Structure</h2>
        <p>The script is structured into several functions to manage different aspects of user information:</p>
        <ul>
            <li><code>addUser()</code>: Adds a new user to the system.</li>
            <li><code>listUsers()</code>: Lists all existing users.</li>
            <li><code>searchUser()</code>: Searches for a user by name.</li>
            <li><code>updateUser()</code>: Updates the age of an existing user.</li>
            <li><code>deleteUser()</code>: Deletes an existing user.</li>
            <li><code>showStatistics()</code>: Displays statistics about the user data.</li>
            <li><code>sortUsers()</code>: Sorts users based on criteria like name or age.</li>
            <li><code>clearUserData()</code>: Clears all user data.</li>
            <li><code>saveDataToFile()</code>: Saves user data to a file (userData.json).</li>
            <li><code>loadDataFromFile()</code>: Loads user data from a file.</li>
            <li><code>showMenu()</code>: Displays the main menu for user interaction.</li>
        </ul>
<h2>User Data Structure</h2>
        <p>The user information is stored in an array with each user represented as an object with the following
            properties:</p>
        <ul>
            <li><code>name</code>: The name of the user.</li>
            <li><code>age</code>: The age of the user.</li>
        </ul>
<h2>File Operations</h2>
        <p>The script reads and writes user data to a JSON file (<code>userData.json</code>) to persist information
            between sessions.</p>
