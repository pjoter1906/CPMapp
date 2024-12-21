import Button from "./components/Button";
import { useState, useRef } from "react";
import CPMGraph from "./components/CPMGraph";
import "./App.css";
import SolveFirstInput from "./components/SolveFirstInput";
import SolveSecoundInput from "./components/SolveSecoundInput";
import CPMtable from "./components/CPMtable";
import GanttChart from "./components/GanttChart";
import { Gantt } from "./components/GanttChart";

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

  const dataToGantt = (
    isLate: boolean
  ): { tasks: Gantt[]; maxTime: number } => {
    let id = 0;
    let maxTime = 0;

    if (!tabGlobal?.current) {
      throw new Error("tabGlobal.current is not available");
    }

    const tasks = tabGlobal.current.map((elem) => {
      id += 1;
      maxTime = elem.LF > maxTime ? elem.LF : maxTime;
      const task = elem.root?.task || "Unknown Task";

      return {
        id: id,
        activity: task,
        taskFrom: elem.root?.taskFrom ?? 0,
        taskTo: elem.root?.taskTo ?? 0,
        es: !isLate ? elem.ES : elem.LS,
        ef: !isLate ? elem.EF : elem.LF,
        duration: elem.root?.duration ?? 0,
        reserve: elem.reserve ?? 0,
        isCritical: elem.isCritical ?? false,
      };
    });

    return { tasks, maxTime };
  };

  return (
    <div className="card mb-3">
      <div className="card-header">
        <img
          className="card-img-top img-fluid"
          src="../public/logo3.jpeg"
          alt="Card image cap"
          style={{
            height: "300px",
            objectFit: "cover",
            objectPosition: "center 42%",
          }}
        />
      </div>
      <div className="card-body">
        {isStartVisable && (
          <div className="container pt-1" id="#start">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header text-center">
                    CPM app - informacje
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Opis działania aplikacji</h5>
                    <hr />
                    <p className="card-text">
                      CPM app to aplikacja webowa stworzona w języku TypeScript
                      i wykorzystująca bibliotekę React.
                    </p>
                    <p className="card-text">Słuzy ona do:</p>
                    <ul>
                      <li>
                        obliczania najwcześniejszych oraz najpóźniejszych
                        momentów zakończenia i rozpoczęcia czynności
                      </li>
                      <li>obliczania rezerw czasowych</li>
                      <li>
                        <b>wyznaczania ściezki krytycznej</b>
                      </li>
                    </ul>
                    <p className="card-text">
                      Dane wejściowe powinny zawierać informacje o: ilości
                      czynności, które następnie są oznaczane kolejnymi literami
                      alfabetu; ilości zdarzeń, które numerowane są od 1 w górę;
                      czasie trwania danej czynności oraz następstwie zdarzeń.
                    </p>
                    <p className="card-text">
                      Po wprowadzeniu odpowiednich danych, aplikacja zwraca
                      wyniki w formie tabeli, grafu oraz harmonogramu Gantta.
                    </p>
                    <hr />
                    <a href="#calc">
                      <Button onClick={handleStartButton} color="secondary">
                        Wprowadź dane
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isCalcVisable && (
          <div className="container pt-1" id="calc">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header text-center">
                    CPM app - wprowadzanie danych
                  </div>
                  <div className="card-body">
                    <h5 className="card-title pt-2 pb-2">{title}</h5>
                    <hr />
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
                        <hr />
                        <a
                          href="#calc"
                          className="btn btn-secondary"
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
                            color="secondary"
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
          <div className="container pt-1" id="result">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header text-center">
                    CPM app - wyniki
                  </div>
                  <div className="card-body">
                    <h5 className="pb-2">CPM Tabele</h5>
                    <CPMtable tabGlobal={tabGlobal.current} />
                    <hr />
                    <h5 className="pb-2">CPM Graf</h5>
                    <CPMGraph
                      tabGlobal={tabGlobal.current}
                      nodeNumber={ndNum}
                    />
                    <hr />
                    <h5>Harmonogram Gantta ASAP</h5>
                    <GanttChart data={dataToGantt(false)} />
                    <hr />
                    <a
                      href="#start"
                      className="btn btn-secondary"
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
    </div>
  );
}

export default App;
