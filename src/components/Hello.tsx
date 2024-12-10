import { showList } from "./ListGroup";

interface Props {
  name: string;
  adven: string[];
}

function Hello({ name, adven }: Props) {
  return (
    <>
      <br />
      <div>Hello {name}</div>
      <h1>Those are your skills:</h1>
      <ul className="list-group">{showList(adven)}</ul>
    </>
  );
}

export default Hello;
