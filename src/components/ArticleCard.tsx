interface ArticleCardProps {
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  description,
  url,
  imageUrl,
}) => {
  return (
    <div className="min-h-96 flex flex-col-reverse justify-end bg-white shadow-md drop-shadow-md border-t border-gray-200 rounded-lg p-4 mb-4 hover:shadow-lg hover:scale-105 transition-all duration-200">
      <div className="flex flex-col justify-between lg:h-7/12">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline mt-2 block"
        >
          Read more
        </a>
      </div>
      <div className="lg:h-5/12">
        <img src={imageUrl || "/assets/img/placeholder.png"} alt={title} className="w-full h-full rounded-t-md" />
      </div>
    </div>
  );
};

export default ArticleCard;
