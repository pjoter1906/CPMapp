interface Props {
  isAve: boolean;
  onExitClick: () => void;
}

const Alert = ({ isAve, onExitClick }: Props) => {
  if (!isAve) return <></>;
  return (
    <div
      className="alert alert-success alert-dismissible fade show"
      role="alert"
    >
      <strong>Warning!</strong> This is a dismissible alert with a close button.
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onExitClick}
      ></button>
    </div>
  );
};

export default Alert;
