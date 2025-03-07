interface ArticleCardProps {
  title?: string;
  description?: string;
  url?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  description,
  url,
}) => {
  return (
    <div className="bg-white shadow-md drop-shadow-md border-t border-gray-200 rounded-lg p-4 mb-4 hover:shadow-lg hover:scale-105 transition-all duration-200">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline mt-2 block"
      >
        Read more
      </a>
    </div>
  );
};

export default ArticleCard;
