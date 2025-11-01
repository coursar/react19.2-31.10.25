// Component ->
//  - JSX -> React.Element
//  - string, ..., undefined

// TODO: top mistakes
//  1. omit return
//  2. multiple JSX elements
//  3. return + EOL => return; => return undefined;
// SOLUTION => return (<> ... </>)
const App = () => {
  // React.Fragment -> container, doesn't create any DOM
  return (
    <>
      Messages
    </>
  )
}

export default App
