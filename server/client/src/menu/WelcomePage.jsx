import PropTypes from "prop-types";
export default function WelcomePage({ user }) {
  return (
    <h1>
      Welcome {user.nickname} {"("}
      {user.clientId}
      {")"}
    </h1>
  );
}

WelcomePage.propTypes = {
  user: PropTypes.object,
};
