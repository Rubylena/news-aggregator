import {
  AcademicCapIcon,
  BriefcaseIcon,
  CodeBracketIcon,
  
} from "@heroicons/react/20/solid";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white p-4 mt-4 text-center">
      <p>&copy; {new Date().getFullYear()} News Aggregator</p>
      <div className="flex items-center gap-2 justify-center">
        <a
          href="https://www.linkedin.com/in/grace-effiong/"
          className="text-white hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AcademicCapIcon className="inline-block h-5 w-5 mr-2" />
          LinkedIn
        </a>{" "}
        |
        <a
          href="https://github.com/Rubylena"
          className="text-white hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <CodeBracketIcon className="inline-block h-5 w-5 mr-2" />
          GitHub
        </a>{" "}
        |
        <a
          href="https://graceeffiong.me/"
          className="text-white hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BriefcaseIcon className="inline-block h-5 w-5 mr-2" />
          Portfolio
        </a>
      </div>
    </footer>
  );
};

export default Footer;
