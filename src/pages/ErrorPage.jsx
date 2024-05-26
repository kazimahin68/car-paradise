import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const { error, status } = useRouteError();
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl font-extrabold text-red-600">
        Error {status || 404}
      </h1>
      <p className="font-bold mt-4">{error?.message}</p>
      <button className="bg-green-700 p-3 rounded-lg text-white font-bold mt-4 hover:bg-green-500">
        <Link to="/">Home Page</Link>
      </button>
    </div>
  );
};

export default ErrorPage;