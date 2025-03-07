// src/components/Footer.tsx
const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white p-4 mt-4 text-center">
      <p>&copy; 2025 News Aggregator</p>
      <div>
        <a href="/privacy" className="text-white hover:underline">
          Privacy Policy
        </a>{" "}
        |
        <a href="/contact" className="text-white hover:underline">
          Contact
        </a>
      </div>
    </footer>
  );
};

export default Footer;
