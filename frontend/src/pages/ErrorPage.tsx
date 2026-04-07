import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

export function ErrorPage() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : 'Something went wrong.';

  return (
    <section role="alert">
      <h1>Error</h1>
      <p>{message}</p>
      <Link to="/">Return home</Link>
    </section>
  );
}
