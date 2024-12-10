import { MouseEvent, SetStateAction } from "react";
import { useState } from "react";

interface Props {
  title: string;
  elem: string[];
  onSelect: (
    selectetItem: "primary" | "secondary" | "success" | "danger" | "warning"
  ) => void;
}

function ListGroup({ title, elem, onSelect }: Props) {
  const [ziomek, setZiomek] = useState("tutaj bedzie grubo");
  const city = ["Kraków", "Warszawa", "Poznań"];
  city.push("Wrocław");
  let list: string[] = elem;

  return (
    <>
      <h1 className="elo">{title}</h1>
      <p>{ziomek}</p>
      <ul className="list-group">{showList(list, setZiomek, onSelect)}</ul>
    </>
  );
}

function testFun(list: string[]) {
  console.log(list);
}

export function showList(
  list: string[],
  ziooom?: React.Dispatch<SetStateAction<string>>,
  onSelect?: (
    tempo: "primary" | "secondary" | "success" | "danger" | "warning"
  ) => void
) {
  //let currIndex = -1;
  type AllowedTypes =
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning";
  const [selectedIndex, setIndex] = useState(-1);
  const [tempo, setTemp0] = useState("siema");
  const clickHandler = (event: MouseEvent) => {
    console.log(event.type);
    //event.currentTarget.
  };
  let temp: string[] = [];
  list.forEach((elem) => {
    if (elem !== "Kraków") temp.push(elem);
  });
  if (temp.length === 0) return <li>No items</li>;
  else
    return temp.map((elem, index) => (
      <li
        className={
          index === selectedIndex ? "list-group-item active" : "list-group-item"
        }
        key={elem}
        onClick={() => {
          setIndex(index);
          setTemp0(elem);
          if (ziooom) ziooom(elem + " Elo mordo");
          if (onSelect) onSelect(elem as AllowedTypes);
        }}
      >
        {elem}
      </li>
    ));
}

export default ListGroup;
