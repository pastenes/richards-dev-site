import React from "react";

export default function TechTags({ tags }) {
  return (
    <div className="basis-1/2 lg:basis-1/4">
      <h3 className="mb-6 text-light">A few technologies I'm familiar with:</h3>
      <ul className="grid grid-cols-2 font-fira-code text-tiny text-green">
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </div>
  );
}
