export const reactQuestions = [
  {
    question: "What is React?",
    answer:
      "React is a JavaScript library for building user interfaces using components.",
  },
  {
    question: "What are components in React?",
    answer:
      "Components are independent, reusable pieces of UI in React, which can be functional or class-based.",
  },
  {
    question: "What is JSX?",
    answer:
      "JSX is a syntax extension that looks like HTML but is used in React to describe the UI.",
  },
  {
    question: "What are props in React?",
    answer:
      "Props (properties) are inputs to React components that allow data to be passed from parent to child.",
  },
  {
    question: "What is state in React?",
    answer:
      "State is a built-in React object used to store data that can change over time within a component.",
  },
  {
    question: "What is the difference between state and props?",
    answer:
      "Props are read-only and passed from parent to child, while state is managed within the component and can be changed.",
  },
  {
    question: "What is a functional component?",
    answer:
      "A functional component is a React component defined as a JavaScript function returning JSX.",
  },
  {
    question: "What is a class component?",
    answer:
      "A class component is a React component defined as an ES6 class that extends React.Component and has lifecycle methods.",
  },
  {
    question: "What are React hooks?",
    answer:
      "Hooks are special functions that let you use React features like state and lifecycle in functional components.",
  },
  {
    question: "What does useState hook do?",
    answer: "useState lets you add state to functional components.",
  },
  {
    question: "What is useEffect hook?",
    answer:
      "useEffect lets you perform side effects (like data fetching) in functional components.",
  },
  {
    question: "When does useEffect run?",
    answer:
      "By default, it runs after every render, but you can control it using dependency arrays.",
  },
  {
    question: "What is the virtual DOM?",
    answer:
      "The virtual DOM is a lightweight copy of the real DOM React uses to optimize UI updates.",
  },
  {
    question: "How does React update the DOM efficiently?",
    answer:
      "React uses the virtual DOM and diffing algorithm to batch updates and minimize direct DOM manipulation.",
  },
  {
    question: "What is a key in React and why is it important?",
    answer:
      "Keys help React identify which items have changed, are added, or removed, improving rendering performance.",
  },
  {
    question: "What is conditional rendering in React?",
    answer:
      "Conditional rendering lets you render different UI based on conditions using JavaScript operators like if or ternary.",
  },
  {
    question: "What is lifting state up in React?",
    answer:
      "Lifting state up means moving state to a common ancestor to share it among multiple components.",
  },
  {
    question:
      "What is the difference between controlled and uncontrolled components?",
    answer:
      "Controlled components have their state controlled by React, while uncontrolled components manage their own state.",
  },
  {
    question: "What is context in React?",
    answer:
      "Context provides a way to pass data through the component tree without passing props manually at every level.",
  },
  {
    question: "How do you create context in React?",
    answer: "Using React.createContext() to create a context object.",
  },
  {
    question: "What is a higher-order component (HOC)?",
    answer:
      "An HOC is a function that takes a component and returns a new component to add additional functionality.",
  },
  {
    question: "What is React Router?",
    answer:
      "React Router is a library for handling navigation and routing in React single-page applications.",
  },
  {
    question: "How do you pass data between components in React?",
    answer:
      "By passing props from parent to child or using context for global data.",
  },
  {
    question: "What is reconciliation in React?",
    answer:
      "Reconciliation is the process React uses to compare the virtual DOM with the real DOM to update UI efficiently.",
  },
  {
    question: "What is the useRef hook?",
    answer:
      "useRef lets you persist values between renders and access DOM elements directly.",
  },
  {
    question: "What is the difference between useEffect and useLayoutEffect?",
    answer:
      "useEffect runs after painting, while useLayoutEffect runs synchronously after DOM mutations but before painting.",
  },
  {
    question: "What are fragments in React?",
    answer:
      "Fragments let you group a list of children without adding extra nodes to the DOM.",
  },
  {
    question: "How do you optimize performance in React?",
    answer:
      "By using React.memo, useCallback, useMemo, and avoiding unnecessary renders.",
  },
  {
    question: "What is React.memo?",
    answer:
      "React.memo is a HOC that memoizes functional components to prevent unnecessary re-renders.",
  },
  {
    question: "What is the purpose of useCallback hook?",
    answer:
      "useCallback memoizes functions to prevent them from being re-created on every render.",
  },
  {
    question: "What is the purpose of useMemo hook?",
    answer: "useMemo memoizes expensive calculations to optimize performance.",
  },
  {
    question: "What is the default behavior of a form submission in React?",
    answer:
      "It causes a page reload unless prevented with event.preventDefault().",
  },
  {
    question: "How do you handle events in React?",
    answer:
      "Using camelCase event handlers like onClick, onChange, and passing functions.",
  },
  {
    question: "What are synthetic events in React?",
    answer:
      "Synthetic events are React's cross-browser wrapper around native events.",
  },
  {
    question: "What is prop drilling?",
    answer:
      "Passing props through many intermediate components to reach deeply nested components.",
  },
  {
    question: "How can you avoid prop drilling?",
    answer: "Using context or state management libraries like Redux.",
  },
  {
    question: "What is Redux?",
    answer:
      "Redux is a predictable state container for JavaScript apps, often used with React.",
  },
  {
    question: "What is the purpose of keys in lists?",
    answer:
      "To help React identify which items have changed, added, or removed.",
  },
  {
    question: "Can you return multiple elements from a component?",
    answer: "Yes, by wrapping them in a fragment or a single parent element.",
  },
  {
    question: "What is the difference between React and ReactDOM?",
    answer:
      "React is the core library, ReactDOM provides DOM-specific methods like rendering.",
  },
  {
    question: "What is server-side rendering (SSR) in React?",
    answer:
      "Rendering React components on the server to improve performance and SEO.",
  },
  {
    question: "What is hydration in React?",
    answer:
      "Hydration is the process of attaching event listeners to server-rendered HTML.",
  },
  {
    question: "What is the purpose of the useReducer hook?",
    answer:
      "useReducer manages complex state logic using reducers, similar to Redux.",
  },
  {
    question: "What is controlled component in React?",
    answer: "A component whose form data is handled by React state.",
  },
  {
    question: "What is uncontrolled component in React?",
    answer: "A component where form data is handled by the DOM itself.",
  },
  {
    question: "How do you create a React app?",
    answer:
      "Using create-react-app CLI or manually setting up a React environment.",
  },
  {
    question: "What is reconciliation?",
    answer:
      "React's diffing algorithm to update only the parts of the DOM that have changed.",
  },
  {
    question: "What is the significance of the 'key' prop?",
    answer:
      "It helps React keep track of elements in a list and optimize rendering.",
  },
  {
    question: "What are pure components?",
    answer:
      "Components that render the same output for the same props and state.",
  },
  {
    question: "What is React.StrictMode?",
    answer:
      "A wrapper component that activates additional checks and warnings in development.",
  },
  {
    question: "What are error boundaries?",
    answer:
      "Components that catch JavaScript errors anywhere in their child component tree.",
  },
  {
    question: "What lifecycle methods are available in class components?",
    answer: "componentDidMount, componentDidUpdate, componentWillUnmount, etc.",
  },
  {
    question: "What is the difference between componentDidMount and useEffect?",
    answer:
      "componentDidMount runs once after mount in class components; useEffect can be configured similarly in functional components.",
  },
  {
    question: "How do you pass data from child to parent?",
    answer: "By passing a callback function from parent to child as a prop.",
  },
  {
    question: "What is reconciliation in React?",
    answer:
      "The process React uses to update the DOM by comparing the virtual DOM with the actual DOM.",
  },
  {
    question: "How do you optimize large lists in React?",
    answer: "Using windowing libraries like react-window or react-virtualized.",
  },
  {
    question: "What are portals in React?",
    answer:
      "Portals let you render children into a DOM node outside the parent hierarchy.",
  },
  {
    question: "What is the useLayoutEffect hook?",
    answer:
      "It runs synchronously after all DOM mutations but before the browser paints.",
  },
  {
    question: "What is the difference between React and Angular?",
    answer: "React is a library focused on UI; Angular is a full framework.",
  },
  {
    question: "What is reconciliation?",
    answer: "React's algorithm for efficiently updating the DOM.",
  },
];
