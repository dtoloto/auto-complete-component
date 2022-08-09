# React Questionnaire

**1. What is the difference between Component and PureComponent? give an
example where it might break my app.**
Well, let consider this scenario:

    <ParentComponent>
	    <FirstChildComponent prop={this.state.prop} />
	    <SecondChildComponent />
    </ParentComponent>

In theory, only the `FirstChildComponent` should be re-rendered when the `prop` state is updated.

However,  `SecondChildComponent` is extending `Component`, so every time `this.state.prop` is updated, the component will be re-rendered, because, by default, the `Component` class doesn't care if the component is not using the parent prop, it will refresh every time it updates. 

To avoid this behavior, there are two solutions: 

 1. Implementing the `shouldComponentUpdate()` method;
 2. Extending `PureComponent` instead of `Component`.

However, if you use both solutions at the same time - a `PureComponent` with the 
`shouldComponentUpdate()`, your app is going to break.

**2. Context + ShouldComponentUpdate might be dangerous. Can think of why is
that?**
`shouldComponentUpdate`  can block the context propagation in the component tree 

**3. Describe 3 ways to pass information from a component to its PARENT.**

 1 -  Passing a function as a prop to child
	
	const Parent = () => {
		const countClick = () => {
			// update click counter
		}
		return <Child handleClick={countClick}/>
	}

    const Child = ({ handleClick }) => {
	    <button onClick={handleClick} />
	}
    

2 - Using Context API
3 - Passing a Ref as an attribute

    const Parent = () => {
	    const ref = useRef()
		const handler = () => {
			console.log(ref.current)
		}
		return <Child ref={ref}/>
	}

    const Child = ({ ref }) => {
	    const handleClick = () => {
		    ref.current = some_data
	    }
	    <button onClick={handleClick} />
	}

**4. Give 2 ways to prevent components from re-rendering.**
1. Using `useMemo` hook for functional components
2. Using `useRef` instead of `useState` when using forms

**5. What is a fragment and why do we need it? Give an example where it might
break my app.**
React fragment is used when you need to wrap more than one element in the same level into a component, eliminating unnecessary `div`'s , for example: 

	    <>
		   <ChildOne/>
		   <ChildTwo />
	    </>

However, if you need to render an array, you might face some issues, because you need to pass the `key` prop. You can't do the following:
		
	<div>
		{a.map(item  => (
			<key={item}>{item}</>
		))}
	</div>

In this cases, you should use:
	
	<div>
		{a.map(item  => (
			<React.Fragment key={item}>{item}</ React.Fragment>
		))}
	</div>

**6. Give 3 examples of the HOC pattern.**
Loader example:

    function LoadingHOC(WrappedComponent) {
        return class extends React.Component{
          render() {
            return this?.props?.isLoading
              ? <Loader />
              : <WrappedComponent {...this?.props} />
          }
        }
    }

Auth example:

    function AuthHOC(WrappedComponent) {
        return class extends React.Component{
          render() {
            return this?.props?.isAuth
              ? <WrappedComponent {...this?.props} />
              : <LoginModal />
          }
        }
    }

Blog/External Data example:

    export function BlogHOC(WrappedComponent) {
      return class extends React.Component {
        state = {
          data: [],
          loading: true,
        }
    
        async componentDidMount() {
          const response = await fetch(BLOG_API);
          const data = await response.json();
    
          this.setState({ data, loading: false });
        }
    
        render() {
          return <WrappedComponent blogData={this.state} {...this.props} />;
        }
      };
    }

**7. what's the difference in handling exceptions in promises, callbacks and
async...await.**

For `async/await` :

    const  getData  =  async () => {
	    try {
		    await  fetchData()
	    } catch (err) {
		    //error handler
	    }
    }

Promises:

    new  Promise((resolve, reject) => {
		// ...
	}).then((result) => {
		//...
	}).catch((error) => {
		// error handler
	});

Callbacks: 

    functionWithCallback(someArgument, (err, data) => {
	    if(err) {
		    // error handler
	    }
	    // ...
    })

**8. How many arguments does setState take and why is it async.**
The `setState` takes 2 arguments: `setState(updater, [callback])`, and since it can be an expensive operation that can block browser response, it is async

**9. List the steps needed to migrate a Class to Function Component.**
1 - Change class notation `class App extends Component {}` to function: `function App() {}`

2- Change `render()` method 
```
  render() {
    return (
      <div/>
    );
  }
```
to `return` usage only:
```
  
   return (
      <div/>
    );
```

3 - internal functions need to be declared like:

```
  const handleClick = () => {
    alert('clicked');
  };
```

4 - States need to be declared and updated using `useState` hook:

    const [count, setCount] = useState(0)
    
    const handleClick = () => {
      setCount(count => count + 1)
    };

5 - `useEffect` hook is used to control component lifecycle

	useEffect(() => {
		// fetch some data when component did mount
	}, [])


**10. List a few ways styles can be used with components.**

1. Inline styles

		<div style={{ width: 300, height: 300, backgroundColor: 'red' }} />

2. Using 3rd party libraries like `Styled-Component`, scss or sass

3. Using `import style from './style.module.css'`  or `import  './App.css'` approach


**11. How to render an HTML string coming from the server.**

    function MyComponent() {
      const [htmlString, setHtmlString] = useState('')
    
      const fetchData = async () => {
        const response = await fetch(SERVER_URL)
        const data = await response?.json()
        setHtmlString(data)
      }
    
      useEffect(() => {
        fetchData()
      }, [])
    
      return <div dangerouslySetInnerHTML={{ __html: htmlString }}>
    }
