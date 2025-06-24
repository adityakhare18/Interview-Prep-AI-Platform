import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="bg-white border border-gray-300/40 rounded-xl p-3 overflow-hidden cursor-pointer hover:shadow-xl shadow-gray-100 relative group"
      onClick={onSelect}
    >
      <div
        className="rounded-lg p-4 relative"
        style={{ background: colors.bgcolor }}
      >
        <div className="flex items-start">
          <div className="flex shrink-0 w-12 h-12 bg-white rounded-md items-center justify-center mr-4">
            <span className="text-lg font-semibold text-black">
              {getInitials(role)}
            </span>
          </div>
          <div className="flex-grow min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-base font-semibold truncate">{role}</h2>
                <p className="text-xs text-gray-900 truncate">{topicsToFocus}</p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="hidden group-hover:flex items-center gap-1.5 text-xs text-rose-600 font-semibold bg-rose-50 px-3 py-1 rounded border border-rose-100 hover:border-rose-200 cursor-pointer absolute top-3 right-3 z-10"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          aria-label="Delete session"
        >
          <LuTrash2 className="text-sm" />
        </button>
      </div>
      <div className="px-4 pb-4">
        <div className="flex flex-wrap gap-2 mt-4">
          <div className="text-xs font-medium text-black px-3 py-1 border border-gray-900 rounded-full whitespace-nowrap">
            Experience: {experience} {experience === 1 ? "Year" : "Years"}
          </div>

          <div className="text-xs font-medium text-black px-3 py-1 border border-gray-900 rounded-full whitespace-nowrap">
            {questions} Q&A
          </div>

          <div className="text-xs font-medium text-black px-3 py-1 border border-gray-900 rounded-full whitespace-nowrap">
            Last Updated: {lastUpdated}
          </div>
        </div>
        <p className="text-sm text-gray-600 font-medium line-clamp-2 mt-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
