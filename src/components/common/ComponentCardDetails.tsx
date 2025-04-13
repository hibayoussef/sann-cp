interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
}

const ComponentCardDetails: React.FC<ComponentCardProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`rounded-2xl border shadow-sm border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      <div className=" border-gray-100 dark:border-gray-800">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCardDetails;
