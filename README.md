 # 🎵 Music-Library
A React application that includes a MusicLibrary component wrapped in AppContainer.

### Vite Plugin Federation
This project uses vite-plugin-federation to enable module federation, allowing you to share and consume modules between different applications.

📌 Prerequisites
Ensure you have the following installed:

## Setup and Run

- Node.js (version 16 or higher)
- pnpm (version 7 or higher)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/sukeshhublikar/Music-Library.git
   cd music-library

2. Install dependencies:
   ```sh  
   cd host-app 
   ```

   ```sh
    pnpm install
   ```
   ```sh  
    cd music-library-app
   ```

   ```sh
    pnpm install
   ```
   
### Running the Project

1. Start the development server of host app:
   ```sh
    pnpm dev 
   ```
2.Open your browser and navigates to see the application running.

### Building the Project of music-library-app

To create a production build, run:
```sh
pnpm build
```
```sh
pnpm preview
```

### Running Tests

To run the tests, use:
```sh
pnpm test
```

### Login Credentials 
```sh
[
  { username: "user1@abc.com", password: "user1@abc", role: "admin" },
  { username: "user2@abc.com", password: "user2@abc", role: "user" },
];
```


