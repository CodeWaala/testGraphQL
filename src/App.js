import github from "./db.js";
import githubQuery from "./Query.js";
import { useEffect, useState, useCallback } from "react";

function App() {
  let [userName, setUserName] = useState("");
  let [repoList, setRepoList] = useState(null);

  // const fetchData = useCallback(() => {
  //   fetch(github.baseUrl, {
  //     method: "POST",
  //     headers: github.headers,
  //     body: JSON.stringify(githubQuery),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUserName(data.data.viewer.name);
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    fetch(github.baseUrl, {
      method: "POST",
      headers: github.headers,
      body: JSON.stringify(githubQuery),
    })
      .then((response) => response.json())
      .then((data) => {
        const viewer = data.data.viewer;
        setUserName(viewer.name);
        setRepoList(viewer.repositories.nodes);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Basic = (props) => {
    return (
      <div>
        <p>Hello World {props.name}</p>
      </div>
    );
  };

  return (
    <div className="App container mt-5">
      <Basic name="Abhishek"/>
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i>Repos
      </h1>
      <h4>Hello {userName} !!</h4>
      {repoList && (
        <ul className="list-group list-group-flush">
          {repoList.map((repo, i) => {
            return (
              <li className="list-group-item" key={repo.id}>
                <a className="h5 mb-0 text-decoration-none" href={repo.url}>
                  {repo.name}
                </a>
                <p className="small">{repo.description}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
