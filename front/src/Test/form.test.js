// FormPage.test.js
// import React from 'react';
// import { render, screen, fireEvent, act } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import axios from 'axios';
// import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk';

// import FormPage from './FormPage';
// import Validation from './Validation';

// jest.mock('axios');

// const mockStore = configureStore([thunk]);

// describe('FormPage Component', () => {
//   let store;

//   beforeEach(() => {
//     store = mockStore({
//       genres: [
//         { id: 1, name: 'Action' },
//         { id: 2, name: 'Adventure' },
//         // Add more genres as needed
//       ],
//     });
//   });

//   test('renders FormPage component', () => {
//     render(
//       <Provider store={store}>
//         <FormPage />
//       </Provider>
//     );

//     // Add your assertions based on the rendered component
//     expect(screen.getByText('Video Game Creation Form')).toBeInTheDocument();
//     // Add more assertions as needed
//   });

//   test('handles form submission', async () => {
//     // Mock axios post method
//     axios.post.mockResolvedValueOnce({});

//     render(
//       <Provider store={store}>
//         <FormPage />
//       </Provider>
//     );

//     // Simulate form input
//     fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'Test Game' } });
//     // Add more simulated form inputs as needed

//     // Simulate form submission
//     act(() => {
//       fireEvent.click(screen.getByText(/Register/i));
//     });

//     // Add assertions based on the expected behavior after form submission
//     // For example, you can check if the axios.post method was called with the correct arguments
//     expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/videogames', expect.any(Object));

//     // Add more assertions as needed
//   });

//   // Add more test cases for different scenarios
// });

// // You can also write tests for the Validation function
// describe('Validation Function', () => {
//   test('validates form inputs', () => {
//     const validInput = {
//       name: 'Test Game',
//       description: 'This is a test game',
//       platforms: 'PC, Xbox, PS4',
//       genres: ['Action'],
//       image: 'http://example.com/image.jpg',
//       released: '2023-01-01',
//       rating: '4.5',
//     };

//     const errors = Validation(validInput);

//     expect(errors).toEqual({});
//   });

//   test('handles invalid form inputs', () => {
//     const invalidInput = {
//       name: '',
//       description: '',
//       platforms: 'Invalid Platform',
//       genres: [],
//       image: '',
//       released: '',
//       rating: '6',
//     };

//     const errors = Validation(invalidInput);

//     // Add assertions based on the expected validation errors
//     expect(errors.name).toBeDefined();
//     expect(errors.description).toBeDefined();
//     expect(errors.platforms).toBeDefined();
//     expect(errors.genres).toBeDefined();
//     expect(errors.image).toBeDefined();
//     expect(errors.released).toBeDefined();
//     expect(errors.rating).toBeDefined();
//   });
// });
