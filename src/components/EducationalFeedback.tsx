import React from 'react';

interface EducationalFeedbackProps {
  feedback: {
    why: string;
    lesson: string;
    tip: string;
  };
}

export const EducationalFeedback: React.FC<EducationalFeedbackProps> = ({ feedback }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-3 sm:p-4 border-2 border-indigo-200 shadow-lg">
      <h4 className="text-sm sm:text-base font-bold text-indigo-900 mb-3 flex items-center">
        <span className="text-lg sm:text-xl mr-2">📚</span>
        学びのポイント
      </h4>

      <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
        <div className="flex items-start">
          <span className="text-lg sm:text-xl font-semibold text-blue-700 mr-2 mt-0.5 flex-shrink-0">💡</span>
          <div className="flex-1">
            <div className="font-semibold text-blue-900 mb-1">なぜこの結果に？</div>
            <div className="text-blue-700 leading-relaxed">{feedback.why}</div>
          </div>
        </div>

        <div className="flex items-start">
          <span className="text-lg sm:text-xl font-semibold text-purple-700 mr-2 mt-0.5 flex-shrink-0">🎓</span>
          <div className="flex-1">
            <div className="font-semibold text-purple-900 mb-1">学べること</div>
            <div className="text-purple-700 leading-relaxed">{feedback.lesson}</div>
          </div>
        </div>

        <div className="flex items-start">
          <span className="text-lg sm:text-xl font-semibold text-green-700 mr-2 mt-0.5 flex-shrink-0">💭</span>
          <div className="flex-1">
            <div className="font-semibold text-green-900 mb-1">次回のヒント</div>
            <div className="text-green-700 leading-relaxed">{feedback.tip}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
