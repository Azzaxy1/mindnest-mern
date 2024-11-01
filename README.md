# Nexa Blog

Nexa Blog is a full-stack blogging application built using the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- **Post Management**: Users can easily create, edit, and delete blog posts through an intuitive interface.
- **Authentication and Authorization**: A secure login system ensures that only registered users can create or manage their own content.

## Technologies Used

- **Frontend:** React, Redux, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** Sass

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Azzaxy1/mern-nexablog.git
cd mern-nexablog
```

2. Install dependencies for both frontend and backend:

```bash
cd be-mern-nexablog
npm install
cd fe-mern-nexablog
npm install
```

3. Create a `.env` file in the `server` directory and add the following:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the development server:

```bash
cd be-mern-nexablog
npm run dev
```

5. Open another terminal and start the React development server:

```bash
cd fe-mern-nexablog
npm start
```

## Usage

- Register a new account or log in with an existing account.
- Create, edit, and delete blog posts.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## Contact

For any inquiries, please contact [abdurrohmanazis@gmail.com](mailto:abdurrohmanazis@gmail.com).
