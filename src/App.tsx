import Button from "./components/Button";
import { useState, useRef } from "react";
import CPMGraph from "./components/CPMGraph";
import "./App.css";
import SolveFirstInput from "./components/SolveFirstInput";
import SolveSecoundInput from "./components/SolveSecoundInput";
import CPMtable from "./components/CPMtable";

export type TaskData = {
  task: string | null | undefined;
  duration: number;
  taskFrom: number;
  taskTo: number;
};

export type CalculationData = {
  root: TaskData;
  ES: number;
  EF: number;
  LS: number;
  LF: number;
  reserve: number;
  isCritical: boolean;
};

function App() {
  const [isCalcVisable, setCalcVisable] = useState(false);
  const [isResultVisable, setResultVisable] = useState(false);
  const [isStartVisable, setStartVisable] = useState(true);
  const [title, setTitle] = useState("");

  const inputRefTask = useRef<HTMLInputElement>(null);
  const inputRefNode = useRef<HTMLInputElement>(null);
  const tabGlobal = useRef<CalculationData[]>([]);

  //handlers
  const handleStartButton = () => {
    setCalcVisable(true);
    setTitle("Wprowadź liczbę czynności (krawędzie) oraz zdarzeń (węzły)");
    setStartVisable(false);
  };
  const [isTaskError, setTaskError] = useState(false);
  const [isNodeError, setNodeError] = useState(false);

  const checkInputValue = (taskVal: number, nodeVal: number) => {
    if (taskVal <= 0 || nodeVal <= 0) {
      if (taskVal <= 0) setTaskError(true);
      if (nodeVal <= 0) setNodeError(true);
      return false;
    }
    return true;
  };

  const [isClicked, setClicked] = useState(false);
  const [tskNum, setTskNum] = useState(0);
  const [ndNum, setNdNum] = useState(0);
  const handleInputButton = () => {
    setTaskError(false);
    setNodeError(false);
    const taskVal = Number(inputRefTask.current?.value);
    const nodeVal = Number(inputRefNode.current?.value);
    if (checkInputValue(taskVal, nodeVal)) {
      setClicked(true);
      setTitle("Podaj czasy trwania oraz następstwa zdarzeń");
      setTskNum(taskVal);
      setNdNum(nodeVal);
    }
  };

  return (
    <div>
      {isStartVisable && (
        <div className="container pt-3" id="#start">
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
                    Dane wejściowe powinny zawierać informacje o ilości
                    czynności, które następnie są oznaczane kolejnymi literami
                    alfabetu, ilości zdarzeń, które numerowane są od 1 w górę,
                    czasie trwania danej czynności oraz następstwie zdarzeń.
                  </p>
                  <p className="card-text">
                    Po wprowadzeniu odpowiednich danych aplikacja zwraca wyniki
                    w formie tabeli oraz grafu.
                  </p>
                  <a href="#calc">
                    <Button onClick={handleStartButton}>Wprowadź dane</Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isCalcVisable && (
        <div className="container pb-3 pt-3" id="calc">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header text-center">
                  CPM app - wprowadzanie danych
                </div>
                <div className="card-body">
                  <h5 className="card-title pt-2 pb-3">{title}</h5>
                  {!isClicked ? (
                    <>
                      {/* inputRefNode={inputRefNode} */}
                      <SolveFirstInput
                        inputRefTask={inputRefTask}
                        isError={isTaskError}
                      >
                        Liczba czynności
                      </SolveFirstInput>
                      <SolveFirstInput
                        inputRefNode={inputRefNode}
                        isError={isNodeError}
                      >
                        Liczba zdarzeń
                      </SolveFirstInput>
                      <a
                        href="#calc"
                        className="btn btn-primary m-2"
                        onClick={handleInputButton}
                      >
                        Przejdź dalej
                      </a>
                    </>
                  ) : (
                    <></>
                  )}

                  {isClicked ? (
                    <>
                      <SolveSecoundInput
                        taskNumber={tskNum}
                        nodeNumber={ndNum}
                        tabGlobal={tabGlobal.current}
                        setResultVis={setResultVisable}
                        setCalcVisabl={setCalcVisable}
                      />
                      <a href="#calc">
                        <Button
                          onClick={() => {
                            setClicked(false);
                            setTitle(
                              "Wprowadź liczbę czynności (krawędzie) oraz zdarzeń (węzły)"
                            );
                          }}
                        >
                          Powrót
                        </Button>
                      </a>
                    </>
                  ) : (
                    <></>
                  )}
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
                <div className="card-header text-center">CPM app - wyniki</div>
                <div className="card-body">
                  <h5 className="pb-2">CPM Tabele</h5>
                  <CPMtable tabGlobal={tabGlobal.current} />
                  <h5 className="pb-2">CPM Graf</h5>
                  <CPMGraph tabGlobal={tabGlobal.current} nodeNumber={ndNum} />
                  <a
                    href="#start"
                    className="btn btn-primary"
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    Wróć do początku
                  </a>
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
