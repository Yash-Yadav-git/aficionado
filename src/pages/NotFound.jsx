import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="container flex justify-center items-center h-96">
      <div className="felx flex-col">
        <h1 className="text-5xl font-bold">Not Found</h1>
        <Link to="/" className="btn btn-lg btn-transparent rounded-lg">
          Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
