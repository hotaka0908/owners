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
    <div className="mt-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
      <h4 className="text-sm font-bold text-indigo-900 mb-3 flex items-center">
        <span className="text-lg mr-2">📚</span>
        学びのポイント
      </h4>

      <div className="space-y-2 text-sm">
        <div className="flex items-start">
          <span className="font-semibold text-blue-700 mr-2 mt-0.5">💡</span>
          <div>
            <div className="font-medium text-blue-900">なぜこの結果に？</div>
            <div className="text-blue-700">{feedback.why}</div>
          </div>
        </div>

        <div className="flex items-start">
          <span className="font-semibold text-purple-700 mr-2 mt-0.5">🎓</span>
          <div>
            <div className="font-medium text-purple-900">学べること</div>
            <div className="text-purple-700">{feedback.lesson}</div>
          </div>
        </div>

        <div className="flex items-start">
          <span className="font-semibold text-green-700 mr-2 mt-0.5">💭</span>
          <div>
            <div className="font-medium text-green-900">次回のヒント</div>
            <div className="text-green-700">{feedback.tip}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
