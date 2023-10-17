import PropTypes from "prop-types";
export default function TitlePage({ setGameStage }) {
  return (
    <>
      <h1>Battleship</h1>
      <button onClick={() => setGameStage("menu:login")}>Next</button>
    </>
  );
}

TitlePage.propTypes = {
  setGameStage: PropTypes.func,
};
