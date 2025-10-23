import React, { useState } from "react";
import ProfileCard from "./ProfileCard";

const SwipeCard = ({ profile, onSwipe, onLike, onPass, isActive = true }) => {
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragCurrent, setDragCurrent] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    if (!isActive) return;

    setDragStart({ x: e.clientX, y: e.clientY });
    setDragCurrent({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !isActive) return;

    setDragCurrent({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    if (!isDragging || !isActive) return;

    const deltaX = dragCurrent.x - dragStart.x;
    const deltaY = dragCurrent.y - dragStart.y;

    // Determine swipe direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 50) {
        onSwipe("right");
        onLike();
      } else if (deltaX < -50) {
        onSwipe("left");
        onPass();
      }
    }

    setIsDragging(false);
    setDragCurrent({ x: 0, y: 0 });
  };

  const handleTouchStart = (e) => {
    if (!isActive) return;

    const touch = e.touches[0];
    setDragStart({ x: touch.clientX, y: touch.clientY });
    setDragCurrent({ x: touch.clientX, y: touch.clientY });
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !isActive) return;

    const touch = e.touches[0];
    setDragCurrent({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    if (!isDragging || !isActive) return;

    const deltaX = dragCurrent.x - dragStart.x;
    const deltaY = dragCurrent.y - dragStart.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 50) {
        onSwipe("right");
        onLike();
      } else if (deltaX < -50) {
        onSwipe("left");
        onPass();
      }
    }

    setIsDragging(false);
    setDragCurrent({ x: 0, y: 0 });
  };

  const rotation = isDragging ? (dragCurrent.x - dragStart.x) * 0.1 : 0;
  const translateX = isDragging ? dragCurrent.x - dragStart.x : 0;
  const translateY = isDragging ? (dragCurrent.y - dragStart.y) * 0.1 : 0;

  const style = {
    transform: `translate(${translateX}px, ${translateY}px) rotate(${rotation}deg)`,
    transition: isDragging ? "none" : "transform 0.3s ease-out",
    cursor: isActive ? (isDragging ? "grabbing" : "grab") : "default",
    opacity: isActive ? 1 : 0.5,
  };

  return (
    <div
      className="absolute inset-0"
      style={style}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <ProfileCard
        profile={profile}
        onLike={onLike}
        onPass={onPass}
        showActions={!isDragging}
      />
    </div>
  );
};

export default SwipeCard;
