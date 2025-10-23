import React, { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // Simulate loading matches
    const timer = setTimeout(() => {
      setMatches([
        {
          id: 1,
          name: "Sarah Johnson",
          age: 25,
          bio: "Love hiking and coffee. Looking for someone to explore the city with!",
          interests: ["Hiking", "Coffee", "Travel"],
          lastActive: "2 hours ago",
          isNew: true,
          photos: [
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
          ],
        },
        {
          id: 2,
          name: "Mike Chen",
          age: 28,
          bio: "Photographer and foodie. Always up for trying new restaurants!",
          interests: ["Photography", "Food", "Art"],
          lastActive: "1 day ago",
          isNew: false,
          photos: [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
          ],
        },
        {
          id: 3,
          name: "Emma Wilson",
          age: 24,
          bio: "Book lover and yoga enthusiast. Seeking meaningful connections.",
          interests: ["Reading", "Yoga", "Meditation"],
          lastActive: "3 days ago",
          isNew: true,
          photos: [
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
          ],
        },
        {
          id: 4,
          name: "Alex Rodriguez",
          age: 30,
          bio: "Musician and traveler. Love live music and spontaneous adventures.",
          interests: ["Music", "Travel", "Adventure"],
          lastActive: "1 week ago",
          isNew: false,
          photos: [
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
          ],
        },
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredMatches = matches.filter((match) => {
    if (activeTab === "new") return match.isNew;
    return true;
  });

  const handleMessage = (matchId) => {
    // Handle messaging functionality
    console.log("Message user:", matchId);
  };

  const handleUnmatch = (matchId) => {
    setMatches((prev) => prev.filter((match) => match.id !== matchId));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Matches</h1>
        <p className="text-gray-600">Connect with people who caught your eye</p>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("all")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "all"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              All Matches ({matches.length})
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "new"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              New Matches ({matches.filter((m) => m.isNew).length})
            </button>
          </nav>
        </div>
      </div>

      {/* Matches Grid */}
      {filteredMatches.length === 0 ? (
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">💔</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No matches yet
          </h3>
          <p className="text-gray-600 mb-6">
            Keep swiping to find your perfect match!
          </p>
          <Button>Start Swiping</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match) => (
            <Card key={match.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={match.photos[0]}
                  alt={match.name}
                  className="w-full h-48 object-cover"
                />
                {match.isNew && (
                  <div className="absolute top-2 right-2">
                    <span className="bg-accent-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                      New
                    </span>
                  </div>
                )}
              </div>

              <Card.Content className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {match.name}, {match.age}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {match.lastActive}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {match.bio}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {match.interests.slice(0, 3).map((interest) => (
                    <span
                      key={interest}
                      className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                  {match.interests.length > 3 && (
                    <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      +{match.interests.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleMessage(match.id)}
                  >
                    Message
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUnmatch(match.id)}
                  >
                    Unmatch
                  </Button>
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Matches;
