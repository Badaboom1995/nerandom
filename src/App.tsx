import React, { useEffect, useState } from "react";
import AppRouter, { NonUserRouter } from "./router";

function App() {
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState("vasya");

  useEffect(() => {
    console.log("");
  }, []);

  return (
    <div className="App">
      {isLoading && <div>loading...</div>}
      {user ? <AppRouter /> : <NonUserRouter />}
    </div>
  );
}

export default App;
