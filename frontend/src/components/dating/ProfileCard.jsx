import React from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";

const ProfileCard = ({
  profile,
  onLike,
  onPass,
  onMessage,
  showActions = true,
}) => {
  const { name, age, bio, interests, photos, distance } = profile;

  return (
    <Card className="overflow-hidden max-w-sm w-full mx-auto">
      {/* Photo */}
      <div className="relative h-64 sm:h-80 bg-gray-200">
        {photos && photos.length > 0 ? (
          <img
            src={photos[0]}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-gray-400">
              <svg
                className="mx-auto h-16 w-16"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <p className="text-sm mt-2">No photo</p>
            </div>
          </div>
        )}

        {/* Distance indicator */}
        {distance && (
          <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded-full">
            {distance} miles away
          </div>
        )}
      </div>

      {/* Profile Info */}
      <Card.Content className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900">
            {name}, {age}
          </h3>
        </div>

        {bio && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">{bio}</p>
        )}

        {/* Interests */}
        {interests && interests.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {interests.slice(0, 4).map((interest) => (
              <span
                key={interest}
                className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full"
              >
                {interest}
              </span>
            ))}
            {interests.length > 4 && (
              <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                +{interests.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        {showActions && (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={onPass}
            >
              Pass
            </Button>
            <Button size="sm" className="flex-1" onClick={onLike}>
              Like
            </Button>
          </div>
        )}

        {onMessage && (
          <Button className="w-full mt-2" onClick={onMessage}>
            Message
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

export default ProfileCard;
