import { useState, useEffect } from "react";

interface Props {
  inputRefTask?: React.RefObject<HTMLInputElement>;
  inputRefNode?: React.RefObject<HTMLInputElement>;
  children: string;
  isError: boolean;
}

const SolveFirstInput = ({
  inputRefTask,
  inputRefNode,
  children,
  isError,
}: Props) => {
  const [cellHide, setCellHide] = useState("d-none");
  useEffect(() => {
    if (isError) {
      setCellHide("");
    } else {
      setCellHide("d-none");
    }
  }, [isError]);
  return (
    <div className="pb-3">
      <label id="main" className={`${cellHide}`}>
        <p style={{ color: "red" }}>Podaj liczbę większą od 0</p>
      </label>
      <div className="form-floating mb-2">
        <input
          ref={inputRefTask ? inputRefTask : inputRefNode}
          type="number"
          className="form-control"
          id="taskNumberID"
          placeholder="taskNumberID"
          style={{ width: "200px", resize: "none" }}
        />
        <label id="l1" htmlFor="taskNumberID">
          {children}
        </label>
      </div>
    </div>
  );
};

export default SolveFirstInput;
