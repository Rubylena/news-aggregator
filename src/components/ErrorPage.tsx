import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const ErrorPage = () => {
  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-lg font-semibold text-brand-primary">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6 mx-auto max-w-40">
          <button
            onClick={() => history.back()}
            className="flex items-center justify-center gap-2 w-full rounded-md bg-blue-800 p-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-primary hover:bg-opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Go back
          </button>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
