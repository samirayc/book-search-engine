import gql from "graphql-tag";

// Execute the `loginUser` mutation set up using Apollo Server.
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Execute the `addUser` mutation.
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Execute the `saveBook` mutation.
export const SAVE_BOOK = gql`
  mutation saveBook($bookInput: BookInput!) {
    saveBook(bookInput: $bookInput) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;