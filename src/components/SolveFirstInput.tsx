interface Props {
  inputRefTask: React.RefObject<HTMLInputElement>;
  inputRefNode: React.RefObject<HTMLInputElement>;
}

const SolveFirstInput = ({ inputRefTask, inputRefNode }: Props) => {
  return (
    <div className="pt-2 pb-4">
      <div className="form-floating mb-3 pt-2">
        <input
          ref={inputRefTask}
          type="number"
          className="form-control"
          id="taskNumberID"
          placeholder="taskNumberID"
          style={{ width: "200px", resize: "none" }}
        />
        <label id="l1" htmlFor="taskNumberID">
          Liczba czyności
        </label>
      </div>
      <div className="form-floating">
        <input
          ref={inputRefNode}
          type="number"
          className="form-control"
          id="eventNumberID"
          placeholder="eventNumberID"
          style={{ width: "200px", resize: "none" }}
        />
        <label id="l2" htmlFor="eventNumberID">
          Liczba zdarzeń
        </label>
      </div>
    </div>
  );
};

export default SolveFirstInput;
