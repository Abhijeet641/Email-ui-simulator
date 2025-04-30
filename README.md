# SecureMail UI Simulator

A React TypeScript application that simulates a secure email interface with role-based access control, email filtering, and search functionality.


## Features

- **Role-Based Access Control**: Switch between User and Admin roles to see different emails
- **Email Organization**: Filter emails by Inbox, Spam, and Archived folders
- **Search Capability**: Search emails by subject, sender, or content
- **Email Details**: View complete email details in a modal dialog
- **Email Actions**: Archive emails or mark them as spam/not spam
- **Unread Tracking**: Visual indicators for unread emails with badge counters
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- React 18+
- TypeScript
- Styled Components
- Modern JavaScript (ES6+)

## Installation

Follow these steps to set up the project locally:

```bash
# Clone the repository
git clone https://github.com/your-username/securemail-ui.git
cd securemail-ui

# Install dependencies
npm install

# Start the development server
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── components/      # React components
├── types/           # TypeScript type definitions
├── styles/          # Global styles and themes
├── data/            # Sample email data
├── App.tsx          # Main application component
└── index.tsx        # Application entry point
```

## Usage

1. **Switch Roles**: Use the role selector in the header to switch between User and Admin views
2. **Navigate Folders**: Click on folders in the sidebar to filter emails
3. **Search**: Type in the search box to filter emails by content
4. **View Email**: Click on an email card to view its details
5. **Email Actions**: Use the Archive or Spam/Not Spam buttons in the email detail view

## Development Notes

### Type Definitions

If you encounter issues with the validator library's type definitions, you can:

1. Install the official types:
   ```bash
   npm install --save-dev @types/validator
   ```

2. Or use the custom type definitions located in `src/types/validator/index.d.ts`

## Testing

Run the test suite with:

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Created as a demonstration of React and TypeScript capabilities
- Inspired by modern email UI/UX designs
