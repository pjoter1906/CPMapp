import Hello from "./components/Hello";
import ListGroup from "./components/ListGroup";
import Button from "./components/Button";
import { useState } from "react";
import Alert from "./components/Alert";
import CPMGraph from "./components/CMPGraph";
import "./App.css";

function App() {
  const [isCalcVisable, setCalcVisable] = useState(false);
  const [isResultVisable, setResultVisable] = useState(false);
  const [title, setTitle] = useState("");

  //handlers
  const handleStartButton = () => {
    setCalcVisable(true);
    setTitle(
      "Wprowadź liczbę czynności (krawędzie) oraz zdarzeń (wierzchołki)"
    );
  };
  return (
    <div>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Dropdown button
        </button>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </div>
      <div className="container pt-3">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header text-center">
                CPM app - informacje
              </div>
              <div className="card-body">
                <h5 className="card-title">Opis działania aplikacji</h5>
                <p className="card-text">
                  CPM app to aplikacja webowa stworzona w języku TypeScript i
                  wykorzystująca bibliotekę React.
                </p>
                <p className="card-text">Słuzy ona do:</p>
                <ul>
                  <li>
                    obliczania najwcześniejszych oraz najpóźniejszych momentów
                    zakończenia i rozpoczęcia czynności
                  </li>
                  <li>obliczania rezerw czasowych</li>
                  <li>
                    <b>wyznaczania ściezki krytycznej</b>
                  </li>
                </ul>
                <p className="card-text">
                  Dane wejściowe powinny zawierać informacje o ilości czynności,
                  które następnie są oznaczane kolejnymi literami alfabetu,
                  ilości zdarzeń, które numerowane są od 1 w górę, czasie
                  trwania danej czynności oraz następstwie zdarzeń.
                </p>
                <p className="card-text">
                  Po wprowadzeniu odpowiednich danych aplikacja zwraca wyniki w
                  formie tabeli oraz grafu.
                </p>
                <a href="#calc">
                  <Button onClick={handleStartButton}>Wprowadź dane</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isCalcVisable && (
        <div className="container pb-3 pt-3" id="calc">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header text-center">
                  CMP app - wprowadzanie danych
                </div>
                <div className="card-body">
                  <h5 className="card-title pt-2">{title}</h5>
                  <div className="pt-2 pb-4">
                    <div className="form-floating mb-3 pt-2">
                      <input
                        type="number"
                        className="form-control"
                        id="taskNumberID"
                        placeholder="taskNumberID"
                        style={{ width: "50px", resize: "none" }}
                      />
                      <label htmlFor="floatingInput">Liczba czyności</label>
                    </div>
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="eventNumberID"
                        placeholder="eventNumberID"
                        style={{ width: "200px", resize: "none" }}
                      />
                      <label htmlFor="eventNumberID">Liczba zdarzeń</label>
                    </div>
                  </div>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">
                    Last updated 3 mins ago
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isResultVisable && (
        <div className="container pb-3 pt-3" id="result">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">Featured</div>
                <div className="card-body">
                  <h5 className="card-title">Special title treatment</h5>
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <h1>CPM Graph</h1>
                  <CPMGraph />
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">
                    Last updated 3 mins ago
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;