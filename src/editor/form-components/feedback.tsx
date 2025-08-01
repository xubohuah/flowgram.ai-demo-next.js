import { FieldError, FieldState, FieldWarning } from '@flowgram.ai/free-layout-editor';

interface StatePanelProps {
  errors?: FieldState['errors'];
  warnings?: FieldState['warnings'];
  invalid?: boolean;
}

export const Feedback = ({ errors, warnings, invalid }: StatePanelProps) => {
  const renderFeedbacks = (fs: FieldError[] | FieldWarning[] | undefined) => {
    if (!fs) return null;
    return fs.map((f) => <span key={f.name}>{f.message}</span>);
  };
  
  return (
    <div className="space-y-1">
      {errors && errors.length > 0 && (
        <div className="text-xs text-red-500">
          {renderFeedbacks(errors)}
        </div>
      )}
      {warnings && warnings.length > 0 && (
        <div className="text-xs text-orange-500">
          {renderFeedbacks(warnings)}
        </div>
      )}
    </div>
  );
};