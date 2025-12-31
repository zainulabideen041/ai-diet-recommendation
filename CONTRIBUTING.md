# Contributing to AI Dietary Recommendation App

First off, thank you for considering contributing to the AI Dietary Recommendation App! It's people like you that make this project better for everyone.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Standards

- **Be respectful** and inclusive
- **Be collaborative** and helpful
- **Focus on what is best** for the community
- **Show empathy** towards other community members

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and what you expected
- **Include screenshots or GIFs** if applicable
- **Include your environment details** (OS, Node version, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful**
- **List any alternative solutions** you've considered

### Your First Code Contribution

Unsure where to begin? You can start by looking through these issue labels:

- `good-first-issue` - Issues suitable for beginners
- `help-wanted` - Issues that need assistance
- `bug` - Bug fixes
- `enhancement` - New features or improvements

## 🛠️ Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/ai-diet-recommendation.git
   cd ai-diet-recommendation
   ```

3. **Set up the backend**:
   ```bash
   cd BACKEND
   npm install
   cp .env.example .env
   # Edit .env with your credentials
   npm start
   ```

4. **Set up the frontend** (in a new terminal):
   ```bash
   cd FRONTEND
   npm install
   cp .env.example .env
   # Edit .env with your credentials
   npm run dev
   ```

5. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🔄 Pull Request Process

1. **Update documentation** if needed (README, comments, etc.)
2. **Follow the coding standards** outlined below
3. **Test your changes thoroughly**
4. **Commit your changes** with clear commit messages
5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request** with a clear title and description

### Pull Request Checklist

- [ ] Code follows the project's coding standards
- [ ] Self-review of code completed
- [ ] Comments added for complex logic
- [ ] Documentation updated (if applicable)
- [ ] No new warnings or errors introduced
- [ ] Tested locally and works as expected
- [ ] Related issues linked in PR description

## 💻 Coding Standards

### JavaScript/React

- Use **ES6+ syntax** (arrow functions, destructuring, etc.)
- Use **functional components** with hooks (not class components)
- Follow **React best practices**:
  - Keep components small and focused
  - Use meaningful component and variable names
  - Avoid prop drilling (use Context or Redux when needed)
  - Use `useCallback` and `useMemo` for optimization when appropriate

### Code Style

- **Indentation**: 2 spaces
- **Quotes**: Use double quotes for JSX attributes, single quotes for JavaScript
- **Semicolons**: Use them consistently
- **Line length**: Keep lines under 100 characters when possible
- **Naming conventions**:
  - Components: PascalCase (`UserProfile.jsx`)
  - Functions/variables: camelCase (`getUserData`)
  - Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)
  - Files: Match component name or use kebab-case

### Backend (Node.js/Express)

- Use **async/await** instead of callbacks
- Implement proper **error handling**
- Use **middleware** for common functionality
- Follow **RESTful API conventions**
- Add **input validation** for all endpoints
- Use **meaningful HTTP status codes**

### Frontend (React)

- Keep **components modular** and reusable
- Use **Redux** for global state management
- Use **local state** for component-specific data
- Implement **loading states** and **error handling**
- Ensure **responsive design** (mobile-first approach)
- Use **Tailwind CSS** classes consistently

## 📝 Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates

### Examples

```bash
feat(auth): add Google OAuth login functionality

Implemented Google OAuth 2.0 authentication flow for user login.
Added necessary backend routes and frontend components.

Closes #123
```

```bash
fix(ai): resolve recommendation generation error

Fixed issue where AI recommendations failed for users with
incomplete health profiles.

Fixes #456
```

```bash
docs(readme): update environment variables section

Added detailed instructions for obtaining Gemini API key.
```

## 🧪 Testing

- **Test your changes** before submitting a PR
- **Test edge cases** and error scenarios
- **Test on different browsers** (Chrome, Firefox, Safari)
- **Test responsive design** on different screen sizes
- Consider adding **unit tests** for new features

## 🎨 UI/UX Guidelines

- Follow the existing **design patterns** and **color scheme**
- Ensure **accessibility** (ARIA labels, keyboard navigation, etc.)
- Maintain **consistency** with existing components
- Use **animations** sparingly and purposefully
- Test with **different screen sizes** and devices

## 📚 Documentation

- Update **README.md** for significant changes
- Add **JSDoc comments** for complex functions
- Update **ENV_SETUP_GUIDE.md** for new environment variables
- Include **inline comments** for non-obvious code

## ❓ Questions?

Feel free to:
- Open an issue with the `question` label
- Reach out to the maintainers
- Join our community discussions

## 🙏 Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort!

---

**Happy Coding! 🚀**
