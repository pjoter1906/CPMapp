import { CalculationData } from "../App";
import { ReactNode } from "react";

interface Pros {
  tabGlobal: CalculationData[];
}

const CPMtable = ({ tabGlobal }: Pros) => {
  const yesOrNo = (isCritical: boolean) => {
    return isCritical ? "tak" : "nie";
  };
  const createInputTable: () => ReactNode[] = () => {
    return tabGlobal.map((elem) => (
      <tr key={`${elem.root.task}${elem.root.task}`}>
        <td>{elem.root.task}</td>
        <td>{elem.root.duration}</td>
        <td>{elem.root.taskFrom}</td>
        <td>{elem.root.taskTo}</td>
      </tr>
    ));
  };

  const createResultTable: () => ReactNode[] = () => {
    return tabGlobal.map((elem) => (
      <tr key={elem.root.task}>
        <td>{elem.root.task}</td>
        <td>{elem.root.duration}</td>
        <td>{elem.ES}</td>
        <td>{elem.EF}</td>
        <td>{elem.LS}</td>
        <td>{elem.LF}</td>
        <td>{elem.reserve}</td>
        <td>{yesOrNo(elem.isCritical)}</td>
      </tr>
    ));
  };

  return (
    <>
      <h6>Wprowadzone dane</h6>
      <div className="col-6">
        <table className="table table-striped table-bordered mt-2">
          <thead>
            <tr>
              <th className="text-center" scope="col">
                Czynność
              </th>
              <th className="text-center" scope="col">
                Czas trwania
              </th>
              <th className="text-center" scope="col">
                Początek czynności
              </th>
              <th className="text-center" scope="col">
                Koniec czynności
              </th>
            </tr>
          </thead>
          <tbody>{createInputTable()}</tbody>
        </table>
      </div>
      <h6>Obliczone wartości</h6>
      <div className="col-10">
        <table className="table table-striped table-bordered mt-2">
          <thead>
            <tr>
              <th className="text-center" scope="col">
                Czynność
              </th>
              <th className="text-center" scope="col">
                Czas trwania
              </th>
              <th className="text-center" scope="col">
                ES
              </th>
              <th className="text-center" scope="col">
                EF
              </th>
              <th className="text-center" scope="col">
                LS
              </th>
              <th className="text-center" scope="col">
                LF
              </th>
              <th className="text-center" scope="col">
                Rezerwa
              </th>
              <th className="text-center" scope="col">
                Czynność krytyczna
              </th>
            </tr>
          </thead>
          <tbody>{createResultTable()}</tbody>
        </table>
      </div>
    </>
  );
};

export default CPMtable;
