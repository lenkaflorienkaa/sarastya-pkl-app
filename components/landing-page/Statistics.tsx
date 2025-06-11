export const Statistics = () => {
  interface statsProps {
    quantity: string;
    description: string;
  }

  const stats: statsProps[] = [
    {
      quantity: "500+", // Number of students who have completed the program
      description: "Alumni Network",
    },
    {
      quantity: "90%", // High percentage of successful placements or positive feedback
      description: "Success Rate",
    },
    {
      quantity: "20+", // Number of different projects or departments involved
      description: "Active Projects",
    },
    {
      quantity: "15+", // Number of dedicated mentors
      description: "Dedicated Mentors",
    },
  ];

  return (
    <section id="statistics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map(({ quantity, description }: statsProps) => (
          <div
            key={description}
            className="space-y-2 text-center p-4 rounded-lg shadow-sm
                       transition-all duration-300 ease-in-out
                       hover:scale-105 hover:shadow-lg hover:border-primary"
          >
            {/* Changed the color of the quantity to #18B7E9 */}
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: '#18B7E9' }}>
              {quantity}
            </h2>
            <p className="text-xl text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};